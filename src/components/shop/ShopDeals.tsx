'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Star, Zap } from 'lucide-react';

/* ---- PRODUCT DATA ---- */

interface Product {
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  image: string;
}

const products: Product[] = [
  {
    name: 'Laptop ASUS TUF Gaming F15',
    price: '18.990.000₫',
    oldPrice: '22.490.000₫',
    discount: '-15%',
    rating: 4.8,
    image: 'https://picsum.photos/seed/asus_tuf/400/400',
  },
  {
    name: 'RAM Kingston Fury 16GB DDR5',
    price: '1.290.000₫',
    oldPrice: '1.690.000₫',
    discount: '-24%',
    rating: 4.9,
    image: 'https://picsum.photos/seed/ram_kingston/400/400',
  },
  {
    name: 'SSD Samsung 990 Pro 1TB',
    price: '2.790.000₫',
    oldPrice: '3.490.000₫',
    discount: '-20%',
    rating: 5.0,
    image: 'https://picsum.photos/seed/ssd_samsung/400/400',
  },
  {
    name: 'Màn hình Dell S2722QC 27" 4K',
    price: '7.990.000₫',
    oldPrice: '9.490.000₫',
    discount: '-16%',
    rating: 4.7,
    image: 'https://picsum.photos/seed/dell_monitor/400/400',
  },
  {
    name: 'Bàn phím cơ Keychron K8 Pro',
    price: '2.190.000₫',
    oldPrice: '2.690.000₫',
    discount: '-19%',
    rating: 4.8,
    image: 'https://picsum.photos/seed/keychron_k8/400/400',
  },
  {
    name: 'Chuột Logitech MX Master 3S',
    price: '1.890.000₫',
    oldPrice: '2.490.000₫',
    discount: '-24%',
    rating: 4.9,
    image: 'https://picsum.photos/seed/mx_master/400/400',
  },
];

/* ---- COUNTDOWN TIMER ---- */

function useCountdown() {
  const [time, setTime] = useState({ hours: 5, minutes: 23, seconds: 47 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) return prev;

        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
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

/* ---- RATING STARS ---- */

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-200 text-slate-200'
          }
        />
      ))}
      <span className="ml-1 text-xs font-medium text-slate-500">{rating}</span>
    </span>
  );
}

/* ---- MAIN COMPONENT ---- */

export default function ShopDeals() {
  const { hours, minutes, seconds } = useCountdown();

  const timerUnits = [
    { value: pad(hours), label: 'Giờ' },
    { value: pad(minutes), label: 'Phút' },
    { value: pad(seconds), label: 'Giây' },
  ];

  return (
    <section className="bg-[#FFF8F0] py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* ---- HEADER ---- */}
        <div className="mb-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: badge + heading */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FF6B00] px-4 py-1.5 text-sm font-bold text-white shadow-md shadow-orange-200">
              <Zap size={16} className="fill-white" />
              Flash Sale
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Ưu đãi sốc hôm nay
            </h2>
          </div>

          {/* Right: countdown */}
          <div className="flex items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-slate-500">
              Kết thúc sau
            </span>
            {timerUnits.map((u, i) => (
              <div key={u.label} className="flex items-center gap-2">
                <div className="flex min-w-[48px] flex-col items-center rounded-xl bg-slate-900 px-3 py-2 shadow-md">
                  <span className="text-lg font-bold leading-none text-white">
                    {u.value}
                  </span>
                  <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    {u.label}
                  </span>
                </div>
                {i < timerUnits.length - 1 && (
                  <span className="text-lg font-bold text-slate-400">:</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---- PRODUCT GRID / SCROLL ---- */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible">
          {products.map((p) => (
            <div
              key={p.name}
              className="group relative min-w-[260px] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:min-w-0"
            >
              {/* Discount badge */}
              <span className="absolute left-3 top-3 z-10 rounded-lg bg-[#FF6B00] px-2.5 py-1 text-xs font-bold text-white shadow">
                {p.discount}
              </span>

              {/* Image */}
              <div className="relative h-36 w-full bg-slate-50 sm:h-48">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 260px, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 p-4">
                <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-tight text-slate-800">
                  {p.name}
                </h3>

                <RatingStars rating={p.rating} />

                {/* Pricing */}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#FF6B00]">
                    {p.price}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {p.oldPrice}
                  </span>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0055DD] active:bg-[#0044BB]"
                >
                  <ShoppingCart size={16} />
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
