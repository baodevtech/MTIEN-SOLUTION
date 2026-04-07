'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  PenTool, Layout, Smartphone, Sparkles, 
  ArrowRight, CheckCircle2, Layers, Quote, Check,
  Monitor, Palette, Target, Zap, Diamond,
  Code2, Component, Star
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

export default function EpicDesignAgencyPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main ref={containerRef} className={`${manrope.className} bg-[#FAFAFC] text-[#111] antialiased selection:bg-indigo-500 selection:text-white min-h-screen overflow-hidden`}>
      
      {/* SECTION 1: HERO - ASYMMETRICAL FLOATING UI WITH REAL IMAGES */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 overflow-hidden bg-[#FAFAFC]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <motion.div style={{ y: yHero, opacity: opacityHero }} className="flex flex-col items-start text-left">
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm mb-6 text-xs font-bold text-neutral-600 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Digital Design Agency
            </motion.div>
            
            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-5xl lg:text-[70px] font-extrabold tracking-tight text-neutral-900 leading-[1.05] mb-6">
              Giao diện Đẹp.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                Trải nghiệm 
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-400/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
              </span><br />
              Hoàn hảo.
            </motion.h1>
            
            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="text-lg md:text-xl text-neutral-500 font-medium leading-relaxed mb-10 max-w-lg">
              Biến ý tưởng thành những sản phẩm số tinh tế. Nâng tầm giá trị thương hiệu thông qua UI/UX sáng tạo và hệ thống nhận diện đồng bộ.
            </motion.p>
            
            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
               <Link href="#explore" className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-md hover:bg-blue-700 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] flex items-center gap-2">
                 Bắt đầu ngay <ArrowRight size={18} />
               </Link>
               <div className="flex items-center gap-4 ml-2">
                 <div className="flex -space-x-3">
                   <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-30" />
                   <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-20" />
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-10" />
                 </div>
                 <div className="text-sm font-medium text-neutral-600">Hơn 500+ dự án hoàn tất</div>
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
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Web design" className="w-full h-full object-cover" />
            </motion.div>

            {/* Mobile App Card */}
            <motion.div 
               initial={{ opacity: 0, x: 50, y: 50 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
               className="absolute bottom-10 right-0 w-[200px] h-[360px] bg-white rounded-[30px] border-[6px] border-neutral-900 shadow-2xl z-30 flex flex-col overflow-hidden"
            >
               <div className="h-5 w-24 bg-neutral-900 mx-auto rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 z-10" />
               <img src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=400&q=80" alt="Mobile UI" className="w-full h-full object-cover" />
            </motion.div>

            {/* Brand Card */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, rotate: 6 }} transition={{ duration: 1, delay: 0.6 }}
               className="absolute top-40 left-0 w-[220px] h-[220px] rounded-3xl shadow-xl z-10 overflow-hidden group"
            >
               <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80" alt="Branding" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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

      {/* SECTION 2: VISION STATEMENT */}
      <section id="explore" className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-6xl mx-auto text-center">
           <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight">
             Thiết kế không chỉ là thẩm mỹ.<br />
             <span className="text-neutral-400">Đó là nghệ thuật thu hút & chuyển đổi.</span>
           </motion.h2>
        </div>
      </section>

      {/* SECTION 3: WHY DESIGN MATTERS (DARK + REAL IMAGE) */}
      <section className="py-32 px-6 bg-neutral-950 text-white rounded-[40px] md:rounded-[80px] mx-4 md:mx-8 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ấn tượng đầu tiên <br/><span className="text-blue-400">định đoạt tất cả.</span></h3>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">Người dùng mất chưa tới 3 giây để đánh giá sự chuyên nghiệp của bạn thông qua Giao diện và Hình ảnh. Bạn muốn họ ở lại, hay lập tức chuyển sang đối thủ?</p>
            <div className="flex gap-6">
               <div><span className="block text-4xl font-black text-white">94%</span><span className="text-sm text-neutral-500">Ấn tượng do giao diện</span></div>
               <div><span className="block text-4xl font-black text-white">3s</span><span className="text-sm text-neutral-500">Thời gian giữ chú ý</span></div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative h-[400px]">
             <div className="absolute inset-0 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80" alt="Data Dashboard" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: CORE VALUES BENTO */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Triết lý Thiết kế</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[32px] p-10 flex flex-col justify-center border border-blue-100 hover:shadow-xl transition-shadow relative overflow-hidden">
               <Target className="text-blue-600 w-12 h-12 mb-6 relative z-10" />
               <h3 className="text-2xl font-bold text-neutral-900 mb-2 relative z-10">Hướng đến Mục tiêu</h3>
               <p className="text-neutral-600 relative z-10">Mọi pixel đều phục vụ mục đích chuyển đổi và tăng tầm trải nghiệm người dùng.</p>
               <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" alt="Target" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 mask-image-linear-to-l pointer-events-none" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-white rounded-[32px] p-10 flex flex-col justify-center border border-neutral-200 hover:shadow-xl transition-shadow relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" alt="Aesthetic" className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" />
               <Diamond className="text-purple-600 w-12 h-12 mb-6 relative z-10" />
               <h3 className="text-2xl font-bold text-neutral-900 mb-2 relative z-10">Thẩm mỹ Cao cấp</h3>
               <p className="text-neutral-600 relative z-10">Giao diện nịnh mắt chuẩn Global.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="bg-neutral-900 text-white rounded-[32px] p-10 flex flex-col justify-center hover:shadow-xl transition-shadow shadow-[0_20px_40px_rgba(0,0,0,0.2)] relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" alt="Performance" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
               <Zap className="text-yellow-400 w-12 h-12 mb-6 relative z-10" />
               <h3 className="text-2xl font-bold mb-2 relative z-10">Tối ưu Hiệu suất</h3>
               <p className="text-neutral-400 relative z-10">Mượt mà và dễ dàng lập trình.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="md:col-span-2 bg-white rounded-[32px] p-10 flex flex-col justify-center border border-neutral-200 hover:shadow-xl transition-shadow relative overflow-hidden">
               <div className="absolute right-0 bottom-0 w-64 h-64 bg-cyan-100 blur-3xl rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"/>
               <Layers className="text-cyan-600 w-12 h-12 mb-6 relative z-10" />
               <h3 className="text-2xl font-bold text-neutral-900 mb-2 relative z-10">Tính Đồng bộ tuyệt đối</h3>
               <p className="text-neutral-600 relative z-10">Tạo ra thư viện Design System chuẩn mực, nhất quán trên mọi nền tảng.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SERVICE - WEB UX/UI */}
      <section className="py-32 px-6 bg-white border-y border-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[450px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="Web UX UI" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
             <Monitor className="absolute bottom-8 right-8 text-white/50 w-24 h-24 stroke-1" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold mb-6"><Monitor size={18} /> Website UI/UX</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Thiết kế Website <br/>thấu hiểu người dùng.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Từng khoảng cách, màu sắc và typography đều được lồng ghép kỹ lưỡng. Chúng tôi tạo ra luồng trải nghiệm mượt mà, giúp tăng tỷ lệ chuyển đổi (CRO) và giữ chân khách hàng hiệu quả.</p>
            <ul className="space-y-4">
               {['Wireframing & Prototyping', 'Responsive Design chuẩn Mobile', 'Tối ưu luồng người dùng (User Flow)'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: SERVICE - MOBILE APP */}
      <section className="py-32 px-6 bg-[#FAFAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] flex items-center justify-center overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" alt="Mobile App Background" className="absolute inset-0 w-full h-full object-cover rounded-[40px] opacity-60 group-hover:scale-105 transition-transform duration-700 blur-sm pointer-events-none" />
             <div className="w-[240px] h-[480px] bg-black rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[6px] border-neutral-900 overflow-hidden relative z-10 group-hover:-translate-y-4 transition-transform duration-700">
                <div className="w-24 h-6 bg-neutral-900 mx-auto rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 z-20" />
                <img src="https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=400&q=80" alt="App Interface" className="w-full h-full object-cover" />
             </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-bold mb-6"><Smartphone size={18} /> Mobile App</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Giao diện Di động <br/>nhỏ gọn nhưng uy lực.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Không gian nhỏ cần một thiết kế thông minh. Thiết kế App của chúng tôi tập trung vào bộ tương tác ngón tay, Micro-interactions chuẩn xác giúp App hoạt động như thể nó hiểu người dùng.</p>
            <ul className="space-y-4">
               {['Thiết kế iOS & Android Native', 'Tương tác Micro-interactions', 'Tối ưu vùng chạm Tap-targets'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-indigo-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: SERVICE - BRANDING */}
      <section className="py-32 px-6 bg-white overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[450px] w-full rounded-[40px] shadow-2xl border border-neutral-100 overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80" alt="Brand Identity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-bold mb-6"><PenTool size={18} /> Brand Identity</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Bộ nhận diện<br/>vượt thời gian.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Logo và màu sắc thương hiệu là tài sản tạo nên giá trị dài hạn. Chúng tôi thiết kế bộ Brand Guidelines toàn diện, đảm bảo hình ảnh doanh nghiệp của bạn đồng nhất trên mọi nền tảng.</p>
            <ul className="space-y-4">
               {['Thiết kế Logo tiêu chuẩn', 'Hệ thống màu sắc & Typography', 'Cẩm nang Brand Guidelines'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: SERVICE - MARKETING ASSETS */}
      <section className="py-32 px-6 bg-neutral-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[450px] w-full rounded-[40px] shadow-2xl border border-white/10 overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80" alt="Marketing Assets" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-cyan-400 font-bold mb-6"><Palette size={18} /> Marketing Assets</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Thiết kế truyền thông<br/>tối đa chuyển đổi.</h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">Thống trị nhãn quan trên mạng xã hội bằng những ấn phẩm sắc nét. Chúng tôi cung cấp banner, profile, hồ sơ năng lực mang đậm tính Sales và Marketing chuyên nghiệp.</p>
            <ul className="space-y-4">
               {['Banner quảng cáo (Ads)', 'Hồ sơ năng lực (Pitch Deck)', 'Brochure & Catalog'].map((l, i)=><li key={i} className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-cyan-400" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: SYSTEM & TOKENS */}
      <section className="py-32 px-6 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8"><Component size={32} /></motion.div>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Trọng tâm là Design System</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed mb-16">Chúng tôi xây dựng Hệ thống Thiết kế (Atomic Design) chuẩn mực cho từng sản phẩm. Giúp tiết kiệm chi phí lập trình và đảm bảo UI nhất quán trên hàng trăm màn hình.</motion.p>
          <div className="flex flex-wrap justify-center gap-4">
             {['Atoms (Nút, Icons, Màu)', 'Molecules (Cards, Inputs)', 'Organisms (Điều hướng)', 'Templates (Bố cục)'].map((t, i) => (
                <span key={i} className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-700 font-bold border border-neutral-200 shadow-sm">{t}</span>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: DEV HANDOFF */}
      <section className="py-32 px-6 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[40px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-16 shadow-[0_30px_60px_rgba(37,99,235,0.2)] relative overflow-hidden">
           <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Code Background" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none" />
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1 relative z-10">
              <Code2 className="w-16 h-16 text-blue-200 mb-8" />
              <h2 className="text-4xl font-extrabold mb-6">Giao diện Sẵn sàng Code</h2>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">Mọi thiết kế trên Figma được tổ chức Auto Layout, hệ thống Token mạnh mẽ, xuất màn hình rõ ràng để Developer chuyển hóa thành code một cách hoàn hảo nhất.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">Liên hệ Team Thiết kế</Link>
           </motion.div>
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 w-full bg-neutral-950/80 backdrop-blur-xl rounded-[24px] p-8 font-mono text-sm text-green-400 overflow-x-auto shadow-2xl border border-white/10 relative z-10">
              {'{'}<br/>
              &nbsp;&nbsp;"colors": {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"primary": "#2563eb",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"surface": "#fafafc"<br/>
              &nbsp;&nbsp;{'}'},<br/>
              &nbsp;&nbsp;"spacing": {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"sm": "8px",<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"md": "16px"<br/>
              &nbsp;&nbsp;{'}'}<br/>
              {'}'}
           </motion.div>
        </div>
      </section>

      {/* SECTION 11: THE PROCESS */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Quy trình Triển khai</motion.h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 relative">
             <div className="hidden md:block absolute top-[40px] left-10 right-10 h-1 bg-neutral-100 rounded-full" />
             {[
               { id: 1, t: 'Khám phá', d: 'Nghiên cứu thị trường và nhu cầu thương hiệu.' },
               { id: 2, t: 'Wireframe', d: 'Lên cấu trúc giao diện và trải nghiệm (UX).' },
               { id: 3, t: 'Design UI', d: 'Thiết kế thẩm mỹ, đổ màu và hiệu ứng chi tiết.' },
               { id: 4, t: 'Bàn giao', d: 'Kiểm thử sản phẩm và trao tay nhà phát triển.' }
             ].map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex-1 relative pt-8 md:pt-16">
                   <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl font-black text-blue-600 absolute top-0 md:-top-10 md:left-1/2 md:-translate-x-1/2 border-4 border-white shadow-xl">0{s.id}</div>
                   <div className="text-start md:text-center mt-12 md:mt-4">
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
             { num: '500+', lbl: 'Dự án UX/UI' },
             { num: '98%', lbl: 'Đánh giá tốt' },
             { num: '2.5x', lbl: 'Chuyển đổi (CRO)' },
             { num: '10+', lbl: 'Năm đam mê' }
           ].map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                 <div className="text-4xl md:text-6xl font-black text-blue-600 mb-4">{m.num}</div>
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
               <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-6">Nhận xét từ Đối tác</motion.h2>
               <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-neutral-500 mb-8">Nhiều thương hiệu đã cất cánh mạnh mẽ sau khi cấu trúc lại toàn bộ hệ thống giao diện. Lắng nghe phản hồi từ họ.</motion.p>
               <Link href="/projects" className="font-bold border-b-2 border-neutral-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">Xem toàn bộ Dự án</Link>
            </div>
            <div className="flex-1 space-y-6">
               {[
                 { q: 'Giao diện mới thay đổi hoàn toàn định vị của công ty chúng tôi. Chuyên nghiệp, sạch sẽ và tỷ lệ người dùng sử dụng ứng dụng tăng mạnh.', a: 'David Nguyen', r: 'CEO - Tech Vina', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
                 { q: 'Hệ thống Design siêu chuẩn. Source file Figma gọn gàng vô cùng, Dev team bên tôi đã áp dụng dễ dàng và tăng tốc độ code lên gấp đôi.', a: 'Sarah Tran', r: 'Product Lead', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop' }
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

      {/* SECTION 14: PRICING */}
      <section className="py-32 px-6 bg-[#FAFAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Chi phí Minh bạch</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-8">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-[40px] p-12 border border-neutral-200 hover:shadow-xl transition-shadow w-full flex flex-col">
                <h3 className="text-3xl font-bold mb-4">UI/UX Standard</h3>
                <p className="text-neutral-500 mb-8 border-b border-neutral-100 pb-8">Dành cho dự án phổ thông, quy mô trung bình cần thẩm mỹ và tốc độ ra mắt sớm.</p>
                <div className="space-y-6 mb-12 flex-1">
                   {['Bản quyền 3 concept ban đầu', 'Responsive Design cực nhẹ', 'Bàn giao Figma tiêu chuẩn'].map((l, i)=><div key={i} className="flex gap-4 items-center"><Check size={24} className="text-green-500"/><span className="font-medium">{l}</span></div>)}
                </div>
                <button className="w-full py-5 rounded-full font-bold bg-neutral-100 hover:bg-neutral-200 text-lg transition-colors">Yêu cầu Báo Giá</button>
             </motion.div>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="bg-gradient-to-br from-neutral-900 to-indigo-950 text-white rounded-[40px] p-12 shadow-2xl relative overflow-hidden flex flex-col md:-mt-8 border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 font-bold rounded-full mb-6 w-max border border-indigo-400/20">Khuyên Dùng</div>
                <h3 className="text-3xl font-bold mb-4 relative z-10">Premium Brand & Web</h3>
                <p className="text-neutral-400 mb-8 border-b border-white/10 pb-8 relative z-10">Giải pháp nâng tầm doanh nghiệp toàn diện từ nhãn hiệu sang hệ thống Web/App khổng lồ.</p>
                <div className="space-y-6 mb-12 relative z-10 flex-1">
                   {['Hệ thống Brand Guidelines', 'UI/UX Design Web & App phức tạp', 'Thiết lập thư viện Design Tokens', 'Hỗ trợ Team Code chuyển giao 100%'].map((l, i)=><div key={i} className="flex gap-4 items-center"><Check size={24} className="text-indigo-400"/><span className="font-medium text-white">{l}</span></div>)}
                </div>
                <button className="w-full py-5 rounded-full font-bold text-lg bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-[0_10px_20px_rgba(79,70,229,0.3)] relative z-10">Tư vấn Premium</button>
             </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 15: FINAL CTA */}
      <section className="py-40 px-6 text-center bg-white border-t border-neutral-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto flex flex-col items-center">
           <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-[32px] flex items-center justify-center mb-10 shadow-[0_20px_40px_rgba(37,99,235,0.4)] rotate-3">
             <Sparkles size={40} className="animate-pulse" />
           </div>
           <h2 className="text-6xl md:text-[80px] font-extrabold tracking-tighter text-neutral-900 mb-8 leading-[1.1]">
             Kiến tạo Thiết kế <br /> Xứng tầm Thương hiệu.
           </h2>
           <p className="text-xl md:text-2xl text-neutral-500 mb-12 max-w-2xl font-medium">Bỏ lại giao diện bị mờ nhạt và sở hữu một UX/UI tuyệt mỹ gây ấn tượng hoàn toàn với người dùng.</p>
           <Link href="/contact" className="px-12 py-6 rounded-full bg-neutral-900 text-white font-black text-xl hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              Lấy Ý Tưởng Thiết Kế Ngay
           </Link>
        </motion.div>
      </section>
      
    </main>
  );
}
