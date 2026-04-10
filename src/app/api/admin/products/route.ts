import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

const products = [
  { id: '1', name: 'Phần mềm Quản lý Kho MTIEN WMS', slug: 'phan-mem-quan-ly-kho-mtien-wms', shortDesc: 'Giải pháp quản lý kho hàng toàn diện', description: 'Phần mềm quản lý kho hàng thông minh...', price: 3500000, oldPrice: 4200000, category: 'Phần mềm', brand: 'MTIEN', sku: 'MT-WMS-001', stock: 999, status: 'active', images: ['https://picsum.photos/600/400?random=10'], specs: [{ label: 'Nền tảng', value: 'Web + Mobile' }], badge: 'Bán chạy', rating: 4.8, reviewCount: 45, sold: 128, warranty: '12 tháng', createdAt: '2025-06-01T00:00:00Z', updatedAt: '2025-07-10T00:00:00Z' },
  { id: '2', name: 'Cloud Server Enterprise', slug: 'cloud-server-enterprise', shortDesc: 'Server đám mây hiệu năng cao', description: 'Cloud Server Enterprise với cấu hình mạnh mẽ...', price: 3000000, oldPrice: null, category: 'Cloud Server', brand: 'MTIEN', sku: 'MT-CS-ENT', stock: 50, status: 'active', images: ['https://picsum.photos/600/400?random=11'], specs: [{ label: 'CPU', value: '8 vCPU' }, { label: 'RAM', value: '16GB' }], badge: 'Phổ biến', rating: 4.9, reviewCount: 67, sold: 234, warranty: 'SLA 99.9%', createdAt: '2025-05-15T00:00:00Z', updatedAt: '2025-07-12T00:00:00Z' },
  { id: '3', name: 'Gói Marketing Toàn Diện', slug: 'goi-marketing-toan-dien', shortDesc: 'Dịch vụ marketing số trọn gói', description: 'Gói marketing toàn diện bao gồm SEO, Google Ads, Social Media...', price: 15000000, oldPrice: 18000000, category: 'Marketing', brand: 'MTIEN', sku: 'MT-MKT-FULL', stock: 30, status: 'active', images: ['https://picsum.photos/600/400?random=12'], specs: [{ label: 'Thời gian', value: '3 tháng' }], badge: null, rating: 4.7, reviewCount: 23, sold: 56, warranty: 'Cam kết KPI', createdAt: '2025-06-20T00:00:00Z', updatedAt: '2025-07-11T00:00:00Z' },
  { id: '4', name: 'Thiết kế Website Premium', slug: 'thiet-ke-website-premium', shortDesc: 'Website thiết kế riêng theo yêu cầu', description: 'Dịch vụ thiết kế website premium với UI/UX chuyên nghiệp...', price: 25000000, oldPrice: 30000000, category: 'Thiết kế', brand: 'MTIEN', sku: 'MT-WEB-PRE', stock: 20, status: 'active', images: ['https://picsum.photos/600/400?random=13'], specs: [{ label: 'Thời gian', value: '4-6 tuần' }], badge: 'Premium', rating: 5.0, reviewCount: 12, sold: 34, warranty: '12 tháng bảo trì', createdAt: '2025-04-10T00:00:00Z', updatedAt: '2025-07-09T00:00:00Z' },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  let filtered = [...products]

  if (status && status !== 'all') {
    filtered = filtered.filter((p) => p.status === status)
  }
  if (category) {
    filtered = filtered.filter((p) => p.category === category)
  }
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q))
  }

  const total = filtered.length
  const start = (page - 1) * limit
  const data = filtered.slice(start, start + limit)

  return corsResponse({ success: true, data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProduct = {
      id: String(products.length + 1),
      ...body,
      rating: 0,
      reviewCount: 0,
      sold: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    products.push(newProduct)
    return corsResponse({ success: true, data: newProduct }, 201)
  } catch {
    return corsResponse({ success: false, message: 'Invalid request body' }, 400)
  }
}
