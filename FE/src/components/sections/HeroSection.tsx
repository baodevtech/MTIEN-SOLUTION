'use client';

import { motion, easeInOut } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronDown, Monitor, Sparkles, Play, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/use-theme';

export default function HeroSection() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const t = useTheme('home', 'hero');

  // Disable all JS animations on mobile for LCP & battery
  const skipAnim = reduced || isMobile;

  // Floating animations (desktop only)
  const floatUp = skipAnim ? {} : {
    animate: { y: [0, -15, 0] },
    transition: { duration: 6, repeat: Infinity, ease: easeInOut }
  };
  
  const floatDown = skipAnim ? {} : {
    animate: { y: [0, 15, 0] },
    transition: { duration: 7, repeat: Infinity, ease: easeInOut }
  };

  return (
    <section className="bg-[#F8FAFC] pt-6 md:pt-30 pb-14 md:pb-40 relative overflow-hidden font-sans" aria-label="Giới thiệu">
      
      {/* Background Aurora / Mesh Gradient & Spotlight Effects — desktop only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block" aria-hidden="true">
        <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[1000px] h-[80vw] max-h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0066FF]/20 via-transparent to-transparent blur-[80px]" />
        <div className="absolute top-[-15%] right-[-5%] w-[50vw] h-[50vw] bg-[#0066FF]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-[#00D68F]/10 rounded-full blur-[130px]" />
      </div>

      {/* Grid pattern overlay — desktop only (saves GPU on mobile) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0 hidden md:block"></div>
      {/* Light mask gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent z-0"></div>

      <div className="max-w-[1300px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* Left Content Area */}
          <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
            {skipAnim ? (
              <div className="w-full relative">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-xs md:text-sm font-semibold mb-4 md:mb-6">
                  <Sparkles size={14} className="text-[#0066FF]" aria-hidden="true" />
                  <span>{t('badge', 'Giải pháp chuyển đổi số #1 Việt Nam')}</span>
                </div>
                
                <h1 className="text-[26px] sm:text-[48px] lg:text-[60px] font-extrabold text-[#0F172A] leading-[1.1] mb-3 md:mb-6 tracking-tight">
                  {t('title', 'Tạo website')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-cyan-500">
                    {t('titleHighlight', 'đột phá doanh thu')}
                  </span>
                </h1>
                
                <p className="text-[13px] md:text-[20px] text-slate-600 mb-5 md:mb-10 leading-relaxed max-w-lg">
                  {t('description', 'Nền tảng thương mại điện tử trọn bộ kết hợp tự động hoá Marketing. Thiết kế đẳng cấp, chuẩn SEO, giúp bạn vượt mặt đối thủ.')}
                </p>

                <div className="flex flex-row items-center justify-center md:justify-start gap-3 md:gap-4 mb-0 md:mb-10">
                  <Link href={t('ctaPrimaryLink', '/contact')} className="bg-[#0066FF] hover:bg-blue-700 text-white rounded-full px-5 md:px-8 py-2.5 md:py-3.5 flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-[#0066FF]/30 transition-all">
                    <span className="font-semibold text-[13px] md:text-[16px]">{t('ctaPrimary', 'Bắt đầu dùng thử')}</span>
                    <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                  
                  <Link href={t('ctaSecondaryLink', '/services')} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full px-5 md:px-8 py-2.5 md:py-3.5 flex items-center justify-center gap-2 md:gap-3 shadow-sm transition-all">
                    <Play size={15} className="fill-slate-700" aria-hidden="true" />
                    <span className="font-semibold text-[13px] md:text-[16px]">{t('ctaSecondary', 'Xem demo')}</span>
                  </Link>
                </div>
              </div>
            ) : (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }} 
              className="w-full relative"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-xs md:text-sm font-semibold mb-4 md:mb-6">
                <Sparkles size={16} className="text-[#0066FF]" aria-hidden="true" />
                <span>{t('badge', 'Giải pháp chuyển đổi số #1 Việt Nam')}</span>
              </div>
              
              <h1 className="text-[26px] sm:text-[48px] lg:text-[60px] font-extrabold text-[#0F172A] leading-[1.1] mb-3 md:mb-6 tracking-tight">
                {t('title', 'Tạo website')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-cyan-500">
                  {t('titleHighlight', 'đột phá doanh thu')}
                </span>
              </h1>
              
              <p className="text-[13px] md:text-[20px] text-slate-600 mb-5 md:mb-10 leading-relaxed max-w-lg">
                {t('description', 'Nền tảng thương mại điện tử trọn bộ kết hợp tự động hoá Marketing. Thiết kế đẳng cấp, chuẩn SEO, giúp bạn vượt mặt đối thủ.')}
              </p>

              <div className="flex flex-row items-center justify-center md:justify-start gap-3 md:gap-4 mb-0 md:mb-10">
                <Link href={t('ctaPrimaryLink', '/contact')} className="bg-[#0066FF] hover:bg-blue-700 text-white rounded-full px-5 md:px-8 py-2.5 md:py-3.5 flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-[#0066FF]/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                  <span className="font-semibold text-[13px] md:text-[16px]">{t('ctaPrimary', 'Bắt đầu dùng thử')}</span>
                  <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
                </Link>
                
                <Link href={t('ctaSecondaryLink', '/services')} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full px-5 md:px-8 py-2.5 md:py-3.5 flex items-center justify-center gap-2 md:gap-3 shadow-sm transition-all shadow-black/5 hover:shadow-black/10">
                  <Play size={15} className="fill-slate-700" aria-hidden="true" />
                  <span className="font-semibold text-[13px] md:text-[16px]">{t('ctaSecondary', 'Xem demo')}</span>
                </Link>
              </div>

              {/* Desktop social proof */}
              <div className="hidden md:flex flex-row items-center justify-start gap-6 pt-6 border-t border-slate-200/60">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                      <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt={`Khách hàng ${i}`} width={40} height={40} className="object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm z-10">
                    230k+
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1" role="img" aria-label="Đánh giá 5 sao">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-slate-600"><span className="font-semibold text-slate-900">{t('socialProofCount', '10,000+')}</span> {t('socialProofLabel', 'doanh nghiệp')}</p>
                </div>
              </div>
            </motion.div>
            )}

            {/* Mobile: Image then social proof */}
            <div className="md:hidden w-full mt-5 flex flex-col gap-4">
              {/* Browser preview — simplified for mobile */}
              <div className="relative w-full aspect-[4/3] bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                <div className="w-full h-7 bg-slate-50 border-b border-slate-100 flex items-center px-3 gap-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]"></div>
                  <div className="flex-1 mx-2">
                    <div className="h-4 rounded bg-slate-100 flex items-center justify-center">
                      <span className="text-[8px] text-slate-400 font-medium">mtien-solution.com</span>
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-[calc(100%-28px)]">
                  <Image
                    src={t('heroImage', 'https://picsum.photos/seed/yody2/800/500')}
                    alt="Giao diện website mẫu MTIEN SOLUTION"
                    fill
                    className="object-cover object-top"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              {/* Social proof — simplified */}
              <div className="flex flex-row items-center justify-center gap-3 pt-3">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">M</div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">T</div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-600 z-10">
                      230k+
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-500 mb-0.5" role="img" aria-label="Đánh giá 5 sao">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-[11px] font-medium text-slate-600"><span className="font-semibold text-slate-900">{t('socialProofCount', '10,000+')}</span> {t('socialProofLabel', 'doanh nghiệp')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area: Hero Graphic — visible on tablet+ */}
          <div className="hidden md:block md:col-span-6 relative z-20">
            {skipAnim ? (
              <div className="relative">
                <div className="relative w-full aspect-[16/10] bg-white/40 backdrop-blur-3xl rounded-3xl border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] ring-1 ring-slate-200/50 p-3 overflow-visible z-10">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-100 flex flex-col justify-start">
                    <div className="w-full h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 justify-between">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                      </div>
                      <div className="flex-1 px-4 max-w-sm">
                        <div className="h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center gap-2 px-3">
                           <ShieldCheck size={12} className="text-green-500" />
                           <span className="text-xs text-slate-400 font-medium">mtien-solution.com</span>
                        </div>
                      </div>
                      <div className="flex gap-3 text-slate-400"><Monitor size={14} /></div>
                    </div>
                    <div className="relative w-full flex-1 bg-slate-100">
                      <Image src="https://picsum.photos/seed/yody2/800/500" alt="Giao diện website mẫu MTIEN SOLUTION" fill className="object-cover" priority sizes="50vw" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
                {/* Main Browser Mockup - Glassmorphism */}
                <div className="relative w-full aspect-[16/10] bg-white/40 backdrop-blur-3xl rounded-2xl md:rounded-3xl border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] ring-1 ring-slate-200/50 p-2 md:p-3 overflow-visible z-10">
                  <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-100 flex flex-col justify-start">
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
                    <div className="relative w-full flex-1 bg-slate-100">
                      <Image
                        src="https://picsum.photos/seed/yody2/800/500"
                        alt="Giao diện website mẫu MTIEN SOLUTION"
                        fill
                        className="object-cover"
                        priority
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements / Widgets — desktop only */}
                <motion.div {...floatUp} className="absolute -top-6 -left-12 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white hidden md:flex gap-4 items-center z-30">
                  <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
                    <Zap size={20} className="text-[#0066FF] fill-[#0066FF]/20" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t('floatingCard1Title', 'Tốc độ tối đa')}</p>
                    <p className="text-xs font-medium text-[#0066FF]">{t('floatingCard1Desc', '99/100 Google Insights')}</p>
                  </div>
                </motion.div>

                <motion.div {...floatDown} className="absolute -bottom-8 -right-10 bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white w-[260px] z-30 hidden md:block">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm font-bold text-slate-800">{t('floatingCard2Title', 'Doanh thu hôm nay')}</p>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#00D68F]/10 text-[#00D68F]">{t('floatingCard2Badge', '+24.5%')}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 mb-2">{t('floatingCard2Value', '124.500.000₫')}</div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0066FF] w-[75%] rounded-full"></div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
          
        </div>
        
        {/* Support badges */}
        <div className="mt-4 pt-3 md:pt-10 border-t border-slate-200/50 w-full flex flex-nowrap justify-center gap-3 md:gap-16 items-center opacity-60 cursor-default overflow-x-auto scrollbar-hide">
           {(t('supportBadges', 'Tối ưu SEO\nResponsive\nSSL 256-bit\nHosting nhanh') as string).split('\n').map((badge: string, i: number) => (
             <div key={i} className="flex items-center gap-1.5 text-[11px] md:text-sm font-semibold text-slate-500 whitespace-nowrap shrink-0">
               <CheckCircle2 size={14} className="text-emerald-500 md:w-[18px] md:h-[18px]" />
               <span>{badge}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
