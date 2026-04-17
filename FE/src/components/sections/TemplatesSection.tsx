'use client';

import {
  LayoutTemplate, Search, SlidersHorizontal, Heart, Eye, ShoppingCart,
  Monitor, Smartphone, Star, Download, Zap, CheckCircle2, ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';

const templates = [
  { name: 'Dualeo Supermarket', category: 'Siêu thị / Tạp hóa', price: '1,500,000 đ', oldPrice: '2,500,000 đ', img: 'fashion', rating: 4.9, sales: '1.2k', tags: ['Bán chạy', 'Mới'] },
  { name: 'Organic Sea Fruits', category: 'Thực phẩm sạch', price: '1,500,000 đ', oldPrice: '2,000,000 đ', img: 'food', rating: 4.8, sales: '850', tags: ['Tốc độ cao'] },
  { name: 'Box Home Decor', category: 'Nội thất / Kiến trúc', price: '800,000 đ', oldPrice: '1,200,000 đ', img: 'decor', rating: 5.0, sales: '2.1k', tags: ['Premium'] },
];

const filters = ['Tất cả', 'Bán hàng', 'Doanh nghiệp', 'Landing Page', 'Blog/Tin tức'];

export default function TemplatesSection() {
  const t = useTheme('home', 'templates');
  return (
    <section className="py-12 md:py-24 bg-slate-50 relative border-t border-slate-200" aria-label="Kho giao diện">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-6 md:mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 md:gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-100/80 text-blue-700 text-[10px] md:text-xs font-bold mb-3 md:mb-4 uppercase tracking-wider">
                <LayoutTemplate size={12} aria-hidden="true" />
                <span>{t('badge', 'Kho giao diện')}</span>
              </div>
              <h2 className="text-[22px] md:text-[40px] font-extrabold text-slate-900 mb-2 md:mb-4 leading-[1.2]">
                {t('title', 'Khám phá +500 giao diện chuẩn SEO, tối ưu chuyển đổi')}
              </h2>
              <p className="text-slate-500 text-[13px] md:text-[16px] leading-relaxed">
                {t('description', 'Hệ sinh thái giao diện đa ngành nghề được thiết kế bởi các chuyên gia UX/UI hàng đầu.')}
              </p>
              <div className="flex md:hidden items-center gap-3 mt-3 text-[11px] font-semibold">
                <span className="inline-flex items-center gap-1 text-slate-700"><span className="text-blue-600 font-black">500+</span> giao diện</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true"></span>
                <span className="inline-flex items-center gap-1 text-slate-700"><span className="text-emerald-600 font-black">12k+</span> khách hàng</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true"></span>
                <span className="inline-flex items-center gap-1 text-slate-700"><Star size={11} className="fill-amber-400 text-amber-400" aria-hidden="true" /> 4.9</span>
              </div>
            </div>
            <div className="hidden md:flex gap-6 border-l-2 border-slate-200 pl-6">
              <div>
                <p className="text-3xl font-black text-slate-900">500+</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Giao diện sẵn sàng</p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-600">12k+</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Khách hàng tin dùng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center gap-2 md:gap-4 mb-6 md:mb-10 bg-white p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-sm border border-slate-200">
          <div className="flex gap-1 flex-1 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Lọc giao diện">
            {filters.map((filter, idx) => (
              <button key={idx} className={`px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-[11px] md:text-[14px] font-semibold transition-all whitespace-nowrap ${idx === 0 ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`} role="tab" aria-selected={idx === 0}>
                {filter}
              </button>
            ))}
          </div>
          <div className="hidden md:flex gap-2">
            <div className="relative md:w-64">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input type="text" placeholder="Tìm giao diện..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-sm outline-none focus:border-blue-500" aria-label="Tìm kiếm giao diện" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold" aria-label="Lọc nâng cao">
              <SlidersHorizontal size={14} aria-hidden="true" /> Lọc
            </button>
          </div>
          <button className="md:hidden p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 shrink-0" aria-label="Tìm kiếm">
            <Search size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-12">
          {templates.map((template, idx) => (
            <div key={idx} className="bg-white rounded-xl md:rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col group">
              <div className="relative h-[140px] md:h-[240px] bg-slate-100 overflow-hidden">
                <Image src={`https://picsum.photos/seed/${template.img}/600/400`} alt={`Giao diện ${template.name}`} fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 33vw" loading="lazy" />
                <div className="absolute top-1.5 left-1.5 md:top-3 md:left-3 flex flex-wrap gap-1 z-10">
                  {template.tags.map((tag, i) => (
                    <span key={i} className={`px-1.5 md:px-2 py-0.5 rounded-md text-[8px] md:text-[10px] font-bold uppercase text-white ${i === 0 ? 'bg-rose-500' : 'bg-blue-600'}`}>{tag}</span>
                  ))}
                </div>
                <button className="absolute top-1.5 right-1.5 md:top-3 md:right-3 p-1.5 md:p-2 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl text-slate-400 z-10 shadow-sm" aria-label={`Yêu thích ${template.name}`}>
                  <Heart size={12} className="md:w-[14px] md:h-[14px]" aria-hidden="true" />
                </button>
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white transition-colors shadow-lg" aria-label="Xem trước">
                    <Eye size={20} aria-hidden="true" />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-emerald-500 hover:text-white transition-colors shadow-lg" aria-label="Thêm vào giỏ">
                    <ShoppingCart size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 md:p-5 flex-1 flex flex-col">
                <span className="text-[9px] md:text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 md:px-2 py-0.5 rounded self-start mb-1.5 md:mb-2">
                  {template.category}
                </span>
                <h3 className="font-bold text-[13px] md:text-lg text-slate-900 mb-1.5 line-clamp-1">{template.name}</h3>
                <div className="flex items-center gap-1.5 text-[9px] md:text-xs text-slate-500 mb-2.5 md:mb-3 pb-2.5 md:pb-3 border-b border-slate-100">
                  <div className="flex items-center text-amber-400">
                    <Star size={10} className="fill-current md:w-3 md:h-3" aria-hidden="true" />
                    <span className="ml-0.5 font-semibold text-slate-700">{template.rating}</span>
                  </div>
                  <span className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-slate-300" aria-hidden="true"></span>
                  <div className="flex items-center gap-0.5"><Download size={9} className="md:w-[11px] md:h-[11px]" aria-hidden="true" /> {template.sales}</div>
                </div>
                {/* Features list */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1.5 md:gap-y-2 gap-x-1 mb-3 md:mb-5 text-[10px] md:text-[13px] text-slate-600">
                  {['Chuẩn SEO', 'Tích hợp giỏ hàng', 'Responsive 100%', 'Code tối ưu'].map((f) => (
                    <li key={f} className="flex items-center gap-1 md:gap-1.5"><CheckCircle2 size={12} className="text-emerald-500 shrink-0 md:w-[14px] md:h-[14px]" aria-hidden="true" /> {f}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-end justify-between pt-1">
                  <div>
                    <p className="text-[8px] md:text-xs text-slate-400 line-through">{template.oldPrice}</p>
                    <p className="font-extrabold text-[13px] md:text-xl text-emerald-600 leading-none">{template.price}</p>
                  </div>
                  <button className="px-2.5 md:px-4 py-1.5 md:py-2 bg-slate-900 text-white rounded-lg text-[9px] md:text-sm font-semibold flex items-center gap-0.5 md:gap-1">
                    <span className="hidden md:inline">Chi tiết</span>
                    <span className="md:hidden">Xem</span>
                    <ArrowRight size={11} className="md:w-[13px] md:h-[13px]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-3 md:gap-4 pt-6 md:pt-8 border-t border-slate-200">
          <span className="text-slate-400 text-[12px] md:text-sm">{t('ctaText', 'Không tìm thấy mẫu phù hợp?')}</span>
          <button className="text-blue-600 font-bold text-[12px] md:text-sm hover:underline">Thiết kế riêng</button>
          <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true"></span>
          <button className="text-slate-700 font-bold text-[12px] md:text-sm hover:text-blue-600 transition-colors inline-flex items-center gap-1">
            Xem tất cả <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
