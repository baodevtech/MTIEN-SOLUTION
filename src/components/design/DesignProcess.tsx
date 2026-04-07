'use client';

import { motion } from 'motion/react';

/**
 * DesignProcess - Quy trinh trien khai thiet ke va cac chi so tac dong
 * Bao gom: timeline 4 buoc (Kham pha, Wireframe, Design UI, Ban giao) va luoi thong ke (500+ du an, 98% danh gia tot, ...)
 */

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const processSteps = [
  { id: 1, t: 'Khám phá', d: 'Nghiên cứu thị trường và nhu cầu thương hiệu.' },
  { id: 2, t: 'Wireframe', d: 'Lên cấu trúc giao diện và trải nghiệm (UX).' },
  { id: 3, t: 'Design UI', d: 'Thiết kế thẩm mỹ, đổ màu và hiệu ứng chi tiết.' },
  { id: 4, t: 'Bàn giao', d: 'Kiểm thử sản phẩm và trao tay nhà phát triển.' }
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
      {/* SECTION 11: THE PROCESS */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Quy trình Triển khai</motion.h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 relative">
             <div className="hidden md:block absolute top-[40px] left-10 right-10 h-1 bg-neutral-100 rounded-full" />
             {processSteps.map((s, i) => (
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
           {metrics.map((m, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                 <div className="text-4xl md:text-6xl font-black text-blue-600 mb-4">{m.num}</div>
                 <div className="text-blue-900 font-bold uppercase tracking-wide text-sm">{m.lbl}</div>
              </motion.div>
           ))}
        </div>
      </section>
    </>
  );
}
