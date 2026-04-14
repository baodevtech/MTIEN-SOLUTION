import { NextRequest, NextResponse } from 'next/server'

// GET — Admin calls this to verify if FE has the published theme
export async function GET(req: NextRequest) {
  // Validate secret
  const apiKey = req.headers.get('x-api-key')
  const expectedSecret = process.env.REVALIDATION_SECRET
  if (!expectedSecret || !apiKey || apiKey !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const adminUrl = process.env.ADMIN_API_URL
    if (!adminUrl) {
      return NextResponse.json({
        hasTheme: false,
        error: 'ADMIN_API_URL not configured',
        timestamp: new Date().toISOString(),
      })
    }

    // Fetch theme from admin API (same as what getTheme() does, but uncached)
    const res = await fetch(`${adminUrl}/api/public/theme`, {
      headers: { 'x-api-key': expectedSecret },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({
        hasTheme: false,
        error: `Admin API returned ${res.status}`,
        timestamp: new Date().toISOString(),
      })
    }

    const data = await res.json()
    const hasTheme = !!(data.config && Object.keys(data.config).length > 0)

    return NextResponse.json({
      hasTheme,
      publishedAt: data.publishedAt || null,
      pagesCount: data.config?.pages ? Object.keys(data.config.pages).length : 0,
      hasGlobal: !!(data.config?.global),
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return NextResponse.json({
      hasTheme: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    })
  }
}
