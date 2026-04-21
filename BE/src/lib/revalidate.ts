import { prisma } from '@/lib/prisma'

/**
 * Trigger Next.js tag-based cache revalidation on the Frontend.
 * Reads frontendUrl + secretKey from ConnectionSetting.
 * Fire-and-forget — errors are silently ignored so mutations still succeed.
 */
export async function triggerFERevalidate(tags: string[]): Promise<void> {
  try {
    const conn = await prisma.connectionSetting.findFirst()
    if (!conn?.frontendUrl || !conn?.secretKey) return

    const url = new URL('/api/revalidate', conn.frontendUrl)
    await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: conn.secretKey, tags }),
      signal: AbortSignal.timeout(8000),
    })
  } catch {
    // Swallow — FE revalidation is best-effort, never block the mutation
  }
}
