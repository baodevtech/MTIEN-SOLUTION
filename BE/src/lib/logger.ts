/**
 * Minimal structured logger. Designed so it can be swapped for / forwarded to
 * Sentry/Datadog/pino later without touching call sites.
 *
 * Usage:
 *   import { logger } from '@/lib/logger'
 *   logger.info('theme.saved', { userId, themeId })
 *   logger.error('payment.failed', { orderId }, err)
 */

type Level = 'debug' | 'info' | 'warn' | 'error'

interface LogRecord {
  level: Level
  event: string
  time: string
  context?: Record<string, unknown>
  error?: {
    name: string
    message: string
    stack?: string
  }
}

function shouldLog(level: Level): boolean {
  const min = (process.env.LOG_LEVEL as Level | undefined) ?? 'info'
  const order: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 }
  return order[level] >= order[min]
}

function write(record: LogRecord) {
  const line = JSON.stringify(record)
  // eslint-disable-next-line no-console
  if (record.level === 'error' || record.level === 'warn') console.error(line)
  // eslint-disable-next-line no-console
  else console.log(line)
}

function log(level: Level, event: string, context?: Record<string, unknown>, error?: unknown) {
  if (!shouldLog(level)) return

  let err: LogRecord['error']
  if (error instanceof Error) {
    err = { name: error.name, message: error.message, stack: error.stack }
  } else if (error !== undefined) {
    err = { name: 'NonErrorThrow', message: String(error) }
  }

  write({
    level,
    event,
    time: new Date().toISOString(),
    context,
    error: err,
  })
}

export const logger = {
  debug: (event: string, context?: Record<string, unknown>) => log('debug', event, context),
  info: (event: string, context?: Record<string, unknown>) => log('info', event, context),
  warn: (event: string, context?: Record<string, unknown>, error?: unknown) =>
    log('warn', event, context, error),
  error: (event: string, context?: Record<string, unknown>, error?: unknown) =>
    log('error', event, context, error),
}
