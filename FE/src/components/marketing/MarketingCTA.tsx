'use client';

/**
 * MarketingCTA - Loi keu goi hanh dong cuoi trang Marketing
 * Hien thi tieu de lon "X2 Doanh So", mo ta ngan va nut CTA chinh
 * dan den trang lien he. Nen trang voi icon Zap dong hieu ung pulse.
 */

import { motion, type Variants } from 'motion/react';
import { Zap } from 'lucide-react';
import Link from 'next/link';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function MarketingCTA() {
  return (
      <section className="py-20 md:py-40 px-4 md:px-6 text-center bg-white border-t border-neutral-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto flex flex-col items-center">
           <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-[20px] md:rounded-[32px] flex items-center justify-center mb-6 md:mb-10 shadow-[0_20px_40px_rgba(37,99,235,0.4)] rotate-3">
             <Zap size={28} className="animate-pulse md:w-10 md:h-10" />
           </div>
           <h2 className="text-[32px] md:text-6xl lg:text-[80px] font-extrabold tracking-tighter text-neutral-900 mb-5 md:mb-8 leading-[1.1]">
             Đã Đến Lúc <br /> X2 Doanh Số.
           </h2>
           <p className="text-[15px] md:text-xl lg:text-2xl text-neutral-500 mb-8 md:mb-12 max-w-2xl font-medium">Bơm hàng ngàn traffic chất lượng vào phễu ngay hôm nay với công nghệ Performance Marketing hàng đầu.</p>
           <Link href="/contact" className="px-8 py-4 md:px-12 md:py-6 rounded-full bg-neutral-900 text-white font-black text-base md:text-xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              Khởi động Chiến Dịch
           </Link>
        </motion.div>
      </section>
  );
}
