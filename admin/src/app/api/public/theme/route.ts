import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), 'data')
const THEME_FILE = join(DATA_DIR, 'theme-config.json')
const CONNECTION_FILE = join(DATA_DIR, 'connection.json')

async function getSecretKey(): Promise<string | null> {
  try {
    if (!existsSync(CONNECTION_FILE)) return null
    const raw = await readFile(CONNECTION_FILE, 'utf-8')
    const settings = JSON.parse(raw)
    return settings.secretKey || null
  } catch {
    return null
  }
}

async function getAllowedOrigin(): Promise<string> {
  try {
    if (!existsSync(CONNECTION_FILE)) return '*'
    const raw = await readFile(CONNECTION_FILE, 'utf-8')
    const settings = JSON.parse(raw)
    return settings.frontendUrl || '*'
  } catch {
    return '*'
  }
}

function corsHeaders(allowedOrigin: string) {
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    'Cache-Control': 'no-store',
  }
}

// GET — serve published theme to frontend (protected by API key)
export async function GET(req: NextRequest) {
  try {
    const storedKey = await getSecretKey()
    const origin = await getAllowedOrigin()

    // Validate API key
    const apiKey = req.headers.get('x-api-key')
    if (!storedKey || !apiKey || apiKey !== storedKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: corsHeaders(origin) }
      )
    }

    if (!existsSync(THEME_FILE)) {
      return NextResponse.json(
        { config: null },
        { headers: corsHeaders(origin) }
      )
    }

    const raw = await readFile(THEME_FILE, 'utf-8')
    const config = JSON.parse(raw)
    return NextResponse.json(
      { config, publishedAt: new Date().toISOString() },
      { headers: corsHeaders(origin) }
    )
  } catch {
    return NextResponse.json(
      { config: null },
      { headers: corsHeaders('*') }
    )
  }
}

export async function OPTIONS() {
  const origin = await getAllowedOrigin()
  return new NextResponse(null, {
    headers: corsHeaders(origin),
  })
}
