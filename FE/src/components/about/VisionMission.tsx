'use client';

import { motion } from 'motion/react';
import { useTheme } from '@/hooks/use-theme';

/**
 * VisionMission - Bento Box Layout
 * Tối ưu responsive: thu nhỏ text thẻ, giảm padding, điều chỉnh grid gap 
 */
export default function VisionMission() {
  const defaultCards = [
    {
      title: 'Tử tế với Users 🫂',
      desc: 'Sản phẩm tạo ra trước hết phải hữu ích và tôn trọng trải nghiệm của con người. Không chèn ép thao tác khó chịu.',
      col: 'lg:col-span-2 lg:row-span-2',
      bg: 'bg-[#FFE8D6]',
      textConfig: 'text-orange-950',
      titleSize: 'text-2xl md:text-4xl lg:text-5xl',
      pad: 'p-8 md:p-10 lg:p-14'
    },
    {
      title: 'Thiết kế Vui vẻ 🎨',
      desc: 'Ai nói phần mềm nghiệp vụ thì phải nhàm chán? Thêm chút màu sắc cho ngày làm việc bớt dài.',
      col: 'col-span-1 row-span-1',
      bg: 'bg-[#E3F2FD]',
      textConfig: 'text-blue-950',
      titleSize: 'text-xl md:text-2xl',
      pad: 'p-6 md:p-8'
    },
    {
      title: 'Code như Thơ ✍️',
      desc: 'Clean code không chỉ để máy đọc, mà để đồng nghiệp tương lai kế thừa.',
      col: 'col-span-1 row-span-1',
      bg: 'bg-[#E8F5E9]',
      textConfig: 'text-green-950',
      titleSize: 'text-xl md:text-2xl',
      pad: 'p-6 md:p-8'
    },
    {
      title: 'Hiệu suất thật ⚡',
      desc: 'Nhanh không phải là hiệu ứng hoa mỹ. Nhanh là bấm vào có ngay lập tức.',
      col: 'col-span-1 row-span-1',
      bg: 'bg-[#FCE4EC]',
      textConfig: 'text-rose-950',
      titleSize: 'text-xl md:text-2xl',
      pad: 'p-6 md:p-8'
    },
    {
      title: 'Học hỏi liên tục 📚',
      desc: 'Công nghệ thay đổi mỗi ngày, framework ra như nấm. Chúng tôi chọn lọc thay vì chạy theo trend.',
      col: 'col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1',
      bg: 'bg-[#FFF3E0]',
      textConfig: 'text-amber-950',
      titleSize: 'text-xl md:text-2xl',
      pad: 'p-6 md:p-8'
    },
  ];

  const t = useTheme('about', 'visionMission');
  const titleText = t('title', 'Chiếc la bàn');
  const titleHighlight = t('titleHighlight', 'của team');
  const description = t('description', 'Bọn mình không có "sứ mệnh tỷ đô", chỉ có vài nguyên tắc cố chấp giữ gìn để làm nghề.');
  const rawCards = t<Record<string, any>[]>('cards', []);
  const cards = Array.isArray(rawCards) && rawCards.length > 0 ? rawCards : defaultCards;

  return (
    <section className="w-full bg-[#f8f9fa] py-12 md:py-20 px-4 md:px-8">
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
          {titleText} <br className="hidden md:block" />
          <span className="text-zinc-500">{titleHighlight}</span>
        </h2>
        <p className="text-base md:text-lg text-zinc-600 font-medium max-w-sm md:text-right">
          {description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[auto]">
        {cards.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 100, damping: 20 }}
            whileHover={{ scale: 1.01 }}
            className={`rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-between ${item.col} ${item.bg} ${item.pad} transition-transform duration-300`}
          >
            <h3 className={`${item.titleSize} font-bold ${item.textConfig} tracking-tight mb-3 lg:mb-8 leading-tight`}>
              {item.title}
            </h3>
            <p className={`text-sm md:text-base lg:text-lg ${item.textConfig} font-medium opacity-85 leading-relaxed`}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
