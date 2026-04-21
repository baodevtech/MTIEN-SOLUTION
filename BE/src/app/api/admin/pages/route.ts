import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { triggerFERevalidate } from '@/lib/revalidate'

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

  const data = await prisma.page.findMany({
    where,
    orderBy: { order: 'asc' },
  })

  return corsResponse({ success: true, data })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const page = await prisma.page.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content || '',
        template: body.template || 'default',
        status: body.status || 'published',
        seo: body.seo || {},
        order: body.order || 0,
        parentId: body.parentId || null,
      },
    })
    triggerFERevalidate(['pages'])
    return corsResponse({ success: true, data: page }, 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request body'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

    const page = await prisma.page.update({ where: { id }, data })
    triggerFERevalidate(['pages'])
    return corsResponse({ success: true, data: page })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

  await prisma.page.delete({ where: { id } })
  triggerFERevalidate(['pages'])
  return corsResponse({ success: true })
}
