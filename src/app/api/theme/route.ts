import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// FE local theme API — fallback for development when ADMIN_API_URL is not set.
// In production, theme data is fetched server-side from Admin API in layout.tsx.
const THEME_FILE = join(process.cwd(), 'data', 'theme-config.json')

export async function GET() {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  }
  try {
    if (!existsSync(THEME_FILE)) {
      return NextResponse.json({ config: null }, { headers })
    }
    const raw = await readFile(THEME_FILE, 'utf-8')
    const config = JSON.parse(raw)
    return NextResponse.json({ config }, { headers })
  } catch {
    return NextResponse.json({ config: null }, { headers })
  }
}
