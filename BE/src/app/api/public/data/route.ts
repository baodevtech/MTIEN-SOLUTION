import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  // Validate API key
  const apiKey = request.headers.get('x-api-key')
  const expectedKey = process.env.REVALIDATION_SECRET
  if (!expectedKey || apiKey !== expectedKey) {
    return corsResponse({ success: false, message: 'Unauthorized' }, 401)
  }

  switch (type) {
    case 'services': {
      const data = await prisma.service.findMany({
        where: { status: 'active' },
        orderBy: { order: 'asc' },
      })
      return corsResponse({ success: true, data })
    }
    case 'projects': {
      const featured = searchParams.get('featured')
      const where: Record<string, unknown> = {}
      if (featured === 'true') where.featured = true
      const data = await prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })
      return corsResponse({ success: true, data })
    }
    case 'products': {
      const limit = parseInt(searchParams.get('limit') || '20')
      const category = searchParams.get('category')
      const where: Record<string, unknown> = { status: 'active' }
      if (category) where.category = category
      const data = await prisma.product.findMany({
        where,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })
      return corsResponse({ success: true, data })
    }
    case 'posts': {
      const limit = parseInt(searchParams.get('limit') || '10')
      const data = await prisma.post.findMany({
        where: { status: 'published' },
        take: limit,
        orderBy: { publishedAt: 'desc' },
      })
      return corsResponse({ success: true, data })
    }
    case 'pages': {
      const data = await prisma.page.findMany({
        where: { status: 'published' },
        orderBy: { order: 'asc' },
      })
      return corsResponse({ success: true, data })
    }
    default: {
      // Return all public data at once for FE initial load (cached)
      const [services, projects, products, posts, pages, settings] = await Promise.all([
        prisma.service.findMany({ where: { status: 'active' }, orderBy: { order: 'asc' } }),
        prisma.project.findMany({ orderBy: { createdAt: 'desc' } }),
        prisma.product.findMany({ where: { status: 'active' }, take: 20, orderBy: { createdAt: 'desc' } }),
        prisma.post.findMany({ where: { status: 'published' }, take: 10, orderBy: { publishedAt: 'desc' } }),
        prisma.page.findMany({ where: { status: 'published' }, orderBy: { order: 'asc' } }),
        prisma.setting.findMany(),
      ])

      const settingsMap: Record<string, unknown> = {}
      for (const s of settings) settingsMap[s.key] = s.value

      return corsResponse({
        success: true,
        data: { services, projects, products, posts, pages, settings: settingsMap },
      })
    }
  }
}
