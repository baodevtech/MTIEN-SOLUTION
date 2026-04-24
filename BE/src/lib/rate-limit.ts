import { NextRequest } from 'next/server'

/**
 * Simple in-memory sliding-window rate limiter.
 * Note: effective only for single-instance deployments. For multi-instance,
 * swap the backing store for Redis/Upstash.
 */
type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

// Periodic cleanup to avoid unbounded growth
let lastSweep = 0
function sweep(now: number) {
  if (now - lastSweep < 60_000) return
  lastSweep = now
  for (const [k, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(k)
  }
}

export interface RateLimitOptions {
  /** Unique identifier for the limiter (e.g. 'login', 'contact'). */
  key: string
  /** Max requests per window. */
  limit: number
  /** Window size in milliseconds. */
  windowMs: number
}

export interface RateLimitResult {
  ok: boolean
  remaining: number
  resetAt: number
  retryAfterSeconds: number
}

export function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}

export function rateLimit(
  request: NextRequest,
  opts: RateLimitOptions,
): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const ip = getClientIp(request)
  const id = `${opts.key}:${ip}`
  const existing = buckets.get(id)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + opts.windowMs
    buckets.set(id, { count: 1, resetAt })
    return {
      ok: true,
      remaining: opts.limit - 1,
      resetAt,
      retryAfterSeconds: Math.ceil(opts.windowMs / 1000),
    }
  }

  existing.count += 1
  const remaining = Math.max(0, opts.limit - existing.count)
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))

  return {
    ok: existing.count <= opts.limit,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSeconds,
  }
}
