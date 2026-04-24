import { NextRequest } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { logActivity } from '@/lib/activity-log'

export const dynamic = 'force-dynamic'

// Max file size: 10MB
const MAX_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon',
  'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'video/mp4', 'video/webm',
]

function getMediaType(mime: string): string {
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  return 'document'
}

function sanitizeFilename(name: string): string {
  // Remove path traversal and dangerous characters
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.{2,}/g, '.').slice(0, 200)
}

export async function OPTIONS() {
  return corsOptions()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const folder = (formData.get('folder') as string) || 'general'

    // Validate folder name (no path traversal). Also guard against the historical
    // 'uploads' default which produced nested /public/uploads/uploads/ paths.
    let safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '_')
    if (safeFolder === 'uploads' || safeFolder === '') {
      safeFolder = 'general'
    }

    if (!files || files.length === 0) {
      return corsResponse({ success: false, message: 'Không có file nào được chọn', code: 'NO_FILES' }, 400)
    }

    // Create upload directory if not exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', safeFolder)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploaded = []
    const errors = []

    for (const file of files) {
      // Validate file size
      if (file.size > MAX_SIZE) {
        errors.push({ name: file.name, error: `Vượt quá 10MB (${(file.size / 1024 / 1024).toFixed(1)}MB)` })
        continue
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push({ name: file.name, error: `Định dạng không hỗ trợ: ${file.type}` })
        continue
      }

      // Generate unique filename
      const ext = path.extname(file.name) || ''
      const baseName = sanitizeFilename(path.basename(file.name, ext))
      const timestamp = Date.now()
      const uniqueName = `${baseName}-${timestamp}${ext}`

      // Read source bytes
      const sourceBuffer = Buffer.from(await file.arrayBuffer())

      // Process images with sharp (auto-rotate from EXIF, downscale, re-encode, strip metadata).
      // SVG and non-images are written as-is.
      const isRasterImage =
        file.type.startsWith('image/') && file.type !== 'image/svg+xml' && file.type !== 'image/x-icon' && file.type !== 'image/vnd.microsoft.icon'

      let finalBuffer: Buffer = sourceBuffer
      let width: number | undefined
      let height: number | undefined
      let finalSize = file.size

      if (isRasterImage) {
        try {
          const pipeline = sharp(sourceBuffer, { failOn: 'error' }).rotate()
          const meta = await pipeline.metadata()
          // Cap max dimension at 2560px to avoid huge hero images on disk
          const MAX_DIM = 2560
          const needsResize = (meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM
          const resized = needsResize
            ? pipeline.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
            : pipeline

          // Re-encode in original format with sensible quality. This also strips EXIF
          // (sharp drops metadata by default unless .withMetadata() is called).
          if (file.type === 'image/jpeg') {
            finalBuffer = await resized.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
          } else if (file.type === 'image/png') {
            finalBuffer = await resized.png({ compressionLevel: 9 }).toBuffer()
          } else if (file.type === 'image/webp') {
            finalBuffer = await resized.webp({ quality: 82 }).toBuffer()
          } else if (file.type === 'image/gif') {
            // Keep GIF as-is (sharp loses animation); only read dims.
            finalBuffer = sourceBuffer
          } else {
            finalBuffer = await resized.toBuffer()
          }
          const outMeta = await sharp(finalBuffer).metadata()
          width = outMeta.width
          height = outMeta.height
          finalSize = finalBuffer.length
        } catch (imgErr) {
          console.warn('sharp pipeline failed, falling back to raw bytes:', imgErr)
          finalBuffer = sourceBuffer
        }
      }

      // Write file
      const filePath = path.join(uploadDir, uniqueName)
      await writeFile(filePath, finalBuffer)

      // Save to database
      const url = `/uploads/${safeFolder}/${uniqueName}`
      try {
        const media = await prisma.media.create({
          data: {
            filename: uniqueName,
            originalName: file.name,
            url,
            type: getMediaType(file.type),
            size: finalSize,
            width,
            height,
            alt: '',
            folder: safeFolder,
            uploadedBy: 'Admin',
          },
        })
        uploaded.push(media)
      } catch (dbErr) {
        console.error('DB save error for', file.name, dbErr)
        // File was written to disk but DB failed - still report as uploaded with minimal data
        uploaded.push({
          id: `temp-${timestamp}`,
          filename: uniqueName,
          originalName: file.name,
          url,
          type: getMediaType(file.type),
          size: finalSize,
          width: width ?? null,
          height: height ?? null,
          alt: '',
          folder: safeFolder,
          uploadedBy: 'Admin',
          createdAt: new Date(),
        })
      }
    }

    if (uploaded.length > 0) {
      try {
        await logActivity({
          action: 'media.upload',
          module: 'media',
          status: 'success',
          message: `Upload ${uploaded.length} file(s)`,
          detail: { files: uploaded.map(m => m.filename), folder: safeFolder },
        })
      } catch { /* DB may be unavailable */ }
    }

    return corsResponse({
      success: true,
      data: uploaded,
      errors: errors.length > 0 ? errors : undefined,
      message: `Đã tải lên ${uploaded.length} tệp${errors.length > 0 ? `, ${errors.length} lỗi` : ''}`,
    }, uploaded.length > 0 ? 201 : 400)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Upload error:', message, err)
    return corsResponse({ success: false, message: `Lỗi upload: ${message}`, code: 'UPLOAD_FAILED' }, 500)
  }
}
