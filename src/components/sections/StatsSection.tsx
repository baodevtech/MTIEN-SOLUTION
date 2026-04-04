'use client';

import { User, LayoutTemplate, ShoppingBag, Heart, CheckCircle2, PlusCircle } from 'lucide-react';

const stats = [
  {
    icon: User,
    badge: <Heart className="w-4 h-4 md:w-5 md:h-5 text-[#00D68F] absolute bottom-0 right-0 bg-white rounded-full p-0.5" aria-hidden="true" />,
    title: 'Được tin tưởng bởi',
    value: '230,000+ khách hàng',
  },
  {
    icon: LayoutTemplate,
    badge: <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#00D68F] absolute bottom-0 right-0 bg-white rounded-full p-0.5" aria-hidden="true" />,
    title: 'Có sẵn',
    value: '400+ giao diện đẹp, chuẩn SEO',
  },
  {
    icon: ShoppingBag,
    badge: <PlusCircle className="w-4 h-4 md:w-5 md:h-5 text-[#00D68F] absolute bottom-0 right-0 bg-white rounded-full p-0.5" aria-hidden="true" />,
    title: 'Đáp ứng',
    value: '50+ lĩnh vực, ngành nghề',
  },
];

export default function StatsSection() {
  return (
    <section className="relative -mt-8 md:-mt-24 z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-0" aria-label="Thống kê nổi bật">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-[#8A9BD8] to-[#4B5EAA] rounded-xl md:rounded-2xl p-4 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-5 text-center md:text-left"
          >
            <div className="w-11 h-11 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shrink-0 relative shadow-inner">
              <stat.icon size={20} className="text-[#4B5EAA] md:hidden" strokeWidth={1.5} aria-hidden="true" />
              <stat.icon size={30} className="text-[#4B5EAA] hidden md:block" strokeWidth={1.5} aria-hidden="true" />
              {stat.badge}
            </div>
            <div>
              <p className="text-blue-100 text-[11px] md:text-[15px] italic mb-0 md:mb-0.5">{stat.title}</p>
              <p className="font-bold text-[13px] md:text-[22px] leading-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
