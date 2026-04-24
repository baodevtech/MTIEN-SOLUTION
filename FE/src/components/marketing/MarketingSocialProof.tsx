'use client';

/**
 * MarketingSocialProof - Chi so thanh tuu va Danh gia khach hang
 * Gom 2 section: (1) 4 chi so lon (Ngan sach quan ly, Thuong hieu, CPA giam, ROAS),
 * (2) Loi nhan xet tu khach hang voi avatar, ten, vai tro va xep hang sao.
 */

import Image from 'next/image';
import { motion, type Variants } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import Link from 'next/link';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const metrics = [
  { num: '$5M+', lbl: 'Ngân sách Quản lý' },
  { num: '300+', lbl: 'Thương Hiệu' },
  { num: '-40%', lbl: 'Chi phí CPA giảm' },
  { num: 'ROAS 6x', lbl: 'Hiệu suất TB' }
];

const testimonials = [
  { q: 'Chúng tôi bị kẹt do chi phí Ads Meta quá cao. Đội ngũ vào cuộc tái cấu trúc và kéo giảm CPA xuống 50% chỉ sau 1 tháng rưỡi.', a: 'John Pham', r: 'Co-founder E-commerce', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { q: 'Họ không chỉ chạy quảng cáo, họ hệ thống lại toàn bộ luồng CRM và Email Marketing giúp chúng tôi không bỏ sót bất kỳ lead nào.', a: 'Elena Vu', r: 'Marketing Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }
];

export default function MarketingSocialProof() {
  return (
    <>
      {/* SECTION 12: METRICS & IMPACT */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
           {metrics.map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                 <div className="text-3xl md:text-6xl font-black text-blue-700 mb-2 md:mb-4">{m.num}</div>
                 <div className="text-blue-900 font-bold uppercase tracking-wide text-xs md:text-sm">{m.lbl}</div>
              </motion.div>
           ))}
        </div>
      </section>

      {/* SECTION 13: TESTIMONIALS */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="flex-1">
               <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[26px] md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4 md:mb-6">Lời nói từ<br/>Các Nhà Đầu Tư</motion.h2>
               <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[15px] md:text-lg text-neutral-500 mb-6 md:mb-8">Một Agency tốt sẽ cam kết bằng chỉ số và doanh thu thực, không phải những lượt &ldquo;Like&rdquo; viển vông.</motion.p>
               <Link href="/projects" className="font-bold border-b-2 border-neutral-900 pb-1 hover:text-blue-700 hover:border-blue-700 transition-colors">Xem Báo cáo Case Studies</Link>
            </div>
            <div className="flex-1 space-y-6">
               {testimonials.map((t, i) => (
                 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-neutral-50 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-neutral-100 flex flex-col gap-4 md:gap-6">
                    <Quote className="text-blue-200 w-8 h-8 md:w-10 md:h-10" />
                    <p className="text-neutral-700 font-medium italic text-[15px] md:text-lg">&quot;{t.q}&quot;</p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <Image src={t.img} alt={t.a} width={48} height={48} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                          <div>
                            <p className="font-bold text-neutral-900 text-sm">{t.a}</p>
                            <p className="text-xs text-neutral-500">{t.r}</p>
                          </div>
                       </div>
                       <div className="flex text-yellow-400 gap-1"><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/></div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
