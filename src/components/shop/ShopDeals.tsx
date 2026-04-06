'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { getFlashSaleProducts } from '@/data/products';

function useCountdown() {
  const [time, setTime] = useState({ hours: 5, minutes: 23, seconds: 47 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) return prev;
        seconds -= 1;
        if (seconds < 0) { seconds = 59; minutes -= 1; }
        if (minutes < 0) { minutes = 59; hours -= 1; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function formatSold(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

export default function ShopDeals() {
  const { hours, minutes, seconds } = useCountdown();
  const products = getFlashSaleProducts();

  return (
    <section className="bg-gradient-to-r from-[#FFF5F0] to-[#FFF0E6] py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-md bg-[#FF6B00] px-2.5 py-1 text-[13px] font-bold text-white">
            <Zap size={14} className="fill-white" />
            Flash Sale
          </span>

          <span className="text-[13px] font-medium text-slate-500">
            Kết thúc sau
          </span>

          <div className="flex items-center gap-1">
            {[pad(hours), pad(minutes), pad(seconds)].map((v, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-[#FF6B00] text-[11px] font-bold text-white">
                  {v}
                </span>
                {i < 2 && <span className="text-[11px] font-bold text-slate-400">:</span>}
              </span>
            ))}
          </div>

          <Link
            href="/shop?sale=true"
            className="ml-auto flex items-center gap-0.5 text-[13px] font-semibold text-[#FF6B00] transition-colors hover:text-[#e65e00]"
          >
            Xem tất cả
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="flex gap-2 overflow-x-auto snap-x scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
          {products.slice(0, 6).map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group relative min-w-[150px] flex-shrink-0 snap-start overflow-hidden rounded-xl border border-slate-100 bg-white p-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:min-w-0"
            >
              {/* Discount badge */}
              {product.discount && (
                <span className="absolute left-1.5 top-1.5 z-10 rounded bg-[#FF6B00] px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {product.discount}
                </span>
              )}

              {/* Image */}
              <div className="relative mx-auto h-24 w-full rounded-lg bg-slate-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="150px"
                  className="object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="mt-1.5 flex flex-col gap-0.5">
                <h3 className="line-clamp-2 min-h-[2rem] text-[11px] font-medium leading-tight text-slate-800">
                  {product.name}
                </h3>
                <span className="text-[13px] font-bold text-[#FF6B00]">
                  {product.priceDisplay}
                </span>
                {product.oldPriceDisplay && (
                  <span className="text-[10px] text-slate-400 line-through">
                    {product.oldPriceDisplay}
                  </span>
                )}
                <span className="text-[9px] text-slate-400">
                  Đã bán {formatSold(product.sold)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
