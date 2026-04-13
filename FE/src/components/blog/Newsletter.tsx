'use client';

import { Mail } from 'lucide-react';

/**
 * Newsletter - Section đăng ký nhận bản tin
 * Form nhập email để đăng ký nhận bài viết phân tích và báo cáo xu hướng công nghệ hàng tuần
 */
export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-blue-600 rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>

        {/* Nội dung bên trái */}
        <div className="relative z-10 md:w-1/2">
          <h2 className="text-3xl font-bold text-white mb-4">Đăng ký nhận bản tin</h2>
          <p className="text-blue-100 text-lg">
            Nhận ngay những bài viết phân tích chuyên sâu và báo cáo xu hướng công nghệ mới nhất hàng tuần.
          </p>
        </div>

        {/* Form đăng ký bên phải */}
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
  );
}
