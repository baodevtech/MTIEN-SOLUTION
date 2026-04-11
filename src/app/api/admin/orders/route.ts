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
  const search = searchParams.get('search')

  const where: Record<string, unknown> = {}
  if (status && status !== 'all') where.status = status
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: 'insensitive' } },
      { customerName: { contains: search, mode: 'insensitive' } },
    ]
  }

  const data = await prisma.order.findMany({
    where,
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })

  // Transform to match existing admin frontend format
  const formatted = data.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    customer: {
      name: o.customerName,
      email: o.customerEmail,
      phone: o.customerPhone,
      address: o.customerAddress,
    },
    items: o.items.map((i) => ({
      productId: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    })),
    total: o.total,
    status: o.status,
    paymentMethod: o.paymentMethod,
    paymentStatus: o.paymentStatus,
    notes: o.notes,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  }))

  return corsResponse({ success: true, data: formatted, total: formatted.length })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status: newStatus } = body

    const order = await prisma.order.update({
      where: { id },
      data: { status: newStatus },
      include: { items: true },
    })

    return corsResponse({ success: true, data: order })
  } catch {
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}
