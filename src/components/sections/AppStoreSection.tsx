'use client';

import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, MessageCircle, Search, Award, Gift, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const floatingIcons = [
  { icon: MessageCircle, pos: 'top-[5%] left-1/2 -translate-x-1/2', size: 'w-14 h-14', bg: 'bg-white', color: 'text-blue-500', dur: 4 },
  { icon: Search, pos: 'top-[20%] right-[5%]', size: 'w-12 h-12', bg: 'bg-[#005B7C]', color: 'text-white', dur: 5 },
  { icon: Award, pos: 'top-[40%] left-[5%]', size: 'w-12 h-12', bg: 'bg-[#C2A32B]', color: 'text-white', dur: 6 },
  { icon: Gift, pos: 'bottom-[20%] left-[15%]', size: 'w-14 h-14', bg: 'bg-[#FF3B00]', color: 'text-white', dur: 4.5 },
  { icon: BarChart3, pos: 'bottom-[15%] right-[10%]', size: 'w-14 h-14', bg: 'bg-[#FF8C00]', color: 'text-white', dur: 5.5 },
];

const bullets = [
  <>
    <span className="underline decoration-[#00D68F] underline-offset-4">Hơn 100 ứng dụng</span> đa dạng từ hỗ trợ bán hàng, marketing, tài chính thanh toán, vận chuyển, quản trị website đến chăm sóc khách hàng, phù hợp với mọi ngành nghề kinh doanh.
  </>,
  'Các ứng dụng tích hợp trên website này giúp các chủ shop tăng doanh số bán hàng, tăng doanh thu trên từng đơn hàng, thúc đẩy khách mua hàng nhiều hơn cũng như quản trị hệ thống website một cách đơn giản nhất.',
];

export default function AppStoreSection() {
  const reduced = useReducedMotion();

  return (
    <section className="py-16 md:py-32 bg-[#021253] relative overflow-hidden" aria-label="Kho ứng dụng">
      {/* Blur BGs — desktop only */}
      <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-[#0044FF] rounded-full blur-[150px] opacity-30 pointer-events-none" aria-hidden="true"></div>
      <div className="hidden md:block absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#0022AA] rounded-full blur-[120px] opacity-40 pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
          <div className="relative z-10">
            <h2 className="text-[24px] md:text-[48px] font-bold text-white leading-[1.2] mb-5 md:mb-10 tracking-tight">
              Tăng tốc cho website với kho <br className="hidden md:block" /> ứng dụng mạnh mẽ
            </h2>
            <ul className="space-y-4 md:space-y-6 mb-4 md:mb-12">
              {bullets.map((text, idx) => (
                <li key={idx} className="flex gap-2 md:gap-4 items-start">
                  <div className="shrink-0 mt-0.5"><CheckCircle2 className="text-[#00D68F]" size={18} strokeWidth={2} aria-hidden="true" /></div>
                  <span className="text-white/90 text-[14px] md:text-[16px] leading-relaxed font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[240px] md:h-[500px] w-full flex items-center justify-center">
            <div className="relative w-full max-w-[550px] aspect-[4/3] z-10">
              <Image src="https://picsum.photos/seed/laptop_dashboard/800/600" alt="Ứng dụng trên laptop" fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
            </div>
            {/* Floating icons — desktop only (5 infinite animations killed on mobile) */}
            {!reduced && floatingIcons.map((item, idx) => (
              <motion.div key={idx} animate={{ y: [0, idx % 2 === 0 ? -10 : 10, 0] }} transition={{ repeat: Infinity, duration: item.dur, ease: 'easeInOut', delay: idx * 0.5 }} className={`absolute ${item.pos} ${item.size} ${item.bg} rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center z-20 border border-white/10`} aria-hidden="true">
                <item.icon size={24} className={item.color} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-16">
          <button className="bg-[#00D68F] hover:bg-[#00c280] text-[#021253] rounded-full pl-5 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 flex items-center gap-2 md:gap-4 shadow-[0_10px_30px_rgba(0,214,143,0.3)] transition-all group">
            <span className="font-bold text-[13px] md:text-[16px]">Dùng thử miễn phí</span>
            <div className="bg-white text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
