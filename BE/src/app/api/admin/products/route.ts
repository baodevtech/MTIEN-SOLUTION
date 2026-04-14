import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const where: Record<string, unknown> = {}
  if (status && status !== 'all') where.status = status
  if (category) where.category = category
  if (search) {
    where.name = { contains: search, mode: 'insensitive' }
  }

  const [data, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ])

  return corsResponse({
    success: true,
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || body.shortDesc || '',
        price: body.price,
        comparePrice: body.oldPrice || body.comparePrice,
        category: body.category || '',
        status: body.status || 'active',
        stock: body.stock || 0,
        sku: body.sku,
        image: body.image || body.images?.[0],
        images: body.images || [],
        tags: body.tags || [],
        featured: body.featured || false,
      },
    })
    return corsResponse({ success: true, data: product }, 201)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request body'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...rest } = body
    if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(rest.name !== undefined && { name: rest.name }),
        ...(rest.slug !== undefined && { slug: rest.slug }),
        ...(rest.description !== undefined && { description: rest.description }),
        ...(rest.price !== undefined && { price: rest.price }),
        ...(rest.comparePrice !== undefined && { comparePrice: rest.comparePrice }),
        ...(rest.category !== undefined && { category: rest.category }),
        ...(rest.status !== undefined && { status: rest.status }),
        ...(rest.stock !== undefined && { stock: rest.stock }),
        ...(rest.sku !== undefined && { sku: rest.sku }),
        ...(rest.image !== undefined && { image: rest.image }),
        ...(rest.images !== undefined && { images: rest.images }),
        ...(rest.tags !== undefined && { tags: rest.tags }),
        ...(rest.featured !== undefined && { featured: rest.featured }),
      },
    })
    return corsResponse({ success: true, data: product })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed'
    return corsResponse({ success: false, message }, 400)
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return corsResponse({ success: false, message: 'ID required' }, 400)

  try {
    await prisma.product.delete({ where: { id } })
    return corsResponse({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Delete failed'
    return corsResponse({ success: false, message }, 400)
  }
}
