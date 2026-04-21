'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

/**
 * LeadershipTeam - Playful Circle Avatars
 * Avatars tròn trịa, màu nền rực rỡ, bio hài hước
 * Tối ưu responsive: thu nhỏ kích thước hình, padding gọn, bo góc chuẩn cho mobile.
 */

const team = [
  { name: 'Trần Q. Huy', role: 'Vẽ Giao Diện, Uống Trà Sữa', bg: 'bg-rose-200', image: 'https://picsum.photos/seed/happy-ceo/200/200' },
  { name: 'Nguyễn L. Minh', role: 'Phá Code Người Khác', bg: 'bg-blue-200', image: 'https://picsum.photos/seed/happy-cto/200/200' },
  { name: 'Phạm T. Hà', role: 'Chuyên Gia Lấp Lỗi', bg: 'bg-emerald-200', image: 'https://picsum.photos/seed/happy-design/200/200' },
  { name: 'Lê H. Nam', role: 'Gặp Bug Là Khóc', bg: 'bg-amber-200', image: 'https://picsum.photos/seed/happy-cloud/200/200' },
];

export default function LeadershipTeam() {
  return (
    <section className="bg-[#f8f9fa] py-16 md:py-24 pb-24 md:pb-40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full font-bold text-xs md:text-sm tracking-wide mb-4 md:mb-6">
            Meet the gang 🤘
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.1] max-w-2xl mx-auto">
            Những người đứng sau bàn phím.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-x-4 lg:gap-x-12 gap-y-12 md:gap-y-16">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, type: 'spring', bounce: 0.4 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 mb-4 md:mb-6 rounded-full overflow-visible ${member.bg}`}>
                {/* Background color blob */}
                <div className={`absolute inset-0 rounded-full ${member.bg} lg:group-hover:scale-110 transition-transform duration-500 ease-out`}></div>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover z-10 p-1.5 md:p-2 origin-bottom transition-transform duration-500 lg:group-hover:translate-y-[-10px] lg:group-hover:scale-105"
                />
              </div>
              
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 tracking-tight mb-1">{member.name}</h3>
              <p className="text-zinc-500 font-medium text-xs sm:text-sm leading-snug max-w-[100px] sm:max-w-none mx-auto">{member.role}</p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
