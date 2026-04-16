'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';

/**
 * PostGrid - Section danh sách bài viết dạng grid
 * Hiển thị các bài viết (2 cột) với hình ảnh, tiêu đề, mô tả, tác giả và thời gian đọc
 */

const posts = [
  {
    title: 'Xu hướng thiết kế UX/UI cho ứng dụng di động: Tối giản & Hiệu quả',
    category: 'Thiết kế (7410)',
    date: '15/03/2026',
    readTime: '5 phút đọc',
    author: 'Phạm Thu Hà',
    image: 'https://picsum.photos/seed/uiux_design/800/500',
    excerpt: 'Khám phá những xu hướng thiết kế giao diện người dùng mới nhất giúp tăng trải nghiệm và giữ chân khách hàng trên nền tảng mobile.',
  },
  {
    title: 'Tại sao doanh nghiệp vừa và nhỏ cần chuyển đổi lên Cloud ngay hôm nay?',
    category: 'Cloud & Server (6311)',
    date: '10/03/2026',
    readTime: '6 phút đọc',
    author: 'Lê Hoàng Nam',
    image: 'https://picsum.photos/seed/cloud_computing/800/500',
    excerpt: 'Phân tích bài toán chi phí (Capex vs Opex) và lợi ích bảo mật khi lưu trữ dữ liệu trên đám mây thay vì server vật lý truyền thống.',
  },
  {
    title: 'Hướng dẫn chọn mua thiết bị IT và Laptop cho dân lập trình chuyên nghiệp',
    category: 'Phần cứng (4651)',
    date: '05/03/2026',
    readTime: '4 phút đọc',
    author: 'Nguyễn Văn Kỹ',
    image: 'https://picsum.photos/seed/coding_laptop/800/500',
    excerpt: 'Những tiêu chí quan trọng về CPU, RAM, màn hình và tản nhiệt cần lưu ý khi chọn mua máy tính xách tay phục vụ công việc viết code cường độ cao.',
  },
  {
    title: 'Tầm quan trọng của quy trình bảo trì hệ thống IT định kỳ',
    category: 'Bảo trì (9511)',
    date: '28/02/2026',
    readTime: '5 phút đọc',
    author: 'Trần Kỹ Thuật',
    image: 'https://picsum.photos/seed/server_maintenance/800/500',
    excerpt: 'Phòng bệnh hơn chữa bệnh - Bảo trì định kỳ giúp hệ thống hoạt động ổn định, tránh mất mát dữ liệu và giảm thiểu downtime gây thiệt hại doanh thu.',
  },
];

export default function PostGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col"
          >
            {/* Ảnh bài viết */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wider">
                {post.category}
              </div>
            </div>

            {/* Nội dung bài viết */}
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}`}>{post.title}</Link>
              </h3>
              <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-orange-500" /> {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {post.readTime}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
