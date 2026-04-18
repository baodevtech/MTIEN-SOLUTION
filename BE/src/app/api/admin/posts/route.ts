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
        // SEO fields
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
        seoKeywords: body.seoKeywords || [],
        focusKeyword: body.focusKeyword || null,
        canonicalUrl: body.canonicalUrl || null,
        ogImage: body.ogImage || null,
        noIndex: body.noIndex || false,
        seoScore: body.seoScore || 0,
        seoIssues: body.seoIssues || null,
      },
    })
    await logActivity({ action: 'post.create', module: 'post', status: 'success', message: `Tạo bài viết: ${post.title}`, detail: { id: post.id, slug: post.slug } })
    return corsResponse({ success: true, data: post }, 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request body'
    await logActivity({ action: 'post.create', module: 'post', status: 'failed', message: `Tạo bài viết thất bại: ${message}` })
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
        // SEO fields
        ...(rest.seoTitle !== undefined && { seoTitle: rest.seoTitle }),
        ...(rest.seoDescription !== undefined && { seoDescription: rest.seoDescription }),
        ...(rest.seoKeywords !== undefined && { seoKeywords: rest.seoKeywords }),
        ...(rest.focusKeyword !== undefined && { focusKeyword: rest.focusKeyword }),
        ...(rest.canonicalUrl !== undefined && { canonicalUrl: rest.canonicalUrl }),
        ...(rest.ogImage !== undefined && { ogImage: rest.ogImage }),
        ...(rest.noIndex !== undefined && { noIndex: rest.noIndex }),
        ...(rest.seoScore !== undefined && { seoScore: rest.seoScore }),
        ...(rest.seoIssues !== undefined && { seoIssues: rest.seoIssues }),
      },
    })
    await logActivity({ action: 'post.update', module: 'post', status: 'success', message: `Cập nhật bài viết: ${post.title}`, detail: { id: post.id } })
    return corsResponse({ success: true, data: post })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed'
    await logActivity({ action: 'post.update', module: 'post', status: 'failed', message: `Cập nhật bài viết thất bại: ${message}` })
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
    await logActivity({ action: 'post.bulk-delete', module: 'post', status: 'success', message: `Xóa ${idList.length} bài viết`, detail: { count: idList.length } })
    return corsResponse({ success: true, deleted: idList.length })
  }

  if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

  try {
    await prisma.post.delete({ where: { id } })
    await logActivity({ action: 'post.delete', module: 'post', status: 'success', message: `Xóa bài viết`, detail: { id } })
    return corsResponse({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Delete failed'
    return corsResponse({ success: false, message }, 400)
  }
}
