import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function corsResponse(data: unknown) {
  return NextResponse.json(data, { headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET() {
  // In production, aggregate from database
  const stats = {
    success: true,
    data: {
      totalRevenue: 458_500_000,
      revenueChange: 12.5,
      totalOrders: 156,
      ordersChange: 8.3,
      totalVisitors: 28_910,
      visitorsChange: -2.1,
      totalProducts: 48,
      productsChange: 4.2,
      revenueChart: Array.from({ length: 14 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (13 - i))
        return {
          date: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`,
          revenue: Math.floor(Math.random() * 30_000_000) + 20_000_000,
          orders: Math.floor(Math.random() * 15) + 5,
        }
      }),
      topProducts: [
        { name: 'Phần mềm Quản lý Kho', sold: 45, revenue: 157_500_000 },
        { name: 'Cloud Server Pro', sold: 38, revenue: 114_000_000 },
        { name: 'Website E-commerce', sold: 22, revenue: 88_000_000 },
        { name: 'App Mobile', sold: 15, revenue: 67_500_000 },
        { name: 'SEO Package', sold: 31, revenue: 31_000_000 },
      ],
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
