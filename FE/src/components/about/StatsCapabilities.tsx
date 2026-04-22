'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';

/**
 * StatsCapabilities - Playful Emoji & Cards
 * Tối ưu responsive: thu nhỏ ảnh trên mobile, bo góc giảm bớt, padding và font vừa phải
 */
export default function StatsCapabilities() {
  const t = useTheme('about', 'statsCapabilities');
  const badge = t('badge', '👾 Fun Facts');
  const title = t('title', 'Những con số');
  const titleHighlight = t('titleHighlight', 'biết hát.');
  const description = t('description', 'Chúng mình không đo lường thành công chỉ bằng doanh thu, mà bằng khối lượng công việc vui vẻ đã hoàn thành mỗi ngày.');
  const image = t('image', 'https://picsum.photos/seed/fun-startup/1000/1000');
  
  const rawStats = t<Record<string, any>[]>('stats', []);
  const defaultStats = [
    { val: '2,450', title: 'Ly Cà Phê ☕', desc: 'Đã tiêu thụ để maintain não bộ.' },
    { val: '1M+', title: 'Dòng Code ⌨️', desc: 'Được gõ và thi thoảng phải xóa đi.' },
    { val: '99', title: 'Dự Án 🎉', desc: 'Đưa lên live thành công.' },
    { val: '0', title: 'Drama ✌️', desc: 'Môi trường toàn là high-fives.' },
  ];
  const stats = Array.isArray(rawStats) && rawStats.length > 0 ? rawStats : defaultStats;

  return (
    <section className="bg-[#f8f9fa] py-12 md:py-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto px-6 md:px-8 bg-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-20 shadow-sm border border-zinc-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Năng lực cốt lõi - Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-xs md:text-sm tracking-wide mb-6 md:mb-8 w-fit">
            <span>👾</span>
            <span>{badge.replace('👾 ', '')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 md:mb-6 tracking-tight leading-[1.15] md:leading-[1.1]">
            {title} <br className="hidden sm:block" /> <span className="text-indigo-500">{titleHighlight}</span>
          </h2>
          
          <p className="text-base md:text-lg text-zinc-500 font-medium leading-relaxed mb-10 md:mb-12 max-w-md">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="bg-indigo-50/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-indigo-100"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-indigo-900 mb-2">{stat.val}</div>
                <div className="text-sm md:text-base text-indigo-800 font-bold mb-1 md:mb-2">{stat.title}</div>
                <p className="hidden sm:block text-indigo-600/70 text-xs md:text-sm font-medium leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Playful Image Block */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative mt-6 md:mt-0">
          <motion.div
            initial={{ opacity: 0, rotate: 2 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-full aspect-square sm:aspect-video lg:aspect-[4/3] rounded-[2rem] md:rounded-[3rem] relative overflow-hidden bg-amber-100 border-4 md:border-8 border-white shadow-xl rotate-[-2deg]"
          >
            <Image
              src={image || "https://picsum.photos/seed/fun-startup/1000/1000"}
              alt="Fun Workspace"
              fill
              className="object-cover hover:scale-[1.05] transition-transform duration-700 ease-out"
            />
            {/* Floating emoji sticker */}
            <div className="absolute top-4 -right-2 md:top-6 bg-white text-2xl md:text-4xl p-2 md:p-4 rounded-full shadow-lg rotate-12">
              🍕
            </div>
            <div className="absolute -bottom-4 left-6 md:left-10 bg-white text-2xl md:text-4xl p-2 md:p-4 rounded-full shadow-lg -rotate-12">
              🎸
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
