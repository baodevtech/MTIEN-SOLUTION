import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { randomBytes } from 'crypto'

const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), 'data')
const CONNECTION_FILE = join(DATA_DIR, 'connection.json')

interface ConnectionSettings {
  frontendUrl: string
  secretKey: string
  lastConnected: string | null
}

async function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

async function getSettings(): Promise<ConnectionSettings> {
  await ensureDir()
  if (!existsSync(CONNECTION_FILE)) {
    return { frontendUrl: '', secretKey: '', lastConnected: null }
  }
  const raw = await readFile(CONNECTION_FILE, 'utf-8')
  return JSON.parse(raw)
}

// GET — return current connection settings
export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch {
    return NextResponse.json({ frontendUrl: '', secretKey: '', lastConnected: null })
  }
}

// POST — update connection settings or perform actions
export async function POST(req: NextRequest) {
  try {
    await ensureDir()
    const body = await req.json()
    const action = body.action || 'save'

    if (action === 'generate-key') {
      // Generate a random secret key
      const key = randomBytes(32).toString('hex')
      return NextResponse.json({ secretKey: key })
    }

    if (action === 'test') {
      // Test connection to frontend
      const settings = await getSettings()
      if (!settings.frontendUrl || !settings.secretKey) {
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
          // Update last connected time
          settings.lastConnected = new Date().toISOString()
          await writeFile(CONNECTION_FILE, JSON.stringify(settings, null, 2), 'utf-8')
          return NextResponse.json({ success: true, message: 'Kết nối thành công!' })
        }
        return NextResponse.json({ success: false, error: data.error || `HTTP ${res.status}` })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        return NextResponse.json({ success: false, error: `Không thể kết nối: ${message}` })
      }
    }

    if (action === 'save') {
      const settings: ConnectionSettings = {
        frontendUrl: (body.frontendUrl || '').trim().replace(/\/+$/, ''),
        secretKey: (body.secretKey || '').trim(),
        lastConnected: body.lastConnected || null,
      }

      // Validate URL format
      if (settings.frontendUrl) {
        try {
          new URL(settings.frontendUrl)
        } catch {
          return NextResponse.json({ error: 'URL không hợp lệ' }, { status: 400 })
        }
      }

      await writeFile(CONNECTION_FILE, JSON.stringify(settings, null, 2), 'utf-8')
      return NextResponse.json({ success: true, settings })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
