'use client';

/**
 * MarketingTechProcess - Cong nghe Tracking va Quy trinh trien khai
 * Gom 2 section: (1) He sinh thai cong cu tracking (GTM, GA4, Meta Pixel, Conversion API)
 * voi hinh anh dashboard, (2) Quy trinh 4 buoc: Audit, Setup, Test, Scale.
 */

import Image from 'next/image';
import { motion } from 'motion/react';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';

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

const processSteps = [
  { id: 1, t: 'Audit & Plan', d: 'Phân tích dữ liệu lịch sử, lên kế hoạch ngân sách và kênh triển khai.' },
  { id: 2, t: 'Setup & Tracking', d: 'Gắn Pixel, cấu trúc lại chiến dịch chuẩn Growth Framework.' },
  { id: 3, t: 'Test & Launch', d: 'Chạy phân tách A/B Testing để tìm ra content & target thắng lợi.' },
  { id: 4, t: 'Scale & Optimize', d: 'Bơm ngân sách mạnh vào tệp ngon. Tối ưu loại bỏ rác hiệu suất.' }
];

export default function MarketingTechProcess() {
  return (
    <>
      {/* SECTION 10: TECH STACK & SYSTEM */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto bg-neutral-900 rounded-[24px] md:rounded-[40px] p-6 md:p-20 text-white flex flex-col md:flex-row items-center gap-8 md:gap-16 border border-white/10 relative overflow-hidden">
           <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Tech Stack Background" fill className="object-cover opacity-[0.03] pointer-events-none mix-blend-screen" sizes="100vw" />
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
           
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1 relative z-10">
              <BarChart3 className="w-10 h-10 md:w-16 md:h-16 text-blue-400 mb-5 md:mb-8" />
              <h2 className="text-[24px] md:text-4xl font-extrabold mb-4 md:mb-6">Trang Bị "Vũ Khí" Tối Tân</h2>
              <p className="text-[15px] md:text-xl text-neutral-400 leading-relaxed mb-6 md:mb-8">Không dựa trên cảm tính. Chúng tôi gắn Tracking mạnh mẽ đến tận cùng để kiểm soát Mọi hành vi khách hàng: Google Tag Manager, GA4, Meta Pixel, Conversion API.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-blue-700 transition-colors shadow-lg">Khởi Tạo Tracking Audit</Link>
           </motion.div>
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 w-full bg-black/50 backdrop-blur-xl rounded-[16px] md:rounded-[24px] p-4 md:p-8 shadow-2xl border border-white/10 relative z-10 grid grid-cols-2 gap-3 md:gap-4">
              <Image src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80" alt="GA4 Dashboard" width={400} height={128} className="rounded-xl w-full h-24 md:h-32 object-cover border border-white/5 opacity-80" />
              <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Looker Studio" width={400} height={128} className="rounded-xl w-full h-24 md:h-32 object-cover border border-white/5 opacity-80" />
              <Image src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=400&q=80" alt="Meta Ads" width={800} height={128} className="rounded-xl w-full h-24 md:h-32 object-cover border border-white/5 opacity-80 col-span-2" />
           </motion.div>
        </div>
      </section>

      {/* SECTION 11: THE PROCESS */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-20">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[24px] md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">Chiến lược triển khai</motion.h2>
          </div>
          <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-8 relative">
             <div className="hidden md:block absolute top-[40px] left-10 right-10 h-1 bg-neutral-100 rounded-full" />
             {processSteps.map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex-1 relative bg-[#F5F5F7] md:bg-transparent rounded-[20px] md:rounded-none p-4 md:p-0 md:pt-16">
                   <div className="w-10 h-10 md:w-20 md:h-20 bg-blue-600 md:bg-blue-50 rounded-xl md:rounded-full flex items-center justify-center text-sm md:text-3xl font-black text-white md:text-blue-600 md:absolute md:-top-10 md:left-1/2 md:-translate-x-1/2 md:border-4 md:border-white md:shadow-xl z-20 mb-3 md:mb-0">0{s.id}</div>
                   <div className="text-start md:text-center md:mt-4 relative z-10">
                     <h3 className="text-[15px] md:text-xl font-bold text-neutral-900 mb-1 md:mb-2">{s.t}</h3>
                     <p className="text-xs md:text-base text-neutral-500">{s.d}</p>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>
    </>
  );
}
