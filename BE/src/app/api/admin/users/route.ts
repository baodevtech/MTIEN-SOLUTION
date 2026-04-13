import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { hashSync } from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')
  const search = searchParams.get('search')

  const where: Record<string, unknown> = {}
  if (role && role !== 'all') where.role = role
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }

  const data = await prisma.user.findMany({
    where,
    select: { id: true, name: true, email: true, role: true, avatar: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: 'desc' },
  })

  return corsResponse({ success: true, data })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.email || !body.password) {
      return corsResponse({ success: false, message: 'Email and password required' }, 400)
    }

    const user = await prisma.user.create({
      data: {
        name: body.name || '',
        email: body.email,
        password: hashSync(body.password, 10),
        role: body.role || 'admin',
        avatar: body.avatar || null,
      },
      select: { id: true, name: true, email: true, role: true, avatar: true, createdAt: true, updatedAt: true },
    })
    return corsResponse({ success: true, data: user }, 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Create failed'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, password, ...rest } = body
    if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

    const data: Record<string, unknown> = { ...rest }
    if (password) data.password = hashSync(password, 10)

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, avatar: true, createdAt: true, updatedAt: true },
    })
    return corsResponse({ success: true, data: user })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

  await prisma.user.delete({ where: { id } })
  return corsResponse({ success: true })
}
