import { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { env } from './env'

const SECRET = env.JWT_SECRET
const EXP_SECONDS = env.JWT_EXPIRES_IN_SECONDS

interface TokenPayload {
  /** subject – user id */
  sub: string
  /** issued at (seconds since epoch) */
  iat: number
  /** expiration (seconds since epoch) */
  exp: number
}

function base64urlEncode(input: Buffer | string): string {
  return (typeof input === 'string' ? Buffer.from(input) : input).toString('base64url')
}

function sign(payloadB64: string): string {
  return createHmac('sha256', SECRET).update(payloadB64).digest('base64url')
}

export function generateToken(userId: string): string {
  const nowSec = Math.floor(Date.now() / 1000)
  const payload: TokenPayload = {
    sub: userId,
    iat: nowSec,
    exp: nowSec + EXP_SECONDS,
  }
  const payloadB64 = base64urlEncode(JSON.stringify(payload))
  const sig = sign(payloadB64)
  return `${payloadB64}.${sig}`
}

export function verifyToken(token: string): string | null {
  if (typeof token !== 'string' || token.length === 0) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payloadB64, sig] = parts
  if (!payloadB64 || !sig) return null

  try {
    const expected = sign(payloadB64)
    const a = Buffer.from(sig, 'base64url')
    const b = Buffer.from(expected, 'base64url')
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null

    const data = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString(),
    ) as Partial<TokenPayload>
    if (!data || typeof data.sub !== 'string' || typeof data.exp !== 'number') return null

    const nowSec = Math.floor(Date.now() / 1000)
    if (data.exp <= nowSec) return null

    return data.sub
  } catch {
    return null
  }
}

export function getAuthUserId(request: NextRequest): string | null {
  const auth = request.headers.get('authorization')
  if (auth?.startsWith('Bearer ')) {
    const fromHeader = verifyToken(auth.slice(7))
    if (fromHeader) return fromHeader
  }
  // Fallback to cookie-based auth (same cookie used by middleware)
  const cookieToken = request.cookies.get('admin_token')?.value
  if (cookieToken) return verifyToken(cookieToken)
  return null
}

/**
 * Cookie options for the `admin_token` cookie set after login.
 * Apply via `response.cookies.set('admin_token', token, adminCookieOptions())`.
 */
export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: EXP_SECONDS,
  }
}
