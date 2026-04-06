'use client';

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
  Share2,
  Minus,
  Plus,
  Check,
  Package,
  Wrench,
  Phone,
  BadgeCheck,
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
              s <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-[12px] font-semibold text-amber-500">{rating}</span>
      <span className="text-[11px] text-gray-400">({count} đánh giá)</span>
    </div>
  );
}

function BadgeComp({ badge }: { badge: string }) {
  const cfg: Record<string, string> = {
    'Best Seller': 'bg-orange-500 text-white',
    Hot: 'bg-red-500 text-white',
    'Flash Sale': 'bg-[#0066FF] text-white',
    Mới: 'bg-green-500 text-white',
  };
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${cfg[badge] ?? 'bg-gray-200 text-gray-700'}`}>
      {badge}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Image Gallery                                                       */
/* ------------------------------------------------------------------ */

function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        <div className="relative aspect-square w-full">
          <Image
            src={images[active]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-contain p-4 transition-opacity duration-200"
            priority
          />
        </div>
        {/* Zoom hint */}
        <div className="absolute bottom-2 right-2 rounded-full bg-black/20 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
              i === active
                ? 'border-[#0066FF] shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            aria-label={`Ảnh ${i + 1}`}
          >
            <Image
              src={img}
              alt={`${name} ${i + 1}`}
              fill
              sizes="64px"
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust Badges                                                        */
/* ------------------------------------------------------------------ */

const trustBadges = [
  { icon: Shield, label: 'Chính hãng 100%', color: 'text-blue-600' },
  { icon: RefreshCw, label: 'Đổi trả 7 ngày', color: 'text-green-600' },
  { icon: Truck, label: 'Giao hàng nhanh', color: 'text-orange-500' },
  { icon: Package, label: 'Đóng gói cẩn thận', color: 'text-purple-600' },
];

/* ------------------------------------------------------------------ */
/*  Tabs                                                                */
/* ------------------------------------------------------------------ */

const TABS = ['Mô tả', 'Thông số kỹ thuật', 'Đánh giá'] as const;
type Tab = (typeof TABS)[number];

/* ------------------------------------------------------------------ */
/*  Related Product Card                                                */
/* ------------------------------------------------------------------ */

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 200px"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
        {product.discount && (
          <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {product.discount}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 text-[12px] font-medium text-gray-800 leading-tight">{product.name}</p>
        <div className="mt-auto">
          <p className="text-[13px] font-bold text-[#0066FF]">{product.priceDisplay}</p>
          {product.oldPriceDisplay && (
            <p className="text-[11px] text-gray-400 line-through">{product.oldPriceDisplay}</p>
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
  const [activeTab, setActiveTab] = useState<Tab>('Mô tả');
  const [wished, setWished] = useState(false);

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <>
      {/* ============================================================ */}
      {/* Breadcrumb                                                    */}
      {/* ============================================================ */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2.5 text-[11px] text-gray-500">
          <Link href="/" className="hover:text-[#0066FF]">Trang chủ</Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <Link href="/shop" className="hover:text-[#0066FF]">Shop</Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-[#0066FF]">
            {categoryName}
          </Link>
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
          <span className="truncate font-medium text-gray-700">{product.name}</span>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* Product Main Section                                          */}
      {/* ============================================================ */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[480px_1fr]">

            {/* ---------- Left: Gallery ---------- */}
            <div className="md:sticky md:top-4 md:self-start">
              <ImageGallery images={product.images} name={product.name} />

              {/* Action row */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setWished((w) => !w)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors ${
                    wished
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wished ? 'fill-red-500 text-red-500' : ''}`} />
                  {wished ? 'Đã lưu' : 'Lưu yêu thích'}
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-[12px] font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700">
                  <Share2 className="h-4 w-4" />
                  Chia sẻ
                </button>
              </div>
            </div>

            {/* ---------- Right: Info ---------- */}
            <div className="flex flex-col gap-5">

              {/* Badges + Brand */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/shop?brand=${product.brand}`}
                  className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-600 hover:border-[#0066FF] hover:text-[#0066FF]"
                >
                  {product.brand}
                </Link>
                {product.badge && <BadgeComp badge={product.badge} />}
                {product.inStock ? (
                  <span className="flex items-center gap-1 text-[11px] text-green-600">
                    <Check className="h-3.5 w-3.5" /> Còn hàng
                  </span>
                ) : (
                  <span className="text-[11px] text-red-500">Hết hàng</span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-[20px] font-bold leading-tight text-gray-900 md:text-[24px]">
                {product.name}
              </h1>

              {/* Rating + Sold */}
              <div className="flex flex-wrap items-center gap-3">
                <StarRating rating={product.rating} count={product.reviewCount} />
                <span className="text-gray-300">|</span>
                <span className="text-[12px] text-gray-500">
                  Đã bán: <strong className="text-gray-700">{product.sold.toLocaleString('vi-VN')}</strong>
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-[12px] text-gray-500">SKU: <span className="font-mono text-gray-700">{product.sku}</span></span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Price Block */}
              <div className="rounded-xl bg-blue-50 px-5 py-4">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-[28px] font-extrabold text-[#0066FF] md:text-[32px]">
                    {product.priceDisplay}
                  </span>
                  {product.oldPriceDisplay && (
                    <span className="mb-1 text-[16px] text-gray-400 line-through">
                      {product.oldPriceDisplay}
                    </span>
                  )}
                  {product.discount && (
                    <span className="mb-1 rounded-full bg-red-500 px-2 py-0.5 text-[12px] font-bold text-white">
                      {product.discount}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="mt-1 text-[12px] text-green-600">
                    Tiết kiệm <strong>{savings.toLocaleString('vi-VN')}₫</strong>
                  </p>
                )}
                <p className="mt-1 text-[11px] text-gray-500">
                  Bảo hành: <span className="font-semibold text-gray-700">{product.warranty}</span>
                </p>
              </div>

              {/* Short Desc */}
              <p className="text-[13px] leading-relaxed text-gray-600">{product.shortDesc}</p>

              {/* Key Specs (first 4) */}
              <div className="grid grid-cols-2 gap-2">
                {product.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{spec.label}</p>
                    <p className="text-[12px] font-semibold text-gray-800">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Quantity + CTA */}
              <div className="flex flex-col gap-3">
                {/* Qty */}
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-gray-600">Số lượng:</span>
                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-9 w-9 items-center justify-center hover:bg-gray-100 disabled:opacity-40"
                      disabled={qty <= 1}
                      aria-label="Giảm"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center text-[13px] font-semibold">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
                      aria-label="Tăng"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <button
                    disabled={!product.inStock}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#0066FF] bg-white px-6 py-3 text-[14px] font-bold text-[#0066FF] transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Thêm vào giỏ
                  </button>
                  <button
                    disabled={!product.inStock}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Zap className="h-5 w-5" />
                    Mua ngay
                  </button>
                </div>

                {/* Contact */}
                <a
                  href="tel:1900xxxx"
                  className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-2.5 text-[12px] font-medium text-gray-500 hover:border-[#0066FF] hover:text-[#0066FF]"
                >
                  <Phone className="h-4 w-4" />
                  Tư vấn miễn phí: 1900.xxxx
                </a>
              </div>

              {/* Trust Grid */}
              <div className="grid grid-cols-2 gap-2">
                {trustBadges.map((t) => (
                  <div key={t.label} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2.5">
                    <t.icon className={`h-4 w-4 flex-shrink-0 ${t.color}`} />
                    <span className="text-[11px] font-medium text-gray-700">{t.label}</span>
                  </div>
                ))}
              </div>

            </div>{/* end Right */}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Tabbed Detail Section                                        */}
      {/* ============================================================ */}
      <div className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-xl bg-white shadow-sm">

            {/* Tab Nav */}
            <div className="flex border-b border-gray-100">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3.5 text-[13px] font-semibold transition-colors md:flex-none md:px-8 ${
                    activeTab === tab
                      ? 'border-b-2 border-[#0066FF] text-[#0066FF]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {tab === 'Đánh giá' && (
                    <span className="ml-1 text-[11px] text-gray-400">({product.reviewCount})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-5 md:p-8">

              {/* === Mô tả === */}
              {activeTab === 'Mô tả' && (
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="text-[14px] leading-relaxed">{product.description}</p>
                  <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="flex items-center gap-2 text-[13px] font-semibold text-[#0066FF]">
                      <BadgeCheck className="h-4 w-4" />
                      Cam kết MTIEN SOLUTION
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {[
                        'Sản phẩm chính hãng, seal box mới 100%',
                        'Bảo hành theo chính sách hãng + MTIEN',
                        'Hỗ trợ kỹ thuật miễn phí trọn đời',
                        'Đổi trả trong 7 ngày nếu lỗi sản xuất',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12px] text-gray-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* === Thông số kỹ thuật === */}
              {activeTab === 'Thông số kỹ thuật' && (
                <div>
                  <table className="w-full text-[13px]">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr key={spec.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="w-1/3 px-4 py-2.5 font-medium text-gray-600">{spec.label}</td>
                          <td className="px-4 py-2.5 text-gray-800">{spec.value}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="w-1/3 px-4 py-2.5 font-medium text-gray-600">SKU</td>
                        <td className="px-4 py-2.5 font-mono text-gray-800">{product.sku}</td>
                      </tr>
                      <tr>
                        <td className="w-1/3 px-4 py-2.5 font-medium text-gray-600">Bảo hành</td>
                        <td className="px-4 py-2.5 text-gray-800">{product.warranty}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* === Đánh giá === */}
              {activeTab === 'Đánh giá' && (
                <div>
                  {/* Rating Summary */}
                  <div className="mb-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 px-8 py-5">
                      <span className="text-[48px] font-extrabold text-gray-900 leading-none">{product.rating}</span>
                      <div className="mt-1 flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-4 w-4 ${s <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className="mt-1 text-[12px] text-gray-400">{product.reviewCount} đánh giá</span>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="w-4 text-right text-[11px] text-gray-500">{star}</span>
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="h-full rounded-full bg-amber-400"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-8 text-[11px] text-gray-400">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    {[
                      { name: 'Nguyễn Văn A', stars: 5, date: '12/03/2025', text: 'Sản phẩm tuyệt vời, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop lần sau!' },
                      { name: 'Trần Thị B', stars: 5, date: '28/02/2025', text: 'Chất lượng rất tốt, giá hợp lý. Nhân viên tư vấn nhiệt tình. Mình đã dùng được 1 tháng, hoạt động ổn định.' },
                      { name: 'Lê Văn C', stars: 4, date: '15/01/2025', text: 'Sản phẩm tốt, giao hàng đúng hẹn. Bao bì còn vài vết xước nhỏ nhưng sản phẩm hoàn toàn mới.' },
                    ].map((r) => (
                      <div key={r.name} className="rounded-xl border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0066FF] text-[12px] font-bold text-white">
                              {r.name[0]}
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-gray-800">{r.name}</p>
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} className={`h-3 w-3 ${s <= r.stars ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-[11px] text-gray-400">{r.date}</span>
                        </div>
                        <p className="mt-2 text-[12px] leading-relaxed text-gray-600">{r.text}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <BadgeCheck className="h-3.5 w-3.5 text-green-500" />
                          <span className="text-[10px] text-green-600 font-medium">Đã mua tại MTIEN</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Write Review CTA */}
                  <button className="mt-4 w-full rounded-xl border-2 border-dashed border-gray-200 py-3 text-[13px] font-medium text-gray-500 hover:border-[#0066FF] hover:text-[#0066FF]">
                    + Viết đánh giá của bạn
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Related Products                                              */}
      {/* ============================================================ */}
      {related.length > 0 && (
        <div className="bg-white py-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-gray-900">Sản phẩm liên quan</h2>
              <Link
                href={`/shop?category=${product.category}`}
                className="flex items-center gap-1 text-[12px] font-medium text-[#0066FF] hover:underline"
              >
                Xem thêm <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {related.map((p) => (
                <RelatedCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* Sticky Mobile Bar                                             */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-lg md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[11px] text-gray-400">Giá</p>
            <p className="text-[18px] font-extrabold text-[#0066FF] leading-none">
              {product.priceDisplay}
            </p>
          </div>
          <button
            disabled={!product.inStock}
            className="flex items-center gap-2 rounded-xl border-2 border-[#0066FF] bg-white px-4 py-2.5 text-[13px] font-bold text-[#0066FF] disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" />
            Giỏ
          </button>
          <button
            disabled={!product.inStock}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-4 py-2.5 text-[13px] font-bold text-white disabled:opacity-50"
          >
            <Zap className="h-4 w-4" />
            Mua ngay
          </button>
        </div>
      </div>

      {/* Spacer for sticky bar on mobile */}
      <div className="h-20 md:hidden" />
    </>
  );
}
