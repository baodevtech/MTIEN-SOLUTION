'use client';

import { motion } from 'motion/react';
import { useThemeValue } from '@/lib/theme-context';

/**
 * ContactHeader - Hero section trang Liên hệ
 * Badge, tiêu đề chính và mô tả ngắn gọn
 */
export default function ContactHeader() {
  const title = useThemeValue('contact', 'header', 'title', 'Sẵn sàng hợp tác cùng MTIEN') as string;
  const description = useThemeValue('contact', 'header', 'description', 'Liên hệ với chúng tôi để được tư vấn giải pháp phù hợp') as string;
  const bgColor = useThemeValue('contact', 'header', 'bgColor', '#F8FAFC') as string;

  return (
    <section className="py-20 border-b border-slate-100" style={{ backgroundColor: bgColor }}>
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
