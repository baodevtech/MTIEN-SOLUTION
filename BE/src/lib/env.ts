import { z } from 'zod'

/**
 * Server-side environment variables schema.
 * Validated once at import time; fails fast if misconfigured.
 */
const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN_SECONDS: z.coerce.number().int().positive().default(60 * 60 * 24 * 7), // 7d
  FRONTEND_ORIGIN: z
    .string()
    .min(1, 'FRONTEND_ORIGIN is required'),
  DATA_DIR: z.string().default('./data'),
  PUBLIC_API_KEY: z.string().min(16).optional(),
})

type Env = z.infer<typeof schema>

function loadEnv(): Env {
  const parsed = schema.safeParse(process.env)
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => ` - ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    // eslint-disable-next-line no-console
    console.error(`\n[env] Invalid environment variables:\n${issues}\n`)
    throw new Error('Invalid environment variables')
  }

  const env = parsed.data

  // Extra production hardening
  if (env.NODE_ENV === 'production') {
    if (env.FRONTEND_ORIGIN === '*' || env.FRONTEND_ORIGIN.includes('*')) {
      throw new Error('[env] FRONTEND_ORIGIN cannot be a wildcard in production')
    }
    if (/change|default|secret-change|mtien-secret/i.test(env.JWT_SECRET)) {
      throw new Error('[env] JWT_SECRET appears to use a default/placeholder value')
    }
  }

  return env
}

export const env = loadEnv()

/**
 * Parse comma-separated origins from FRONTEND_ORIGIN.
 */
export function getAllowedOrigins(): string[] {
  return env.FRONTEND_ORIGIN.split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
