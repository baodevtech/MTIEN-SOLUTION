'use client';

import { motion, type Variants } from 'motion/react';

/**
 * DesignProcess - Quy trinh trien khai thiet ke va cac chi so tac dong
 * Bao gom: timeline 4 buoc (Kham pha, Wireframe, Design UI, Ban giao) va luoi thong ke (500+ du an, 98% danh gia tot, ...)
 */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const processSteps = [
  { id: 1, t: 'Khám phá', d: 'Nghiên cứu thị trường và nhu cầu thương hiệu.', tools: ['User Interview', 'Competitor Audit'], duration: '1–2 tuần' },
  { id: 2, t: 'Wireframe', d: 'Lên cấu trúc giao diện và trải nghiệm (UX).', tools: ['Figma', 'User Flow'], duration: '1–2 tuần' },
  { id: 3, t: 'Design UI', d: 'Thiết kế thẩm mỹ, đổ màu và hiệu ứng chi tiết.', tools: ['Design System', 'Prototype'], duration: '2–3 tuần' },
  { id: 4, t: 'Bàn giao', d: 'Kiểm thử sản phẩm và trao tay nhà phát triển.', tools: ['QA Testing', 'Dev Handoff'], duration: '1 tuần' }
];

const metrics = [
  { num: '500+', lbl: 'Dự án UX/UI' },
  { num: '98%', lbl: 'Đánh giá tốt' },
  { num: '2.5x', lbl: 'Chuyển đổi (CRO)' },
  { num: '10+', lbl: 'Năm đam mê' }
];

export default function DesignProcess() {
  return (
    <>
      {/* ===== MOBILE: BENTO PROCESS + METRICS ===== */}
      <section className="md:hidden py-10 px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-5">
          <h2 className="text-[22px] font-bold tracking-tight text-neutral-900">Quy trình Triển khai</h2>
        </motion.div>

        {/* Bento 2x2 Process Steps */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 gap-3 mb-3">
          {processSteps.map((s, i) => {
            const styles = [
              { bg: 'bg-[#1D1D1F]', text: 'text-white', sub: 'text-neutral-400', num: 'bg-white/10 text-white', tag: 'bg-white/10 text-white/70', dur: 'text-neutral-500' },
              { bg: 'bg-[#F5F5F7]', text: 'text-neutral-900', sub: 'text-neutral-500', num: 'bg-[#1D1D1F] text-white', tag: 'bg-white text-neutral-600', dur: 'text-neutral-400' },
              { bg: 'bg-gradient-to-br from-blue-600 to-blue-700', text: 'text-white', sub: 'text-blue-100', num: 'bg-white/20 text-white', tag: 'bg-white/15 text-white/80', dur: 'text-blue-200' },
              { bg: 'bg-white border border-neutral-200', text: 'text-neutral-900', sub: 'text-neutral-500', num: 'bg-blue-600 text-white', tag: 'bg-[#F5F5F7] text-neutral-600', dur: 'text-neutral-400' },
            ];
            const st = styles[i];
            return (
              <div key={i} className={`${st.bg} rounded-[20px] p-4 flex flex-col justify-between aspect-square`}>
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl ${st.num} flex items-center justify-center text-[13px] font-black`}>0{s.id}</div>
                  <span className={`text-[9px] font-semibold ${st.dur}`}>{s.duration}</span>
                </div>
                <div>
                  <h3 className={`text-[15px] font-bold ${st.text} leading-tight mb-0.5`}>{s.t}</h3>
                  <p className={`text-[10px] ${st.sub} leading-snug mb-2`}>{s.d}</p>
                  <div className="flex flex-wrap gap-1">
                    {s.tools.map((tool, j) => (
                      <span key={j} className={`px-2 py-0.5 rounded-full text-[8px] font-semibold ${st.tag}`}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Metrics — full-width bar */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          className="bg-[#1D1D1F] rounded-[20px] px-4 py-4 flex justify-between">
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-lg font-black text-white leading-none">{m.num}</div>
              <div className="text-[8px] text-neutral-400 font-semibold uppercase tracking-wider mt-1">{m.lbl}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== DESKTOP: THE PROCESS ===== */}
      <section className="hidden md:block py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-5xl font-bold tracking-tight text-neutral-900">Quy trình Triển khai</motion.h2>
          </div>
          <div className="flex flex-row gap-8 relative">
             <div className="absolute top-[40px] left-10 right-10 h-1 bg-neutral-100 rounded-full" />
             {processSteps.map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex-1 relative pt-16">
                   <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-3xl font-black text-blue-600 absolute -top-10 left-1/2 -translate-x-1/2 border-4 border-white shadow-xl">0{s.id}</div>
                   <div className="text-center mt-4">
                     <h3 className="text-xl font-bold text-neutral-900 mb-2">{s.t}</h3>
                     <p className="text-neutral-500">{s.d}</p>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ===== DESKTOP: METRICS ===== */}
      <section className="hidden md:block py-24 px-6 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12 text-center">
           {metrics.map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                 <div className="text-6xl font-black text-blue-600 mb-4">{m.num}</div>
                 <div className="text-blue-900 font-bold uppercase tracking-wide text-sm">{m.lbl}</div>
              </motion.div>
           ))}
        </div>
      </section>
    </>
  );
}
