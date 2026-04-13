import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const metric = searchParams.get('metric')
  const days = parseInt(searchParams.get('days') || '30')
  const since = new Date()
  since.setDate(since.getDate() - days)

  const where: Record<string, unknown> = {
    date: { gte: since },
  }
  if (metric) where.metric = metric

  const data = await prisma.analytics.findMany({
    where,
    orderBy: { date: 'asc' },
  })

  // Aggregate stats
  const [visitors, pageViews, contacts, orders] = await Promise.all([
    prisma.analytics.aggregate({ where: { metric: 'visitors', date: { gte: since } }, _sum: { value: true } }),
    prisma.analytics.aggregate({ where: { metric: 'pageViews', date: { gte: since } }, _sum: { value: true } }),
    prisma.contact.count({ where: { createdAt: { gte: since } } }),
    prisma.order.count({ where: { createdAt: { gte: since } } }),
  ])

  // Traffic sources
  const trafficSources = await prisma.analytics.groupBy({
    by: ['source'],
    where: { metric: 'visitors', date: { gte: since }, source: { not: null } },
    _sum: { value: true },
    orderBy: { _sum: { value: 'desc' } },
    take: 5,
  })

  // Top pages
  const topPages = await prisma.analytics.groupBy({
    by: ['path'],
    where: { metric: 'pageViews', date: { gte: since }, path: { not: null } },
    _sum: { value: true },
    orderBy: { _sum: { value: 'desc' } },
    take: 10,
  })

  return corsResponse({
    success: true,
    data: {
      raw: data,
      stats: {
        visitors: visitors._sum.value || 0,
        pageViews: pageViews._sum.value || 0,
        contacts,
        orders,
      },
      trafficSources: trafficSources.map(s => ({
        source: s.source,
        visitors: s._sum.value || 0,
      })),
      topPages: topPages.map(p => ({
        path: p.path,
        views: p._sum.value || 0,
      })),
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const record = await prisma.analytics.create({
      data: {
        date: new Date(body.date),
        metric: body.metric,
        value: body.value,
        path: body.path || null,
        source: body.source || null,
      },
    })
    return corsResponse({ success: true, data: record }, 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request body'
    return corsResponse({ success: false, message }, 400)
  }
}
