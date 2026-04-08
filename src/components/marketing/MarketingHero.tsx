'use client';

/**
 * MarketingHero - Hero banner chinh cua trang Digital Marketing
 * Hien thi tieu de, mo ta, nut CTA va cac the analytics card noi dong phia ben phai.
 * Su dung hieu ung parallax scroll (useScroll, useTransform) cho noi dung hero.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TrendingUp, ArrowRight, Target, Activity } from 'lucide-react';
import Link from 'next/link';

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function MarketingHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
      <section ref={containerRef} className="relative min-h-[70vh] md:min-h-[90vh] flex items-center pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 overflow-hidden bg-neutral-950 text-white">
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80" alt="Data background" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,1))]"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <motion.div style={{ y: yHero, opacity: opacityHero }} className="flex flex-col items-start text-left">
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.1)] mb-6 text-xs font-bold text-blue-400 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Performance Marketing Agency
            </motion.div>
            
            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-[32px] md:text-5xl lg:text-[70px] font-extrabold tracking-tight text-white leading-[1.05] mb-4 md:mb-6">
              Marketing dựa trên<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 relative">
                Những Con Số 
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
              </span><br />
              Thực Tế.
            </motion.h1>
            
            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="text-[15px] md:text-lg lg:text-xl text-neutral-400 font-medium leading-relaxed mb-8 md:mb-10 max-w-lg">
              Chấm dứt việc tiêu ngân sách vô ích. Trực tiếp đốt cháy doanh số với chiến lược Digital Marketing đa kênh, tối ưu ROAS và chuyển đổi qua từng lượt click.
            </motion.p>
            
            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
               <Link href="#explore" className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm md:text-md hover:from-blue-700 hover:to-cyan-600 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] flex items-center gap-2">
                 Tăng Trưởng Ngay <ArrowRight size={18} />
               </Link>
               <div className="flex items-center gap-4 ml-2">
                 <div className="flex -space-x-3">
                   <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" alt="User" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-neutral-900 object-cover z-30" />
                   <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" alt="User" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-neutral-900 object-cover z-20" />
                   <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop" alt="User" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-neutral-900 object-cover z-10" />
                 </div>
                 <div className="text-xs md:text-sm font-medium text-neutral-300">Scale up cho 300+ Brands</div>
               </div>
            </motion.div>
          </motion.div>

          {/* Right: Floating Analytics Cards */}
          <div className="relative h-[500px] lg:h-[600px] w-full hidden md:block perspective-1000">
            {/* Main Stats Card */}
            <motion.div 
               initial={{ opacity: 0, rotateY: 10, z: -100 }} animate={{ opacity: 1, rotateY: -5, z: 0 }} transition={{ duration: 1, delay: 0.2 }}
               className="absolute top-10 right-10 w-[420px] h-[300px] bg-neutral-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-20 flex flex-col"
            >
               <div className="p-6 border-b border-white/5 flex justify-between items-center">
                 <div>
                   <div className="text-xs text-neutral-400 mb-1">Tỷ lệ chuyển đổi (CRO)</div>
                   <div className="text-3xl font-black text-white">+ 244%</div>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center"><TrendingUp /></div>
               </div>
               <div className="flex-1 relative">
                 <img src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=600&q=80" alt="Graph" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
               </div>
            </motion.div>

            {/* Ads Spend Card */}
            <motion.div 
               initial={{ opacity: 0, x: -50, y: 50 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
               className="absolute bottom-10 -left-10 w-[240px] p-6 bg-neutral-800 rounded-[20px] border-[1px] border-blue-600/20 shadow-2xl z-30 flex flex-col"
            >
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400"><Target size={20} /></div>
                 <div><div className="text-xs text-neutral-400">Google Ads</div><div className="font-bold text-white">ROAS 6.2x</div></div>
               </div>
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Data" className="w-full h-24 object-cover rounded-lg opacity-80" />
            </motion.div>

            {/* Social Media Card */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, rotate: 6 }} transition={{ duration: 1, delay: 0.6 }}
               className="absolute top-40 right-[-40px] w-[200px] h-[200px] rounded-3xl shadow-xl z-30 overflow-hidden group"
            >
               <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80" alt="Social Media" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent" />
               <div className="absolute bottom-0 left-0 p-5 text-white z-10 w-full">
                  <div className="text-xl font-bold mb-1 flex justify-between items-end">
                    Viral <Activity size={24} className="text-blue-400" />
                  </div>
                  <div className="text-sm font-medium text-blue-200">12M+ Reach</div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
}
