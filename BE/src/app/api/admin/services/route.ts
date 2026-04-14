import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { logActivity } from '@/lib/activity-log'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  const where: Record<string, unknown> = {}
  if (status && status !== 'all') where.status = status
  if (search) {
    where.title = { contains: search, mode: 'insensitive' }
  }

  const data = await prisma.service.findMany({
    where,
    orderBy: { order: 'asc' },
  })

  return corsResponse({ success: true, data })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description || '',
        shortDesc: body.shortDesc || '',
        icon: body.icon || '',
        features: body.features || [],
        pricing: body.pricing || [],
        status: body.status || 'active',
        order: body.order || 0,
      },
    })
    await logActivity({ action: 'service.create', module: 'service', status: 'success', message: `Tạo dịch vụ: ${service.title}`, detail: { id: service.id, slug: service.slug } })
    return corsResponse({ success: true, data: service }, 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request body'
    await logActivity({ action: 'service.create', module: 'service', status: 'failed', message: `Tạo dịch vụ thất bại: ${message}` })
    return corsResponse({ success: false, message }, 400)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

    const service = await prisma.service.update({ where: { id }, data })
    await logActivity({ action: 'service.update', module: 'service', status: 'success', message: `Cập nhật dịch vụ: ${service.title}`, detail: { id: service.id } })
    return corsResponse({ success: true, data: service })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

  await prisma.service.delete({ where: { id } })
  await logActivity({ action: 'service.delete', module: 'service', status: 'success', message: 'Xóa dịch vụ', detail: { id } })
  return corsResponse({ success: true })
}
