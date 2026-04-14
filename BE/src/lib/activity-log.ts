import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

interface LogInput {
  action: string      // e.g. 'theme.save-draft', 'post.create', 'order.update-status'
  module: string      // e.g. 'theme', 'post', 'product', 'order', 'system'
  status: 'success' | 'failed' | 'warning'
  message: string     // Human-readable
  detail?: Prisma.InputJsonValue
  userId?: string
  userName?: string
  ip?: string
  duration?: number   // ms
}

export async function logActivity(input: LogInput) {
  try {
    await prisma.activityLog.create({
      data: {
        action: input.action,
        module: input.module,
        status: input.status,
        message: input.message,
        detail: input.detail ?? undefined,
        userId: input.userId,
        userName: input.userName,
        ip: input.ip,
        duration: input.duration,
      },
    })
  } catch {
    // Never let logging crash the main operation
    console.error('[ActivityLog] Failed to write log:', input.action)
  }
}

/** Convenience: log + return the same result (for chaining) */
export async function withLog<T>(input: Omit<LogInput, 'duration'>, fn: () => Promise<T>): Promise<T> {
  const start = Date.now()
  try {
    const result = await fn()
    await logActivity({ ...input, duration: Date.now() - start })
    return result
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    const errDetail: Record<string, unknown> = { error: errMsg }
    if (input.detail && typeof input.detail === 'object' && !Array.isArray(input.detail)) {
      Object.assign(errDetail, input.detail)
    }
    await logActivity({
      ...input,
      status: 'failed',
      message: err instanceof Error ? err.message : input.message,
      detail: errDetail as Prisma.InputJsonValue,
      duration: Date.now() - start,
    })
    throw err
  }
}
