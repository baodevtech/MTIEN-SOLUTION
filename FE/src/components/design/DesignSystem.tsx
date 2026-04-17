'use client';

import Image from 'next/image';
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
      {/* ===== MOBILE: SYSTEM & TOKENS ===== */}
      <section className="md:hidden py-10 px-4 bg-white border-b border-neutral-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-6">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4"><Component size={22} /></div>
          <h2 className="text-[22px] font-bold tracking-tight text-neutral-900 mb-2">Trọng tâm là Design System</h2>
          <p className="text-[13px] text-neutral-500 leading-[1.7]">Hệ thống Atomic Design chuẩn mực — tiết kiệm chi phí lập trình, UI nhất quán trên hàng trăm màn hình.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="grid grid-cols-2 gap-2">
          {[
            { label: 'Atoms', desc: 'Nút, Icons, Màu', color: 'bg-blue-50 text-blue-700' },
            { label: 'Molecules', desc: 'Cards, Inputs', color: 'bg-purple-50 text-purple-700' },
            { label: 'Organisms', desc: 'Điều hướng', color: 'bg-amber-50 text-amber-700' },
            { label: 'Templates', desc: 'Bố cục', color: 'bg-emerald-50 text-emerald-700' },
          ].map((item, i) => (
            <div key={i} className={`${item.color} rounded-2xl p-3.5 text-center`}>
              <div className="text-[13px] font-bold">{item.label}</div>
              <div className="text-[11px] opacity-70 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== MOBILE: DEV HANDOFF ===== */}
      <section className="md:hidden px-4 py-10 bg-[#FAFAFC]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-blue-600 rounded-[20px] overflow-hidden relative">
          <Image src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Code Background" fill className="object-cover opacity-10 mix-blend-overlay pointer-events-none" sizes="100vw" />
          <div className="p-5 relative z-10">
            <Code2 className="w-10 h-10 text-blue-200 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Giao diện Sẵn sàng Code</h3>
            <p className="text-[13px] text-blue-100 leading-[1.7] mb-4">Figma Auto Layout, Token mạnh mẽ, xuất màn hình rõ ràng → Developer chuyển thành code hoàn hảo.</p>
            <div className="bg-neutral-950/80 backdrop-blur-xl rounded-xl p-4 font-mono text-[11px] text-green-400 mb-4 border border-white/10">
              {'{'}<br/>
              &nbsp;&nbsp;&quot;colors&quot;: {'{'} &quot;primary&quot;: &quot;#2563eb&quot; {'}'},<br/>
              &nbsp;&nbsp;&quot;spacing&quot;: {'{'} &quot;sm&quot;: &quot;8px&quot;, &quot;md&quot;: &quot;16px&quot; {'}'}<br/>
              {'}'}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">Liên hệ Team Thiết kế</Link>
          </div>
        </motion.div>
      </section>

      {/* ===== DESKTOP: SYSTEM & TOKENS ===== */}
      <section className="hidden md:block py-32 px-6 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8"><Component size={28} /></motion.div>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-5xl font-bold tracking-tight text-neutral-900 mb-6">Trọng tâm là Design System</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed mb-16">Chúng tôi xây dựng Hệ thống Thiết kế (Atomic Design) chuẩn mực cho từng sản phẩm. Giúp tiết kiệm chi phí lập trình và đảm bảo UI nhất quán trên hàng trăm màn hình.</motion.p>
          <div className="flex flex-wrap justify-center gap-4">
             {['Atoms (Nút, Icons, Màu)', 'Molecules (Cards, Inputs)', 'Organisms (Điều hướng)', 'Templates (Bố cục)'].map((t, i) => (
                <span key={i} className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-700 font-bold border border-neutral-200 shadow-sm">{t}</span>
             ))}
          </div>
        </div>
      </section>

      {/* ===== DESKTOP: DEV HANDOFF ===== */}
      <section className="hidden md:block py-32 px-6 bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[40px] p-12 lg:p-20 text-white flex flex-row items-center gap-16 shadow-[0_30px_60px_rgba(37,99,235,0.2)] relative overflow-hidden">
           <Image src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Code Background" fill className="object-cover opacity-10 mix-blend-overlay pointer-events-none" sizes="100vw" />
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
