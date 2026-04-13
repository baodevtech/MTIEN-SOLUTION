'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const trustItems = [
  { emoji: '✓', text: 'Chính hãng 100%' },
  { emoji: '🚚', text: 'Freeship từ 2 triệu' },
  { emoji: '🔄', text: 'Đổi trả 7 ngày' },
  { emoji: '📞', text: '1900.xxxx' },
];

const categoryLinks = [
  { label: 'Laptop', href: '/shop?category=laptop' },
  { label: 'PC', href: '/shop?category=pc' },
  { label: 'Linh kiện', href: '/shop?category=linh-kien' },
  { label: 'Ngoại vi', href: '/shop?category=ngoai-vi' },
  { label: 'Phần mềm', href: '/shop?category=phan-mem' },
  { label: 'Mạng', href: '/shop?category=mang' },
  { label: 'Sửa chữa', href: '/shop?category=sua-chua' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ShopHero() {
  const [query, setQuery] = useState('');

  return (
    <section aria-label="Shop hero">
      {/* ============================================================ */}
      {/* ZONE 1 — Trust Strip                                         */}
      {/* ============================================================ */}
      <div className="bg-[#001A5F]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-5 py-1.5">
          {trustItems.map((item, i) => (
            <span
              key={item.text}
              className={`flex items-center gap-1 text-[11px] text-white/80 ${
                i >= 2 ? 'hidden sm:flex' : 'flex'
              } ${i < trustItems.length - 1 ? '' : ''}`}
            >
              <span className="text-[10px] sm:text-[11px]">{item.emoji}</span>
              <span className="text-[10px] sm:text-[11px]">{item.text}</span>
              {i < trustItems.length - 1 && (
                <span className="ml-6 hidden text-[8px] text-white/30 sm:inline" aria-hidden>·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* ZONE 2 — Category Nav + Search                               */}
      {/* ============================================================ */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Categories — horizontal scroll on mobile */}
          <nav
            aria-label="Danh mục sản phẩm"
            className="order-2 -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 scrollbar-hide sm:order-1 sm:mx-0 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {categoryLinks.map((cat, i) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="shrink-0 text-[12px] font-medium text-slate-600 transition-colors hover:text-[#0066FF] sm:text-[13px]"
              >
                {cat.label}
                {i < categoryLinks.length - 1 && (
                  <span className="ml-3 hidden text-slate-300 sm:inline" aria-hidden>·</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <div className="relative order-1 w-full sm:order-2 sm:max-w-xs">
            <label htmlFor="hero-search" className="sr-only">
              Tìm kiếm sản phẩm
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              strokeWidth={2}
            />
            <input
              id="hero-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm laptop, PC, linh kiện..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition-shadow placeholder:text-slate-400 focus:border-[#0066FF]/40 focus:ring-2 focus:ring-[#0066FF]/10"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ZONE 3 — Banner Grid                                         */}
      {/* ============================================================ */}
      <div className="bg-slate-50 py-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-5 lg:grid-cols-[7fr_3fr]">
          {/* ---------- Main Banner ---------- */}
          <div className="relative h-[200px] overflow-hidden rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0066FF] lg:h-[280px]">
            {/* Text content */}
            <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10">
              <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#FF6B00] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                ⚡ Flash Sale Mùa Hè
              </span>
              <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
                MacBook Air M3
                <br />
                <span className="text-white/90">Giảm 2 triệu</span>
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-lg font-extrabold text-white sm:text-xl">
                  32.990.000₫
                </span>
                <span className="text-sm text-white/50 line-through">
                  34.990.000₫
                </span>
              </div>
              <Link
                href="/shop/macbook-air-m3-15"
                className="group mt-4 inline-flex w-fit items-center gap-1 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-[#0066FF] transition-all hover:bg-white/90 active:scale-[0.97]"
              >
                Mua ngay
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Product image — right side overlay */}
            <div className="absolute bottom-0 right-0 top-0 hidden w-[45%] sm:block">
              <Image
                src="https://picsum.photos/seed/macbook_hero/600/400"
                alt="MacBook Air M3"
                fill
                sizes="(max-width: 1024px) 45vw, 360px"
                className="object-contain object-right-bottom opacity-90"
                priority
              />
              {/* Soft left-edge fade into gradient */}
              <div
                className="absolute inset-y-0 left-0 w-24"
                style={{
                  background:
                    'linear-gradient(to right, #0066FF 0%, transparent 100%)',
                }}
                aria-hidden
              />
            </div>
          </div>

          {/* ---------- Side Banners ---------- */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {/* Side banner 1 — PC Gaming */}
            <div className="relative h-[100px] overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 lg:h-[136px]">
              <div className="relative z-10 flex h-full flex-col justify-center px-4 lg:px-5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Hot Deal
                </span>
                <h3 className="mt-0.5 text-sm font-bold leading-snug text-white lg:text-base">
                  PC Gaming từ 15tr
                </h3>
                <Link
                  href="/shop?category=pc-gaming"
                  className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-[#0066FF] transition-colors hover:text-[#3388FF]"
                >
                  Xem ngay <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 top-0 w-[40%]">
                <Image
                  src="https://picsum.photos/seed/pcgaming_side/300/200"
                  alt="PC Gaming"
                  fill
                  sizes="(max-width: 1024px) 20vw, 140px"
                  className="object-contain object-right-bottom opacity-70"
                />
              </div>
            </div>

            {/* Side banner 2 — Repair */}
            <div className="relative h-[100px] overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 lg:h-[136px]">
              <div className="relative z-10 flex h-full flex-col justify-center px-4 lg:px-5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200/80">
                  Dịch vụ
                </span>
                <h3 className="mt-0.5 text-sm font-bold leading-snug text-white lg:text-base">
                  Sửa chữa — Nhanh 2h
                </h3>
                <Link
                  href="/shop?category=sua-chua"
                  className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-white/90 transition-colors hover:text-white"
                >
                  Đặt lịch <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              {/* Wrench icon decorative */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[48px] leading-none text-white/15 lg:right-5 lg:text-[56px]" aria-hidden>
                🔧
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
