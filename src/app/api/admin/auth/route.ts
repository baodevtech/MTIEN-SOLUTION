import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { compareSync } from 'bcryptjs'
import { createHmac } from 'crypto'

export const dynamic = 'force-dynamic'

// Generate a simple JWT-like token (replace with jose/jsonwebtoken in prod if needed)
function generateToken(userId: string): string {
  const payload = Buffer.from(JSON.stringify({ sub: userId, iat: Date.now() })).toString('base64url')
  const secret = process.env.JWT_SECRET || 'mtien-secret-change-me'
  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

function verifyToken(token: string): string | null {
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

function getAuthUserId(request: NextRequest): string | null {
  const auth = request.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  return verifyToken(auth.slice(7))
}

export async function OPTIONS() {
  return corsOptions()
}

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return corsResponse({ success: false, message: 'Email và mật khẩu là bắt buộc' }, 400)
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !compareSync(password, user.password)) {
      return corsResponse({ success: false, message: 'Email hoặc mật khẩu không đúng' }, 401)
    }

    const token = generateToken(user.id)

    return corsResponse({
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
    })
  } catch {
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}

// GET /api/admin/auth - Get current user profile
export async function GET(request: NextRequest) {
  const userId = getAuthUserId(request)
  if (!userId) {
    return corsResponse({ success: false, message: 'Unauthorized' }, 401)
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, avatar: true },
  })

  if (!user) {
    return corsResponse({ success: false, message: 'User not found' }, 404)
  }

  return corsResponse({ success: true, data: user })
}
