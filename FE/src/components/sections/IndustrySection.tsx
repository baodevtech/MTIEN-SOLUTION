'use client';

import { useState } from 'react';
import {
  LayoutTemplate, ArrowRight, ChevronRight,
  Sparkles, Coffee, Laptop, Building2, Home as HomeIcon, MapPin, Sofa, BookOpen,
} from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';

const industries = [
  { name: 'Mỹ phẩm & Beauty', subtitle: 'Sang trọng', icon: Sparkles, img: 'cosmetics_light' },
  { name: 'Thực phẩm sạch', subtitle: 'Tươi mới', icon: Coffee, img: 'organic_food' },
  { name: 'Đồ công nghệ', subtitle: 'Hiện đại', icon: Laptop, img: 'tech_gadget' },
  { name: 'Khách sạn', subtitle: 'Đẳng cấp', icon: Building2, img: 'hotel_resort' },
  { name: 'Gia dụng', subtitle: 'Tiện nghi', icon: HomeIcon, img: 'home_appliance_light' },
  { name: 'Bất động sản', subtitle: 'Không gian sống', icon: MapPin, img: 'real_estate_light' },
  { name: 'Nội thất', subtitle: 'Tối giản', icon: Sofa, img: 'modern_furniture' },
  { name: 'Sách & VPP', subtitle: 'Tri thức', icon: BookOpen, img: 'bookstore_light' },
];

export default function IndustrySection() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const t = useTheme('home', 'industry');

  return (
    <section className="py-12 md:py-32 bg-[#FBFBFD] relative overflow-hidden" aria-label="Giao diện đa ngành">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[11px] md:text-[12px] font-bold mb-3 md:mb-6 shadow-sm">
            <LayoutTemplate size={12} className="text-[#00D68F]" aria-hidden="true" />
            <span className="uppercase tracking-[0.1em]">{t('badge', 'Giao diện đa ngành')}</span>
          </div>
          <h2 className="text-[22px] md:text-[60px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.05] mb-3 md:mb-6">
            {t('title', 'Thiết kế độc bản.')} <br /><span className="text-slate-400">{t('titleHighlight', 'Dành riêng cho bạn.')}</span>
          </h2>
          <p className="text-[13px] md:text-[22px] text-[#86868B] tracking-tight leading-relaxed max-w-2xl mx-auto">
            {t('description', 'Hệ sinh thái giao diện được chế tác tinh xảo, tối ưu chuyển đổi cho từng mô hình kinh doanh đặc thù.')}
          </p>
        </div>

        {/* Mobile: Grid + Preview */}
        <div className="md:hidden flex flex-col gap-3">
          {/* Active Preview Image */}
          <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <Image src={`https://picsum.photos/seed/${industries[activeIndustry].img}/800/400`} alt={industries[activeIndustry].name} fill className="object-cover" sizes="100vw" loading="lazy" />
            <div className="absolute inset-x-3 bottom-3 bg-white/80 backdrop-blur-xl rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="block text-[#00D68F] text-[10px] font-black tracking-[0.1em] uppercase">{industries[activeIndustry].subtitle}</span>
                <h3 className="text-[16px] font-bold text-[#1D1D1F] tracking-tight">{industries[activeIndustry].name}</h3>
              </div>
              <button className="w-9 h-9 bg-[#1D1D1F] text-white rounded-full flex items-center justify-center" aria-label={`Xem giao diện ${industries[activeIndustry].name}`}>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          {/* Industry Grid */}
          <div className="grid grid-cols-4 gap-2">
            {industries.map((industry, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndustry(idx)}
                className={`relative rounded-xl overflow-hidden h-[72px] transition-all ${activeIndustry === idx ? 'ring-2 ring-[#00D68F] scale-[1.02]' : 'opacity-70'}`}
              >
                <Image src={`https://picsum.photos/seed/${industry.img}/200/200`} alt={industry.name} fill className="object-cover" sizes="25vw" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                  <industry.icon size={14} className="text-white mb-0.5" aria-hidden="true" />
                  <span className="text-white text-[9px] font-bold text-center leading-tight px-0.5">{industry.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Accordion */}
        <div className="hidden md:flex flex-row gap-3 w-full h-[550px]" role="tablist" aria-label="Lĩnh vực kinh doanh">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndustry(idx)}
              onClick={() => setActiveIndustry(idx)}
              className={`group relative overflow-hidden rounded-[36px] cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-end
                ${activeIndustry === idx ? 'flex-[12] bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]' : 'flex-[1.5] bg-[#F2F2F7] hover:bg-slate-200'}`}
              role="tab"
              aria-selected={activeIndustry === idx}
              aria-label={industry.name}
            >
              <Image
                src={`https://picsum.photos/seed/${industry.img}/800/1000`}
                alt={`Giao diện mẫu ${industry.name}`}
                fill
                className={`object-cover transition-all duration-1000 ${activeIndustry === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                sizes="25vw"
                loading="lazy"
              />
              {/* Inactive */}
              <div className={`absolute inset-0 flex flex-col items-center py-10 transition-opacity duration-500 ${activeIndustry === idx ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="w-14 h-14 rounded-full bg-white text-slate-400 flex items-center justify-center mb-8 group-hover:text-[#00D68F] transition-colors shadow-sm">
                  <industry.icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <span className="font-bold text-[#86868B] tracking-wider text-[14px] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap group-hover:text-[#1D1D1F] transition-colors">
                  {industry.name}
                </span>
              </div>
              {/* Active */}
              <div className={`absolute inset-x-6 bottom-6 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndustry === idx ? 'translate-y-0 opacity-100 delay-150' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
                <div className="p-7 rounded-[28px] bg-white/80 backdrop-blur-xl border border-white/40 flex flex-row items-center justify-between gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                  <div>
                    <span className="block text-[#00D68F] text-[12px] font-black tracking-[0.1em] uppercase mb-1.5">{industry.subtitle}</span>
                    <h3 className="text-[32px] font-bold text-[#1D1D1F] tracking-tight leading-none">{industry.name}</h3>
                  </div>
                  <button className="shrink-0 w-14 h-14 bg-[#1D1D1F] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg" aria-label={`Xem giao diện ${industry.name}`}>
                    <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-24 text-center">
          <p className="text-[#86868B] text-[14px] md:text-[17px] mb-2 md:mb-4 font-medium">{t('ctaDescription', 'Bạn muốn xem thêm nhiều hơn?')}</p>
          <a href={t('ctaLink', '/projects')} className="text-[15px] md:text-[20px] font-semibold text-[#0066CC] hover:text-[#0044BB] transition-colors inline-flex items-center gap-1 group">
            {t('ctaText', 'Khám phá thư viện +400 giao diện')}
            <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
