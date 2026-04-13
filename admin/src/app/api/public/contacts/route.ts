import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

function publicCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.FRONTEND_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: publicCorsHeaders() })
}

// POST /api/public/contacts — receive contact form from frontend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400, headers: publicCorsHeaders() }
      )
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone, company, subject, message, status: 'new' },
    })

    return NextResponse.json(
      { success: true, data: { id: contact.id } },
      { status: 201, headers: publicCorsHeaders() }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Lỗi hệ thống, vui lòng thử lại sau' },
      { status: 500, headers: publicCorsHeaders() }
    )
  }
}
