'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Target, Diamond, Zap, Layers } from 'lucide-react';

/**
 * DesignCoreValues - Luoi Bento the hien triet ly thiet ke cot loi
 * Bao gom: 4 the gia tri (Huong den Muc tieu, Tham my Cao cap, Toi uu Hieu suat, Tinh Dong bo)
 */

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function DesignCoreValues() {
  return (
    <section className="py-12 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-16">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[26px] md:text-5xl font-bold tracking-tight text-neutral-900">Triết lý Thiết kế</motion.h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 auto-rows-[140px] md:auto-rows-[250px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="col-span-2 md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl md:rounded-[32px] p-4 md:p-10 flex flex-col justify-center border border-blue-100 hover:shadow-xl transition-shadow relative overflow-hidden">
             <Target className="text-blue-600 w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-6 relative z-10" />
             <h3 className="text-base md:text-2xl font-bold text-neutral-900 mb-1 md:mb-2 relative z-10">Hướng đến Mục tiêu</h3>
             <p className="text-neutral-600 relative z-10 text-xs md:text-base line-clamp-2">Mọi pixel đều phục vụ mục đích chuyển đổi và tăng tầm trải nghiệm người dùng.</p>
             <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" alt="Target" fill className="object-cover opacity-20 object-right" style={{ maskImage: 'linear-gradient(to left, black, transparent)' }} sizes="50vw" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-white rounded-2xl md:rounded-[32px] p-4 md:p-10 flex flex-col justify-center border border-neutral-200 hover:shadow-xl transition-shadow relative overflow-hidden">
             <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" alt="Aesthetic" fill className="object-cover opacity-15 pointer-events-none" sizes="33vw" />
             <Diamond className="text-purple-600 w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-6 relative z-10" />
             <h3 className="text-base md:text-2xl font-bold text-neutral-900 mb-1 md:mb-2 relative z-10">Thẩm mỹ Cao cấp</h3>
             <p className="text-neutral-600 relative z-10 text-xs md:text-base">Giao diện nịnh mắt chuẩn Global.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="bg-neutral-900 text-white rounded-2xl md:rounded-[32px] p-4 md:p-10 flex flex-col justify-center hover:shadow-xl transition-shadow shadow-[0_20px_40px_rgba(0,0,0,0.2)] relative overflow-hidden">
             <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" alt="Performance" fill className="object-cover opacity-20 pointer-events-none" sizes="33vw" />
             <Zap className="text-yellow-400 w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-6 relative z-10" />
             <h3 className="text-base md:text-2xl font-bold mb-1 md:mb-2 relative z-10">Tối ưu Hiệu suất</h3>
             <p className="text-neutral-400 relative z-10 text-xs md:text-base">Mượt mà và dễ dàng lập trình.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="col-span-2 md:col-span-2 bg-white rounded-2xl md:rounded-[32px] p-4 md:p-10 flex flex-col justify-center border border-neutral-200 hover:shadow-xl transition-shadow relative overflow-hidden">
             <div className="absolute right-0 bottom-0 w-64 h-64 bg-cyan-100 blur-3xl rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"/>
             <Layers className="text-cyan-600 w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-6 relative z-10" />
             <h3 className="text-base md:text-2xl font-bold text-neutral-900 mb-1 md:mb-2 relative z-10">Tính Đồng bộ tuyệt đối</h3>
             <p className="text-neutral-600 relative z-10 text-xs md:text-base line-clamp-2">Tạo ra thư viện Design System chuẩn mực, nhất quán trên mọi nền tảng.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
