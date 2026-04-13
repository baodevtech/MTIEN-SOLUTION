'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';

/**
 * FeaturedPost - Section bài viết nổi bật
 * Hiển thị bài viết được ghim (featured) với hình ảnh lớn, overlay gradient và thông tin tác giả
 */

const featuredPost = {
  title: 'Kỷ nguyên AI và Tự động hóa: Doanh nghiệp Việt cần chuẩn bị gì cho năm 2026?',
  category: 'Công nghệ lõi',
  date: '20/03/2026',
  readTime: '8 phút đọc',
  author: 'Trần Quang Huy',
  image: 'https://picsum.photos/seed/ai_future/1200/600',
  excerpt: 'Trí tuệ nhân tạo không còn là khái niệm xa vời. Khám phá cách các tập đoàn hàng đầu đang ứng dụng AI vào quy trình sản xuất, quản trị nhân sự và chăm sóc khách hàng để tạo ra lợi thế cạnh tranh tuyệt đối.',
};

export default function FeaturedPost() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 group cursor-pointer"
      >
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80"></div>

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <span className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block shadow-lg">
              {featuredPost.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight max-w-4xl group-hover:text-blue-200 transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-slate-300 text-lg mb-6 max-w-3xl hidden md:block leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <User size={16} /> {featuredPost.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} /> {featuredPost.readTime}
              </div>
              <div className="hidden sm:block">• {featuredPost.date}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
