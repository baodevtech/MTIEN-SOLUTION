import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

// GET: Fetch existing categories and tags from posts
export async function GET() {
  try {
    const [categoryData, tagData] = await Promise.all([
      prisma.post.groupBy({
        by: ['category'],
        where: { NOT: [{ category: null }, { category: '' }] },
        _count: { category: true },
        orderBy: { _count: { category: 'desc' } },
      }),
      prisma.$queryRaw<{ tag: string }[]>`
        SELECT DISTINCT unnest(tags) as tag
        FROM "Post"
        WHERE array_length(tags, 1) > 0
        ORDER BY tag
      `,
    ])

    const categories = categoryData
      .filter(c => c.category)
      .map(c => ({ name: c.category!, count: c._count.category }))

    const tags = tagData.map(t => t.tag)

    return corsResponse({ success: true, categories, tags })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch metadata'
    return corsResponse({ success: false, message }, 500)
  }
}
