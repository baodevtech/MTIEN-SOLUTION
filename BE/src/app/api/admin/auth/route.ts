import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { generateToken, getAuthUserId, adminCookieOptions } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { compareSync } from 'bcryptjs'

export const dynamic = 'force-dynamic'

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(200),
})

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request)
}

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  // Rate limit: 10 attempts / 5 minutes per IP
  const rl = rateLimit(request, { key: 'login', limit: 10, windowMs: 5 * 60_000 })
  if (!rl.ok) {
    const res = corsResponse(
      { success: false, message: 'Quá nhiều lần thử, vui lòng thử lại sau' },
      429,
      request,
    )
    res.headers.set('Retry-After', String(rl.retryAfterSeconds))
    return res
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return corsResponse({ success: false, message: 'Invalid JSON' }, 400, request)
  }

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    return corsResponse(
      { success: false, message: 'Email hoặc mật khẩu không hợp lệ' },
      400,
      request,
    )
  }

  const { email, password } = parsed.data
  const user = await prisma.user.findUnique({ where: { email } })
  // Use a constant-time comparison even when user is missing to reduce timing leaks
  const fakeHash = '$2a$10$abcdefghijklmnopqrstuuMhOjH7DkGxkM5s4t3fJb1GzXcQwYpy2'
  const ok = user
    ? compareSync(password, user.password)
    : (compareSync(password, fakeHash), false)

  if (!user || !ok) {
    return corsResponse(
      { success: false, message: 'Email hoặc mật khẩu không đúng' },
      401,
      request,
    )
  }

  const token = generateToken(user.id)

  const response = corsResponse(
    {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
    },
    200,
    request,
  )
  // Also set as httpOnly cookie so the middleware can authenticate subsequent requests
  response.cookies.set('admin_token', token, adminCookieOptions())
  return response
}

// GET /api/admin/auth - Get current user profile
export async function GET(request: NextRequest) {
  const userId = getAuthUserId(request)
  if (!userId) {
    return corsResponse({ success: false, message: 'Unauthorized' }, 401, request)
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, avatar: true },
  })

  if (!user) {
    return corsResponse({ success: false, message: 'User not found' }, 404, request)
  }

  return corsResponse({ success: true, data: user }, 200, request)
}

// DELETE /api/admin/auth - Logout (clears cookie)
export async function DELETE(request: NextRequest) {
  const response = corsResponse({ success: true }, 200, request)
  response.cookies.set('admin_token', '', {
    ...adminCookieOptions(),
    maxAge: 0,
  })
  return response
}
