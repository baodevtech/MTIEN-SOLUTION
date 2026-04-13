'use client';

import { motion } from 'motion/react';

/**
 * AboutHero - Hero section cho trang Giới thiệu
 * Hiển thị tiêu đề chính, badge "Về chúng tôi" và mô tả ngắn gọn về công ty
 */
export default function AboutHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-70"></div>
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-medium text-sm mb-6"
        >
          Về chúng tôi
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight"
        >
          Định hình tương lai qua <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            Đổi mới Công nghệ
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 leading-relaxed"
        >
          TechNova là tập hợp của những bộ óc sáng tạo và kỹ sư tài năng. Chúng tôi không chỉ viết mã hay lắp ráp thiết bị, chúng tôi xây dựng nền tảng vững chắc để doanh nghiệp của bạn bứt phá trong kỷ nguyên số.
        </motion.p>
      </div>
    </section>
  );
}
