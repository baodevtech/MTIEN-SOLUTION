'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  TrendingUp, Search, Megaphone, Mail, 
  ArrowRight, CheckCircle2, BarChart3, Quote, Check,
  Target, Crosshair, Zap, PieChart, Activity,
  Globe2, MousePointerClick, Star
} from 'lucide-react';
import { Manrope } from 'next/font/google';
import Link from 'next/link';

const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function EpicDigitalMarketingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main ref={containerRef} className={`${manrope.className} bg-neutral-50 text-neutral-900 antialiased selection:bg-blue-600 selection:text-white min-h-screen overflow-hidden`}>
      
      {/* SECTION 1: HERO - PERFORMANCE MARKETING & DATA */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 overflow-hidden bg-neutral-950 text-white">
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80" alt="Data background" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,1))]"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <motion.div style={{ y: yHero, opacity: opacityHero }} className="flex flex-col items-start text-left">
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.1)] mb-6 text-xs font-bold text-blue-400 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Performance Marketing Agency
            </motion.div>
            
            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-5xl lg:text-[70px] font-extrabold tracking-tight text-white leading-[1.05] mb-6">
              Marketing dựa trên<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 relative">
                Những Con Số 
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
              </span><br />
              Thực Tế.
            </motion.h1>
            
            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed mb-10 max-w-lg">
              Chấm dứt việc tiêu ngân sách vô ích. Trực tiếp đốt cháy doanh số với chiến lược Digital Marketing đa kênh, tối ưu ROAS và chuyển đổi qua từng lượt click.
            </motion.p>
            
            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
               <Link href="#explore" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-md hover:from-blue-700 hover:to-cyan-600 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] flex items-center gap-2">
                 Tăng Trưởng Ngay <ArrowRight size={18} />
               </Link>
               <div className="flex items-center gap-4 ml-2">
                 <div className="flex -space-x-3">
                   <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover z-30" />
                   <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover z-20" />
                   <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover z-10" />
                 </div>
                 <div className="text-sm font-medium text-neutral-300">Scale up cho 300+ Brands</div>
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

      {/* SECTION 2: VISION STATEMENT */}
      <section id="explore" className="py-32 px-6 bg-neutral-50 relative z-10 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto text-center">
           <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight">
             Thương hiệu của bạn xứng đáng hiển thị <br />
             <span className="text-blue-600">ở những vị trí đắt giá nhất.</span>
           </motion.h2>
        </div>
      </section>

      {/* SECTION 3: THE PROBLEM (WHY ADS FAIL) */}
      <section className="py-32 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative h-[500px]">
             <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl group border border-neutral-200">
                <img src="https://images.unsplash.com/photo-1563986768609-322da135f6a3?auto=format&fit=crop&w=1000&q=80" alt="Wasted Budget" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 filter grayscale" />
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-xl text-center">
                   <div className="text-blue-700 font-bold text-xl mb-1">Cảnh Báo</div>
                   <div className="text-neutral-900 font-black text-4xl">Lãng phí Ngân sách</div>
                </div>
             </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">90% doanh nghiệp <br/>đang "đốt tiền" sai cách.</h3>
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

      {/* SECTION 4: CORE VALUES (DATA-DRIVEN) */}
      <section className="py-32 px-6 bg-neutral-950 text-white rounded-[40px] md:rounded-[80px] mx-4 md:mx-8 mb-32 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight">DNA của Sự Tăng Trưởng</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="md:col-span-2 bg-neutral-900 rounded-[32px] p-10 flex flex-col justify-center border border-white/10 hover:border-blue-600/50 transition-colors relative overflow-hidden group">
               <PieChart className="text-blue-600 w-12 h-12 mb-6 relative z-10" />
               <h3 className="text-2xl font-bold mb-2 relative z-10">Data-Driven (Dữ liệu hóa)</h3>
               <p className="text-neutral-400 relative z-10 w-2/3">Chúng tôi không đoán. Chúng tôi sử dụng A/B Testing, Tracking Pixel và Machine Learning để đưa ra mọi quyết định.</p>
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Data" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 mask-image-linear-to-l group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-neutral-900 rounded-[32px] p-10 flex flex-col justify-center border border-white/10 hover:border-cyan-500/50 transition-colors relative overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80" alt="Funnel" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" />
               <Crosshair className="text-cyan-500 w-12 h-12 mb-6 relative z-10" />
               <h3 className="text-2xl font-bold mb-2 relative z-10">Tối ưu Funnel</h3>
               <p className="text-neutral-400 relative z-10">Nhắm trúng phễu từ Nhận thức đến Mua hàng.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="bg-gradient-to-br from-blue-700 to-cyan-600 text-white rounded-[32px] p-10 flex flex-col justify-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full pointer-events-none" />
               <Zap className="text-white w-12 h-12 mb-6 relative z-10" />
               <h3 className="text-2xl font-bold mb-2 relative z-10">Thực thi thần tốc</h3>
               <p className="text-blue-100 relative z-10">Scale ngân sách ngay khi tìm thấy Winning Camp.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="md:col-span-2 bg-neutral-900 rounded-[32px] p-10 flex flex-col justify-center border border-white/10 hover:border-purple-500/50 transition-colors relative overflow-hidden">
               <Globe2 className="text-purple-500 w-12 h-12 mb-6 relative z-10" />
               <h3 className="text-2xl font-bold mb-2 relative z-10">Omni-Channel (Đa kênh tích hợp)</h3>
               <p className="text-neutral-400 relative z-10 w-2/3">Khách hàng của bạn ở đâu, thương hiệu của bạn có mặt ở đó. Phủ sóng đồng điệu mọi điểm chạm số từ Google đến TikTok.</p>
               <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" alt="Omni" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-10 mask-image-linear-to-l pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SERVICE - SEO */}
      <section className="py-32 px-6 bg-white overflow-hidden border-y border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80" alt="SEO" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-8 left-8 text-white">
                <Search size={40} className="mb-4 text-emerald-400"/>
                <div className="text-2xl font-bold">Top 1 Google</div>
             </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 font-bold mb-6"><Search size={18} /> Search Engine Optimization</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Tối ưu hóa SEO <br/>thống trị kết quả tìm kiếm.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Nguồn khách hàng miễn phí và bền vững nhất đến từ Google. Chúng tôi cung cấp giải pháp SEO tổng thể, bao vây thị trường bằng nội dung chất lượng cao và backlink uy tín.</p>
            <ul className="space-y-4">
               {['SEO Tổng thể (Audit, Onpage, Offpage)', 'Nghiên cứu & Tracking Keyword Mapping', 'Technical SEO tối ưu tốc độ website'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-emerald-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: SERVICE - PERFORMANCE ADS */}
      <section className="py-32 px-6 bg-neutral-50 overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Performance Ads" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-bold mb-6"><MousePointerClick size={18} /> Performance Ads</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Quảng cáo Đa nền tảng <br/>mang về doanh số thực.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Triển khai chiến dịch Paid Ads quy mô lớn trên Meta (Facebook, Instagram), Google (Search, Display, Shopping) và TikTok. Tối ưu liên tục dựa trên CPA và ROAS mục tiêu.</p>
            <ul className="space-y-4">
               {['Media Planning & Ngân sách chiến lược', 'A/B Testing Creatives & Target Audiences', 'Retargeting (Bám đuổi tệp khách hàng tiềm năng)'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: SERVICE - SOCIAL MEDIA */}
      <section className="py-32 px-6 bg-white overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80" alt="Social Media" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-800 font-bold mb-6"><Megaphone size={18} /> Social & Content</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Sáng tạo Nội dung Viral.<br/>Lan tỏa mạnh mẽ.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Xây dựng cộng đồng trung thành bằng những nội dung mang tính giải trí, giáo dục và có sức lan tỏa (Viral). Chúng tôi quản trị toàn diện hệ thống Fanpage, TikTok channel của bạn.</p>
            <ul className="space-y-4">
               {['Sản xuất Video Short, Reels & TikTok', 'Kịch bản Content Marketing Calendar', 'Community building (Seeding & Quản trị)'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-blue-600" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: SERVICE - EMAIL & AUTOMATION */}
      <section className="py-32 px-6 bg-neutral-50 overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80" alt="Email Marketing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-bold mb-6"><Mail size={18} /> Automated CRM</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Hệ thống Auto-Marketing <br/>Chăm sóc tự động 24/7.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Thiết lập luồng (flow) Email & SMS tự động, nuôi dưỡng Leads đến khi họ sẵn sàng mua hàng. Biến khách hàng cũ thành những người ủng hộ trung thành nhất.</p>
            <ul className="space-y-4">
               {['Email Drip Campaigns', 'Kịch bản Chatbot & SMS tự động', 'Tích hợp hệ thống CRM (Klaviyo, Mailchimp)'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: MARKETING FUNNEL & FRAMEWORK */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-8"><Target size={32} /></motion.div>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Mô Hình Tăng Trưởng AARRR</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed mb-16">Chúng tôi vạch ra lộ trình minh bạch để "Hacking" sự phát triển của bạn ở mọi tầng trong phễu.</motion.p>
          
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
             {[
               { t: 'Acquisition (Thu hút)', d: 'Kéo user từ Ads, SEO, Social Media.', c: 'bg-blue-600', w: 'w-full' },
               { t: 'Activation (Kích hoạt)', d: 'Biến user thành Leads (đăng ký, form, tin nhắn).', c: 'bg-cyan-500', w: 'w-11/12' },
               { t: 'Retention (Giữ chân)', d: 'Email, Remarketing để user quay lại.', c: 'bg-yellow-500', w: 'w-5/6' },
               { t: 'Revenue (Doanh thu)', d: 'Tối ưu Tỷ lệ chốt Sales & Upsell.', c: 'bg-green-500', w: 'w-3/4' },
               { t: 'Referral (Lan truyền)', d: 'Khách hàng giới thiệu khách hàng mới.', c: 'bg-blue-500', w: 'w-2/3' }
             ].map((f, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`${f.w} mx-auto flex items-center shadow-md rounded-2xl overflow-hidden bg-white border border-neutral-100 relative`}>
                   <div className={`w-2 h-full absolute left-0 ${f.c} top-0 bottom-0`}></div>
                   <div className="p-5 pl-8 flex-1 text-left">
                     <span className="font-bold text-neutral-900 text-lg block">{f.t}</span>
                     <span className="text-neutral-500 text-sm">{f.d}</span>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: TECH STACK & SYSTEM */}
      <section className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto bg-neutral-900 rounded-[40px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-16 border border-white/10 relative overflow-hidden">
           <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Tech Stack Background" className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none mix-blend-screen" />
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
           
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1 relative z-10">
              <BarChart3 className="w-16 h-16 text-blue-400 mb-8" />
              <h2 className="text-4xl font-extrabold mb-6">Trang Bị "Vũ Khí" Tối Tân</h2>
              <p className="text-xl text-neutral-400 leading-relaxed mb-8">Không dựa trên cảm tính. Chúng tôi gắn Tracking mạnh mẽ đến tận cùng để kiểm soát Mọi hành vi khách hàng: Google Tag Manager, GA4, Meta Pixel, Conversion API.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg">Khởi Tạo Tracking Audit</Link>
           </motion.div>
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 w-full bg-black/50 backdrop-blur-xl rounded-[24px] p-8 shadow-2xl border border-white/10 relative z-10 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80" alt="GA4 Dashboard" className="rounded-xl w-full h-32 object-cover border border-white/5 opacity-80" />
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Looker Studio" className="rounded-xl w-full h-32 object-cover border border-white/5 opacity-80" />
              <img src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=400&q=80" alt="Meta Ads" className="rounded-xl w-full h-32 object-cover border border-white/5 opacity-80 col-span-2" />
           </motion.div>
        </div>
      </section>

      {/* SECTION 11: THE PROCESS */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Chiến lược triển khai</motion.h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 relative">
             <div className="hidden md:block absolute top-[40px] left-10 right-10 h-1 bg-neutral-100 rounded-full" />
             {[
               { id: 1, t: 'Audit & Plan', d: 'Phân tích dữ liệu lịch sử, lên kế hoạch ngân sách và kênh triển khai.' },
               { id: 2, t: 'Setup & Tracking', d: 'Gắn Pixel, cấu trúc lại chiến dịch chuẩn Growth Framework.' },
               { id: 3, t: 'Test & Launch', d: 'Chạy phân tách A/B Testing để tìm ra content & target thắng lợi.' },
               { id: 4, t: 'Scale & Optimize', d: 'Bơm ngân sách mạnh vào tệp ngon. Tối ưu loại bỏ rác hiệu suất.' }
             ].map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex-1 relative pt-8 md:pt-16">
                   <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl font-black text-blue-600 absolute top-0 md:-top-10 md:left-1/2 md:-translate-x-1/2 border-4 border-white shadow-xl z-20">0{s.id}</div>
                   <div className="text-start md:text-center mt-12 md:mt-4 relative z-10">
                     <h3 className="text-xl font-bold text-neutral-900 mb-2">{s.t}</h3>
                     <p className="text-neutral-500">{s.d}</p>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: METRICS & IMPACT */}
      <section className="py-24 px-6 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           {[
             { num: '$5M+', lbl: 'Ngân sách Quản lý' },
             { num: '300+', lbl: 'Thương Hiệu' },
             { num: '-40%', lbl: 'Chi phí CPA giảm' },
             { num: 'ROAS 6x', lbl: 'Hiệu suất TB' }
           ].map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                 <div className="text-4xl md:text-6xl font-black text-blue-700 mb-4">{m.num}</div>
                 <div className="text-blue-900 font-bold uppercase tracking-wide text-sm">{m.lbl}</div>
              </motion.div>
           ))}
        </div>
      </section>

      {/* SECTION 13: TESTIMONIALS */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1">
               <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-6">Lời nói từ<br/>Các Nhà Đầu Tư</motion.h2>
               <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-neutral-500 mb-8">Một Agency tốt sẽ cam kết bằng chỉ số và doanh thu thực, không phải những lượt "Like" viển vông.</motion.p>
               <Link href="/projects" className="font-bold border-b-2 border-neutral-900 pb-1 hover:text-blue-700 hover:border-blue-700 transition-colors">Xem Báo cáo Case Studies</Link>
            </div>
            <div className="flex-1 space-y-6">
               {[
                 { q: 'Chúng tôi bị kẹt do chi phí Ads Meta quá cao. Đội ngũ vào cuộc tái cấu trúc và kéo giảm CPA xuống 50% chỉ sau 1 tháng rưỡi.', a: 'John Pham', r: 'Co-founder E-commerce', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
                 { q: 'Họ không chỉ chạy quảng cáo, họ hệ thống lại toàn bộ luồng CRM và Email Marketing giúp chúng tôi không bỏ sót bất kỳ lead nào.', a: 'Elena Vu', r: 'Marketing Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }
               ].map((t, i) => (
                 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 flex flex-col gap-6">
                    <Quote className="text-blue-200 w-10 h-10" />
                    <p className="text-neutral-700 font-medium italic text-lg">"{t.q}"</p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <img src={t.img} alt={t.a} className="w-12 h-12 rounded-full object-cover shadow-sm" />
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

      {/* SECTION 14: PRICING / ENGAGEMENT MODEL */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Giải Pháp Tăng Trưởng</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-8">
             {/* Growth Plan */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-[40px] p-12 border border-neutral-200 hover:shadow-xl transition-shadow w-full flex flex-col">
                <h3 className="text-3xl font-bold mb-4">Growth Partner</h3>
                <p className="text-neutral-500 mb-8 border-b border-neutral-100 pb-8">Dành cho SMEs muốn ủy thác phòng Marketing, tối ưu chi phí vận hành.</p>
                <div className="space-y-6 mb-12 flex-1">
                   {['Quản trị toàn diện Facebook & Tiktok', 'Setup hệ thống Paid Ads hiệu suất', 'Sản xuất Content & Media định kỳ', 'Tracking Mức cơ bản'].map((l, i)=><div key={i} className="flex gap-4 items-center"><Check size={24} className="text-emerald-500"/><span className="font-medium text-neutral-800">{l}</span></div>)}
                </div>
                <button className="w-full py-5 rounded-full font-bold bg-neutral-100 hover:bg-neutral-200 text-lg transition-colors text-neutral-800">Nhận Báo Giá</button>
             </motion.div>

             {/* Enterprise Plan */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="bg-neutral-950 text-white rounded-[40px] p-12 shadow-[0_20px_60px_rgba(37,99,235,0.3)] relative overflow-hidden flex flex-col md:-mt-8 border border-blue-600/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-300 font-bold rounded-full mb-6 w-max border border-blue-400/20">Đỉnh Cao</div>
                <h3 className="text-3xl font-bold mb-4 relative z-10">Performance Scale</h3>
                <p className="text-neutral-400 mb-8 border-b border-white/10 pb-8 relative z-10">Giải pháp đốt cháy thị trường, ngân sách chi tiêu cực lớn với mục tiêu ROAS khắt khe.</p>
                <div className="space-y-6 mb-12 relative z-10 flex-1">
                   {['Tối ưu & Growth Hacking cấp độ cao', 'Chiến lược Omni-channel (Google, Meta, Tiktok, SEO)', 'Triển khai CRM Automation (Klaviyo)', 'Báo cáo Data minh bạch (Real-time Looker)'].map((l, i)=><div key={i} className="flex gap-4 items-center"><Check size={24} className="text-blue-400"/><span className="font-medium text-white">{l}</span></div>)}
                </div>
                <button className="w-full py-5 rounded-full font-bold text-lg bg-blue-700 hover:bg-blue-600 transition-colors relative z-10 text-white">Book Lịch Tư Vấn Setup</button>
             </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 15: FINAL CTA */}
      <section className="py-40 px-6 text-center bg-white border-t border-neutral-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto flex flex-col items-center">
           <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-[32px] flex items-center justify-center mb-10 shadow-[0_20px_40px_rgba(37,99,235,0.4)] rotate-3">
             <Zap size={40} className="animate-pulse" />
           </div>
           <h2 className="text-6xl md:text-[80px] font-extrabold tracking-tighter text-neutral-900 mb-8 leading-[1.1]">
             Đã Đến Lúc <br /> X2 Doanh Số.
           </h2>
           <p className="text-xl md:text-2xl text-neutral-500 mb-12 max-w-2xl font-medium">Bơm hàng ngàn traffic chất lượng vào phễu ngay hôm nay với công nghệ Performance Marketing hàng đầu.</p>
           <Link href="/contact" className="px-12 py-6 rounded-full bg-neutral-900 text-white font-black text-xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              Khởi động Chiến Dịch
           </Link>
        </motion.div>
      </section>
      
    </main>
  );
}
