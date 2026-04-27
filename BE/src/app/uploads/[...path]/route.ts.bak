import { NextRequest, NextResponse } from 'next/server'
import { readFile, stat } from 'fs/promises'
import path from 'path'

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const segments = (await params).path

  // Security: block path traversal
  if (segments.some(s => s === '..' || s.includes('\\') || s.includes('\0'))) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const filePath = path.join(process.cwd(), 'public', 'uploads', ...segments)

  // Security: ensure resolved path is within public/uploads
  const uploadsRoot = path.join(process.cwd(), 'public', 'uploads')
  const resolved = path.resolve(filePath)
  if (!resolved.startsWith(uploadsRoot)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  try {
    const fileStat = await stat(resolved)
    if (!fileStat.isFile()) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const buffer = await readFile(resolved)
    const ext = path.extname(resolved).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileStat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not Found', { status: 404 })
  }
}
