import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

const settings = {
  general: {
    siteName: 'MTIEN Solution',
    siteDescription: 'Giải pháp công nghệ toàn diện cho doanh nghiệp Việt Nam',
    siteUrl: 'https://mtiensolution.vn',
    logo: '/logo.svg',
    favicon: '/favicon.ico',
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
  },
  company: {
    name: 'Công ty TNHH MTIEN Solution',
    phone: '0901 234 567',
    email: 'contact@mtiensolution.vn',
    address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
    taxId: '0123456789',
  },
  social: {
    facebook: 'https://facebook.com/mtiensolution',
    youtube: 'https://youtube.com/@mtiensolution',
    instagram: '',
    linkedin: 'https://linkedin.com/company/mtiensolution',
    tiktok: '',
  },
  seo: {
    defaultTitle: 'MTIEN Solution - Giải pháp công nghệ toàn diện',
    titleTemplate: '%s | MTIEN Solution',
    defaultDescription: 'MTIEN Solution cung cấp giải pháp phần mềm, marketing số, thiết kế thương hiệu và cloud server.',
    defaultKeywords: ['phần mềm', 'marketing', 'thiết kế', 'cloud server', 'MTIEN Solution'],
    ogImage: '/og-default.jpg',
    googleAnalyticsId: '',
    googleSearchConsoleId: '',
  },
}

export async function GET() {
  return corsResponse({ success: true, data: settings })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    Object.assign(settings, body)
    return corsResponse({ success: true, data: settings, message: 'Cập nhật cài đặt thành công' })
  } catch {
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}
