import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that should not be affected by maintenance mode
const BYPASS_PATHS = ['/maintenance', '/api/', '/_next/', '/favicon.ico', '/uploads/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip for bypass paths
  if (BYPASS_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Check maintenance mode
  try {
    const adminUrl = process.env.ADMIN_API_URL
    const apiKey = process.env.REVALIDATION_SECRET

    if (adminUrl && apiKey) {
      const res = await fetch(`${adminUrl}/api/public/data?type=settings`, {
        headers: { 'x-api-key': apiKey },
        next: { revalidate: 30 },
      })
      if (res.ok) {
        const json = await res.json()
        const general = json.data?.general

        // Full site maintenance
        if (general?.maintenance === true) {
          const maintenanceUrl = new URL('/maintenance', request.url)
          return NextResponse.rewrite(maintenanceUrl)
        }

        // Shop maintenance — block /shop and /shop/*
        if (general?.shopMaintenance === true && (pathname === '/shop' || pathname.startsWith('/shop/'))) {
          const maintenanceUrl = new URL('/maintenance?type=shop', request.url)
          return NextResponse.rewrite(maintenanceUrl)
        }
      }
    }
  } catch {
    // If settings check fails, let the request through
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|maintenance).*)'],
}
