'use client';

/**
 * MarketingTechProcess - Cong nghe Tracking va Quy trinh trien khai
 * Gom 2 section: (1) He sinh thai cong cu tracking (GTM, GA4, Meta Pixel, Conversion API)
 * voi hinh anh dashboard, (2) Quy trinh 4 buoc: Audit, Setup, Test, Scale.
 */

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
             {processSteps.map((s, i) => (
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
    </>
  );
}
