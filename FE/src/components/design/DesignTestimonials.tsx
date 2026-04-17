'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import Link from 'next/link';

/**
 * DesignTestimonials - Phan hoi va nhan xet tu doi tac, khach hang
 * Bao gom: tieu de, lien ket xem du an, va 2 the danh gia voi hinh anh nguoi dung
 */

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const testimonials = [
  { q: 'Giao diện mới thay đổi hoàn toàn định vị của công ty chúng tôi. Chuyên nghiệp, sạch sẽ và tỷ lệ người dùng sử dụng ứng dụng tăng mạnh.', a: 'David Nguyen', r: 'CEO - Tech Vina', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { q: 'Hệ thống Design siêu chuẩn. Source file Figma gọn gàng vô cùng, Dev team bên tôi đã áp dụng dễ dàng và tăng tốc độ code lên gấp đôi.', a: 'Sarah Tran', r: 'Product Lead', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop' }
];

export default function DesignTestimonials() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex-1">
             <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[26px] md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4 md:mb-6">Nhận xét từ Đối tác</motion.h2>
             <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[15px] md:text-lg text-neutral-500 mb-6 md:mb-8">Nhiều thương hiệu đã cất cánh mạnh mẽ sau khi cấu trúc lại toàn bộ hệ thống giao diện. Lắng nghe phản hồi từ họ.</motion.p>
             <Link href="/projects" className="font-bold border-b-2 border-neutral-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">Xem toàn bộ Dự án</Link>
          </div>
          <div className="flex-1 space-y-6">
             {testimonials.map((t, i) => (
               <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="bg-neutral-50 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-neutral-100 flex flex-col gap-4 md:gap-6">
                  <Quote className="text-blue-200 w-8 h-8 md:w-10 md:h-10" />
                  <p className="text-neutral-700 font-medium italic text-[15px] md:text-lg">&ldquo;{t.q}&rdquo;</p>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <Image src={t.img} alt={t.a} width={48} height={48} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                        <div>
                          <p className="font-bold text-neutral-900 text-sm">{t.a}</p>
                          <p className="text-xs text-neutral-500">{t.r}</p>
                        </div>
                     </div>
                     <div className="flex text-yellow-400 gap-1"><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/><Star fill="currentColor" size={14}/></div>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
