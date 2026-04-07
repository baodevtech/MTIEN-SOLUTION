'use client';

import { motion } from 'motion/react';
import { Component, Code2 } from 'lucide-react';
import Link from 'next/link';

/**
 * DesignSystem - He thong Design System va ban giao cho Developer
 * Bao gom: Section Atomic Design (tokens, atoms, molecules) va Section Dev Handoff (Figma, code snippet)
 */

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

export default function DesignSystem() {
  return (
    <>
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
              &nbsp;&nbsp;&quot;colors&quot;: {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;primary&quot;: &quot;#2563eb&quot;,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;surface&quot;: &quot;#fafafc&quot;<br/>
              &nbsp;&nbsp;{'}'},<br/>
              &nbsp;&nbsp;&quot;spacing&quot;: {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;sm&quot;: &quot;8px&quot;,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;md&quot;: &quot;16px&quot;<br/>
              &nbsp;&nbsp;{'}'}<br/>
              {'}'}
           </motion.div>
        </div>
      </section>
    </>
  );
}
