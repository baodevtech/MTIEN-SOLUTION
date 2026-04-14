import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logActivity } from '@/lib/activity-log'

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
    const mode = searchParams.get('mode') // 'published' | 'draft' | 'history' | 'export' | 'verify-fe'

    // Verify if FE received the published theme
    if (mode === 'verify-fe') {
      try {
        const conn = await prisma.connectionSetting.findFirst()
        if (!conn?.frontendUrl || !conn?.secretKey) {
          return NextResponse.json({ success: false, error: 'NO_CONNECTION', message: 'Chưa cấu hình kết nối Frontend. Vào Cài đặt → Kết nối Frontend để thiết lập.' })
        }

        // Get published timestamp from DB
        const publishedRow = await prisma.themeConfig.findUnique({ where: { type: 'published' } })

        // Fetch current theme from FE
        const feUrl = new URL('/api/theme/status', conn.frontendUrl)
        const feRes = await fetch(feUrl.toString(), {
          headers: { 'x-api-key': conn.secretKey },
          signal: AbortSignal.timeout(10000),
        })

        if (!feRes.ok) {
          return NextResponse.json({
            success: false,
            error: 'FE_UNREACHABLE',
            message: `Frontend trả về HTTP ${feRes.status}. Kiểm tra URL: ${conn.frontendUrl}`,
            frontendUrl: conn.frontendUrl,
          })
        }

        const feData = await feRes.json()
        return NextResponse.json({
          success: true,
          admin: {
            hasPublished: !!publishedRow,
            publishedAt: publishedRow?.updatedAt?.toISOString() || null,
          },
          frontend: feData,
          frontendUrl: conn.frontendUrl,
        })
      } catch (err) {
        return NextResponse.json({
          success: false,
          error: 'VERIFY_FAILED',
          message: err instanceof Error ? err.message : 'Không thể kết nối Frontend',
        })
      }
    }

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
        return NextResponse.json({ success: false, error: 'MISSING_CONFIG', message: 'Thiếu dữ liệu config' }, { status: 400 })
      }
      const row = await prisma.themeConfig.upsert({
        where: { type: 'draft' },
        update: { config: body.config },
        create: { type: 'draft', config: body.config },
      })
      await logActivity({ action: 'theme.save-draft', module: 'theme', status: 'success', message: 'Lưu nháp theme thành công', detail: { savedAt: row.updatedAt.toISOString() } })
      return NextResponse.json({ success: true, action: 'save-draft', savedAt: row.updatedAt.toISOString() })
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
        return NextResponse.json({ success: false, error: 'NOTHING_TO_PUBLISH', message: 'Không có dữ liệu để xuất bản' }, { status: 400 })
      }

      // Update published
      const publishedRow = await prisma.themeConfig.upsert({
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

      await logActivity({ action: 'theme.publish', module: 'theme', status: 'success', message: 'Xuất bản theme thành công', detail: { publishedAt: publishedRow.updatedAt.toISOString(), revalidation } })
      if (!revalidation.success) {
        await logActivity({ action: 'theme.revalidate-fe', module: 'theme', status: 'failed', message: `Gửi FE thất bại: ${revalidation.error}`, detail: { revalidation } })
      } else {
        await logActivity({ action: 'theme.revalidate-fe', module: 'theme', status: 'success', message: 'Gửi cập nhật FE thành công' })
      }

      return NextResponse.json({
        success: true,
        action: 'publish',
        publishedAt: publishedRow.updatedAt.toISOString(),
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
      await logActivity({ action: 'theme.restore', module: 'theme', status: 'success', message: `Khôi phục theme version: ${versionName}`, detail: { version: versionName } })
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
      await logActivity({ action: 'theme.import', module: 'theme', status: 'success', message: 'Import theme thành công' })
      return NextResponse.json({ success: true, action: 'import' })
    }

    if (action === 'reset') {
      await prisma.themeConfig.deleteMany({ where: { type: 'draft' } })
      await logActivity({ action: 'theme.reset', module: 'theme', status: 'success', message: 'Reset theme draft về mặc định' })
      return NextResponse.json({ success: true, action: 'reset' })
    }

    return NextResponse.json({ success: false, error: 'UNKNOWN_ACTION', message: `Action không hợp lệ: ${action}` }, { status: 400 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Operation failed'
    await logActivity({ action: 'theme.error', module: 'theme', status: 'failed', message: `Lỗi theme: ${message}`, detail: { error: message } })
    return NextResponse.json({ success: false, error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}
