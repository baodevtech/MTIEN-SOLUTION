'use client';

import { motion } from 'motion/react';
import {
  Zap, Monitor, BarChart3, Megaphone, CheckCircle2, Globe, Smartphone, Shield, Code,
  ArrowUpRight, RefreshCw,
} from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const tabs = [
  { label: '+400 Giao diện', sub: 'Đa ngành nghề', active: true, icon: Monitor },
  { label: 'Tốc độ tối đa', sub: 'Tối ưu Core Web', active: false, icon: Zap },
  { label: 'Báo cáo Data', sub: 'Analytics Tracking', active: false, icon: BarChart3 },
  { label: 'Marketing', sub: 'Tích hợp CRM', active: false, icon: Megaphone },
];

const featureBoxes = [
  { icon: Globe, title: 'Chuẩn SEO Core', desc: 'Tự động tạo sitemap, tối ưu thẻ meta.' },
  { icon: Smartphone, title: 'Mobile First', desc: 'Hiển thị mượt mà trên mọi thiết bị.' },
  { icon: Shield, title: 'Bảo mật đa tầng', desc: 'Chứng chỉ SSL miễn phí, mã hóa dữ liệu.' },
  { icon: Code, title: 'Mã nguồn tối ưu', desc: 'Minify HTML/CSS/JS gọn nhẹ, tốc độ cao.' },
];

export default function FeaturesSection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-[#001A5F] py-16 md:py-20 relative -mt-8 z-10 overflow-hidden" aria-label="Tính năng nổi bật">
      {!reduced && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#00288A] rounded-full blur-[100px] opacity-60"></div>
          <div className="absolute bottom-20 right-10 w-[300px] h-[300px] bg-[#00D68F] rounded-full blur-[100px] opacity-20"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          {reduced ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 text-xs font-bold mb-5">
              <Zap size={14} className="text-[#00D68F]" aria-hidden="true" />
              <span className="uppercase tracking-wider">Hệ sinh thái tính năng</span>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 text-xs font-bold mb-5"
            >
              <Zap size={14} className="text-[#00D68F]" aria-hidden="true" />
              <span className="uppercase tracking-wider">Hệ sinh thái tính năng</span>
            </motion.div>
          )}
          <h2 className="text-[24px] md:text-[40px] font-extrabold text-white mb-5 leading-tight">
            Sức mạnh vượt trội từ nền tảng{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-emerald-300">
              MTIEN SOLUTION
            </span>
          </h2>
          <p className="text-blue-100/80 text-[15px] md:text-base">
            Hệ thống cốt lõi được tối ưu hóa cho mọi mô hình kinh doanh, đảm bảo tốc độ, bảo mật và khả năng mở rộng không giới hạn.
          </p>
        </div>

        <div className="bg-white rounded-[28px] overflow-hidden shadow-2xl relative border border-slate-100">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-slate-100 bg-slate-50/50 scrollbar-hide" role="tablist">
            {tabs.map((tab, idx) => (
              <div
                key={idx}
                className={`flex-1 min-w-[140px] lg:min-w-[200px] p-4 lg:p-5 cursor-pointer border-r border-slate-100 last:border-0 relative transition-all group ${tab.active ? 'bg-white' : 'hover:bg-white'}`}
                role="tab"
                aria-selected={tab.active}
              >
                {tab.active && <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-600"></div>}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      tab.active
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}
                  >
                    <tab.icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-[14px] leading-tight mb-0.5 ${tab.active ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                      {tab.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{tab.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[11px] font-bold mb-5 border border-emerald-100">
                  <CheckCircle2 size={12} aria-hidden="true" /> Cập nhật phiên bản mới nhất
                </div>
                <h3 className="text-[20px] md:text-[28px] font-extrabold text-slate-900 mb-3 leading-tight">
                  Giao diện chuẩn UX/UI, tối ưu chuyển đổi
                </h3>
                <p className="text-slate-600 text-[14px] md:text-[14px] mb-6 leading-relaxed">
                  Sở hữu kho giao diện khổng lồ thiết kế bởi chuyên gia. Cấu trúc chuẩn SEO giúp website dễ dàng leo top Google.
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-3 mb-8">
                  {featureBoxes.map((f, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <f.icon className="text-blue-600 mb-2" size={20} aria-hidden="true" />
                      <h4 className="font-bold text-slate-900 text-[13px] mb-1">{f.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button className="bg-slate-900 hover:bg-blue-600 text-white rounded-xl px-6 py-3 font-bold text-[13px] transition-colors shadow-md flex items-center gap-2">
                    Xem kho giao diện <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Hệ thống ổn định
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 relative mt-8 lg:mt-0">
                {!reduced && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/60 to-emerald-50/60 rounded-full blur-3xl" aria-hidden="true"></div>
                )}

                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 z-10 bg-white">
                  <div className="bg-slate-100 px-3 py-2.5 flex items-center gap-2 border-b border-slate-200">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="ml-3 bg-white/60 text-[10px] text-slate-500 px-3 py-1 rounded-md w-48 text-center font-mono border border-slate-200/50">
                      admin.mtiensolution.vn
                    </div>
                  </div>
                  <div className="relative h-[220px] md:h-[380px] w-full bg-slate-50">
                    <Image
                      src="https://picsum.photos/seed/dashboard_analytics/1000/700"
                      alt="Dashboard quản trị MTIEN SOLUTION"
                      fill
                      className="object-cover object-left-top"
                      sizes="(max-width: 768px) 100vw, 58vw"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Floating badges — hidden on mobile/reduced-motion */}
                {!reduced && (
                  <>
                    {/* Floating SEO Badge */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                      className="absolute -top-4 -right-4 md:-right-6 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col gap-2 z-20 min-w-[130px]"
                      aria-hidden="true"
                    >
                      <div className="flex justify-between items-center">
                        <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center text-blue-600">
                          <Zap size={12} />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">99/100</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-900 mb-1">Điểm SEO</p>
                        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full w-[99%] rounded-full"></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Speed Badge */}
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
                      className="absolute -bottom-6 -left-4 md:-left-6 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-20"
                      aria-hidden="true"
                    >
                      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                        <RefreshCw size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Thời gian phản hồi</p>
                        <p className="text-xl font-black text-slate-900 leading-none">
                          0.8<span className="text-xs text-slate-400 font-semibold ml-0.5">s</span>
                        </p>
                      </div>
                    </motion.div>

                    {/* Floating Tech Stack */}
                    <motion.div
                      animate={{ x: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
                      className="absolute top-1/2 -right-8 md:-right-10 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-md border border-slate-100 z-20 flex flex-col gap-2"
                      aria-hidden="true"
                    >
                      <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm" title="Next.js">N</div>
                      <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm" title="React">R</div>
                      <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm" title="Tailwind">T</div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
