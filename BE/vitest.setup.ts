// Provide sane defaults for env validation during tests.
// Must run BEFORE any module under test imports `@/lib/env`.
process.env.NODE_ENV = process.env.NODE_ENV || 'test'
process.env.DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test?schema=public'
process.env.JWT_SECRET =
  process.env.JWT_SECRET || 'test-jwt-secret-minimum-32-characters-required-xxx'
process.env.FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000'
