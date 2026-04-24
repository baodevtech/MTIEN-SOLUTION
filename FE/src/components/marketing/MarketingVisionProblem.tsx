'use client';

/**
 * MarketingVisionProblem - Tam nhin thuong hieu va Van de lang phi ngan sach
 * Gom 2 section: (1) Cau vision ngan gon ve vi tri thuong hieu, (2) Phan tich ly do
 * 90% doanh nghiep "dot tien" sai cach voi hinh anh minh hoa va cac card van de.
 */

import Image from 'next/image';
import { motion, type Variants } from 'motion/react';
import { Activity, TrendingUp } from 'lucide-react';

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

export default function MarketingVisionProblem() {
  return (
    <>
      {/* SECTION 2: VISION STATEMENT */}
      <section id="explore" className="py-12 md:py-32 px-4 md:px-6 bg-neutral-50 relative z-10 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto text-center">
           <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[26px] md:text-4xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight">
             Thương hiệu của bạn xứng đáng hiển thị <br />
             <span className="text-blue-600">ở những vị trí đắt giá nhất.</span>
           </motion.h2>
        </div>
      </section>

      {/* ===== MOBILE: Problem — Bento Horizontal ===== */}
      <section className="md:hidden py-10 px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-3 h-[280px]">
          {/* Left — Image card */}
          <div className="flex-[1.1] relative rounded-[20px] overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1563986768609-322da135f6a3?auto=format&fit=crop&w=1000&q=80" alt="Wasted Budget" fill className="object-cover grayscale" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-black/30 to-black/10" />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-1">Cảnh Báo</span>
              <h3 className="text-[17px] font-black text-white leading-tight">90% doanh nghiệp đang &ldquo;đốt tiền&rdquo; sai cách.</h3>
            </div>
          </div>
          {/* Right — Stacked problem cards */}
          <div className="flex-1 flex flex-col gap-2.5">
            <div className="flex-1 bg-[#F5F5F7] rounded-[16px] p-3 flex flex-col justify-center">
              <Activity className="text-cyan-500 w-6 h-6 mb-1.5" />
              <h4 className="font-bold text-neutral-900 text-[13px] mb-0.5">Không đo lường</h4>
              <p className="text-[10px] text-neutral-500 leading-snug">Mù mờ chi phí cơ hội, không rõ kênh nào mang ROI cao.</p>
            </div>
            <div className="flex-1 bg-[#F5F5F7] rounded-[16px] p-3 flex flex-col justify-center">
              <TrendingUp className="text-blue-600 w-6 h-6 mb-1.5" />
              <h4 className="font-bold text-neutral-900 text-[13px] mb-0.5">Tỷ lệ chốt thấp</h4>
              <p className="text-[10px] text-neutral-500 leading-snug">Website hay kịch bản sale chưa tối ưu, khách rời đi.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== DESKTOP: Problem — Original ===== */}
      <section className="hidden md:block py-32 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative h-[500px]">
             <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl group border border-neutral-200">
                <Image src="https://images.unsplash.com/photo-1563986768609-322da135f6a3?auto=format&fit=crop&w=1000&q=80" alt="Wasted Budget" fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 grayscale" sizes="50vw" />
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-xl text-center">
                   <div className="text-blue-700 font-bold text-xl mb-1">Cảnh Báo</div>
                   <div className="text-neutral-900 font-black text-4xl">Lãng phí Ngân sách</div>
                </div>
             </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">90% doanh nghiệp <br/>đang &ldquo;đốt tiền&rdquo; sai cách.</h3>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Bạn đang chạy quảng cáo theo cảm tính? Target sai tệp khách hàng? Hoặc có lượt nhấp (clicks) nhưng không có đơn hàng (no sales)? Đã đến lúc đưa dữ liệu vào điều hướng chiến lược.</p>
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                  <Activity className="text-cyan-500 mb-4 w-8 h-8"/>
                  <h4 className="font-bold text-neutral-900 mb-2">Không đo lường được</h4>
                  <p className="text-sm text-neutral-500">Mù mờ về chi phí cơ hội và không rõ kênh nào mang lại ROI cao nhất.</p>
               </div>
               <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                  <TrendingUp className="text-blue-600 mb-4 w-8 h-8"/>
                  <h4 className="font-bold text-neutral-900 mb-2">Tỷ lệ chốt sale thấp</h4>
                  <p className="text-sm text-neutral-500">Website hoặc kịch bản sale chưa tối ưu khiến khách hàng rời đi.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
