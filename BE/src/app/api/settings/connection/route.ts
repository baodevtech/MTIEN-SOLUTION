import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'

// GET — return current connection settings
export async function GET() {
  try {
    const settings = await prisma.connectionSetting.findFirst()
    return NextResponse.json({
      frontendUrl: settings?.frontendUrl ?? '',
      secretKey: settings?.secretKey ?? '',
      lastConnected: settings?.lastConnected?.toISOString() ?? null,
    })
  } catch {
    return NextResponse.json({ frontendUrl: '', secretKey: '', lastConnected: null })
  }
}

// POST — update connection settings or perform actions
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const action = body.action || 'save'

    if (action === 'generate-key') {
      const key = randomBytes(32).toString('hex')
      return NextResponse.json({ secretKey: key })
    }

    if (action === 'test') {
      const settings = await prisma.connectionSetting.findFirst()
      if (!settings?.frontendUrl || !settings?.secretKey) {
        return NextResponse.json({ success: false, error: 'Chưa cấu hình Frontend URL hoặc Secret Key' })
      }

      try {
        const url = new URL('/api/revalidate', settings.frontendUrl)
        const res = await fetch(url.toString(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret: settings.secretKey, test: true }),
          signal: AbortSignal.timeout(10000),
        })
        const data = await res.json()

        if (res.ok && data.connected) {
          await prisma.connectionSetting.update({
            where: { id: settings.id },
            data: { lastConnected: new Date() },
          })
          return NextResponse.json({ success: true, message: 'Kết nối thành công!' })
        }
        return NextResponse.json({ success: false, error: data.error || `HTTP ${res.status}` })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ success: false, error: `Không thể kết nối: ${message}` })
      }
    }

    if (action === 'save') {
      const frontendUrl = (body.frontendUrl || '').trim().replace(/\/+$/, '')
      const secretKey = (body.secretKey || '').trim()

      if (frontendUrl) {
        try {
          new URL(frontendUrl)
        } catch {
          return NextResponse.json({ error: 'URL không hợp lệ' }, { status: 400 })
        }
      }

      const existing = await prisma.connectionSetting.findFirst()
      const settings = existing
        ? await prisma.connectionSetting.update({
            where: { id: existing.id },
            data: { frontendUrl, secretKey, lastConnected: body.lastConnected ? new Date(body.lastConnected) : existing.lastConnected },
          })
        : await prisma.connectionSetting.create({
            data: { frontendUrl, secretKey },
          })

      return NextResponse.json({
        success: true,
        settings: {
          frontendUrl: settings.frontendUrl,
          secretKey: settings.secretKey,
          lastConnected: settings.lastConnected?.toISOString() ?? null,
        },
      })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
