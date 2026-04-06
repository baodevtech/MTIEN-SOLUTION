'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, ArrowRight, Zap } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/data/products';

const FILTER_TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'laptop', label: 'Laptop' },
  { key: 'pc', label: 'PC & Linh kiện' },
  { key: 'ngoaivi', label: 'Ngoại vi' },
  { key: 'phanmem', label: 'Phần mềm' },
] as const;

const SORT_OPTIONS = [
  { key: 'default', label: 'Nổi bật' },
  { key: 'price-asc', label: 'Giá tăng dần' },
  { key: 'price-desc', label: 'Giá giảm dần' },
  { key: 'rating', label: 'Đánh giá cao' },
] as const;

function sortProducts(products: Product[], sort: string): Product[] {
  switch (sort) {
    case 'price-asc': return [...products].sort((a, b) => a.price - b.price);
    case 'price-desc': return [...products].sort((a, b) => b.price - a.price);
    case 'rating': return [...products].sort((a, b) => b.rating - a.rating);
    default: return products;
  }
}

const BADGE_STYLE: Record<string, string> = {
  'Best Seller': 'bg-orange-500 text-white',
  Hot: 'bg-red-500 text-white',
  'Flash Sale': 'bg-[#0066FF] text-white',
  Mới: 'bg-emerald-500 text-white',
};

export default function ShopProducts() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [sort, setSort] = useState<string>('default');

  const filtered = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        if (activeTab === 'pc') return p.category === 'pc' || p.category === 'linhkien';
        return p.category === activeTab;
      });

  const sorted = sortProducts(filtered, sort);

  return (
    <section className="bg-gray-50 py-10 md:py-12" aria-label="Sản phẩm nổi bật">
      <div className="mx-auto max-w-7xl px-4">

        {/* Header row */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-gray-900 md:text-[22px]">Sản phẩm nổi bật</h2>
            <p className="text-[12px] text-gray-400">{sorted.length} sản phẩm</p>
          </div>
          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-gray-600 outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/20"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Filter Tabs */}
        <div className="mb-5 flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all duration-150 ${
                activeTab === tab.key
                  ? 'border-[#0066FF] bg-[#0066FF] text-white shadow-sm'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid — 2 cols mobile, 3 tablet, 5 desktop */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sorted.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF]/30 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative bg-gray-50">
                <div className="relative aspect-square w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Top-left: discount badge */}
                {product.discount && (
                  <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {product.discount}
                  </span>
                )}
                {/* Top-right: badge */}
                {product.badge && !product.discount && (
                  <span className={`absolute right-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-bold ${BADGE_STYLE[product.badge] ?? 'bg-gray-800 text-white'}`}>
                    {product.badge}
                  </span>
                )}
                {/* Flash sale icon */}
                {product.badge === 'Flash Sale' && (
                  <span className="absolute bottom-2 left-2 flex items-center gap-0.5 rounded-full bg-[#FF6B00] px-1.5 py-0.5 text-[9px] font-bold text-white">
                    <Zap className="h-2.5 w-2.5 fill-white" /> Sale
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-1 p-3">
                <p className="line-clamp-2 text-[12px] font-medium leading-tight text-gray-800 group-hover:text-[#0066FF]">
                  {product.name}
                </p>

                {/* Rating row */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-2.5 w-2.5 ${s <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">{product.rating}</span>
                  <span className="text-[10px] text-gray-300">·</span>
                  <span className="text-[10px] text-gray-400">
                    {product.sold >= 1000 ? `${(product.sold / 1000).toFixed(1).replace(/\.0$/, '')}k` : product.sold} đã bán
                  </span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-1">
                  <p className="text-[14px] font-bold text-[#0066FF]">{product.priceDisplay}</p>
                  {product.oldPriceDisplay && (
                    <p className="text-[11px] text-gray-400 line-through">{product.oldPriceDisplay}</p>
                  )}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  disabled={!product.inStock}
                  className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-[#0066FF] text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? (
                    <><ShoppingCart className="h-3.5 w-3.5" /> Thêm giỏ hàng</>
                  ) : 'Hết hàng'}
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0066FF] px-6 py-2.5 text-[13px] font-semibold text-[#0066FF] transition-colors hover:bg-[#0066FF] hover:text-white"
          >
            Xem tất cả sản phẩm <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
