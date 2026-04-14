import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { logActivity } from '@/lib/activity-log'

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
      { name: { contains: search, mode: 'insensitive' } },
      { subject: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
    ]
  }

  const data = await prisma.contact.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return corsResponse({ success: true, data, total: data.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Update status of existing contact
    if (body.id && body.status) {
      const contact = await prisma.contact.update({
        where: { id: body.id },
        data: { status: body.status },
      })
      await logActivity({ action: 'contact.update-status', module: 'contact', status: 'success', message: `Cập nhật liên hệ ${contact.name} → ${body.status}`, detail: { id: body.id, newStatus: body.status } })
      return corsResponse({ success: true, data: contact })
    }

    // Create new contact
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        subject: body.subject,
        message: body.message,
        status: 'new',
      },
    })
    await logActivity({ action: 'contact.create', module: 'contact', status: 'success', message: `Liên hệ mới từ ${contact.name}`, detail: { id: contact.id, email: contact.email } })
    return corsResponse({ success: true, data: contact }, 201)
  } catch {
    return corsResponse({ success: false, message: 'Invalid request', code: 'CONTACT_CREATE_FAILED' }, 400)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsResponse({ success: false, message: 'Thiếu ID liên hệ', code: 'MISSING_ID' }, 400)
    await prisma.contact.delete({ where: { id } })
    await logActivity({ action: 'contact.delete', module: 'contact', status: 'success', message: 'Xóa liên hệ', detail: { id } })
    return corsResponse({ success: true })
  } catch {
    return corsResponse({ success: false, message: 'Không thể xoá liên hệ', code: 'CONTACT_DELETE_FAILED' }, 400)
  }
}
