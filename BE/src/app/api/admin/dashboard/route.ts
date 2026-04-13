import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function GET() {
  const [totalProducts, totalOrders, orders, topProducts] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({
      select: { total: true, status: true, createdAt: true },
    }),
    prisma.orderItem.groupBy({
      by: ['name'],
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    }),
  ])

  const paidOrders = orders.filter((o) => o.status !== 'cancelled')
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0)

  const revenueChart = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (13 - i))
    const dayStr = date.toISOString().split('T')[0]
    const dayOrders = orders.filter((o) => o.createdAt.toISOString().split('T')[0] === dayStr)
    return {
      date: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`,
      revenue: dayOrders.reduce((s, o) => s + o.total, 0),
      orders: dayOrders.length,
    }
  })

  const stats = {
    success: true,
    data: {
      totalRevenue,
      revenueChange: 12.5,
      totalOrders,
      ordersChange: 8.3,
      totalVisitors: 28_910,
      visitorsChange: -2.1,
      totalProducts,
      productsChange: 4.2,
      revenueChart,
      topProducts: topProducts.map((p) => ({
        name: p.name,
        sold: p._sum.quantity || 0,
        revenue: (p._sum.price || 0) * (p._sum.quantity || 0),
      })),
      trafficSources: [
        { source: 'Google', visitors: 12_142, percentage: 42 },
        { source: 'Trực tiếp', visitors: 8_095, percentage: 28 },
        { source: 'Facebook', visitors: 5_204, percentage: 18 },
        { source: 'Zalo', visitors: 2_313, percentage: 8 },
        { source: 'Khác', visitors: 1_156, percentage: 4 },
      ],
    },
  }

  return corsResponse(stats)
}
