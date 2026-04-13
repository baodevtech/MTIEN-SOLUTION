'use client';

import { motion } from 'motion/react';

/**
 * ContactHeader - Hero section trang Liên hệ
 * Badge, tiêu đề chính và mô tả ngắn gọn
 */
export default function ContactHeader() {
  return (
    <section className="bg-white py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold tracking-wider mb-6 border border-orange-100">
            LIÊN HỆ VỚI CHÚNG TÔI
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Sẵn sàng hợp tác cùng <span className="text-blue-600">TechNova</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Hãy để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
