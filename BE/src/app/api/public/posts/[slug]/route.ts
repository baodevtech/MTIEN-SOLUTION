import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const apiKey = request.headers.get('x-api-key')
  const conn = await prisma.connectionSetting.findFirst()
  const expectedKey = conn?.secretKey || process.env.REVALIDATION_SECRET
  if (!expectedKey || apiKey !== expectedKey) {
    return corsResponse({ success: false, message: 'Unauthorized' }, 401)
  }

  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug },
  })

  if (!post || post.status !== 'published') {
    return corsResponse({ success: false, message: 'Post not found' }, 404)
  }

  // Increment views
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  })

  // Fetch related posts (same category, exclude current)
  const relatedPosts = await prisma.post.findMany({
    where: {
      status: 'published',
      category: post.category,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })

  return corsResponse({
    success: true,
    data: { ...post, views: post.views + 1 },
    relatedPosts,
  })
}
