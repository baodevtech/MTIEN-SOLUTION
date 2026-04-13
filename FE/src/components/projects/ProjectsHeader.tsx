'use client';
import { motion } from 'motion/react';

/**
 * ProjectsHeader - Phan dau trang Ho so nang luc
 * Hien thi badge, tieu de chinh va mo ta ngan gon ve trang portfolio
 */
export default function ProjectsHeader() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-6"
        >
          Hồ sơ năng lực
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
        >
          Những dấu ấn <span className="text-orange-500">Công nghệ</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 leading-relaxed"
        >
          Khám phá cách TechNova giải quyết các bài toán phức tạp, giúp khách hàng tối ưu hóa vận hành và bứt phá doanh thu.
        </motion.p>
      </div>
    </section>
  );
}
