import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), 'data')
const THEME_FILE = join(DATA_DIR, 'theme-config.json')     // published (live on FE)
const DRAFT_FILE = join(DATA_DIR, 'theme-draft.json')       // draft (admin only)
const HISTORY_DIR = join(DATA_DIR, 'theme-history')
const CONNECTION_FILE = join(DATA_DIR, 'connection.json')

async function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
  if (!existsSync(HISTORY_DIR)) {
    await mkdir(HISTORY_DIR, { recursive: true })
  }
}

// Send revalidation webhook to frontend after publishing
async function revalidateFrontend(): Promise<{ success: boolean; error?: string }> {
  try {
    if (!existsSync(CONNECTION_FILE)) return { success: false, error: 'No connection settings' }
    const raw = await readFile(CONNECTION_FILE, 'utf-8')
    const { frontendUrl, secretKey } = JSON.parse(raw)
    if (!frontendUrl || !secretKey) return { success: false, error: 'Missing frontend URL or secret key' }

    const url = new URL('/api/revalidate', frontendUrl)
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, tags: ['theme'] }),
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
    await ensureDir()
    const { searchParams } = new URL(req.url)
    const mode = searchParams.get('mode') // 'published' | 'draft' | 'history' | 'export'

    if (mode === 'history') {
      // List version history
      const { readdirSync, statSync } = await import('fs')
      if (!existsSync(HISTORY_DIR)) return NextResponse.json({ versions: [] })
      const files = readdirSync(HISTORY_DIR)
        .filter(f => f.endsWith('.json'))
        .map(f => {
          const stat = statSync(join(HISTORY_DIR, f))
          return { name: f.replace('.json', ''), date: stat.mtime.toISOString(), size: stat.size }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 50)
      return NextResponse.json({ versions: files })
    }

    if (mode === 'export') {
      // Export both draft and published as downloadable JSON
      const draft = existsSync(DRAFT_FILE) ? JSON.parse(await readFile(DRAFT_FILE, 'utf-8')) : null
      const published = existsSync(THEME_FILE) ? JSON.parse(await readFile(THEME_FILE, 'utf-8')) : null
      return NextResponse.json({
        exportedAt: new Date().toISOString(),
        draft,
        published,
      })
    }

    // Default: return both draft + published + status
    const draft = existsSync(DRAFT_FILE) ? JSON.parse(await readFile(DRAFT_FILE, 'utf-8')) : null
    const published = existsSync(THEME_FILE) ? JSON.parse(await readFile(THEME_FILE, 'utf-8')) : null
    const hasDraft = draft !== null
    const isPublished = published !== null
    const isDirty = hasDraft && JSON.stringify(draft) !== JSON.stringify(published)

    // Editor uses draft if available, else published
    const config = draft || published || null

    return NextResponse.json({
      config,
      published: published || null,
      status: {
        hasDraft,
        isPublished,
        isDirty,      // draft differs from published
        lastSaved: hasDraft && existsSync(DRAFT_FILE) ? (await import('fs')).statSync(DRAFT_FILE).mtime.toISOString() : null,
        lastPublished: isPublished && existsSync(THEME_FILE) ? (await import('fs')).statSync(THEME_FILE).mtime.toISOString() : null,
      },
    })
  } catch {
    return NextResponse.json({ config: null, status: { hasDraft: false, isPublished: false, isDirty: false } })
  }
}

// POST — save draft, publish, restore, import, or reset
export async function POST(req: NextRequest) {
  try {
    await ensureDir()
    const body = await req.json()
    const action = body.action || 'save-draft' // 'save-draft' | 'publish' | 'restore' | 'import' | 'reset'

    if (action === 'save-draft') {
      if (!body.config) {
        return NextResponse.json({ error: 'Missing config' }, { status: 400 })
      }
      await writeFile(DRAFT_FILE, JSON.stringify(body.config, null, 2), 'utf-8')
      return NextResponse.json({ success: true, action: 'save-draft' })
    }

    if (action === 'publish') {
      // Save current published as version before overwriting
      if (existsSync(THEME_FILE)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        await writeFile(
          join(HISTORY_DIR, `v-${timestamp}.json`),
          await readFile(THEME_FILE, 'utf-8'),
          'utf-8'
        )
      }

      // Use draft if available, or body.config
      const configToPublish = existsSync(DRAFT_FILE)
        ? JSON.parse(await readFile(DRAFT_FILE, 'utf-8'))
        : body.config

      if (!configToPublish) {
        return NextResponse.json({ error: 'Nothing to publish' }, { status: 400 })
      }

      await writeFile(THEME_FILE, JSON.stringify(configToPublish, null, 2), 'utf-8')
      // Also update draft to match published
      await writeFile(DRAFT_FILE, JSON.stringify(configToPublish, null, 2), 'utf-8')

      // Trigger frontend cache revalidation
      const revalidation = await revalidateFrontend()

      return NextResponse.json({
        success: true,
        action: 'publish',
        revalidation,
      })
    }

    if (action === 'restore') {
      // Restore a specific version from history
      const versionName = body.version
      if (!versionName) {
        return NextResponse.json({ error: 'Missing version name' }, { status: 400 })
      }
      const versionFile = join(HISTORY_DIR, `${versionName}.json`)
      if (!existsSync(versionFile)) {
        return NextResponse.json({ error: 'Version not found' }, { status: 404 })
      }
      const versionData = await readFile(versionFile, 'utf-8')
      await writeFile(DRAFT_FILE, versionData, 'utf-8')
      return NextResponse.json({ success: true, action: 'restore', config: JSON.parse(versionData) })
    }

    if (action === 'import') {
      // Import theme config from uploaded data
      const importConfig = body.config || body.draft || body.published
      if (!importConfig) {
        return NextResponse.json({ error: 'No config data in import' }, { status: 400 })
      }
      await writeFile(DRAFT_FILE, JSON.stringify(importConfig, null, 2), 'utf-8')
      return NextResponse.json({ success: true, action: 'import' })
    }

    if (action === 'reset') {
      // Delete draft (reverts editor to published or defaults)
      if (existsSync(DRAFT_FILE)) {
        const { unlinkSync } = await import('fs')
        unlinkSync(DRAFT_FILE)
      }
      return NextResponse.json({ success: true, action: 'reset' })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 })
  }
}
