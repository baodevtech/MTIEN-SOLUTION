'use client';
import { User, LayoutTemplate, Briefcase, Heart, CheckCircle2, Star } from 'lucide-react';

const stats = [
  {
    icon: User,
    badge: <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-500 absolute -bottom-1.5 -right-1.5 bg-rose-50 rounded-full p-0.5 ring-2 ring-white" aria-hidden="true" />,
    title: 'Khách hàng tin dùng',
    value: '230K+',
    gradient: 'from-[#0066FF] to-blue-400',
    bgIcon: 'bg-blue-50 text-[#0066FF]',
  },
  {
    icon: LayoutTemplate,
    badge: <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 absolute -bottom-1.5 -right-1.5 bg-emerald-50 rounded-full p-0.5 ring-2 ring-white" aria-hidden="true" />,
    title: 'Giao diện chuẩn SEO',
    value: '400+',
    gradient: 'from-emerald-500 to-teal-400',
    bgIcon: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Briefcase,
    badge: <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-500 absolute -bottom-1.5 -right-1.5 bg-amber-50 rounded-full p-0.5 ring-2 ring-white" aria-hidden="true" />,
    title: 'Lĩnh vực đáp ứng',
    value: '50+',
    gradient: 'from-amber-500 to-orange-400',
    bgIcon: 'bg-amber-50 text-amber-600',
  },
];

export default function StatsSection() {
  return (
    <section className="relative z-30 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 font-sans md:-translate-y-24 -mt-8 mb-0 md:mb-0" aria-label="Thống kê nổi bật">
      
      {/* Mobile: single elegant strip */}
      <div className="md:hidden bg-white/80 backdrop-blur-xl rounded-2xl px-3 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-between gap-1">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-1.5 min-w-0">
            {idx > 0 && <div className="w-px h-7 bg-slate-100 shrink-0" />}
            <div className={`w-6 h-6 rounded-md ${stat.bgIcon} flex items-center justify-center shrink-0`}>
              <stat.icon size={12} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`font-extrabold text-[13px] text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient} leading-none tracking-tight`}>
                {stat.value}
              </span>
              <span className="text-[7px] font-medium text-slate-400 leading-tight mt-0.5 tracking-wide truncate">{stat.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: full cards */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-3xl rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border-white ring-1 ring-slate-100/50 flex flex-row items-center gap-6 group hover:shadow-[0_30px_60px_-15px_rgba(0,102,255,0.15)] transition-all duration-500 overflow-hidden relative text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className={`w-16 h-16 rounded-[20px] ${stat.bgIcon} flex items-center justify-center shrink-0 relative group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm z-10`}>
              <stat.icon size={26} strokeWidth={1.5} aria-hidden="true" />
              {stat.badge}
            </div>
            <div className="flex flex-col z-10">
              <p className="text-slate-500 font-medium text-[13px] uppercase tracking-wider mb-1">{stat.title}</p>
              <span className={`font-black text-[36px] text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient} leading-none tracking-tight drop-shadow-sm`}>
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
