'use client';

/**
 * SoftwareBreadcrumb - Điều hướng breadcrumb phía trên trang Phần mềm
 * Bao gồm tiêu đề chính, đường dẫn breadcrumb và các hình ảnh trang trí.
 */

import { motion } from 'motion/react';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
});

const customEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: customEase } }
} as const;

const breadcrumbVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, ease: "easeOut" as const } }
} as const;

export default function SoftwareBreadcrumb() {
  return (
    <section className="relative bg-[#061153] pt-[150px] pb-[130px] overflow-hidden rounded-b-[40px] md:mx-5 mt-5 shadow-2xl shadow-blue-900/10 border border-blue-950/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700/15 via-transparent to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[url('https://inotek.themevally.com/wp-content/uploads/2025/10/breadcrumb.webp')] bg-cover bg-center"></div>

      <div className="container mx-auto px-6 relative z-30 flex flex-col items-start gap-10">
        <div className="w-full">
          <motion.h1 initial="hidden" animate="visible" variants={titleVariants} className="text-4xl md:text-[62px] font-extrabold text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-[0_2px_15px_rgba(16,83,243,0.3)]">
            Dịch Vụ Lập Trình & <br /> Giải Pháp <span className="text-blue-300">Công Nghệ</span>
          </motion.h1>

          <motion.div initial="hidden" animate="visible" variants={breadcrumbVariants} className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10 shadow-[0_8px_32px_0_rgba(16,83,243,0.1)]">
            <ul className="flex items-center gap-3 text-white/80 font-medium text-sm md:text-base tracking-wide">
              <li>
                <a href="/" className="hover:text-blue-300 transition-colors flex items-center gap-2.5 group">
                  <svg className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                  <span className="group-hover:-translate-y-0.5 transition-transform">Trang chủ</span>
                </a>
              </li>
              <li className="text-white/40">/</li>
              <li><a href="#" className="hover:text-blue-300 transition-colors group"><span className="group-hover:-translate-y-0.5 transition-transform">Dịch vụ</span></a></li>
              <li className="text-white/40">/</li>
              <li className="text-white font-semibold">Chuyên sâu</li>
            </ul>
          </motion.div>
        </div>

        <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full z-20 pointer-events-none">
          <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/circle.webp" className="absolute top-[20%] left-[20%] opacity-40" alt="shape" />
          <motion.img animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/star-1.webp" className="absolute top-[30%] right-[30%] opacity-80" alt="shape" />
          <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/snake.webp" className="absolute bottom-[20%] left-[30%] opacity-40" alt="shape" />
          <motion.img animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/doot.webp" className="absolute bottom-[30%] right-[20%] opacity-80" alt="shape" />
        </div>
      </div>
    </section>
  );
}
