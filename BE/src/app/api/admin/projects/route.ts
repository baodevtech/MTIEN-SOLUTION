import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const where: Record<string, unknown> = {}
  if (status && status !== 'all') where.status = status
  if (category) where.category = category
  if (search) {
    where.title = { contains: search, mode: 'insensitive' }
  }

  const [data, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.count({ where }),
  ])

  return corsResponse({
    success: true,
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        client: body.client || '',
        description: body.description || '',
        images: body.images || [],
        technologies: body.technologies || [],
        category: body.category || '',
        status: body.status || 'planned',
        featured: body.featured || false,
        url: body.url || '',
        completedAt: body.completedAt ? new Date(body.completedAt) : null,
      },
    })
    return corsResponse({ success: true, data: project }, 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request body'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...rest } = body
    if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

    if (rest.completedAt) rest.completedAt = new Date(rest.completedAt)
    const project = await prisma.project.update({ where: { id }, data: rest })
    return corsResponse({ success: true, data: project })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

  await prisma.project.delete({ where: { id } })
  return corsResponse({ success: true })
}
