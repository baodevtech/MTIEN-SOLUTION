import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { logActivity } from '@/lib/activity-log'
import { unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

// Delete physical file from disk
async function deleteFileFromDisk(url: string) {
  try {
    if (url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', url)
      if (existsSync(filePath)) {
        await unlink(filePath)
      }
    }
  } catch { /* ignore */ }
}

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const folder = searchParams.get('folder')

  const where: Record<string, unknown> = {}
  if (type && type !== 'all') where.type = type
  if (folder) where.folder = folder

  const data = await prisma.media.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return corsResponse({ success: true, data, total: data.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const media = await prisma.media.create({
      data: {
        filename: body.filename || 'uploaded-file.jpg',
        originalName: body.originalName || body.filename || 'uploaded-file.jpg',
        url: body.url || '',
        type: body.type || 'image',
        size: body.size || 0,
        width: body.width,
        height: body.height,
        alt: body.alt || '',
        folder: body.folder || 'uploads',
        uploadedBy: body.uploadedBy || 'Admin',
      },
    })
    await logActivity({ action: 'media.upload', module: 'media', status: 'success', message: `Upload: ${media.originalName}`, detail: { id: media.id, filename: media.filename, type: media.type } })
    return corsResponse({ success: true, data: media }, 201)
  } catch {
    return corsResponse({ success: false, message: 'Invalid request', code: 'MEDIA_CREATE_FAILED' }, 400)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const ids = searchParams.get('ids') // comma-separated for bulk

    if (ids) {
      const idList = ids.split(',').map(s => s.trim()).filter(Boolean)
      if (idList.length === 0) return corsResponse({ success: false, message: 'Danh sách ID trống', code: 'INVALID_IDS' }, 400)
      // Delete files from disk
      const items = await prisma.media.findMany({ where: { id: { in: idList } }, select: { url: true } })
      for (const item of items) await deleteFileFromDisk(item.url)
      const result = await prisma.media.deleteMany({ where: { id: { in: idList } } })
      await logActivity({ action: 'media.bulk-delete', module: 'media', status: 'success', message: `Xóa ${result.count} media`, detail: { count: result.count } })
      return corsResponse({ success: true, deleted: result.count })
    }

    if (!id) return corsResponse({ success: false, message: 'Thiếu ID media', code: 'MISSING_ID' }, 400)
    const item = await prisma.media.findUnique({ where: { id }, select: { url: true } })
    if (item) await deleteFileFromDisk(item.url)
    await prisma.media.delete({ where: { id } })
    await logActivity({ action: 'media.delete', module: 'media', status: 'success', message: 'Xóa media', detail: { id } })
    return corsResponse({ success: true })
  } catch {
    return corsResponse({ success: false, message: 'Không thể xoá media', code: 'MEDIA_DELETE_FAILED' }, 400)
  }
}
