import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}

function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS })
}

function corsOptions() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

// Simple JWT-like verification (replace with proper JWT in production)
function verifyToken(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return false
  const token = auth.slice(7)
  return token === 'demo_jwt_token_xxx' // Replace with real JWT verification
}

export async function OPTIONS() {
  return corsOptions()
}

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Demo auth (replace with database lookup + bcrypt)
    if (email === 'admin@mtiensolution.vn' && password === 'admin123') {
      return corsResponse({
        success: true,
        data: {
          token: 'demo_jwt_token_xxx',
          user: {
            id: '1',
            name: 'Nguyễn Minh Tiến',
            email: 'admin@mtiensolution.vn',
            role: 'admin',
            avatar: 'https://i.pravatar.cc/150?img=11',
          },
        },
      })
    }

    return corsResponse({ success: false, message: 'Email hoặc mật khẩu không đúng' }, 401)
  } catch {
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}

// GET /api/admin/auth - Get current user profile
export async function GET(request: NextRequest) {
  if (!verifyToken(request)) {
    return corsResponse({ success: false, message: 'Unauthorized' }, 401)
  }

  return corsResponse({
    success: true,
    data: {
      id: '1',
      name: 'Nguyễn Minh Tiến',
      email: 'admin@mtiensolution.vn',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
  })
}
