'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

/**
 * LeadershipTeam - Section đội ngũ lãnh đạo
 * Hiển thị grid 4 thành viên lãnh đạo với ảnh, tên và chức danh
 */

const team = [
  { name: 'Trần Quang Huy', role: 'Founder & CEO', image: 'https://picsum.photos/seed/ceo/400/500' },
  { name: 'Nguyễn Lê Minh', role: 'CTO - Giám đốc Công nghệ', image: 'https://picsum.photos/seed/cto/400/500' },
  { name: 'Phạm Thu Hà', role: 'Head of Design', image: 'https://picsum.photos/seed/design/400/500' },
  { name: 'Lê Hoàng Nam', role: 'Trưởng phòng Hạ tầng Cloud', image: 'https://picsum.photos/seed/cloud/400/500' },
];

export default function LeadershipTeam() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Đội ngũ Lãnh đạo</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Những người dẫn dắt TechNova với tầm nhìn chiến lược và đam mê công nghệ mãnh liệt.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="relative h-80 rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-slate-100">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center">{member.name}</h3>
            <p className="text-orange-500 font-medium text-center text-sm mt-1">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
