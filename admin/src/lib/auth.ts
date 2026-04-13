import { NextRequest } from 'next/server'
import { createHmac } from 'crypto'

export function generateToken(userId: string): string {
  const payload = Buffer.from(JSON.stringify({ sub: userId, iat: Date.now() })).toString('base64url')
  const secret = process.env.JWT_SECRET || 'mtien-secret-change-me'
  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyToken(token: string): string | null {
  try {
    const [payload, sig] = token.split('.')
    const secret = process.env.JWT_SECRET || 'mtien-secret-change-me'
    const expectedSig = createHmac('sha256', secret).update(payload).digest('base64url')
    if (sig !== expectedSig) return null
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return data.sub || null
  } catch {
    return null
  }
}

export function getAuthUserId(request: NextRequest): string | null {
  const auth = request.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  return verifyToken(auth.slice(7))
}
