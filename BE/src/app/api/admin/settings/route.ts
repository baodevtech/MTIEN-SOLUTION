import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { logActivity } from '@/lib/activity-log'

export const dynamic = 'force-dynamic'

// Send revalidation webhook to frontend after settings change
async function revalidateSettingsFE(): Promise<void> {
  try {
    const conn = await prisma.connectionSetting.findFirst()
    if (!conn?.frontendUrl || !conn?.secretKey) return
    const url = new URL('/api/revalidate', conn.frontendUrl)
    await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: conn.secretKey, tags: ['settings'] }),
      signal: AbortSignal.timeout(10000),
    })
  } catch { /* ignore */ }
}

export async function OPTIONS() {
  return corsOptions()
}

export async function GET() {
  const settings = await prisma.setting.findMany()
  const data = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  return corsResponse({ success: true, data })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    const ops = Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: value as object },
        create: { key, value: value as object },
      })
    )
    await Promise.all(ops)

    const settings = await prisma.setting.findMany()
    const data = Object.fromEntries(settings.map((s) => [s.key, s.value]))

    await logActivity({ action: 'settings.update', module: 'settings', status: 'success', message: `Cập nhật cài đặt: ${Object.keys(body).join(', ')}`, detail: { keys: Object.keys(body) } })

    // Notify FE to revalidate settings cache
    revalidateSettingsFE()

    return corsResponse({ success: true, data, message: 'Cập nhật cài đặt thành công' })
  } catch {
    await logActivity({ action: 'settings.update', module: 'settings', status: 'failed', message: 'Cập nhật cài đặt thất bại' })
    return corsResponse({ success: false, message: 'Invalid request' }, 400)
  }
}
