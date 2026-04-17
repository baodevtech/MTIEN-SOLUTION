'use client';

import { useMemo } from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';

const defaultClients = [
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' },
  { id: 3, name: 'Client C' },
  { id: 4, name: 'Client D' },
  { id: 5, name: 'Client E' },
  { id: 6, name: 'Client F' },
];

export default function TrustSection() {
  const t = useTheme('home', 'trust');
  const clients = useMemo(() => t<Array<{id?: number; name: string; image?: string}>>('logos', defaultClients), [t]);
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden border-t border-slate-100" aria-label="Khách hàng tin dùng">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Rating */}
        <div className="flex justify-center mb-5 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3 bg-white border border-slate-200 rounded-full px-4 md:px-4 py-1.5 md:py-1.5 shadow-sm">
            <div className="flex gap-0.5 text-[#FFB800]" role="img" aria-label="Đánh giá 5 sao">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <span className="text-[12px] md:text-[12px] font-bold text-slate-700 flex items-center gap-1">
              {t('rating', '4.9/5')} từ <span className="text-[#0066FF]">{t('ratingCount', '10.000+')}</span> đánh giá
            </span>
          </div>
        </div>

        <h2 className="text-[22px] md:text-[48px] font-black text-slate-900 mb-3 md:mb-5 tracking-tight leading-[1.15]">
          {t('title', 'Thiết kế website không khó. Đã có MTIEN SOLUTION lo.')}
        </h2>

        <p className="text-slate-500 text-[13px] md:text-[18px] mb-6 md:mb-14 max-w-2xl mx-auto leading-relaxed">
          {t('description', 'Tự hào là bệ phóng công nghệ cho hơn +230.000 doanh nghiệp trên toàn quốc.')}
        </p>

        {/* Logo Grid — compact on mobile */}
        <div className="grid grid-cols-3 md:grid-cols-6 items-center gap-5 md:gap-10 lg:gap-16">
          {clients.map((client, idx) => (
            <div key={client.id || idx} className="w-full h-10 md:h-12 relative">
              <Image src={client.image || `https://picsum.photos/seed/techlogo${(client.id || idx) + 1}/200/100`} alt={`Logo ${client.name}`} fill className="object-contain mix-blend-multiply opacity-60" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex items-center justify-center gap-2 md:gap-2 text-[11px] md:text-[13px] font-bold text-slate-400">
          <ShieldCheck size={14} className="text-emerald-500" aria-hidden="true" />
          <span>{t('commitmentText', 'Cam kết đồng hành và hỗ trợ kỹ thuật trọn đời 24/7')}</span>
        </div>
      </div>
    </section>
  );
}
