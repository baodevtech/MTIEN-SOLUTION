'use client';

import { motion } from 'motion/react';

/**
 * DesignVision - Phat bieu tam nhin va ly do thiet ke quan trong
 * Bao gom: cau slogan chinh (Section 2) va khoi dark voi thong ke an tuong dau (Section 3)
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

export default function DesignVision() {
  return (
    <>
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
    </>
  );
}
