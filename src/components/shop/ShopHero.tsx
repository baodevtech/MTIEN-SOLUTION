'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Laptop,
  Monitor,
  Cpu,
  Mouse,
  AppWindow,
  Star,
  ShieldCheck,
  Truck,
  ChevronRight,
  Zap,
  Tag,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  { label: 'Laptop', icon: Laptop },
  { label: 'PC', icon: Monitor },
  { label: 'Linh kiện', icon: Cpu },
  { label: 'Ngoại vi', icon: Mouse },
  { label: 'Phần mềm', icon: AppWindow },
] as const;

const featuredProduct = {
  name: 'MacBook Air M3 15"',
  price: '32.990.000₫',
  oldPrice: '34.990.000₫',
  specs: ['Apple M3 chip', '16GB RAM', '512GB SSD', '15.3" Liquid Retina'],
  image: 'https://picsum.photos/seed/macbook_m3/600/400',
  badge: 'Giảm 6%',
};

const trustBadges = [
  { icon: ShieldCheck, text: 'Chính hãng 100%' },
  { icon: Truck, text: 'Giao hàng toàn quốc' },
  { icon: Star, text: 'Đánh giá 4.9/5' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ShopHero() {
  const [query, setQuery] = useState('');

  return (
    <section
      aria-label="Shop hero banner"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #0066FF 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #00D68F 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* -------- LEFT COLUMN -------- */}
          <div className="flex flex-col gap-8">
            {/* Trust badges row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              {trustBadges.map((b) => (
                <span key={b.text} className="flex items-center gap-1.5">
                  <b.icon className="h-4 w-4 text-[#00D68F]" strokeWidth={2.2} />
                  {b.text}
                </span>
              ))}
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl xl:text-[3.5rem]">
                MTIEN{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #0066FF 0%, #0099FF 100%)',
                  }}
                >
                  TECH STORE
                </span>
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
                Nhà phân phối uỷ quyền các thương hiệu công nghệ hàng đầu.
                Cam&nbsp;kết chính hãng&nbsp;—&nbsp;bảo hành tận nơi&nbsp;—&nbsp;giá tốt nhất thị&nbsp;trường.
              </p>
            </div>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <label htmlFor="shop-search" className="sr-only">
                Tìm kiếm sản phẩm
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                strokeWidth={2}
              />
              <input
                id="shop-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm laptop, PC, linh kiện..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-28 text-sm text-slate-700 shadow-sm outline-none transition-shadow placeholder:text-slate-400 focus:border-[#0066FF]/40 focus:ring-2 focus:ring-[#0066FF]/10 sm:text-base"
              />
              <button
                type="button"
                aria-label="Tìm kiếm"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, #0066FF 0%, #0055DD 100%)',
                }}
              >
                Tìm kiếm
              </button>
            </div>

            {/* Category pills */}
            <nav aria-label="Danh mục nổi bật" className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-[#0066FF]/30 hover:text-[#0066FF] hover:shadow-md active:scale-[0.97]"
                >
                  <cat.icon className="h-4 w-4" strokeWidth={2} />
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>

          {/* -------- RIGHT COLUMN – Featured product -------- */}
          <div className="flex justify-center lg:justify-end">
            <article
              aria-label={`Sản phẩm nổi bật: ${featuredProduct.name}`}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/60"
            >
              {/* Badge */}
              <span
                className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-white"
                style={{ background: '#FF6B00' }}
              >
                <Tag className="h-3 w-3" strokeWidth={2.5} />
                {featuredProduct.badge}
              </span>

              {/* Product image */}
              <div className="relative aspect-[3/2] w-full bg-gradient-to-b from-slate-50 to-white">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                {/* Name + rating */}
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {featuredProduct.name}
                  </h2>
                  <div className="flex items-center gap-1" aria-label="Đánh giá 5 sao">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        strokeWidth={0}
                      />
                    ))}
                    <span className="ml-1 text-xs text-slate-400">(128)</span>
                  </div>
                </div>

                {/* Specs */}
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {featuredProduct.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
                      <Zap className="h-3 w-3 shrink-0 text-[#0066FF]" strokeWidth={2.5} />
                      {spec}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-end justify-between gap-4 pt-1">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 line-through">
                      {featuredProduct.oldPrice}
                    </span>
                    <span className="text-xl font-extrabold text-[#0066FF] sm:text-2xl">
                      {featuredProduct.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="group flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
                    style={{
                      background: 'linear-gradient(135deg, #0066FF 0%, #0055DD 100%)',
                    }}
                  >
                    Mua ngay
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
