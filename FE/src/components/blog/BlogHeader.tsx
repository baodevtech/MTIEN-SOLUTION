'use client';

import { motion } from 'motion/react';
import { Search } from 'lucide-react';

/**
 * BlogHeader - Header section của trang Blog
 * Bao gồm tiêu đề, mô tả, thanh tìm kiếm và danh sách danh mục bài viết
 */

const categories = ['Tất cả', 'Phần mềm', 'Cloud', 'Thiết kế UI/UX', 'Phần cứng', 'Bảo trì', 'Bảo mật'];

export default function BlogHeader() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      {/* Tiêu đề và thanh tìm kiếm */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            TechNova <span className="text-blue-600">Insights</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Góc nhìn chuyên sâu, xu hướng công nghệ và kinh nghiệm thực chiến từ đội ngũ chuyên gia.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
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

      {/* Danh sách danh mục */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex overflow-x-auto gap-3 mt-10 pb-2 scrollbar-hide"
      >
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>
    </section>
  );
}
