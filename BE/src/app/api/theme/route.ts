import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Send revalidation webhook to frontend after publishing
async function revalidateFrontend(): Promise<{ success: boolean; error?: string }> {
  try {
    const conn = await prisma.connectionSetting.findFirst()
    if (!conn?.frontendUrl || !conn?.secretKey) {
      return { success: false, error: 'No connection settings' }
    }

    const url = new URL('/api/revalidate', conn.frontendUrl)
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: conn.secretKey, tags: ['theme'] }),
      signal: AbortSignal.timeout(10000),
    })

    if (res.ok) {
      return { success: true }
    }
    return { success: false, error: `HTTP ${res.status}` }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}

// GET — returns draft config (for editor), published config, and metadata
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const mode = searchParams.get('mode') // 'published' | 'draft' | 'history' | 'export'

    if (mode === 'history') {
      const versions = await prisma.themeVersion.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: { name: true, createdAt: true },
      })
      return NextResponse.json({
        versions: versions.map(v => ({
          name: v.name,
          date: v.createdAt.toISOString(),
          size: JSON.stringify(v).length,
        })),
      })
    }

    if (mode === 'export') {
      const [draftRow, publishedRow] = await Promise.all([
        prisma.themeConfig.findUnique({ where: { type: 'draft' } }),
        prisma.themeConfig.findUnique({ where: { type: 'published' } }),
      ])
      return NextResponse.json({
        exportedAt: new Date().toISOString(),
        draft: draftRow?.config ?? null,
        published: publishedRow?.config ?? null,
      })
    }

    // Default: return both draft + published + status
    const [draftRow, publishedRow] = await Promise.all([
      prisma.themeConfig.findUnique({ where: { type: 'draft' } }),
      prisma.themeConfig.findUnique({ where: { type: 'published' } }),
    ])

    const draft = draftRow?.config ?? null
    const published = publishedRow?.config ?? null
    const hasDraft = draft !== null
    const isPublished = published !== null
    const isDirty = hasDraft && JSON.stringify(draft) !== JSON.stringify(published)

    const config = draft || published || null

    return NextResponse.json({
      config,
      published: published || null,
      status: {
        hasDraft,
        isPublished,
        isDirty,
        lastSaved: draftRow?.updatedAt?.toISOString() ?? null,
        lastPublished: publishedRow?.updatedAt?.toISOString() ?? null,
      },
    })
  } catch {
    return NextResponse.json({ config: null, status: { hasDraft: false, isPublished: false, isDirty: false } })
  }
}

// POST — save draft, publish, restore, import, or reset
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const action = body.action || 'save-draft'

    if (action === 'save-draft') {
      if (!body.config) {
        return NextResponse.json({ error: 'Missing config' }, { status: 400 })
      }
      await prisma.themeConfig.upsert({
        where: { type: 'draft' },
        update: { config: body.config },
        create: { type: 'draft', config: body.config },
      })
      return NextResponse.json({ success: true, action: 'save-draft' })
    }

    if (action === 'publish') {
      // Save current published as version before overwriting
      const currentPublished = await prisma.themeConfig.findUnique({ where: { type: 'published' } })
      if (currentPublished) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        await prisma.themeVersion.create({
          data: { name: `v-${timestamp}`, config: currentPublished.config! },
        })
      }

      // Use draft if available, or body.config
      const draftRow = await prisma.themeConfig.findUnique({ where: { type: 'draft' } })
      const configToPublish = draftRow?.config ?? body.config

      if (!configToPublish) {
        return NextResponse.json({ error: 'Nothing to publish' }, { status: 400 })
      }

      // Update published
      await prisma.themeConfig.upsert({
        where: { type: 'published' },
        update: { config: configToPublish },
        create: { type: 'published', config: configToPublish },
      })
      // Also update draft to match published
      await prisma.themeConfig.upsert({
        where: { type: 'draft' },
        update: { config: configToPublish },
        create: { type: 'draft', config: configToPublish },
      })

      const revalidation = await revalidateFrontend()

      return NextResponse.json({
        success: true,
        action: 'publish',
        revalidation,
      })
    }

    if (action === 'restore') {
      const versionName = body.version
      if (!versionName) {
        return NextResponse.json({ error: 'Missing version name' }, { status: 400 })
      }
      const version = await prisma.themeVersion.findUnique({ where: { name: versionName } })
      if (!version) {
        return NextResponse.json({ error: 'Version not found' }, { status: 404 })
      }
      await prisma.themeConfig.upsert({
        where: { type: 'draft' },
        update: { config: version.config! },
        create: { type: 'draft', config: version.config! },
      })
      return NextResponse.json({ success: true, action: 'restore', config: version.config })
    }

    if (action === 'import') {
      const importConfig = body.config || body.draft || body.published
      if (!importConfig) {
        return NextResponse.json({ error: 'No config data in import' }, { status: 400 })
      }
      await prisma.themeConfig.upsert({
        where: { type: 'draft' },
        update: { config: importConfig },
        create: { type: 'draft', config: importConfig },
      })
      return NextResponse.json({ success: true, action: 'import' })
    }

    if (action === 'reset') {
      await prisma.themeConfig.deleteMany({ where: { type: 'draft' } })
      return NextResponse.json({ success: true, action: 'reset' })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 })
  }
}
