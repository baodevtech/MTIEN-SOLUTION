import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

const orders = [
  { id: '1', orderNumber: 'ORD-2025-0156', customer: { name: 'Công ty ABC', email: 'order@abc.vn', phone: '0901 111 222', address: '456 Lê Lợi, Q1, TP.HCM' }, items: [{ productId: '1', name: 'Phần mềm Quản lý Kho MTIEN WMS', price: 3500000, quantity: 1, image: 'https://picsum.photos/100/100?random=30' }], total: 3500000, status: 'delivered', paymentMethod: 'Chuyển khoản', paymentStatus: 'paid', notes: '', createdAt: '2025-07-14T09:00:00Z', updatedAt: '2025-07-15T10:00:00Z' },
  { id: '2', orderNumber: 'ORD-2025-0155', customer: { name: 'Trần Minh Khoa', email: 'khoa@email.com', phone: '0912 222 333', address: '789 Nguyễn Huệ, Q1, TP.HCM' }, items: [{ productId: '2', name: 'Cloud Server Enterprise', price: 3000000, quantity: 2, image: 'https://picsum.photos/100/100?random=31' }], total: 6000000, status: 'processing', paymentMethod: 'Thẻ tín dụng', paymentStatus: 'paid', notes: 'Yêu cầu setup nhanh', createdAt: '2025-07-13T14:30:00Z', updatedAt: '2025-07-14T08:00:00Z' },
  { id: '3', orderNumber: 'ORD-2025-0154', customer: { name: 'Lê Thị Hồng', email: 'hong.lt@corp.vn', phone: '0923 333 444', address: '321 Trần Hưng Đạo, Q5, TP.HCM' }, items: [{ productId: '3', name: 'Gói Marketing Toàn Diện', price: 15000000, quantity: 1, image: 'https://picsum.photos/100/100?random=32' }], total: 15000000, status: 'pending', paymentMethod: 'Chuyển khoản', paymentStatus: 'pending', notes: '', createdAt: '2025-07-15T11:00:00Z', updatedAt: '2025-07-15T11:00:00Z' },
  { id: '4', orderNumber: 'ORD-2025-0153', customer: { name: 'Phạm Văn Tú', email: 'tu.pv@tech.vn', phone: '0934 444 555', address: '567 Võ Văn Tần, Q3, TP.HCM' }, items: [{ productId: '4', name: 'Thiết kế Website Premium', price: 25000000, quantity: 1, image: 'https://picsum.photos/100/100?random=33' }, { productId: '1', name: 'Phần mềm Quản lý Kho', price: 3500000, quantity: 1, image: 'https://picsum.photos/100/100?random=34' }], total: 28500000, status: 'shipped', paymentMethod: 'Chuyển khoản', paymentStatus: 'paid', notes: 'Giao gấp', createdAt: '2025-07-12T08:00:00Z', updatedAt: '2025-07-14T16:00:00Z' },
  { id: '5', orderNumber: 'ORD-2025-0152', customer: { name: 'Nguyễn Thị Lan', email: 'lan.nt@shop.vn', phone: '0945 555 666', address: '890 Cách Mạng Tháng 8, Q10, TP.HCM' }, items: [{ productId: '2', name: 'Cloud Server Enterprise', price: 3000000, quantity: 1, image: 'https://picsum.photos/100/100?random=35' }], total: 3000000, status: 'cancelled', paymentMethod: 'COD', paymentStatus: 'failed', notes: 'Khách huỷ do đổi nhu cầu', createdAt: '2025-07-11T15:00:00Z', updatedAt: '2025-07-12T09:00:00Z' },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  let filtered = [...orders]
  if (status && status !== 'all') {
    filtered = filtered.filter((o) => o.status === status)
  }
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((o) => o.orderNumber.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q))
  }

  return corsResponse({ success: true, data: filtered, total: filtered.length })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status: newStatus } = body
    const order = orders.find((o) => o.id === id)
    if (!order) return corsResponse({ success: false, message: 'Order not found' }, 404)
    order.status = newStatus
    order.updatedAt = new Date().toISOString()
    return corsResponse({ success: true, data: order })
  } catch {
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}
