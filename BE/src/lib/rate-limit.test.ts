import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { rateLimit, getClientIp } from './rate-limit'

function makeReq(ip: string) {
  const req = new NextRequest('http://localhost/api/test', {
    headers: { 'x-forwarded-for': ip },
  })
  return req
}

describe('rate-limit', () => {
  it('extracts first IP from x-forwarded-for', () => {
    const req = new NextRequest('http://localhost/', {
      headers: { 'x-forwarded-for': '1.2.3.4, 10.0.0.1' },
    })
    expect(getClientIp(req)).toBe('1.2.3.4')
  })

  it('allows up to limit then blocks', () => {
    const ip = '9.9.9.1'
    const opts = { key: 'test-allow', limit: 3, windowMs: 60_000 }
    const results = Array.from({ length: 5 }, () => rateLimit(makeReq(ip), opts))
    expect(results.map((r) => r.ok)).toEqual([true, true, true, false, false])
    expect(results[2].remaining).toBe(0)
    expect(results[3].retryAfterSeconds).toBeGreaterThan(0)
  })

  it('tracks different IPs independently', () => {
    const opts = { key: 'test-iso', limit: 1, windowMs: 60_000 }
    expect(rateLimit(makeReq('9.9.9.2'), opts).ok).toBe(true)
    expect(rateLimit(makeReq('9.9.9.2'), opts).ok).toBe(false)
    // Different IP, fresh bucket
    expect(rateLimit(makeReq('9.9.9.3'), opts).ok).toBe(true)
  })
})
