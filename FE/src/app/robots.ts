import type { MetadataRoute } from 'next';
import { getSettings } from '@/lib/theme-fetcher';

const BASE_URL = process.env.APP_URL || 'https://mtiensolution.vn';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings()
  const robotsTxt = settings?.robotsTxt as string | undefined

  // If BE has custom robots.txt content, parse it into rules
  if (robotsTxt && typeof robotsTxt === 'string' && robotsTxt.trim()) {
    const rules: MetadataRoute.Robots['rules'] = []
    let currentAgent = '*'
    const allow: string[] = []
    const disallow: string[] = []

    for (const line of robotsTxt.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const [directive, ...valueParts] = trimmed.split(':')
      const value = valueParts.join(':').trim()
      if (!directive || !value) continue

      const key = directive.trim().toLowerCase()
      if (key === 'user-agent') {
        if (allow.length || disallow.length) {
          rules.push({ userAgent: currentAgent, allow: [...allow], disallow: [...disallow] })
          allow.length = 0
          disallow.length = 0
        }
        currentAgent = value
      } else if (key === 'allow') {
        allow.push(value)
      } else if (key === 'disallow') {
        disallow.push(value)
      }
    }

    if (allow.length || disallow.length) {
      rules.push({ userAgent: currentAgent, allow: [...allow], disallow: [...disallow] })
    }

    if (rules.length > 0) {
      return { rules, sitemap: `${BASE_URL}/sitemap.xml` }
    }
  }

  // Default fallback
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
