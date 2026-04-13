#!/bin/bash
# ============================================
# MTIEN Admin - Setup & Start
# ============================================
set -e

echo "================================================"
echo "  MTIEN Admin — Khởi tạo Backend + Database"
echo "================================================"
echo ""

# 1. Start PostgreSQL
echo "🐘 Khởi động PostgreSQL..."
docker compose up -d postgres
echo "   Đợi PostgreSQL sẵn sàng..."
until docker compose exec postgres pg_isready -U mtien -d mtien_solution > /dev/null 2>&1; do
  sleep 2
done
echo "✅ PostgreSQL OK"
echo ""

# 2. Install dependencies
echo "📦 Cài đặt dependencies..."
npm install
echo ""

# 3. Database setup
echo "🗄️  Push schema + Seed data..."
export DATABASE_URL="postgresql://mtien:mtien_secret@localhost:5432/mtien_solution?schema=public"
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
echo "✅ Database OK"
echo ""

echo "================================================"
echo "  ✅ HOÀN TẤT!"
echo ""
echo "  Chạy dev:   npm run dev"
echo "  Docker:     docker compose up --build"
echo "  DB Studio:  npx prisma studio"
echo ""
echo "  Admin:      http://localhost:3001"
echo "  Login:      admin@mtiensolution.vn / admin123"
echo "================================================"
