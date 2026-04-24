'use client';

import Image from 'next/image';
import { motion, type Variants } from 'motion/react';
import { Monitor, Smartphone, CheckCircle2 } from 'lucide-react';

/**
 * DesignServiceWeb - Dich vu thiet ke Website UI/UX va Mobile App
 * Bao gom: Section Web UX/UI (hinh anh + danh sach tinh nang) va Section Mobile App (mockup dien thoai + tinh nang)
 */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function DesignServiceWeb() {
  return (
    <>
      {/* ===== MOBILE LAYOUT ===== */}
      <section className="md:hidden py-10 px-4 space-y-10">
        {/* Web UX/UI */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-5">
          <div className="relative aspect-[3/2] w-full rounded-[20px] overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="Web UX UI" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-medium mb-2">
                <Monitor size={12} /> Website UI/UX
              </div>
              <h3 className="text-[20px] font-bold text-white leading-tight">Thiết kế Website<br/>thấu hiểu người dùng.</h3>
            </div>
          </div>
          <p className="text-[13px] text-neutral-500 leading-[1.7]">Từng khoảng cách, màu sắc và typography đều được lồng ghép kỹ lưỡng — tạo luồng trải nghiệm mượt mà, tăng tỷ lệ chuyển đổi.</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['Wireframing & Prototyping', 'Responsive Design', 'User Flow & CRO'].map((t, i) => (
              <span key={i} className="shrink-0 px-3.5 py-2 rounded-xl bg-[#F5F5F7] text-neutral-700 text-[12px] font-medium">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-neutral-100" />

        {/* Mobile App */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="space-y-5">
          <div className="relative aspect-[3/2] w-full rounded-[20px] overflow-hidden bg-gradient-to-br from-neutral-900 to-indigo-950 flex items-center justify-center">
            <Image src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" alt="Mobile App" fill className="object-cover opacity-25 blur-[2px] pointer-events-none" sizes="50vw" />
            <div className="relative z-10 flex items-end gap-3">
              <div className="w-[88px] h-[176px] bg-black rounded-[18px] border-2 border-neutral-700/60 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.6)] -rotate-3 translate-y-2 opacity-50 scale-90">
                <Image src="https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=400&q=80" alt="App 1" fill className="object-cover" sizes="88px" />
              </div>
              <div className="w-[100px] h-[200px] bg-black rounded-[20px] border-[2.5px] border-neutral-600/60 overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.7)] relative z-10">
                <div className="w-12 h-[12px] bg-black mx-auto rounded-b-lg absolute top-0 left-1/2 -translate-x-1/2 z-20" />
                <Image src="https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=400&q=80" alt="App Interface" fill className="object-cover" sizes="100px" />
              </div>
              <div className="w-[88px] h-[176px] bg-black rounded-[18px] border-2 border-neutral-700/60 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.6)] rotate-3 translate-y-2 opacity-50 scale-90">
                <Image src="https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=400&q=80" alt="App 2" fill className="object-cover" sizes="88px" />
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-[11px] font-medium">
                <Smartphone size={12} /> Mobile App
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-[20px] font-bold text-neutral-900 tracking-tight">Giao diện Di động nhỏ gọn nhưng uy lực.</h3>
          </div>
          <p className="text-[13px] text-neutral-500 leading-[1.7]">Tập trung vào bộ tương tác ngón tay, Micro-interactions chuẩn xác giúp App hoạt động như thể nó hiểu người dùng.</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['iOS & Android Native', 'Micro-interactions', 'Tap-targets'].map((t, i) => (
              <span key={i} className="shrink-0 px-3.5 py-2 rounded-xl bg-[#F5F5F7] text-neutral-700 text-[12px] font-medium">{t}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== DESKTOP LAYOUT ===== */}
      {/* SECTION 5: SERVICE - WEB UX/UI */}
      <section className="hidden md:block py-32 px-6 bg-white border-y border-neutral-100 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-row items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[450px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="Web UX UI" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
             <Monitor className="absolute bottom-8 right-8 text-white/50 w-24 h-24 stroke-1" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold mb-6"><Monitor size={18} /> Website UI/UX</div>
            <h2 className="text-5xl font-bold tracking-tight text-neutral-900 mb-6">Thiết kế Website <br/>thấu hiểu người dùng.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Từng khoảng cách, màu sắc và typography đều được lồng ghép kỹ lưỡng. Chúng tôi tạo ra luồng trải nghiệm mượt mà, giúp tăng tỷ lệ chuyển đổi (CRO) và giữ chân khách hàng hiệu quả.</p>
            <ul className="space-y-4">
               {['Wireframing & Prototyping', 'Responsive Design chuẩn Mobile', 'Tối ưu luồng người dùng (User Flow)'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: SERVICE - MOBILE APP */}
      <section className="hidden md:block py-32 px-6 bg-[#FAFAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-row-reverse items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] flex items-center justify-center overflow-hidden group">
             <Image src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" alt="Mobile App Background" fill className="object-cover rounded-[40px] opacity-60 group-hover:scale-105 transition-transform duration-700 blur-sm pointer-events-none" sizes="50vw" />
             <div className="w-[240px] h-[480px] bg-black rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[6px] border-neutral-900 overflow-hidden relative z-10 group-hover:-translate-y-4 transition-transform duration-700">
                <div className="w-24 h-6 bg-neutral-900 mx-auto rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 z-20" />
                <Image src="https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=400&q=80" alt="App Interface" fill className="object-cover" sizes="240px" />
             </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-bold mb-6"><Smartphone size={18} /> Mobile App</div>
            <h2 className="text-5xl font-bold tracking-tight text-neutral-900 mb-6">Giao diện Di động <br/>nhỏ gọn nhưng uy lực.</h2>
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
