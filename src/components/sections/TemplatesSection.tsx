'use client';

import {
  LayoutTemplate, Search, SlidersHorizontal, Heart, Eye, ShoppingCart,
  Monitor, Smartphone, Star, Download, Zap, CheckCircle2, ArrowRight,
} from 'lucide-react';
import Image from 'next/image';

const templates = [
  { name: 'Dualeo Supermarket', category: 'Siêu thị / Tạp hóa', price: '1,500,000 đ', oldPrice: '2,500,000 đ', img: 'fashion', rating: 4.9, sales: '1.2k', tags: ['Bán chạy', 'Mới'] },
  { name: 'Organic Sea Fruits', category: 'Thực phẩm sạch', price: '1,500,000 đ', oldPrice: '2,000,000 đ', img: 'food', rating: 4.8, sales: '850', tags: ['Tốc độ cao'] },
  { name: 'Box Home Decor', category: 'Nội thất / Kiến trúc', price: '800,000 đ', oldPrice: '1,200,000 đ', img: 'decor', rating: 5.0, sales: '2.1k', tags: ['Premium'] },
];

const filters = ['Tất cả', 'Bán hàng', 'Doanh nghiệp', 'Landing Page', 'Blog/Tin tức'];

export default function TemplatesSection() {
  return (
    <section className="py-8 md:py-24 bg-slate-50 relative border-t border-slate-200" aria-label="Kho giao diện">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 md:gap-8 mb-4 md:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-blue-100/80 text-blue-700 text-[10px] md:text-xs font-bold mb-3 md:mb-4 uppercase tracking-wider">
              <LayoutTemplate size={12} aria-hidden="true" />
              <span>Kho giao diện</span>
            </div>
            <h2 className="text-[18px] md:text-[40px] font-extrabold text-slate-900 mb-1 md:mb-4 leading-tight">
              Khám phá +500 giao diện <br className="hidden md:block" /> chuẩn SEO, tối ưu chuyển đổi
            </h2>
            <p className="text-slate-600 text-[12px] md:text-[16px] hidden md:block">
              Hệ sinh thái giao diện đa ngành nghề được thiết kế bởi các chuyên gia UX/UI hàng đầu.
            </p>
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

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-4 mb-4 md:mb-10 bg-white p-1 md:p-2 rounded-lg md:rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-wrap gap-0.5 md:gap-1 w-full md:w-auto overflow-x-auto pb-0 md:pb-0 scrollbar-hide" role="tablist" aria-label="Lọc giao diện">
            {filters.map((filter, idx) => (
              <button key={idx} className={`px-2.5 md:px-5 py-1 md:py-2.5 rounded-md md:rounded-xl text-[10px] md:text-[14px] font-semibold transition-all whitespace-nowrap ${idx === 0 ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`} role="tab" aria-selected={idx === 0}>
                {filter}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 md:gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input type="text" placeholder="Tìm giao diện..." className="w-full bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl pl-8 pr-3 py-1.5 md:py-2.5 text-[12px] md:text-sm outline-none focus:border-blue-500" aria-label="Tìm kiếm giao diện" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 md:py-2.5 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-slate-700 text-[12px] md:text-sm font-semibold" aria-label="Lọc nâng cao">
              <SlidersHorizontal size={14} aria-hidden="true" />
              <span className="hidden sm:block">Lọc</span>
            </button>
          </div>
        </div>

        {/* Grid — 2 cols on mobile for density */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mb-5 md:mb-12">
          {templates.map((template, idx) => (
            <div key={idx} className="bg-white rounded-lg md:rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group">
              <div className="relative h-[100px] md:h-[240px] bg-slate-100 overflow-hidden border-b border-slate-100">
                <Image src={`https://picsum.photos/seed/${template.img}/600/400`} alt={`Giao diện ${template.name}`} fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 33vw" loading="lazy" />
                <div className="absolute top-1.5 md:top-3 left-1.5 md:left-3 flex flex-wrap gap-1 z-10">
                  {template.tags.map((tag, i) => (
                    <span key={i} className={`px-1.5 md:px-2.5 py-0.5 md:py-1 rounded text-[8px] md:text-[10px] font-bold uppercase text-white ${i === 0 ? 'bg-rose-500' : 'bg-blue-600'}`}>{tag}</span>
                  ))}
                </div>
                <button className="absolute top-1.5 md:top-3 right-1.5 md:right-3 p-1 md:p-2 bg-white/90 rounded-full text-slate-400 z-10" aria-label={`Yêu thích ${template.name}`}>
                  <Heart size={12} aria-hidden="true" />
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

              <div className="p-2 md:p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-[9px] md:text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded flex items-center gap-1">
                    <LayoutTemplate size={10} aria-hidden="true" /> {template.category}
                  </span>
                  <div className="hidden md:flex text-slate-400 gap-1.5">
                    <Monitor size={14} aria-hidden="true" />
                    <Smartphone size={14} aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-bold text-[11px] md:text-lg text-slate-900 mb-0.5 md:mb-1.5 line-clamp-1">{template.name}</h3>
                <div className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-xs text-slate-500 mb-1 md:mb-4 pb-1 md:pb-4 border-b border-slate-100">
                  <div className="flex items-center text-amber-400">
                    <Star size={10} className="fill-current" aria-hidden="true" />
                    <span className="ml-0.5 font-semibold text-slate-700">{template.rating}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true"></span>
                  <div className="flex items-center gap-0.5"><Download size={10} aria-hidden="true" /> {template.sales}</div>
                  <span className="hidden md:inline w-1 h-1 rounded-full bg-slate-300" aria-hidden="true"></span>
                  <div className="hidden md:flex items-center gap-1 text-emerald-500"><Zap size={12} className="fill-current" aria-hidden="true" /> 99/100</div>
                </div>
                {/* Features list — compact on mobile */}
                <ul className="hidden md:grid grid-cols-2 gap-y-2 gap-x-1 mb-5 text-[13px] text-slate-600">
                  {['Chuẩn SEO', 'Tích hợp giỏ hàng', 'Responsive 100%', 'Code tối ưu'].map((f) => (
                    <li key={f} className="flex items-start gap-1.5"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" /> {f}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-end justify-between pt-0.5 md:pt-2">
                  <div>
                    <p className="text-[8px] md:text-xs text-slate-400 line-through mb-0">{template.oldPrice}</p>
                    <p className="font-extrabold text-[12px] md:text-xl text-emerald-600 leading-none">{template.price}</p>
                  </div>
                  <button className="px-1.5 md:px-4 py-0.5 md:py-2 bg-slate-900 text-white rounded-md md:rounded-lg text-[9px] md:text-sm font-semibold flex items-center gap-0.5 md:gap-1">
                    Chi tiết <ArrowRight size={12} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 border-t border-slate-200 pt-4 md:pt-8">
          <p className="text-slate-500 text-[11px] md:text-sm">Không tìm thấy mẫu phù hợp?</p>
          <button className="px-4 md:px-6 py-1.5 md:py-2.5 rounded-full bg-blue-50 text-blue-700 font-bold hover:bg-blue-600 hover:text-white transition-all text-[11px] md:text-sm">Yêu cầu thiết kế riêng</button>
          <span className="hidden sm:block text-slate-300" aria-hidden="true">|</span>
          <button className="inline-flex items-center gap-1 text-slate-700 font-bold hover:text-blue-600 transition-all text-[11px] md:text-sm">
            Xem toàn bộ thư viện <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
