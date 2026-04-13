'use client';

/**
 * SoftwareProcess - Quy trình phát triển phần mềm theo 4 bước chuẩn
 * Bao gồm các bước: Khảo sát, Phân tích, Lập trình, Bàn giao với hiệu ứng glass card.
 */

import { motion } from 'motion/react';

const customEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeInRightBig = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

const slideInTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
} as const;

export default function SoftwareProcess() {
  return (
    <section className="relative bg-[#F4F7FF] pb-8 md:pb-12">
      
      {/* Top Shape */}
      <motion.div variants={slideInTop} initial="hidden" whileInView="visible" viewport={{ once: true }} className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-shape-01.webp" alt="Shape" className="drop-shadow-sm" />
      </motion.div>
      
      {/* Main Navy Container */}
      <div className="bg-[#09155C] pt-[80px] md:pt-[140px] pb-[60px] md:pb-[120px] rounded-b-[24px] md:rounded-b-[40px] mx-3 md:mx-5 relative z-0 overflow-hidden shadow-[0_20px_50px_rgba(9,21,92,0.15)] border border-[#061153]/10">
        
        {/* Subtle Background Textures */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#1053F3]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#5080FF]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-5 md:px-6 relative z-10 max-w-7xl">
          
          {/* Header Titles */}
          <div className="text-center mb-[40px] md:mb-[80px] -mt-[15px] md:-mt-[25px] relative">
            <h2 className="text-3xl md:text-5xl md:text-[80px] font-black text-white/[0.04] tracking-[0.05em] uppercase leading-none absolute left-1/2 -translate-x-1/2 -top-4 md:-top-6 md:-top-10 w-full select-none pointer-events-none">
              QUY TRÌNH CHUẨN
            </h2>
            <h2 className="text-[26px] md:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white tracking-tight relative z-10 drop-shadow-sm">
              Cách Chúng Tôi Làm Việc
            </h2>
          </div>

          {/* Grid Flow Layout */}
          <div className="relative">
            
            {/* Connecting Dashed Line (Desktop Only) */}
            <div className="hidden lg:block absolute top-[110px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-white/10 z-0">
              {/* Moving dot animation */}
              <motion.div 
                className="w-3 h-3 bg-[#1053F3] rounded-full shadow-[0_0_10px_#1053F3] absolute -top-[7px]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-[30px] relative z-10">
              {[
                { title: 'Khảo Sát & Tư Vấn', desc: 'Tìm hiểu chi tiết bài toán kinh doanh và đề xuất giải pháp công nghệ tối ưu.' },
                { title: 'Phân Tích & Thiết Kế', desc: 'Xây dựng tài liệu kỹ thuật, luồng dữ liệu, và thiết kế UI/UX Mockups.' },
                { title: 'Lập Trình & Kiểm Thử', desc: 'Code và test (QA/QC) nghiêm ngặt để đảm bảo sản phẩm mượt mà, không lỗi.' },
                { title: 'Bàn Giao & Vận Hành', desc: 'Triển khai lên server, đào tạo sử dụng và hỗ trợ bảo trì hệ thống định kỳ.' },
              ].map((step, idx) => (
                <motion.div key={idx} variants={fadeInRightBig} initial="hidden" whileInView="visible" custom={idx * 0.15} viewport={{ once: true }} className="relative group h-full">
                  
                  {/* Modern Glass Card */}
                  <div className="bg-white/[0.04] backdrop-blur-md p-5 md:p-[40px] rounded-2xl md:rounded-[30px] h-full transition-all duration-500 border border-white/10 group-hover:border-blue-400/40 group-hover:bg-gradient-to-br group-hover:from-white/[0.08] group-hover:to-transparent group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col items-start z-10">
                    
                    {/* Faint Background Number inside card */}
                    <div className="absolute -bottom-4 -right-4 text-[60px] md:text-[100px] font-black text-white/[0.03] group-hover:text-blue-400/[0.05] transition-colors duration-500 pointer-events-none select-none">
                      0{idx + 1}
                    </div>

                    {/* Pill Badge Step */}
                    <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 mb-4 md:mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5080FF] animate-pulse"></span>
                      <span className="text-blue-200 font-extrabold tracking-widest text-[9px] md:text-[11px] uppercase">
                        BƯỚC 0{idx + 1}
                      </span>
                    </div>

                    {/* Icon Container */}
                    <div className="mb-4 md:mb-[30px] relative">
                      {/* Glow effect behind image */}
                      <div className="absolute inset-0 bg-[#1053F3] blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full scale-150"></div>
                      <img 
                        src={`https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon${idx + 1}.webp`} 
                        className="w-[42px] h-[42px] md:w-[64px] md:h-[64px] relative z-10 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 drop-shadow-lg" 
                        alt="icon" 
                      />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-[16px] md:text-[22px] font-extrabold text-white mb-2 md:mb-3 tracking-tight relative z-10 drop-shadow-sm group-hover:text-blue-100 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-300/90 text-[12px] md:text-[15px] leading-relaxed relative z-10">
                      {step.desc}
                    </p>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
