# MTIEN Solution — Frontend (Public website)

Website public cho M.TIEN Solution. Next.js 15 App Router + Tailwind CSS v4 + Motion.

## Tech stack

- **Runtime:** Node.js 20
- **Framework:** Next.js 15 (App Router, ISR)
- **Language:** TypeScript 5.9 (strict)
- **Styling:** Tailwind CSS v4
- **Animation:** `motion/react` (Framer Motion v12)
- **Icons:** `lucide-react`
- **Test:** Vitest 2 + Testing Library + jsdom

## Cấu trúc thư mục

```
FE/
├── src/
│   ├── app/
│   │   ├── (routes)/        # Pages
│   │   ├── api/             # Route handlers (revalidate, theme proxy)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── layout.tsx
│   │   ├── error.tsx        # Error boundary
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # Landing sections
│   │   ├── marketing/       # /dich-vu/marketing
│   │   ├── design/          # /dich-vu/marketing-design
│   │   ├── cloud-server/    # /dich-vu/cloud-server
│   │   ├── phan-mem/        # /dich-vu/phan-mem
│   │   ├── blog/, shop/, contact/, about/, projects/, services/
│   │   ├── theme/           # Theme editor preview
│   │   └── ui/              # shadcn/ui primitives
│   ├── hooks/
│   ├── lib/
│   │   ├── settings-context.tsx
│   │   ├── theme-context.tsx
│   │   ├── theme-fetcher.ts
│   │   └── utils.ts         # `cn()` helper
│   └── types/
└── next.config.ts
```

## Environment variables

| Variable | Required | Example |
|---|---|---|
| `NEXT_PUBLIC_ADMIN_API_URL` | ✅ | `https://admin.example.com` |
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://example.com` |
| `REVALIDATION_SECRET` | ✅ | shared secret với BE (admin → Settings → Connection), dùng cho `/api/revalidate` |

## Scripts

```bash
npm run dev             # next dev
npm run build           # next build
npm start               # next start
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm run format          # Prettier write
npm run format:check    # Prettier verify
npm test                # Vitest run
npm run test:watch
npm run test:coverage
```

## Local development

```bash
npm install
cp .env.example .env.local   # điền biến
npm run dev
```

## Revalidation

`/api/revalidate?path=/blog/hello&secret=xxx` — gọi bởi BE sau khi publish bài viết để rebuild ISR trang tương ứng. Secret verify qua `REVALIDATION_SECRET`.

## Theme

Theme config được fetch từ BE (`/api/public/theme`) với cache `revalidate: 60`. Fallback sang theme mặc định khi BE không sẵn sàng (xem `src/lib/theme-fetcher.ts`).

## Testing

```bash
npm test
```

jsdom env + `@testing-library/jest-dom` matchers. Config: `vitest.config.ts` + `vitest.setup.ts`.

## CI

GitHub Actions: `.github/workflows/ci.yml` — chạy lint → typecheck → format:check → test → build trên mỗi PR.
