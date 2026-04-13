const fs = require('fs');
const content = \'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Heart, Feather, Layout, ChevronRight } from 'lucide-react';
import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: custom * 0.15, ease: [0.16, 1, 0.3, 1] }
  })
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
};

export default function MarketingDesignAppleStyle() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <main ref={containerRef} className={\\\\ bg-[#FBFBFD] text-[#1D1D1F] antialiased selection:bg-rose-200 selection:text-black min-h-screen overflow-hidden\\\}>
      
      {/* HERO ROMANTIC & MODERN */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Soft Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-rose-100/40 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-black/5 shadow-sm mb-8 text-sm font-medium text-[#86868B]">
            <Heart size={14} className="text-rose-400" />
            <span>Thiết kế bằng cả trái tim</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-5xl md:text-8xl font-bold tracking-tight text-[#1D1D1F] leading-[1.05] mb-8">
            Chạm vào <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 inline-block pb-2">
              cảm xúc.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="text-xl md:text-3xl text-[#86868B] font-medium max-w-3xl leading-snug tracking-tight mb-12">
            Giao diện sinh ra không chỉ để hiển thị. Đó là nhịp đập, là câu chuyện và là sự nâng niu dành cho thương hiệu của bạn.
          </motion.p>
        </div>
      </section>

      {/* GIANT APPLE-STYLE SHOWCASE */}
      <section className="px-6 pb-32">
        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="max-w-[1400px] mx-auto relative rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.08)] bg-white h-[50vh] md:h-[80vh]">
          <motion.img 
            style={{ y: yHero, scale: scaleHero }}
            src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2070&auto=format&fit=crop" 
            alt="Design vibes" 
            className="absolute inset-0 w-full h-full object-cover origin-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/10 mix-blend-multiply" />
        </motion.div>
      </section>

      {/* PHILOSOPHY - TYPOGRAPHY FOCUS */}
      <section className="py-24 md:py-40 px-6 bg-white relative z-10 w-full rounded-[40px] md:rounded-[80px] shadow-[0_-20px_50px_rgba(0,0,0,0.02)] -mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-[1.2] md:leading-[1.3]">
            Sự tinh tế đến từ việc <br className="hidden md:block" /> 
            loại bỏ những gì không cần thiết, <br className="hidden md:block" />
            để nhường chỗ cho <span className="italic font-light text-[#86868B]">những điều tuyệt mỹ nhất.</span>
          </motion.h2>
        </div>
      </section>

      {/* BENTO GRID - CAPABILITIES */}
      <section className="py-32 px-6 bg-[#FBFBFD]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-6xl font-bold tracking-tight text-[#1D1D1F] mb-6">Mọi chi tiết.<br/>Được chăm chút tỉ mỉ.</motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: 'UI/UX Design', 
                subtitle: 'Trải nghiệm mượt mà. Không chút gợn sóng.', 
                icon: <Layout className="text-[#06c] w-8 h-8" />,
                bg: 'bg-[#FFFFFF]',
                img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop'
              },
              {
                title: 'Brand Identity', 
                subtitle: 'Linh hồn thị giác. Bản sắc độc tôn.', 
                icon: <Feather className="text-rose-500 w-8 h-8" />,
                bg: 'bg-[#FFFFFF]',
                img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop'
              },
              {
                title: 'Cinematic Motion', 
                subtitle: 'Chuyển động uyển chuyển. Đánh thức thị giác.', 
                icon: <Sparkles className="text-purple-500 w-8 h-8" />,
                bg: 'bg-[#FFFFFF]',
                img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
                isLarge: true
              }
            ].map((box, idx) => (
              <motion.div key={idx} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx} className={\elative overflow-hidden rounded-[32px] md:rounded-[48px] \ shadow-[0_4px_30px_rgba(0,0,0,0.03)] \ p-10 md:p-14 flex flex-col justify-between group\}>
                <div className="relative z-20 mb-64 md:mb-80 max-w-sm">
                  <div className="bg-[#F5F5F7]/80 backdrop-blur-xl w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                    {box.icon}
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">{box.title}</h3>
                  <p className="text-[#86868B] text-xl font-medium tracking-tight">{box.subtitle}</p>
                </div>
                <div className="absolute top-0 right-0 w-3/4 h-full md:w-1/2 opacity-80 mix-blend-multiply transition-transform duration-[2s] ease-out group-hover:scale-105 pointer-events-none origin-bottom-right">
                  <img src={box.img} alt={box.title} className="w-full h-full object-cover mask-image-fade" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)', maskImage: 'linear-gradient(to right, transparent, black 40%)' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBTLE PRICING & PARTNERSHIP (APPLE STYLE) */}
      <section className="py-32 px-6 bg-white border-t border-slate-100">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-20">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-rose-500 font-semibold tracking-wide uppercase text-sm mb-4">Khoản đầu tư</motion.p>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="text-4xl md:text-6xl font-bold tracking-tight text-[#1D1D1F] mb-6">Sự xứng đáng cho <br/> thương hiệu của bạn.</motion.h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className="text-xl text-[#86868B] max-w-2xl mx-auto font-medium">Báo giá của chúng tôi không phải là chi phí. Nó là minh chứng cho giá trị và sự đồng hành dài hạn giúp bạn chinh phục khách hàng.</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            
            {/* Standard Tier */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#FBFBFD] border border-black/5 rounded-[40px] p-10 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
              <div>
                <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">Bản Tiêu Chuẩn</h3>
                <p className="text-[#86868B] font-medium text-lg mb-10">Khởi nguồn cho sự chuyên nghiệp.</p>
                <div className="space-y-4 mb-12">
                  <div className="w-full h-[1px] bg-black/5 mb-6" />
                  {['Thiết kế UI/UX theo Guideline','Màu sắc & Typography tinh giản','Tích hợp Motion trơn tru','Support 2 vòng Feedback'].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[#06c] font-bold">✓</span>
                      <span className="text-[#1D1D1F] font-medium">{f}</span>
                    </div>
                  ))}
                  <div className="w-full h-[1px] bg-black/5 mt-6" />
                </div>
              </div>
              <div>
                <p className="text-[#86868B] mb-2 text-sm font-medium">Chỉ từ</p>
                <p className="text-3xl font-bold text-[#1D1D1F] mb-8">Liên hệ trực tiếp</p>
                <button className="w-full bg-[#1D1D1F] text-white rounded-full py-4 font-semibold text-lg hover:bg-[#333336] transition-colors">Bắt đầu ngay</button>
              </div>
            </motion.div>

            {/* Pro Tier */}
            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#1D1D1F] text-white rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-black/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-400 via-purple-500 to-indigo-500 rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Bản Tinh Hoa (Pro)</h3>
                <p className="text-[#A1A1A6] font-medium text-lg mb-10">Dấu ấn tối thượng cho người dẫn đầu.</p>
                <div className="space-y-4 mb-12">
                  <div className="w-full h-[1px] bg-white/10 mb-6" />
                  {['Nghiên cứu UX 360 & Persona','Thiết kế Identity cá nhân hóa','3D & Parallax Animation độc bản','A/B Testing & Data Tracking','Feedback không giới hạn'].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-rose-400 font-bold">✓</span>
                      <span className="text-stone-300 font-medium">{f}</span>
                    </div>
                  ))}
                  <div className="w-full h-[1px] bg-white/10 mt-6" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-[#A1A1A6] mb-2 text-sm font-medium">Dành riêng cho bạn</p>
                <p className="text-3xl font-bold text-white mb-8">Nhận báo giá riêng</p>
                <button className="w-full bg-white text-[#1D1D1F] rounded-full py-4 font-semibold text-lg hover:bg-stone-200 transition-colors">Trò chuyện cùng chúng tôi</button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ROMANTIC FOOTER / END CTA */}
      <section className="py-32 px-6 bg-[#FBFBFD] relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-rose-50/50 block z-0" />
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10">
          <p className="text-[#86868B] text-xl md:text-2xl font-medium tracking-tight mb-6">Mọi thứ bắt đầu bằng một tiếng \"Xin chào\".</p>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-[#1D1D1F] mb-12">Cùng vẽ nên <br/> <span className="text-rose-500 inline-block mt-2">kiệt tác.</span></h2>
          <a href="/contact" className="inline-flex items-center gap-2 text-xl font-medium text-[#06c] hover:text-[#0052a3] transition-colors group">
            Liên hệ với chúng tôi
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}\
fs.writeFileSync('c:/Users/Bao/Documents/GitHub/-MTIEN-SOLUTION/src/app/dich-vu/marketing-design/page.tsx', content, 'utf8');
