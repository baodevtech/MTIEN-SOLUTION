# ============================================
# MTIEN Admin - Setup & Start (Windows)
# ============================================
$ErrorActionPreference = "Stop"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  MTIEN Admin - Khoi tao Backend + Database" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Start PostgreSQL
Write-Host "[1/4] Khoi dong PostgreSQL..." -ForegroundColor Yellow
docker compose up -d postgres

$maxRetries = 30
$retryCount = 0
do {
    Start-Sleep -Seconds 2
    $retryCount++
    docker compose exec postgres pg_isready -U mtien -d mtien_solution 2>$null | Out-Null
} while ($LASTEXITCODE -ne 0 -and $retryCount -lt $maxRetries)

if ($retryCount -ge $maxRetries) {
    Write-Host "PostgreSQL khong san sang!" -ForegroundColor Red
    exit 1
}
Write-Host "  PostgreSQL OK" -ForegroundColor Green
Write-Host ""

# 2. Install dependencies
Write-Host "[2/4] Cai dat dependencies..." -ForegroundColor Yellow
npm install
Write-Host ""

# 3. Database setup
Write-Host "[3/4] Push schema..." -ForegroundColor Yellow
$env:DATABASE_URL = "postgresql://mtien:mtien_secret@localhost:5432/mtien_solution?schema=public"
npx prisma generate
npx prisma db push
Write-Host ""

Write-Host "[4/4] Seed du lieu mau..." -ForegroundColor Yellow
npx tsx prisma/seed.ts
Write-Host ""

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  HOAN TAT!" -ForegroundColor Green
Write-Host ""
Write-Host "  Chay dev:   npm run dev" -ForegroundColor Gray
Write-Host "  Docker:     docker compose up --build" -ForegroundColor Gray
Write-Host "  DB Studio:  npx prisma studio" -ForegroundColor Gray
Write-Host ""
Write-Host "  Admin:      http://localhost:3001" -ForegroundColor Gray
Write-Host "  Login:      admin@mtiensolution.vn / admin123" -ForegroundColor Gray
Write-Host "================================================" -ForegroundColor Cyan
