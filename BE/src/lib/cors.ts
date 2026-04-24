import { NextResponse, type NextRequest } from 'next/server'
import { getAllowedOrigins } from './env'

/**
 * Build CORS headers for a given request. The `Origin` is echoed back only
 * when it matches the allowlist in `FRONTEND_ORIGIN` (comma-separated).
 * Never returns `*` — wildcard is incompatible with `credentials: true`.
 */
export function getCorsHeaders(request?: NextRequest | Request): Record<string, string> {
  const origin = request?.headers.get('origin') ?? ''
  const allowed = getAllowedOrigins()
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0] ?? ''

  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
  }
  if (allowOrigin) {
    headers['Access-Control-Allow-Origin'] = allowOrigin
  }
  return headers
}

export function corsResponse(data: unknown, status = 200, request?: NextRequest | Request) {
  return NextResponse.json(data, { status, headers: getCorsHeaders(request) })
}

export function corsOptions(request?: NextRequest | Request) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) })
}
