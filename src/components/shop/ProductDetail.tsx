"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ShoppingCart,
  Zap,
  Shield,
  RefreshCw,
  Truck,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Check,
  Package,
  Wrench,
  Phone,
  BadgeCheck,
  Gift,
  CreditCard,
  Settings,
  AlertCircle
} from 'lucide-react';
import type { Product } from '@/data/products';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`h-3.5 w-3.5 ${
              s <= Math.floor(rating) ? 'fill-orange-400 text-orange-400' : 'fill-slate-200 text-slate-200'
            }`}
          />
        ))}
      </div>
      <span className="text-[12px] font-bold text-orange-500">{rating}</span>
      <span className="text-[12px] text-blue-600 hover:text-blue-700 cursor-pointer font-medium transition-colors">({count} đánh giá)</span>
    </div>
  );
}

function BadgeComp({ badge }: { badge: string }) {
  const cfg: Record<string, string> = {
    'Best Seller': 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_4px_10px_-2px_rgba(244,63,94,0.4)]',
    Hot: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-[0_4px_10px_-2px_rgba(236,72,153,0.4)]',
    'Flash Sale': 'bg-gradient-to-r from-blue-600 to-indigo-400 text-white shadow-[0_4px_10px_-2px_rgba(99,102,241,0.4)]',
    'Mới': 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-[0_4px_10px_-2px_rgba(20,184,166,0.4)]',
  };
  return (
    <span className={`rounded-full uppercase px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider ${cfg[badge] ?? 'bg-slate-100 text-slate-600'}`}>
      {badge}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Image Gallery                                                       */
/* ------------------------------------------------------------------ */

function ImageGallery({ images, name, discount }: { images: string[]; name: string; discount?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-5 sm:p-6 ring-1 ring-slate-900/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.08)] group">
        <div className="relative aspect-square w-full">
          <Image
            src={images[active] ?? images[0]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
        </div>
        {discount && (
          <div className="absolute left-4 top-4 rounded-full bg-rose-500/90 backdrop-blur-md px-3 py-1 text-[10px] font-black tracking-wider text-white shadow-[0_10px_20px_-5px_rgba(244,63,94,0.5)]">
            {discount}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2.5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-300 ${
                i === active
                  ? 'ring-2 ring-blue-500 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] scale-[1.02] bg-white'
                  : 'ring-1 ring-slate-900/5 bg-white/60 hover:bg-white hover:ring-slate-900/10 hover:shadow-sm'
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Related Product Card                                                */
/* ------------------------------------------------------------------ */

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-3 ring-1 ring-slate-900/5 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:ring-blue-500/20 hover:-translate-y-0.5"
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-slate-50/50 mb-3 transition-colors group-hover:bg-slate-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 200px"
          className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {product.discount && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-black tracking-wider text-white shadow-sm">
            {product.discount}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-1.5 pb-1">
        <p className="line-clamp-2 text-[13px] font-semibold text-slate-700 leading-snug group-hover:text-blue-600 transition-colors mb-1">
          {product.name}
        </p>
        <div className="mt-auto">
          <p className="text-[15px] font-black text-blue-600">{product.priceDisplay}</p>
          {product.oldPriceDisplay && (
            <p className="text-[11px] font-medium text-slate-400 line-through mt-0.5">{product.oldPriceDisplay}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

interface ProductDetailProps {
  product: Product;
  related: Product[];
  categoryName: string;
}

export default function ProductDetail({ product, related, categoryName }: ProductDetailProps) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [wished, setWished] = useState(false);

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const quickSpecs = product.specs ? product.specs.slice(0, 4) : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 sm:pb-32 font-sans selection:bg-blue-200">
      {/* Soft Breadcrumb */}
      <nav className="bg-white/60 backdrop-blur-xl border-b border-white/40 sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-2.5 text-[12px] font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link href="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-blue-600 transition-colors">
            {categoryName}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="text-slate-900 font-semibold truncate max-w-[120px] sm:max-w-xs md:max-w-md">
            {product.name}
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {/* Top Section: Title on Mobile */}
        <div className="mb-6 lg:hidden space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black tracking-wider text-blue-600 bg-blue-500/10 px-2.5 py-1 rounded-full">
              {product.brand}
            </span>
            {product.badge && <BadgeComp badge={product.badge} />}
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 ring-1 ring-slate-200 px-2.5 py-1 rounded-full">
              SKU: {product.sku}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
            {product.name}
          </h1>
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Image Gallery (Span 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <ImageGallery 
                images={product.images.length > 0 ? product.images : [product.image]} 
                name={product.name}
                discount={product.discount}
              />
            </div>
          </div>

          {/* Middle Column: Main Info & Actions (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            <div className="hidden lg:block space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-black tracking-wider text-blue-600 bg-blue-500/10 px-2.5 py-1 rounded-full">
                  {product.brand}
                </span>
                {product.badge && <BadgeComp badge={product.badge} />}
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 ml-auto">
                  SKU: {product.sku}
                </span>
              </div>
              <h1 className="text-[1.75rem] font-black text-slate-900 leading-[1.2] tracking-tight">
                {product.name}
              </h1>
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>

            {/* Premium Soft Pricing Box */}
            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-50/80 via-white to-white p-5 ring-1 ring-blue-900/5 shadow-sm">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col gap-1">
                {product.oldPriceDisplay && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    {product.oldPriceDisplay}
                  </span>
                )}
                <span className="text-3xl lg:text-4xl font-black text-blue-600 tracking-tighter">
                  {product.priceDisplay}
                </span>
              </div>
              {savings > 0 && (
                <div className="relative z-10 mt-3 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-400/5 px-3 py-1.5 text-[11px] font-bold text-emerald-600 ring-1 ring-emerald-500/20">
                  <Heart className="h-3 w-3 fill-emerald-500 text-emerald-500" />
                  Tiết kiệm {savings.toLocaleString('vi-VN')}đ
                </div>
              )}
            </div>

            {/* Soft Promos Box */}
            <div className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-rose-900/5 shadow-sm">
              <div className="bg-gradient-to-r from-rose-50/80 to-white px-4 py-3 flex items-center gap-2">
                <div className="bg-rose-100/80 p-1.5 rounded-lg text-rose-500">
                  <Gift className="h-4 w-4 shadow-sm" />
                </div>
                <h3 className="font-extrabold text-rose-600 uppercase tracking-widest text-[11px]">Ưu đãi đặc biệt</h3>
              </div>
              <div className="p-4 pt-2 space-y-2.5">
                <div className="group flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-lg bg-rose-50/50 flex items-center justify-center shrink-0 ring-1 ring-rose-100 transition-colors group-hover:bg-rose-100 mt-0.5">
                    <span className="text-[9px] font-black text-rose-500">1</span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-snug">Giảm thêm <strong className="text-slate-800">5%</strong> cho khách hàng B2B.</p>
                </div>
                <div className="group flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-lg bg-rose-50/50 flex items-center justify-center shrink-0 ring-1 ring-rose-100 transition-colors group-hover:bg-rose-100 mt-0.5">
                    <span className="text-[9px] font-black text-rose-500">2</span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-snug">Tặng gói bảo trì, triển khai trị giá <strong className="text-slate-800">2,500,000đ</strong>.</p>
                </div>
                <div className="group flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-lg bg-rose-50/50 flex items-center justify-center shrink-0 ring-1 ring-rose-100 transition-colors group-hover:bg-rose-100 mt-0.5">
                    <span className="text-[9px] font-black text-rose-500">3</span>
                  </div>
                  <p className="text-[12.5px] text-slate-600 leading-snug">Miễn phí giao hàng toàn quốc.</p>
                </div>
              </div>
            </div>

            {/* Quick Specs - Tighter Pill Style */}
            {quickSpecs.length > 0 && (
              <div className="rounded-[1.5rem] bg-white/60 p-5 ring-1 ring-slate-900/5 shadow-sm backdrop-blur-sm">
                <h3 className="font-extrabold text-slate-800 mb-3 text-[11px] flex items-center gap-1.5 uppercase tracking-widest">
                  <Settings className="h-3.5 w-3.5 text-blue-500"/>
                  Thông số nhanh
                </h3>
                <div className="flex flex-wrap gap-2">
                  {quickSpecs.map((spec, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 ring-1 ring-slate-900/5 shadow-sm text-[11.5px] group hover:ring-blue-500/20 transition-all cursor-default">
                      <span className="font-medium text-slate-500">{spec.label}:</span>
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('specs')} 
                  className="mt-4 w-full py-2.5 text-center text-[12px] font-bold text-slate-600 bg-white ring-1 ring-slate-900/5 hover:ring-slate-900/10 hover:text-blue-600 hover:shadow-sm transition-all inline-flex justify-center items-center gap-1.5 rounded-xl"
                >
                  Xem toàn bộ thông số <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Soft Action Box - Smaller Height */}
            <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-slate-900/5 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái</span>
                {product.inStock ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-black text-emerald-600 bg-emerald-50/80 px-3 py-1.5 rounded-xl shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Còn hàng
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[11px] font-black text-red-500 bg-red-50/80 px-3 py-1.5 rounded-xl shadow-sm">
                    <AlertCircle className="h-3 w-3" /> Hết hàng
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Số lượng</span>
                <div className="flex h-10 w-28 items-center justify-between rounded-xl bg-slate-50 ring-1 ring-slate-200/50 p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="flex h-full w-8 items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-white rounded-lg transition-all hover:shadow-sm"
                    disabled={!product.inStock}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-[13px] font-black text-slate-800">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="flex h-full w-8 items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-white rounded-lg transition-all hover:shadow-sm"
                    disabled={!product.inStock}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button 
                  disabled={!product.inStock}
                  className="col-span-2 group relative flex h-12 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-[14px] transition-all hover:bg-blue-700 hover:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.5)] disabled:opacity-50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  MUA TỪ {product.priceDisplay}
                </button>
                <button 
                  disabled={!product.inStock}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-blue-50/50 text-blue-600 font-bold text-[12px] hover:bg-blue-100/50 hover:shadow-sm transition-all ring-1 ring-blue-100 disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" /> THÊM GIỎ
                </button>
                <button className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-white text-slate-600 font-bold text-[12px] hover:bg-red-50/50 hover:text-rose-500 hover:shadow-sm ring-1 ring-slate-200 transition-all group">
                  <Heart className={`h-4 w-4 transition-transform group-hover:scale-110 ${wished ? 'fill-rose-500 text-rose-500' : ''}`} onClick={() => setWished(!wished)} />
                  LƯU LẠI
                </button>
              </div>
            </div>
            
          </div>

          {/* Right Column: Policies & Trust (Span 3) */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-5">
            {/* Glassy Policies Box */}
            <div className="rounded-[1.5rem] bg-white/80 backdrop-blur-md p-5 sm:p-6 ring-1 ring-slate-900/5 shadow-sm">
              <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]">
                <Shield className="h-4 w-4 text-emerald-500" /> An tâm mua sắm
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start group">
                  <div className="h-8 w-8 rounded-xl bg-emerald-50/80 text-emerald-500 flex items-center justify-center shrink-0 ring-1 ring-emerald-100 group-hover:bg-emerald-100 transition-colors">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div className="pt-0.5">
                    <span className="block text-[12px] font-bold text-slate-800">100% Chính hãng</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-snug">Cam kết CO/CQ đầy đủ</span>
                  </div>
                </li>
                <li className="flex gap-3 items-start group">
                  <div className="h-8 w-8 rounded-xl bg-blue-50/80 text-blue-500 flex items-center justify-center shrink-0 ring-1 ring-blue-100 group-hover:bg-blue-100 transition-colors">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <div className="pt-0.5">
                    <span className="block text-[12px] font-bold text-slate-800">Bảo hành {product.warranty}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-snug">Đổi mới linh kiện dễ dàng</span>
                  </div>
                </li>
                <li className="flex gap-3 items-start group">
                  <div className="h-8 w-8 rounded-xl bg-orange-50/80 text-orange-500 flex items-center justify-center shrink-0 ring-1 ring-orange-100 group-hover:bg-orange-100 transition-colors">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="pt-0.5">
                    <span className="block text-[12px] font-bold text-slate-800">Giao nhanh 24h</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-snug">Freeship nội thành & dự án</span>
                  </div>
                </li>
                <li className="flex gap-3 items-start group">
                  <div className="h-8 w-8 rounded-xl bg-purple-50/80 text-purple-500 flex items-center justify-center shrink-0 ring-1 ring-purple-100 group-hover:bg-purple-100 transition-colors">
                    <RefreshCw className="h-4 w-4" />
                  </div>
                  <div className="pt-0.5">
                    <span className="block text-[12px] font-bold text-slate-800">Đổi trả 15 ngày</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-snug">Lỗi NSX hỗ trợ thu đổi tốc độ</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Glowing Hotline banner */}
            <div className="rounded-[1.5rem] bg-gradient-to-b from-blue-600 to-indigo-700 p-5 sm:p-6 text-white shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] overflow-hidden relative group">
              <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="bg-white/20 p-2.5 rounded-xl shadow-inner backdrop-blur-md ring-1 ring-white/30">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-[11px] uppercase tracking-widest text-blue-100 mb-0.5">Tổng đài dự án</h4>
                  <p className="text-[12px] font-semibold">Tư vấn B2B chuyên sâu</p>
                </div>
              </div>
              <a href="tel:0922053651" className="flex items-center justify-center w-full bg-white text-indigo-700 font-black text-[18px] py-2.5 rounded-xl mt-1 shadow-md hover:scale-[1.02] transition-all duration-300 relative z-10">
                0922 053 651
              </a>
            </div>
            
          </div>
        </div>

        {/* ============================================================ */}
        {/* Soft Detail Tabs Section                                    */}
        {/* ============================================================ */}
        <div className="mt-12 lg:mt-16">
          {/* Floating Pill Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex gap-1.5 p-1.5 bg-white/80 backdrop-blur-xl ring-1 ring-slate-900/5 rounded-full shadow-[0_5px_15px_-10px_rgba(0,0,0,0.05)] overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('desc')}
                className={`py-2 px-5 sm:px-6 text-[13px] font-bold rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'desc'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Đặc điểm nổi bật
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-2 px-5 sm:px-6 text-[13px] font-bold rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Cấu hình chi tiết
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-5 sm:px-6 text-[13px] font-bold rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                Đánh giá ({product.reviewCount})
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 sm:p-10 ring-1 ring-slate-900/5 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.04)] min-h-[350px]">
            {activeTab === 'desc' && (
              <div className="prose prose-slate max-w-4xl prose-img:rounded-2xl mx-auto prose-headings:text-slate-900 prose-headings:font-black prose-a:text-blue-600 prose-p:text-[14.5px] prose-p:leading-loose">
                <h2 className="text-xl md:text-2xl mb-6 text-center">Đánh giá chi tiết {product.name}</h2>
                <div dangerouslySetInnerHTML={{ __html: product.description }} className="text-slate-600 space-y-5" />
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 items-center justify-center mb-4 ring-1 ring-blue-100">
                    <Wrench className="h-6 w-6"/>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Bảng thông số kỹ thuật</h2>
                </div>
                
                {product.specs && product.specs.length > 0 ? (
                  <div className="overflow-hidden rounded-2xl ring-1 ring-slate-900/5 shadow-sm">
                    <table className="w-full text-left text-[14px]">
                      <tbody className="divide-y divide-slate-100">
                        {product.specs.map((spec, idx) => (
                          <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                            <th className="py-4 px-6 font-bold text-slate-700 w-1/3 bg-slate-50/50 group-hover:bg-blue-50/50 transition-colors">{spec.label}</th>
                            <td className="py-4 px-6 font-medium text-slate-600 bg-white">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl ring-1 ring-slate-100 text-slate-500 font-medium text-[14px]">
                    Đang cập nhật thông số kỹ thuật cho sản phẩm này...
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl mx-auto text-center py-12">
                 <div className="inline-flex h-16 w-16 rounded-full bg-slate-50 text-slate-300 items-center justify-center mb-5 ring-1 ring-slate-100">
                   <Star className="h-8 w-8 fill-current" />
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-2">Chưa có đánh giá</h3>
                 <p className="text-[14px] text-slate-500 mb-8">Trở thành người đầu tiên chia sẻ trải nghiệm về {product.name}</p>
                 <button className="font-extrabold text-[13px] uppercase tracking-widest bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
                   Viết đánh giá ngay
                 </button>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* Similar Products                                            */}
        {/* ============================================================ */}
        {related.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="tracking-tight">Có thể bạn quan tâm</span>
              <Link href={`/shop?category=${product.category}`} className="text-[12px] font-extrabold tracking-wide uppercase text-blue-600 hover:text-white flex items-center gap-1.5 bg-blue-50 hover:bg-blue-600 px-4 py-2 rounded-full transition-all group w-fit">
                Xem tất cả <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Bar for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-2.5 bg-white/90 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl ring-1 ring-slate-900/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] lg:hidden">
        <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-slate-500 hover:text-rose-500 transition-colors">
          <Heart className={`h-5 w-5 ${wished ? 'fill-rose-500 text-rose-500' : ''}`} onClick={() => setWished(!wished)} />
        </button>
        <button 
          disabled={!product.inStock}
          className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-black text-[14px] disabled:opacity-50 shadow-[0_5px_15px_-5px_rgba(37,99,235,0.5)]"
        >
          {product.inStock ? 'THÊM GIỎ HÀNG' : 'TẠM HẾT HÀNG'}
        </button>
      </div>
    </div>
  );
}