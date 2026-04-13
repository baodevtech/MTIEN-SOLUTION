'use client';

import { motion } from 'motion/react';

/**
 * Timeline - Section hành trình phát triển
 * Hiển thị các cột mốc quan trọng (2016 → 2026) theo dạng timeline ngang
 */

const timeline = [
  { year: '2016', title: 'Thành lập TechNova', desc: 'Bắt đầu với đội ngũ 5 kỹ sư phần mềm đam mê công nghệ.' },
  { year: '2019', title: 'Mở rộng Dịch vụ Cloud', desc: 'Trở thành đối tác chiến lược của AWS và Google Cloud tại Việt Nam.' },
  { year: '2022', title: 'Đạt mốc 200+ Dự án', desc: 'Khẳng định vị thế trong lĩnh vực thiết kế UI/UX và phần mềm doanh nghiệp.' },
  { year: '2026', title: 'Hệ sinh thái Toàn diện', desc: 'Cung cấp giải pháp IT trọn gói từ phần cứng, phần mềm đến bảo trì hệ thống.' },
];

export default function Timeline() {
  return (
    <section className="bg-slate-50 py-24 mb-24 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hành trình phát triển</h2>
          <p className="text-lg text-slate-600">Những cột mốc quan trọng định hình TechNova ngày hôm nay.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Đường kết nối ngang */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-200 -translate-y-1/2"></div>

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center z-10"
            >
              <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-200 border-4 border-white">
                {item.year}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
