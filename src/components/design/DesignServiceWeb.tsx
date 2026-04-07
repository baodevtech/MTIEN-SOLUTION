'use client';

import { motion } from 'motion/react';
import { Monitor, Smartphone, CheckCircle2 } from 'lucide-react';

/**
 * DesignServiceWeb - Dich vu thiet ke Website UI/UX va Mobile App
 * Bao gom: Section Web UX/UI (hinh anh + danh sach tinh nang) va Section Mobile App (mockup dien thoai + tinh nang)
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

export default function DesignServiceWeb() {
  return (
    <>
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
    </>
  );
}
