import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// POST — receive revalidation webhook from admin CMS
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { secret, tags, test } = body

    // Validate secret key
    const expectedSecret = process.env.REVALIDATION_SECRET
    if (!expectedSecret || !secret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Test mode — just confirm connection is working
    if (test) {
      return NextResponse.json({ connected: true, timestamp: new Date().toISOString() })
    }

    // Revalidate specified tags (default: ['theme'])
    const tagsToRevalidate: string[] = Array.isArray(tags) ? tags : ['theme']
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag)
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
