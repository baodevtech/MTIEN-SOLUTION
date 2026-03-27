'use client';

import { motion } from 'motion/react';
import { Palette, Megaphone, PenTool, Image as ImageIcon, Layout, ArrowRight, CheckCircle2, TrendingUp, Target } from 'lucide-react';
import Image from 'next/image';

export default function MarketingDesignPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-[#001A5F] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00287A] to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#0066FF] rounded-full blur-[120px] opacity-30 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6"
              >
                <Palette size={16} className="text-[#00D68F]" />
                <span>Sáng Tạo & Đột Phá</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[40px] md:text-[56px] font-bold leading-tight mb-6"
              >
                Quảng Cáo & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#00b3d6]">Thiết Kế Đồ Họa</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-200 text-lg mb-8 max-w-xl"
              >
                Cung cấp dịch vụ quảng cáo, thiết kế chuyên dụng: Logo, Banner, Poster, hình ảnh truyền thông giúp thương hiệu của bạn nổi bật.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button className="bg-[#00D68F] hover:bg-[#00c280] text-[#001A5F] font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2">
                  Xem Portfolio
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-[400px] lg:h-[500px]"
            >
              <Image 
                src="https://picsum.photos/seed/design/800/600" 
                alt="Graphic Design & Marketing" 
                fill 
                className="object-cover rounded-2xl shadow-2xl"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] mb-4">
              Dịch Vụ Sáng Tạo
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Từ ý tưởng đến thực thi, chúng tôi giúp thương hiệu của bạn giao tiếp hiệu quả với khách hàng (Mã ngành 7310, 7410).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Megaphone,
                title: 'Quảng Cáo Trực Tuyến',
                desc: 'Chạy quảng cáo Google Ads, Facebook Ads, TikTok Ads tối ưu chi phí, tăng tỷ lệ chuyển đổi.',
                code: '7310'
              },
              {
                icon: PenTool,
                title: 'Thiết Kế Logo & Branding',
                desc: 'Xây dựng bộ nhận diện thương hiệu chuyên nghiệp, ấn tượng, tạo dấu ấn riêng biệt.',
                code: '7410'
              },
              {
                icon: ImageIcon,
                title: 'Thiết Kế Banner & Poster',
                desc: 'Thiết kế ấn phẩm truyền thông, banner quảng cáo, poster sự kiện thu hút ánh nhìn.',
                code: '7410'
              },
              {
                icon: Layout,
                title: 'Thiết Kế UI/UX',
                desc: 'Thiết kế giao diện người dùng cho Website và App di động, tối ưu trải nghiệm khách hàng.',
                code: '7410'
              },
              {
                icon: Target,
                title: 'Chiến Lược Marketing',
                desc: 'Lên kế hoạch và triển khai các chiến dịch Marketing tổng thể giúp tăng doanh thu.',
                code: '7310'
              },
              {
                icon: TrendingUp,
                title: 'SEO & Content',
                desc: 'Tối ưu hóa công cụ tìm kiếm, sáng tạo nội dung chuẩn SEO, viết bài PR chuyên nghiệp.',
                code: '7310'
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#F0F5FA] p-8 rounded-2xl hover:shadow-xl transition-all border border-transparent hover:border-blue-200 group"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#0066FF] transition-colors">
                  <service.icon className="text-[#0066FF] group-hover:text-white" size={28} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-[#1A1A1A]">{service.title}</h3>
                  <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded">Mã: {service.code}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#001A5F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold mb-4">
              Quy Trình Làm Việc
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Minh bạch, sáng tạo và luôn đặt hiệu quả lên hàng đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Nghiên Cứu', desc: 'Phân tích thị trường, đối thủ và chân dung khách hàng mục tiêu.' },
              { step: '02', title: 'Ý Tưởng', desc: 'Brainstorming và đề xuất các concept sáng tạo phù hợp.' },
              { step: '03', title: 'Thực Thi', desc: 'Thiết kế chi tiết, lên nội dung và setup chiến dịch quảng cáo.' },
              { step: '04', title: 'Tối Ưu', desc: 'Đo lường hiệu quả, báo cáo và liên tục điều chỉnh tối ưu.' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-white/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-[#00D68F] mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent -z-10 transform translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
