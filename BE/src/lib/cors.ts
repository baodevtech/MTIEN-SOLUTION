import { NextResponse } from 'next/server'

export function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    'Access-Control-Allow-Credentials': 'true',
  }
}

export function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: getCorsHeaders() })
}

export function corsOptions() {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders() })
}
