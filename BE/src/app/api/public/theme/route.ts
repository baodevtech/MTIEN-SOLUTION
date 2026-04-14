import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function getConnectionSettings() {
  const conn = await prisma.connectionSetting.findFirst()
  return {
    secretKey: conn?.secretKey || null,
    frontendUrl: conn?.frontendUrl || '*',
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
    const { secretKey: storedKey, frontendUrl: origin } = await getConnectionSettings()

    // Validate API key
    const apiKey = req.headers.get('x-api-key')
    if (!storedKey || !apiKey || apiKey !== storedKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: corsHeaders(origin) }
      )
    }

    const published = await prisma.themeConfig.findUnique({ where: { type: 'published' } })

    if (!published) {
      return NextResponse.json(
        { config: null },
        { headers: corsHeaders(origin) }
      )
    }

    return NextResponse.json(
      { config: published.config, publishedAt: published.updatedAt.toISOString() },
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
  const { frontendUrl: origin } = await getConnectionSettings()
  return new NextResponse(null, {
    headers: corsHeaders(origin),
  })
}
