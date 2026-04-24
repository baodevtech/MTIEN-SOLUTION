import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse } from '@/lib/cors'

// GET: Lấy danh sách category
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') // post | product | project
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  const where: Record<string, unknown> = {}
  if (type) where.type = type
  if (search) where.name = { contains: search, mode: 'insensitive' }

  const [data, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.count({ where }),
  ])

  return corsResponse({
    success: true,
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
}

// POST: Tạo mới category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const category = await prisma.category.create({ data: body })
    return corsResponse({ success: true, data: category }, 201)
  } catch (err) {
    return corsResponse({ success: false, message: 'Tạo category thất bại', error: String(err) }, 400)
  }
}

// PUT: Cập nhật category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.id) return corsResponse({ success: false, message: 'Thiếu id' }, 400)
    const category = await prisma.category.update({
      where: { id: body.id },
      data: body,
    })
    return corsResponse({ success: true, data: category })
  } catch (err) {
    return corsResponse({ success: false, message: 'Cập nhật category thất bại', error: String(err) }, 400)
  }
}

// DELETE: Xóa category
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    if (!id) return corsResponse({ success: false, message: 'Thiếu id' }, 400)
    await prisma.category.delete({ where: { id } })
    return corsResponse({ success: true })
  } catch (err) {
    return corsResponse({ success: false, message: 'Xóa category thất bại', error: String(err) }, 400)
  }
}
