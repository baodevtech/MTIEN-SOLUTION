'use client';

import { motion, type Variants } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * DesignPricing - Bang gia dich vu thiet ke va khoi keu goi hanh dong cuoi trang
 * Bao gom: 2 goi gia (UI/UX Standard va Premium Brand & Web) va CTA cuoi cung voi nut lien he
 */

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

export default function DesignPricing() {
  return (
    <>
      {/* SECTION 14: PRICING */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#FAFAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[26px] md:text-5xl font-bold tracking-tight text-neutral-900">Chi phí Minh bạch</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-8">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl md:rounded-[40px] p-6 md:p-12 border border-neutral-200 hover:shadow-xl transition-shadow w-full flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">UI/UX Standard</h3>
                <p className="text-neutral-500 mb-6 md:mb-8 border-b border-neutral-100 pb-6 md:pb-8 text-[15px] md:text-base">Dành cho dự án phổ thông, quy mô trung bình cần thẩm mỹ và tốc độ ra mắt sớm.</p>
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 flex-1">
                   {['Bản quyền 3 concept ban đầu', 'Responsive Design cực nhẹ', 'Bàn giao Figma tiêu chuẩn'].map((l, i)=><div key={i} className="flex gap-4 items-center"><Check size={24} className="text-green-500"/><span className="font-medium">{l}</span></div>)}
                </div>
                <button className="w-full py-4 md:py-5 rounded-full font-bold bg-neutral-100 hover:bg-neutral-200 text-base md:text-lg transition-colors">Yêu cầu Báo Giá</button>
             </motion.div>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="bg-gradient-to-br from-neutral-900 to-indigo-950 text-white rounded-2xl md:rounded-[40px] p-6 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:-mt-8 border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 font-bold rounded-full mb-6 w-max border border-indigo-400/20">Khuyên Dùng</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 relative z-10">Premium Brand & Web</h3>
                <p className="text-neutral-400 mb-6 md:mb-8 border-b border-white/10 pb-6 md:pb-8 relative z-10 text-[15px] md:text-base">Giải pháp nâng tầm doanh nghiệp toàn diện từ nhãn hiệu sang hệ thống Web/App khổng lồ.</p>
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 relative z-10 flex-1">
                   {['Hệ thống Brand Guidelines', 'UI/UX Design Web & App phức tạp', 'Thiết lập thư viện Design Tokens', 'Hỗ trợ Team Code chuyển giao 100%'].map((l, i)=><div key={i} className="flex gap-4 items-center"><Check size={24} className="text-indigo-400"/><span className="font-medium text-white">{l}</span></div>)}
                </div>
                <button className="w-full py-4 md:py-5 rounded-full font-bold text-base md:text-lg bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-[0_10px_20px_rgba(79,70,229,0.3)] relative z-10">Tư vấn Premium</button>
             </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 15: FINAL CTA */}
      <section className="py-20 md:py-40 px-4 md:px-6 text-center bg-white border-t border-neutral-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto flex flex-col items-center">
           <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl md:rounded-[32px] flex items-center justify-center mb-6 md:mb-10 shadow-[0_20px_40px_rgba(37,99,235,0.4)] rotate-3">
             <Sparkles size={28} className="md:hidden animate-pulse" />
             <Sparkles size={40} className="hidden md:block animate-pulse" />
           </div>
           <h2 className="text-[32px] md:text-6xl lg:text-[80px] font-extrabold tracking-tighter text-neutral-900 mb-6 md:mb-8 leading-[1.1]">
             Kiến tạo Thiết kế <br /> Xứng tầm Thương hiệu.
           </h2>
           <p className="text-[15px] md:text-xl lg:text-2xl text-neutral-500 mb-8 md:mb-12 max-w-2xl font-medium">Bỏ lại giao diện bị mờ nhạt và sở hữu một UX/UI tuyệt mỹ gây ấn tượng hoàn toàn với người dùng.</p>
           <Link href="/contact" className="px-8 py-4 md:px-12 md:py-6 rounded-full bg-neutral-900 text-white font-black text-base md:text-xl hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              Lấy Ý Tưởng Thiết Kế Ngay
           </Link>
        </motion.div>
      </section>
    </>
  );
}
