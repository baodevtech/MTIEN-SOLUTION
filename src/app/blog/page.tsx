'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, ArrowRight, Search, Mail } from 'lucide-react';

const featuredPost = {
  title: 'Kỷ nguyên AI và Tự động hóa: Doanh nghiệp Việt cần chuẩn bị gì cho năm 2026?',
  category: 'Công nghệ lõi',
  date: '20/03/2026',
  readTime: '8 phút đọc',
  author: 'Trần Quang Huy',
  image: 'https://picsum.photos/seed/ai_future/1200/600',
  excerpt: 'Trí tuệ nhân tạo không còn là khái niệm xa vời. Khám phá cách các tập đoàn hàng đầu đang ứng dụng AI vào quy trình sản xuất, quản trị nhân sự và chăm sóc khách hàng để tạo ra lợi thế cạnh tranh tuyệt đối.',
};

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

const categories = ['Tất cả', 'Phần mềm', 'Cloud', 'Thiết kế UI/UX', 'Phần cứng', 'Bảo trì', 'Bảo mật'];

export default function Blog() {
  return (
    <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
      {/* 1. Header & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
            >
              TechNova <span className="text-blue-600">Insights</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-lg text-slate-600"
            >
              Góc nhìn chuyên sâu, xu hướng công nghệ và kinh nghiệm thực chiến từ đội ngũ chuyên gia.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="w-full md:w-auto relative"
          >
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              className="w-full md:w-80 pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </motion.div>
        </div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex overflow-x-auto gap-3 mt-10 pb-2 scrollbar-hide"
        >
          {categories.map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'}`}>
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* 2. Featured Post */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 group cursor-pointer"
        >
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
                <div className="flex items-center gap-2"><User size={16} /> {featuredPost.author}</div>
                <div className="flex items-center gap-2"><Clock size={16} /> {featuredPost.readTime}</div>
                <div className="hidden sm:block">• {featuredPost.date}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Post Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                  <Link href="#">{post.title}</Link>
                </h3>
                <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-2"><User size={16} className="text-orange-500" /> {post.author}</div>
                  <div className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4">Đăng ký nhận bản tin</h2>
            <p className="text-blue-100 text-lg">Nhận ngay những bài viết phân tích chuyên sâu và báo cáo xu hướng công nghệ mới nhất hàng tuần.</p>
          </div>
          
          <div className="relative z-10 w-full md:w-1/2 max-w-md">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Địa chỉ email của bạn" 
                className="w-full pl-12 pr-32 py-4 rounded-full border-none focus:outline-none focus:ring-4 focus:ring-blue-400/50 text-slate-900 shadow-xl"
              />
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full font-bold transition-colors shadow-md">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
