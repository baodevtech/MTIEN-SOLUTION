import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { getCorsHeaders } from './cors'

describe('cors', () => {
  it('echoes allowed origin when it matches FRONTEND_ORIGIN', () => {
    const req = new NextRequest('http://localhost/', {
      headers: { origin: 'http://localhost:3000' },
    })
    const h = getCorsHeaders(req)
    expect(h['Access-Control-Allow-Origin']).toBe('http://localhost:3000')
    expect(h['Vary']).toBe('Origin')
    expect(h['Access-Control-Allow-Credentials']).toBe('true')
  })

  it('does not echo foreign origins', () => {
    const req = new NextRequest('http://localhost/', {
      headers: { origin: 'https://evil.example.com' },
    })
    const h = getCorsHeaders(req)
    // Falls back to first allowed origin, never wildcard
    expect(h['Access-Control-Allow-Origin']).not.toBe('https://evil.example.com')
    expect(h['Access-Control-Allow-Origin']).not.toBe('*')
  })

  it('never returns wildcard', () => {
    const req = new NextRequest('http://localhost/')
    const h = getCorsHeaders(req)
    expect(h['Access-Control-Allow-Origin']).not.toBe('*')
  })
})
