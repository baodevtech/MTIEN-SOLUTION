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
  const slug = searchParams.get('slug')

  if (slug) {
    // Fetch single page by slug
    const page = await prisma.page.findUnique({
      where: { slug },
    })
    if (!page || page.status !== 'published') {
      return corsResponse({ success: false, message: 'Page not found' }, 404)
    }
    return corsResponse({ success: true, data: page })
  }

  // Fetch all published pages list
  const data = await prisma.page.findMany({
    where: { status: 'published' },
    select: { id: true, title: true, slug: true, template: true, order: true, updatedAt: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  return corsResponse({ success: true, data })
}
