import { NextRequest } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
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
    const folder = (formData.get('folder') as string) || 'uploads'

    // Validate folder name (no path traversal)
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '_')

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

      // Write file
      const buffer = Buffer.from(await file.arrayBuffer())
      const filePath = path.join(uploadDir, uniqueName)
      await writeFile(filePath, buffer)

      // Get image dimensions if it's an image
      let width: number | undefined
      let height: number | undefined
      if (file.type.startsWith('image/') && !file.type.includes('svg')) {
        try {
          // Simple PNG/JPEG dimension parsing
          const dims = getImageDimensions(buffer, file.type)
          if (dims) {
            width = dims.width
            height = dims.height
          }
        } catch { /* ignore dimension parsing errors */ }
      }

      // Save to database
      const url = `/uploads/${safeFolder}/${uniqueName}`
      try {
        const media = await prisma.media.create({
          data: {
            filename: uniqueName,
            originalName: file.name,
            url,
            type: getMediaType(file.type),
            size: file.size,
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
          size: file.size,
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

// Simple image dimension parser (no external dependency)
function getImageDimensions(buffer: Buffer, mime: string): { width: number; height: number } | null {
  try {
    if (mime === 'image/png') {
      if (buffer.length > 24 && buffer[0] === 0x89 && buffer[1] === 0x50) {
        return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
      }
    }
    if (mime === 'image/jpeg') {
      let offset = 2
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xFF) break
        const marker = buffer[offset + 1]
        if (marker === 0xC0 || marker === 0xC2) {
          return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) }
        }
        const segLen = buffer.readUInt16BE(offset + 2)
        offset += 2 + segLen
      }
    }
    if (mime === 'image/gif' && buffer.length > 10) {
      return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) }
    }
    if (mime === 'image/webp' && buffer.length > 30) {
      if (buffer.slice(12, 16).toString() === 'VP8 ') {
        return { width: buffer.readUInt16LE(26) & 0x3FFF, height: buffer.readUInt16LE(28) & 0x3FFF }
      }
    }
  } catch { /* ignore */ }
  return null
}
