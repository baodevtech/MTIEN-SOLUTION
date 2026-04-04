'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';

/* ---- Types ---- */

interface Product {
  name: string;
  category: 'laptop' | 'pc' | 'ngoaivi' | 'phanmem';
  price: string;
  image: string;
  rating: number;
  inStock: boolean;
  badge?: string;
}

/* ---- Data ---- */

const FILTER_TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'laptop', label: 'Laptop' },
  { key: 'pc', label: 'PC & Linh kiện' },
  { key: 'ngoaivi', label: 'Ngoại vi' },
  { key: 'phanmem', label: 'Phần mềm' },
] as const;

const PRODUCTS: Product[] = [
  {
    name: 'Laptop Dell XPS 15',
    category: 'laptop',
    price: '29.990.000₫',
    image: 'https://picsum.photos/seed/dell_xps/400/400',
    rating: 4.8,
    inStock: true,
    badge: 'Best Seller',
  },
  {
    name: 'PC Gaming RTX 4070',
    category: 'pc',
    price: '25.990.000₫',
    image: 'https://picsum.photos/seed/gaming_pc/400/400',
    rating: 4.9,
    inStock: true,
    badge: 'Hot',
  },
  {
    name: 'CPU Intel Core i7-14700K',
    category: 'pc',
    price: '9.490.000₫',
    image: 'https://picsum.photos/seed/intel_cpu/400/400',
    rating: 4.7,
    inStock: true,
  },
  {
    name: 'GPU NVIDIA RTX 4060 Ti',
    category: 'pc',
    price: '11.990.000₫',
    image: 'https://picsum.photos/seed/rtx_4060/400/400',
    rating: 4.8,
    inStock: true,
    badge: 'Mới',
  },
  {
    name: 'Tai nghe Sony WH-1000XM5',
    category: 'ngoaivi',
    price: '6.490.000₫',
    image: 'https://picsum.photos/seed/sony_headphone/400/400',
    rating: 5.0,
    inStock: true,
  },
  {
    name: 'Webcam Logitech Brio 4K',
    category: 'ngoaivi',
    price: '3.990.000₫',
    image: 'https://picsum.photos/seed/logitech_brio/400/400',
    rating: 4.6,
    inStock: false,
  },
  {
    name: 'Windows 11 Pro License',
    category: 'phanmem',
    price: '3.890.000₫',
    image: 'https://picsum.photos/seed/windows_11/400/400',
    rating: 4.5,
    inStock: true,
  },
  {
    name: 'Microsoft 365 Family 1 năm',
    category: 'phanmem',
    price: '1.699.000₫',
    image: 'https://picsum.photos/seed/office_365/400/400',
    rating: 4.7,
    inStock: true,
  },
];

/* ---- Helpers ---- */

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = rating >= i + 1 ? 'full' : rating >= i + 0.5 ? 'half' : 'empty';
        return (
          <Star
            key={i}
            size={13}
            className={
              fill === 'empty'
                ? 'text-slate-200'
                : 'text-amber-400'
            }
            fill={fill !== 'empty' ? 'currentColor' : 'none'}
            strokeWidth={fill === 'empty' ? 1.5 : 0}
          />
        );
      })}
      <span className="ml-0.5 text-xs font-medium text-slate-500">{rating.toFixed(1)}</span>
    </span>
  );
}

function BadgePill({ text }: { text: string }) {
  const colors: Record<string, string> = {
    'Best Seller': 'bg-[#0066FF] text-white',
    Hot: 'bg-[#FF6B00] text-white',
    Mới: 'bg-[#00D68F] text-white',
  };

  return (
    <span
      className={`absolute top-3 right-3 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
        colors[text] ?? 'bg-slate-800 text-white'
      }`}
    >
      {text}
    </span>
  );
}

/* ---- Component ---- */

export default function ShopProducts() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filtered =
    activeTab === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="bg-slate-50 py-16 md:py-20" aria-label="Sản phẩm nổi bật">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* ---- Header & Filter Tabs ---- */}
        <div className="mb-10 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Sản phẩm nổi bật
          </h2>

          <div className="scrollbar-hide flex gap-2 overflow-x-auto">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---- Product Grid ---- */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {filtered.map((product) => (
            <article
              key={product.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-[#0066FF]/30 hover:shadow-md"
            >
              {/* Badge */}
              {product.badge && <BadgePill text={product.badge} />}

              {/* Image */}
              <div className="relative h-44 w-full bg-slate-50 p-4 md:h-52">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-slate-900">
                  {product.name}
                </h3>

                <div className="mt-2">
                  <StarRating rating={product.rating} />
                </div>

                <p className="mt-auto pt-3 text-lg font-bold text-slate-900">
                  {product.price}
                </p>

                {/* Stock status */}
                <span
                  className={`mt-1.5 text-xs font-medium ${
                    product.inStock ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                </span>

                {/* Action */}
                {product.inStock ? (
                  <button
                    type="button"
                    aria-label={`Thêm ${product.name} vào giỏ hàng`}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-colors"
                    style={{
                      background: 'linear-gradient(135deg, #0066FF 0%, #0055DD 100%)',
                    }}
                  >
                    <ShoppingCart size={15} strokeWidth={2.2} />
                    Thêm vào giỏ
                  </button>
                ) : (
                  <span className="mt-3 block w-full rounded-xl bg-slate-100 py-2.5 text-center text-sm font-medium text-slate-400">
                    Tạm hết hàng
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* ---- View All Link ---- */}
        <div className="mt-12 text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#0055DD]"
            style={{ color: '#0066FF' }}
          >
            Xem tất cả sản phẩm
            <ArrowRight size={16} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
}
