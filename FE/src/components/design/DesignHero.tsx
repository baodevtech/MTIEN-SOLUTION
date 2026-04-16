'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * DesignHero - Hero banner chinh voi hieu ung parallax va cac mockup noi
 * Bao gom: tieu de, mo ta, nut CTA, hinh mockup website/mobile/brand noi bat
 */

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function DesignHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] md:min-h-[90vh] flex items-center pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden bg-[#FAFAFC]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
        {/* Left: Content */}
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="flex flex-col items-start text-left">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm mb-6 text-xs font-bold text-neutral-600 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Digital Design Agency
          </motion.div>
          
          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-[32px] md:text-5xl lg:text-[70px] font-extrabold tracking-tight text-neutral-900 leading-[1.05] mb-4 md:mb-6">
            Giao diện Đẹp.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative">
              Trải nghiệm 
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-400/30" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
            </span><br />
            Hoàn hảo.
          </motion.h1>
          
          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="text-[15px] md:text-xl text-neutral-500 font-medium leading-relaxed mb-8 md:mb-10 max-w-lg">
            Biến ý tưởng thành những sản phẩm số tinh tế. Nâng tầm giá trị thương hiệu thông qua UI/UX sáng tạo và hệ thống nhận diện đồng bộ.
          </motion.p>
          
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-wrap gap-3 md:gap-4">
             <Link href="#explore" className="px-6 md:px-8 py-3 md:py-4 rounded-xl bg-blue-600 text-white font-bold text-sm md:text-md hover:bg-blue-700 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] flex items-center gap-2">
               Bắt đầu ngay <ArrowRight size={18} />
             </Link>
             <div className="flex items-center gap-3 md:gap-4 ml-1 md:ml-2">
               <div className="flex -space-x-3">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Khách hàng thiết kế 1" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-30" />
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Khách hàng thiết kế 2" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-20" />
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Khách hàng thiết kế 3" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-10" />
               </div>
               <div className="text-xs md:text-sm font-medium text-neutral-600">Hơn 500+ dự án</div>
             </div>
          </motion.div>
        </motion.div>

        {/* Right: Floating Mockups with Real Images */}
        <div className="relative h-[500px] lg:h-[600px] w-full hidden md:block">
          {/* Main Web Card */}
          <motion.div 
             initial={{ opacity: 0, y: 50, rotate: -5 }} animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ duration: 1, delay: 0.2 }}
             className="absolute top-10 right-10 w-[400px] h-[280px] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-20 flex flex-col"
          >
             <div className="h-8 bg-neutral-50 border-b border-neutral-100 flex items-center px-4 gap-1.5 shrink-0">
               <div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" />
             </div>
             <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Giao diện website portfolio responsive" className="w-full h-full object-cover" />
          </motion.div>

          {/* Mobile App Card */}
          <motion.div 
             initial={{ opacity: 0, x: 50, y: 50 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
             className="absolute bottom-10 right-0 w-[200px] h-[360px] bg-white rounded-[30px] border-[6px] border-neutral-900 shadow-2xl z-30 flex flex-col overflow-hidden"
          >
             <div className="h-5 w-24 bg-neutral-900 mx-auto rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 z-10" />
             <img src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=400&q=80" alt="Thiết kế giao diện ứng dụng di động" className="w-full h-full object-cover" />
          </motion.div>

          {/* Brand Card */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, rotate: 6 }} transition={{ duration: 1, delay: 0.6 }}
             className="absolute top-40 left-0 w-[220px] h-[220px] rounded-3xl shadow-xl z-10 overflow-hidden group"
          >
             <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80" alt="Hệ thống nhận diện thương hiệu" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
             <div className="absolute bottom-0 left-0 p-6 text-white text-left font-bold z-10">
                <div className="text-xl mb-1 drop-shadow-md">Nhận diện</div>
                <div className="text-sm text-purple-200 drop-shadow-md">Tối ưu bản sắc</div>
             </div>
          </motion.div>

          {/* Decorative blurs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 blur-[80px] rounded-full z-0" />
        </div>
      </div>
    </section>
  );
}
