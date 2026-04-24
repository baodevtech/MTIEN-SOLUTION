import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCorsHeaders } from '@/lib/cors'
import { rateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  subject: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(5000),
})

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) })
}

// POST /api/public/contacts — receive contact form from frontend
export async function POST(request: NextRequest) {
  const headers = getCorsHeaders(request)

  // Rate limit: 5 submissions per 10 minutes per IP
  const rl = rateLimit(request, { key: 'contact', limit: 5, windowMs: 10 * 60_000 })
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, message: 'Quá nhiều yêu cầu, vui lòng thử lại sau' },
      { status: 429, headers: { ...headers, 'Retry-After': String(rl.retryAfterSeconds) } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON' },
      { status: 400, headers },
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: parsed.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      },
      { status: 400, headers },
    )
  }

  try {
    const contact = await prisma.contact.create({
      data: { ...parsed.data, status: 'new' },
    })

    return NextResponse.json(
      { success: true, data: { id: contact.id } },
      { status: 201, headers },
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Lỗi hệ thống, vui lòng thử lại sau' },
      { status: 500, headers },
    )
  }
}
