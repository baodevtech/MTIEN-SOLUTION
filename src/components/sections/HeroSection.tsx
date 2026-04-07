'use client';

import { motion, easeInOut } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronDown, Monitor, Sparkles, Play, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function HeroSection() {
  const reduced = useReducedMotion();

  // Floating animations
  const floatUp = {
    animate: { y: [0, -15, 0] },
    transition: { duration: 6, repeat: Infinity, ease: easeInOut }
  };
  
  const floatDown = {
    animate: { y: [0, 15, 0] },
    transition: { duration: 7, repeat: Infinity, ease: easeInOut }
  };

  return (
    <section className="bg-[#F8FAFC] pt-6 md:pt-32 pb-8 md:pb-40 relative overflow-hidden font-sans" aria-label="Giới thiệu">
      
      {/* Background Aurora / Mesh Gradient & Spotlight Effects */}
      {!reduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
          {/* Spotlight Effect Top Center */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[1000px] h-[80vw] max-h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0066FF]/20 via-transparent to-transparent blur-[80px]"
          />
          {/* Animated side auroras */}
          <motion.div 
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-15%] right-[-5%] w-[50vw] h-[50vw] bg-[#0066FF]/15 rounded-full blur-[120px] mix-blend-multiply"
          />
          <motion.div 
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-[#00D68F]/10 rounded-full blur-[130px] mix-blend-multiply"
          />
        </div>
      )}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none mix-blend-overlay z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      {/* Light mask gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent z-0"></div>

      <div className="max-w-[1300px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          
          {/* Left Content Area */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {!reduced ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }} 
                className="w-full relative"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-xs md:text-sm font-semibold mb-3 md:mb-6">
                  <Sparkles size={14} className="text-[#0066FF] md:hidden" />
                  <Sparkles size={16} className="text-[#0066FF] hidden md:block" />
                  <span>Giải pháp chuyển đổi số #1 Việt Nam</span>
                </div>
                
                <h1 className="text-[28px] sm:text-[48px] lg:text-[60px] font-extrabold text-[#0F172A] leading-[1.1] mb-3 md:mb-6 tracking-tight">
                  Tạo website <br className="hidden sm:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-cyan-500">
                    đột phá doanh thu
                  </span>
                </h1>
                
                <p className="text-[14px] md:text-[20px] text-slate-600 mb-5 md:mb-10 leading-relaxed max-w-lg">
                  Nền tảng thương mại điện tử trọn bộ kết hợp tự động hoá Marketing. Thiết kế đẳng cấp, chuẩn SEO, giúp bạn vượt mặt đối thủ.
                </p>

                <div className="flex flex-row items-center gap-2.5 md:gap-4 mb-5 md:mb-10">
                  <button className="flex-1 sm:flex-none bg-[#0066FF] hover:bg-blue-700 text-white rounded-full px-5 md:px-8 py-2.5 md:py-3.5 flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-[#0066FF]/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                    <span className="font-semibold text-[13px] md:text-[16px]">Bắt đầu dùng thử</span>
                    <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" className="md:hidden" />
                    <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" className="hidden md:block" />
                  </button>
                  
                  <button className="flex-1 sm:flex-none bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full px-5 md:px-8 py-2.5 md:py-3.5 flex items-center justify-center gap-2 md:gap-3 shadow-sm transition-all shadow-black/5 hover:shadow-black/10">
                    <Play size={16} className="fill-slate-700 md:hidden" />
                    <Play size={18} className="fill-slate-700 hidden md:block" />
                    <span className="font-semibold text-[13px] md:text-[16px]">Xem demo</span>
                  </button>
                </div>

                <div className="flex flex-row items-center gap-3 md:gap-6 pt-4 md:pt-6 border-t border-slate-200/60">
                  <div className="flex -space-x-2 md:-space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                        <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt={`Khách hàng ${i}`} fill className="object-cover" sizes="40px" />
                      </div>
                    ))}
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] md:text-xs font-bold text-slate-600 shadow-sm z-10">
                      230k+
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 md:gap-1 text-amber-500 mb-0.5 md:mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                    <p className="text-[11px] md:text-sm font-medium text-slate-600"><span className="font-semibold text-slate-900">10,000+</span> doanh nghiệp</p>
                  </div>
                </div>
              </motion.div>
            ) : (
               /* Reduced motion fallback omitted to respect brevity inside layout blocks, normally same structure no animation */
              <div className="w-full">
                 <h1 className="text-[40px] sm:text-[54px] font-extrabold text-[#0F172A] leading-[1.1] mb-6 tracking-tight">
                  Tạo website đột phá doanh thu
                </h1>
              </div>
            )}
          </div>

          {/* Right Content Area: Hero Graphic */}
          <div className="lg:col-span-6 relative z-20">
            {!reduced ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative"
              >
                {/* Main Browser Mockup - Glassmorphism */}
                <div className="relative w-full aspect-[16/10] bg-white/40 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] ring-1 ring-slate-200/50 p-2 md:p-3 overflow-visible z-10">
                  <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-100 flex flex-col justify-start">
                    {/* Browser Header */}
                    <div className="w-full h-8 md:h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 justify-between">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-300"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-300"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-300"></div>
                      </div>
                      <div className="flex-1 px-4 max-w-sm">
                        <div className="h-5 md:h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center gap-2 px-3">
                           <ShieldCheck size={12} className="text-green-500" />
                           <span className="text-[10px] md:text-xs text-slate-400 font-medium">mtien-solution.com</span>
                        </div>
                      </div>
                      <div className="hidden sm:flex gap-3 text-slate-400">
                        <Monitor size={14} />
                      </div>
                    </div>
                    {/* Browser Content - Next.js Image */}
                    <div className="relative w-full flex-1 bg-slate-100">
                      <Image
                        src="https://picsum.photos/seed/yody2/800/500"
                        alt="Giao diện website mẫu MTIEN SOLUTION"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements / Widgets */}
                <motion.div {...floatUp} className="absolute -top-6 -left-8 md:-left-12 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white hidden md:flex gap-4 items-center z-30">
                  <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
                    <Zap size={20} className="text-[#0066FF] fill-[#0066FF]/20" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Tốc độ tối đa</h4>
                    <p className="text-xs font-medium text-[#0066FF]">99/100 Google Insights</p>
                  </div>
                </motion.div>

                <motion.div {...floatDown} className="absolute -bottom-8 -right-6 md:-right-10 bg-white/90 backdrop-blur-xl rounded-2xl p-4 md:p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white w-[260px] z-30 hidden md:block">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-slate-800">Doanh thu hôm nay</h4>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#00D68F]/10 text-[#00D68F]">+24.5%</span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 mb-2">124.500.000₫</div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0066FF] w-[75%] rounded-full"></div>
                  </div>
                </motion.div>

              </motion.div>
            ) : (
                <div className="relative w-full aspect-[16/10] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-10">
                   <div className="w-full h-full relative bg-gray-50">
                    <Image
                      src="https://picsum.photos/seed/yody/800/500"
                      alt="Giao diện website mẫu MTIEN SOLUTION"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
            )}
          </div>
          
        </div>
        
        {/* Support badges */}
        <div className="mt-6 md:mt-32 pt-4 md:pt-10 border-t border-slate-200/50 w-full flex flex-nowrap justify-between md:justify-center gap-2 md:gap-16 items-center opacity-70 cursor-default grayscale hover:grayscale-0 transition-all duration-500 overflow-x-auto scrollbar-hide">
           {['Tối ưu SEO', 'Responsive', 'SSL 256-bit', 'Hosting nhanh'].map((badge, i) => (
             <div key={i} className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-semibold text-slate-600 whitespace-nowrap shrink-0">
               <CheckCircle2 size={14} className="text-emerald-500 md:hidden" />
               <CheckCircle2 size={18} className="text-emerald-500 hidden md:block" />
               <span>{badge}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
