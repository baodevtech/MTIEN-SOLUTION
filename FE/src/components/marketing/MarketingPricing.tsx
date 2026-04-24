'use client';

/**
 * MarketingPricing - Bang gia cac goi giai phap tang truong
 * Gom 2 goi: Growth Partner (cho SMEs) va Performance Scale (cap doanh nghiep lon).
 * Goi Performance Scale noi bat voi nen toi va hieu ung shadow xanh.
 */

import { motion, type Variants } from 'motion/react';
import { Check } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function MarketingPricing() {
  return (
      <section className="py-16 md:py-32 px-4 md:px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[26px] md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">Giải Pháp Tăng Trưởng</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch pt-4 md:pt-8">
             {/* Growth Plan */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-[24px] md:rounded-[40px] p-6 md:p-12 border border-neutral-200 hover:shadow-xl transition-shadow w-full flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Growth Partner</h3>
                <p className="text-sm md:text-base text-neutral-500 mb-6 md:mb-8 border-b border-neutral-100 pb-6 md:pb-8">Dành cho SMEs muốn ủy thác phòng Marketing, tối ưu chi phí vận hành.</p>
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 flex-1">
                   {['Quản trị toàn diện Facebook & Tiktok', 'Setup hệ thống Paid Ads hiệu suất', 'Sản xuất Content & Media định kỳ', 'Tracking Mức cơ bản'].map((l, i)=><div key={i} className="flex gap-3 md:gap-4 items-center"><Check size={20} className="text-emerald-500 shrink-0 md:w-6 md:h-6"/><span className="font-medium text-neutral-800 text-sm md:text-base">{l}</span></div>)}
                </div>
                <button className="w-full py-4 md:py-5 rounded-full font-bold bg-neutral-100 hover:bg-neutral-200 text-base md:text-lg transition-colors text-neutral-800">Nhận Báo Giá</button>
             </motion.div>

             {/* Enterprise Plan */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="bg-neutral-950 text-white rounded-[24px] md:rounded-[40px] p-6 md:p-12 shadow-[0_20px_60px_rgba(37,99,235,0.3)] relative overflow-hidden flex flex-col md:-mt-8 border border-blue-600/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-300 font-bold rounded-full mb-6 w-max border border-blue-400/20">Đỉnh Cao</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 relative z-10">Performance Scale</h3>
                <p className="text-sm md:text-base text-neutral-400 mb-6 md:mb-8 border-b border-white/10 pb-6 md:pb-8 relative z-10">Giải pháp đốt cháy thị trường, ngân sách chi tiêu cực lớn với mục tiêu ROAS khắt khe.</p>
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 relative z-10 flex-1">
                   {['Tối ưu & Growth Hacking cấp độ cao', 'Chiến lược Omni-channel (Google, Meta, Tiktok, SEO)', 'Triển khai CRM Automation (Klaviyo)', 'Báo cáo Data minh bạch (Real-time Looker)'].map((l, i)=><div key={i} className="flex gap-3 md:gap-4 items-center"><Check size={20} className="text-blue-400 shrink-0 md:w-6 md:h-6"/><span className="font-medium text-white text-sm md:text-base">{l}</span></div>)}
                </div>
                <button className="w-full py-4 md:py-5 rounded-full font-bold text-base md:text-lg bg-blue-700 hover:bg-blue-600 transition-colors relative z-10 text-white">Book Lịch Tư Vấn Setup</button>
             </motion.div>
          </div>
        </div>
      </section>
  );
}
