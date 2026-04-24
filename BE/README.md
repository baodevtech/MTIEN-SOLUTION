# MTIEN Solution — Backend (Admin CMS)

Admin CMS + API server cho website M.TIEN Solution. Next.js 15 App Router + Prisma + PostgreSQL.

## Tech stack

- **Runtime:** Node.js 20
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.9 (strict)
- **Database:** PostgreSQL 16 + Prisma 7
- **Auth:** JWT (HMAC-SHA256, `httpOnly` cookie + Bearer header)
- **Validation:** Zod 3
- **UI:** Tailwind CSS v4, Radix UI
- **Test:** Vitest 2 + @vitest/coverage-v8

## Cấu trúc thư mục

```
BE/
├── prisma/
│   ├── schema.prisma     # Data model
│   └── seed.ts           # Seed script
├── public/uploads/       # Media uploads (runtime)
├── src/
│   ├── app/
│   │   ├── (auth)/       # /login
│   │   ├── (dashboard)/  # Admin UI
│   │   └── api/          # REST endpoints
│   │       ├── admin/    # Protected (JWT required)
│   │       ├── public/   # Public (CORS + rate-limit)
│   │       └── health/   # Liveness probe
│   ├── components/       # UI components
│   └── lib/
│       ├── auth.ts       # JWT sign/verify
│       ├── cors.ts       # Origin allowlist
│       ├── env.ts        # Zod-validated env vars
│       ├── logger.ts     # Structured JSON logs
│       ├── prisma.ts     # Prisma client singleton
│       ├── rate-limit.ts # In-memory sliding window
│       └── security-headers.ts
└── docker-compose.yml    # Postgres + app
```

## Environment variables

Copy `.env.example` → `.env` và điền giá trị:

| Variable | Required | Example |
|---|---|---|
| `DATABASE_URL` | ✅ | `postgresql://user:pass@localhost:5432/mtien` |
| `JWT_SECRET` | ✅ | ≥ 32 ký tự, random (`openssl rand -base64 48`) |
| `FRONTEND_ORIGIN` | ✅ | `https://example.com,https://www.example.com` |
| `JWT_EXPIRES_IN_SECONDS` | optional | mặc định `604800` (7 ngày) |
| `LOG_LEVEL` | optional | `debug` / `info` / `warn` / `error` |
| `NODE_ENV` | auto | `development` / `production` / `test` |

**Production guardrails** (kiểm ở boot trong `src/lib/env.ts`):
- `JWT_SECRET` không chứa `change` / `default` / `secret-change` / `mtien-secret`.
- `FRONTEND_ORIGIN` không được là `*`.

## Scripts

```bash
npm run dev             # next dev (port 3001)
npm run build           # next build
npm start               # next start
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm run format          # Prettier write
npm run format:check    # Prettier verify
npm test                # Vitest run
npm run test:watch      # Vitest watch
npm run test:coverage   # Vitest + coverage
```

Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name <name>
npx prisma migrate deploy
npx prisma studio
```

## Local development

```bash
# 1. Start Postgres via Docker
docker compose up -d postgres

# 2. Install deps
npm install

# 3. Migrate + seed
npx prisma migrate dev
npx prisma db seed

# 4. Run
npm run dev
```

App chạy tại http://localhost:3001.

## Security model

- **JWT:** chỉ chứa `userId` + `exp`, ký bằng HMAC-SHA256 với secret ≥ 32 ký tự. So sánh signature bằng `timingSafeEqual`.
- **CORS:** origin allowlist qua `FRONTEND_ORIGIN` (comma-separated). Không bao giờ trả `*` khi `credentials: true`.
- **Rate limit:** in-memory sliding window cho `/api/admin/auth` (10 req / 5 phút) và `/api/public/contacts` (5 req / 10 phút). Dùng client IP từ `x-forwarded-for`.
- **Security headers:** HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`.
- **Password:** bcrypt (cost 10).
- **Login timing:** luôn compare với dummy hash khi user không tồn tại để chống timing attack.

## Health check

`GET /api/health` → pings `SELECT 1`, trả `{ status, uptimeSeconds, latencyMs }`. Dùng bởi Docker `HEALTHCHECK` và platform (Render, Fly, Railway…).

## Docker

```bash
docker compose up --build
```

`docker-compose.yml` yêu cầu các biến bắt buộc qua syntax `${VAR:?error}` — sẽ fail fast nếu thiếu `POSTGRES_PASSWORD`, `JWT_SECRET`, `FRONTEND_ORIGIN`.

## Testing

Unit tests: `src/lib/*.test.ts`. Tập trung vào security-critical:
- `auth.test.ts` — JWT tampering, expiry, malformed.
- `cors.test.ts` — allowlist echo behavior.
- `rate-limit.test.ts` — sliding window + per-IP isolation.

```bash
npm test
```

## CI

GitHub Actions: `.github/workflows/ci.yml` — chạy lint → typecheck → format:check → test → build trên mỗi PR.
