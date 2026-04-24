import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/health
 * Lightweight liveness + DB readiness probe.
 * Returns 200 with JSON status, 503 when the database is unreachable.
 */
export async function GET() {
  const startedAt = Date.now()
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json(
      {
        status: 'ok',
        db: 'up',
        uptimeSeconds: Math.floor(process.uptime()),
        latencyMs: Date.now() - startedAt,
      },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'degraded',
        db: 'down',
        error: error instanceof Error ? error.message : 'unknown',
      },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
