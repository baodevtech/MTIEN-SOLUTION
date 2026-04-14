import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

// GET — list / filter activity logs
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const module = searchParams.get('module')
  const status = searchParams.get('status')
  const search = searchParams.get('search')
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50')))

  const where: Record<string, unknown> = {}
  if (module && module !== 'all') where.module = module
  if (status && status !== 'all') where.status = status
  if (search) {
    where.OR = [
      { message: { contains: search, mode: 'insensitive' } },
      { action: { contains: search, mode: 'insensitive' } },
      { userName: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [data, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.activityLog.count({ where }),
  ])

  // Stats summary
  const [successCount, failedCount, warningCount] = await Promise.all([
    prisma.activityLog.count({ where: { ...where, status: 'success' } }),
    prisma.activityLog.count({ where: { ...where, status: 'failed' } }),
    prisma.activityLog.count({ where: { ...where, status: 'warning' } }),
  ])

  return corsResponse({
    success: true,
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    stats: { success: successCount, failed: failedCount, warning: warningCount, total },
  })
}

// DELETE — clear logs (with optional filter)
export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { ids, olderThan, module: mod } = body as {
    ids?: string[]
    olderThan?: string   // ISO date
    module?: string
  }

  if (ids?.length) {
    const result = await prisma.activityLog.deleteMany({ where: { id: { in: ids } } })
    return corsResponse({ success: true, deleted: result.count })
  }

  if (olderThan) {
    const where: Record<string, unknown> = { createdAt: { lt: new Date(olderThan) } }
    if (mod) where.module = mod
    const result = await prisma.activityLog.deleteMany({ where })
    return corsResponse({ success: true, deleted: result.count })
  }

  // Clear all
  const result = await prisma.activityLog.deleteMany({})
  return corsResponse({ success: true, deleted: result.count })
}
