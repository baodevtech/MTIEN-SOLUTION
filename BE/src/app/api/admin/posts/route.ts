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
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [data, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count({ where }),
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
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage || body.featuredImage,
        category: body.category,
        tags: body.tags || [],
        author: body.author?.name || body.author || '',
        status: body.status || 'draft',
        publishedAt: body.status === 'published' ? new Date() : null,
      },
    })
    return corsResponse({ success: true, data: post }, 201)
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

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(rest.title !== undefined && { title: rest.title }),
        ...(rest.slug !== undefined && { slug: rest.slug }),
        ...(rest.excerpt !== undefined && { excerpt: rest.excerpt }),
        ...(rest.content !== undefined && { content: rest.content }),
        ...(rest.coverImage !== undefined && { coverImage: rest.coverImage }),
        ...(rest.category !== undefined && { category: rest.category }),
        ...(rest.tags !== undefined && { tags: rest.tags }),
        ...(rest.author !== undefined && { author: rest.author }),
        ...(rest.status !== undefined && { status: rest.status }),
        ...(rest.status === 'published' && { publishedAt: new Date() }),
      },
    })
    return corsResponse({ success: true, data: post })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const ids = searchParams.get('ids')

  if (ids) {
    // Bulk delete
    const idList = ids.split(',')
    await prisma.post.deleteMany({ where: { id: { in: idList } } })
    return corsResponse({ success: true, deleted: idList.length })
  }

  if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

  try {
    await prisma.post.delete({ where: { id } })
    return corsResponse({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Delete failed'
    return corsResponse({ success: false, message }, 400)
  }
}
