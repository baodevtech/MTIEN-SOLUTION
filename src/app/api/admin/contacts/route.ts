import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

const contacts = [
  { id: '1', name: 'Phạm Minh Đức', email: 'duc.pm@techcorp.vn', phone: '0901 234 567', company: 'TechCorp Việt Nam', subject: 'Báo giá phần mềm quản lý', message: 'Chào MTIEN Solution, công ty chúng tôi đang cần triển khai phần mềm quản lý kho hàng cho chuỗi 15 cửa hàng. Xin cho báo giá chi tiết và timeline triển khai.', status: 'new', createdAt: '2025-07-15T09:30:00Z' },
  { id: '2', name: 'Trần Thị Mai', email: 'mai.tt@greenlife.com', phone: '0912 345 678', company: 'GreenLife JSC', subject: 'Tư vấn Cloud Server', message: 'Tôi muốn tìm hiểu về giải pháp Cloud Server cho doanh nghiệp. Hiện tại chúng tôi đang dùng VPS nhưng muốn nâng cấp.', status: 'read', createdAt: '2025-07-14T14:15:00Z' },
  { id: '3', name: 'Lê Hoàng Nam', email: 'nam.lh@startup.io', phone: '0923 456 789', company: 'StartupIO', subject: 'Hợp tác Marketing', message: 'Chúng tôi là startup trong lĩnh vực EdTech, cần đối tác marketing số để phát triển thương hiệu và tăng trưởng khách hàng.', status: 'replied', createdAt: '2025-07-13T11:00:00Z' },
  { id: '4', name: 'Nguyễn Văn Hùng', email: 'hung.nv@factory.vn', phone: '0934 567 890', company: 'Nhà máy ABC', subject: 'Thiết kế website công ty', message: 'Chúng tôi cần thiết kế lại website công ty theo chuẩn quốc tế, có đa ngôn ngữ (Việt - Anh - Nhật).', status: 'new', createdAt: '2025-07-15T07:45:00Z' },
  { id: '5', name: 'Võ Thị Lan', email: 'lan.vt@medical.vn', phone: '0945 678 901', company: 'Medical Center', subject: 'Phần mềm quản lý phòng khám', message: 'Cần tư vấn giải pháp phần mềm quản lý phòng khám đa khoa. Yêu cầu: quản lý bệnh nhân, lịch hẹn, kê toa thuốc, thanh toán.', status: 'archived', createdAt: '2025-07-10T16:30:00Z' },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  let filtered = [...contacts]
  if (status && status !== 'all') {
    filtered = filtered.filter((c) => c.status === status)
  }
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((c) => c.name.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q) || c.company.toLowerCase().includes(q))
  }

  return corsResponse({ success: true, data: filtered, total: filtered.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status: newStatus } = body

    const contact = contacts.find((c) => c.id === id)
    if (!contact) return corsResponse({ success: false, message: 'Contact not found' }, 404)

    contact.status = newStatus
    return corsResponse({ success: true, data: contact })
  } catch {
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}
