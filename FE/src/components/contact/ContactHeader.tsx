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
    <section className="py-16 md:py-24" style={{ backgroundColor: bgColor === '#F8FAFC' ? 'transparent' : bgColor }}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="mx-auto"
        >
          <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold text-xs md:text-sm tracking-wide mb-4 md:mb-6">
            CHÀO BẠN NHÉ 👋
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-lg md:text-xl font-medium text-zinc-600 opacity-80 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
