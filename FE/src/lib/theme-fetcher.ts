import { cache } from 'react'

export interface ThemeConfig {
  global: Record<string, Record<string, unknown>>
  pages: Record<
    string,
    Record<string, { visible: boolean; order: number; values: Record<string, unknown> }>
  >
}

export interface SiteSettings {
  general?: {
    siteName?: string
    siteDescription?: string
    siteUrl?: string
    logo?: string
    favicon?: string
    language?: string
    timezone?: string
    maintenance?: boolean
    shopMaintenance?: boolean
  }
  company?: {
    name?: string
    phone?: string
    email?: string
    address?: string
    taxId?: string
    foundedYear?: string
    ceo?: string
  }
  social?: {
    facebook?: string
    youtube?: string
    instagram?: string
    linkedin?: string
    tiktok?: string
    zalo?: string
  }
  globalSEO?: {
    defaultTitle?: string
    titleTemplate?: string
    defaultDescription?: string
    defaultKeywords?: string
    ogImage?: string
    googleAnalyticsId?: string
    googleSearchConsoleId?: string
    facebookPixelId?: string
  }
  robotsTxt?: string
  trackingScripts?: Array<{
    id: string
    name: string
    type: 'gtm' | 'ga4' | 'gsc' | 'fb_pixel' | 'tiktok' | 'custom_head' | 'custom_body'
    value: string
    active: boolean
    owner: string
  }>
  [key: string]: unknown
}

async function fetchThemeData(): Promise<ThemeConfig | null> {
  const adminUrl = process.env.ADMIN_API_URL
  const apiKey = process.env.REVALIDATION_SECRET

  // Remote mode: fetch from admin API (production)
  if (adminUrl && apiKey) {
    try {
      const res = await fetch(`${adminUrl}/api/public/theme`, {
        headers: { 'x-api-key': apiKey },
        next: { tags: ['theme'], revalidate: 300 },
      })
      if (res.ok) {
        const data = await res.json()
        return data.config || null
      }
    } catch {
      // Fall through to local fallback
    }
  }

  // Local fallback: read from filesystem (development)
  try {
    const { readFile } = await import('fs/promises')
    const { join } = await import('path')
    const { existsSync } = await import('fs')
    const file = join(process.cwd(), 'data', 'theme-config.json')
    if (existsSync(file)) {
      const raw = await readFile(file, 'utf-8')
      return JSON.parse(raw)
    }
  } catch {
    // Return null if nothing works
  }

  return null
}

async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const adminUrl = process.env.ADMIN_API_URL
  const apiKey = process.env.REVALIDATION_SECRET

  if (adminUrl && apiKey) {
    try {
      const res = await fetch(`${adminUrl}/api/public/data?type=settings`, {
        headers: { 'x-api-key': apiKey },
        next: { tags: ['settings'], revalidate: 300 },
      })
      if (res.ok) {
        const json = await res.json()
        return json.data || null
      }
    } catch {
      // ignore
    }
  }
  return null
}

// React.cache deduplicates within a single request/render
export const getTheme = cache(fetchThemeData)
export const getSettings = cache(fetchSiteSettings)
