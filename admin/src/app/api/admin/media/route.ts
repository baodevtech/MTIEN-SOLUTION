import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

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
    return corsResponse({ success: true, data: media }, 201)
  } catch {
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}
