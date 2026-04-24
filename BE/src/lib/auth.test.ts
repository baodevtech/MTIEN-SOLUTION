import { describe, it, expect } from 'vitest'
import { generateToken, verifyToken } from './auth'

describe('auth tokens', () => {
  it('generates a verifiable token round-trip', () => {
    const token = generateToken('user-123')
    expect(typeof token).toBe('string')
    expect(token.split('.')).toHaveLength(2)
    expect(verifyToken(token)).toBe('user-123')
  })

  it('rejects tampered payload', () => {
    const token = generateToken('user-123')
    const [, sig] = token.split('.')
    const fakePayload = Buffer.from(
      JSON.stringify({ sub: 'attacker', iat: 0, exp: 9_999_999_999 }),
    ).toString('base64url')
    expect(verifyToken(`${fakePayload}.${sig}`)).toBeNull()
  })

  it('rejects tampered signature', () => {
    const token = generateToken('user-123')
    const [payload] = token.split('.')
    expect(verifyToken(`${payload}.AAAAAA`)).toBeNull()
  })

  it('rejects malformed tokens', () => {
    expect(verifyToken('')).toBeNull()
    expect(verifyToken('only-one-part')).toBeNull()
    expect(verifyToken('a.b.c')).toBeNull()
  })

  it('rejects expired tokens', async () => {
    // Build a token manually with exp in the past, using the same secret
    const { createHmac } = await import('node:crypto')
    const past = Math.floor(Date.now() / 1000) - 10
    const payload = Buffer.from(
      JSON.stringify({ sub: 'user-123', iat: past - 1, exp: past }),
    ).toString('base64url')
    const sig = createHmac('sha256', process.env.JWT_SECRET!)
      .update(payload)
      .digest('base64url')
    expect(verifyToken(`${payload}.${sig}`)).toBeNull()
  })
})
