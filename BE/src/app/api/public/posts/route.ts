import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  const conn = await prisma.connectionSetting.findFirst()
  const expectedKey = conn?.secretKey || process.env.REVALIDATION_SECRET
  if (!expectedKey || apiKey !== expectedKey) {
    return corsResponse({ success: false, message: 'Unauthorized' }, 401)
  }

  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')))
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')
  const search = searchParams.get('search')

  const where: Record<string, unknown> = { status: 'published' }

  if (category && category !== 'All' && category !== 'Tất cả') {
    where.category = category
  }
  if (tag) {
    where.tags = { has: tag }
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
    ]
  }

  // Run all queries in parallel — optimized for 1000+ posts
  const [data, total, categoryData, tagData] = await Promise.all([
    // Main posts: exclude heavy `content` field for list performance
    prisma.post.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        tags: true,
        author: true,
        status: true,
        views: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: 'desc' },
    }),
    // Count for pagination
    prisma.post.count({ where }),
    // Categories with counts via groupBy (no full table scan)
    prisma.post.groupBy({
      by: ['category'],
      where: { status: 'published', category: { not: null } },
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    }),
    // Distinct tags via raw SQL (efficient for array columns)
    prisma.$queryRaw<{ tag: string }[]>`
      SELECT DISTINCT unnest(tags) as tag
      FROM "Post"
      WHERE status = 'published' AND array_length(tags, 1) > 0
      ORDER BY tag
    `,
  ])

  const categories = categoryData.map(c => ({
    name: c.category as string,
    count: c._count.category,
  }))
  const tags = tagData.map(t => t.tag)

  return corsResponse({
    success: true,
    data,
    categories,
    tags,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
    },
  })
}
