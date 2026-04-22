'use client';

import { motion } from 'motion/react';
import { useThemeValue } from '@/lib/theme-context';

/**
 * AboutHero - Bento / Playful Startup Style
 * Gọn gàng hơn cho mobile (giảm padding, margin, font size, kích thước avatar)
 */
export default function AboutHero() {
  const badge = useThemeValue('about', 'hero', 'badge', '👋') as string;
  const title = useThemeValue('about', 'hero', 'title', 'Chào bạn,') as string;
  const titleHighlight = useThemeValue('about', 'hero', 'titleHighlight', 'sản phẩm.') as string;
  const description = useThemeValue('about', 'hero', 'description', 'Không đao to búa lớn. Chỉ là một tập thể thích viết code sạch và vẽ nên những giao diện khiến người dùng mỉm cười.') as string;
  const bgColor = useThemeValue('about', 'hero', 'bgColor', '#f8f9fa') as string;

  return (
    <section 
      className="relative min-h-[70vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      
      {/* Decorative blobs (Solid colors, no gradient) - Thu nhỏ lại trên mobile */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-4 md:top-32 md:left-24 w-12 h-12 md:w-24 md:h-24 bg-[#FFE8D6] rounded-[1.5rem] md:rounded-[2rem] z-0 opacity-60 md:opacity-100"
      />
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 right-4 md:bottom-20 md:right-32 w-16 h-16 md:w-32 md:h-32 bg-[#E3F2FD] rounded-[2rem] md:rounded-[2.5rem] z-0 opacity-60 md:opacity-100"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 px-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-rose-100 rounded-[1.5rem] md:rounded-[2rem] mb-6 md:mb-10 text-3xl md:text-5xl shadow-sm border-2 border-rose-200"
        >
          {badge}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-[5.5rem] font-bold text-zinc-900 tracking-tight leading-[1.15] md:leading-[1.1] mb-6 md:mb-8"
        >
          {title} <br className="hidden sm:block" />
          <span className="text-rose-500 bg-rose-50 px-3 md:px-4 rounded-[1rem] md:rounded-3xl inline-block -rotate-2 mt-2 md:mt-0">{titleHighlight}</span>
        </motion.h1>

        <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-lg md:text-2xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      </div>

    </section>
  );
}
