'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

/**
 * FeaturedProject - Hien thi du an noi bat (ERP VinaCorp)
 * Bao gom thong tin du an, chi so hieu suat va cong nghe su dung
 */

const featuredProject = {
  title: 'Hệ thống Quản trị Nguồn lực ERP Lõi',
  client: 'Tập đoàn Sản xuất VinaCorp',
  category: 'Phần mềm Doanh nghiệp (6201)',
  image: 'https://picsum.photos/seed/erp_dashboard/1200/800',
  desc: 'Chuyển đổi số toàn diện quy trình vận hành cho tập đoàn 2000+ nhân sự. Hệ thống tích hợp quản lý kho, nhân sự, kế toán và chuỗi cung ứng theo thời gian thực.',
  metrics: [
    { label: 'Tăng hiệu suất', value: '300%' },
    { label: 'Giảm chi phí vận hành', value: '45%' },
    { label: 'Thời gian triển khai', value: '6 Tháng' },
  ],
  tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
};

export default function FeaturedProject() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
      >
        <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold border border-blue-500/30">Dự án Nổi bật</span>
              <span className="text-slate-400 text-sm">{featuredProject.category}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{featuredProject.title}</h2>
            <p className="text-blue-200 font-medium mb-6">Khách hàng: {featuredProject.client}</p>
            <p className="text-slate-300 leading-relaxed mb-10">{featuredProject.desc}</p>
            
            <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-slate-700">
              {featuredProject.metrics.map((metric, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">{metric.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">{metric.label}</div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-3">Công nghệ sử dụng:</p>
              <div className="flex flex-wrap gap-2">
                {featuredProject.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-lg text-sm text-slate-200 border border-white/5">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
          <Image src={featuredProject.image} alt={featuredProject.title} fill className="object-cover" />
        </div>
      </motion.div>
    </section>
  );
}
