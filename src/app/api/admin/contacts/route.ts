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
    return corsResponse({ success: true, data: contact }, 201)
  } catch {
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}
