'use client';

import { motion } from 'motion/react';

/**
 * Timeline - Card Stack / Winding Path
 * Tối ưu responsive: thu gọn padding, font chữ trên mobile, tránh overflow ngang
 */

const timeline = [
  { 
    year: '2016', 
    title: 'Câu chuyện bắt đầu 🎒', 
    desc: 'Không văn phòng, không máy xịn. Chỉ có vài con người trẻ mộng mơ với dòng code đầu tiên. Mọi thứ thật "nghèo nàn" nhưng vui vẻ.',
    color: 'bg-yellow-100 text-yellow-900',
    rotate: 'rotate-[-2deg] md:rotate-[-3deg]'
  },
  { 
    year: '2019', 
    title: 'Biết cách làm thật 🚀', 
    desc: 'Xòa bỏ các bug sơ đẳng. Chúng mình bắt gặp được niềm đam mê tuyệt đối khi đem lại giá trị sử dụng thật cho user.',
    color: 'bg-emerald-100 text-emerald-900',
    rotate: 'rotate-[1deg] md:rotate-[2deg]'
  },
  { 
    year: '2022', 
    title: 'Không gian sáng tạo 🏡', 
    desc: 'Rời xa quán cafe, chuyển về chung một mái nhà. Bắt đầu setup quy trình để làm việc nhưng quan trọng nhất là vẫn ăn chơi.',
    color: 'bg-rose-100 text-rose-900',
    rotate: 'rotate-[-1deg]'
  },
  { 
    year: '2026', 
    title: 'Trưởng thành hơn xíu 🪴', 
    desc: 'Làm sản phẩm cho doanh nghiệp nhưng UI/UX vẫn phải dễ thương. Đoạn đường vẫn còn dài và đầy những điều bất ngờ.',
    color: 'bg-blue-100 text-blue-900',
    rotate: 'rotate-[2deg] md:rotate-[3deg]'
  },
];

export default function Timeline() {
  return (
    <section className="bg-white py-16 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold text-xs md:text-sm tracking-wide mb-4 md:mb-6">
            Kỷ niệm 📸
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">Hành trình khôn lớn</h2>
        </motion.div>

        {/* Timeline Flow */}
        <div className="flex flex-col gap-6 md:gap-8 items-center justify-center relative z-10 w-full">
          <div className="absolute top-0 bottom-0 left-[50%] w-[1px] md:w-0.5 border-l md:border-l-2 border-dashed border-zinc-200 -z-10"></div>
          
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotate.includes('md:') ? parseFloat(item.rotate.split(' ')[0].replace('rotate-[', '').replace('deg]', '')) : parseFloat(item.rotate.replace('rotate-[', '').replace('deg]', '')) }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, rotate: 0, zIndex: 20 }}
              className={`w-[90%] max-w-[20rem] md:max-w-sm ${item.color} ${item.rotate} p-6 md:p-8 rounded-[1.5rem] md:rounded-3xl shadow-sm border-2 border-white/50 cursor-pointer mx-auto`}
            >
              <div className="text-xs md:text-sm font-black opacity-60 mb-1 md:mb-2">
                {item.year}
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 md:mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm md:text-base font-medium opacity-80 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
