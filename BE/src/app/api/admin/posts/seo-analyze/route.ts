import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { analyzeSEO } from '@/lib/seo-analyzer'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

// POST: Analyze SEO for a post (can be called with post data directly, or with post ID)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // If ID is provided, fetch post from DB
    let postData = body
    if (body.id && !body.content) {
      const post = await prisma.post.findUnique({ where: { id: body.id } })
      if (!post) return corsResponse({ success: false, message: 'Post not found' }, 404)
      postData = post
    }

    const result = analyzeSEO({
      title: postData.title || '',
      slug: postData.slug || '',
      content: postData.content || null,
      excerpt: postData.excerpt || null,
      seoTitle: postData.seoTitle || null,
      seoDescription: postData.seoDescription || null,
      focusKeyword: postData.focusKeyword || null,
      seoKeywords: postData.seoKeywords || [],
      coverImage: postData.coverImage || null,
      ogImage: postData.ogImage || null,
      canonicalUrl: postData.canonicalUrl || null,
      noIndex: postData.noIndex || false,
      tags: postData.tags || [],
      category: postData.category || null,
    })

    // If we have an ID, save the score and issues to DB
    if (postData.id) {
      await prisma.post.update({
        where: { id: postData.id },
        data: {
          seoScore: result.score,
          seoIssues: result as object,
        },
      })
    }

    return corsResponse({ success: true, data: result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analysis failed'
    return corsResponse({ success: false, message }, 400)
  }
}
