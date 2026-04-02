'use client';

import { motion } from 'motion/react';
import { Megaphone, PenTool, Layout, TrendingUp, MonitorPlay, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
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
                <Megaphone size={16} className="text-[#00D68F]" />
                <span>Nâng Tầm Thương Hiệu Số</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[40px] md:text-[56px] font-bold leading-tight mb-6"
              >
                Digital Marketing & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#00b3d6]">Thiết Kế Đồ Họa</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-200 text-lg mb-8 max-w-xl"
              >
                Cung cấp giải pháp truyền thông số toàn diện, thiết kế bộ nhận diện thương hiệu độc đáo và triển khai quảng cáo trực tuyến giúp bứt phá doanh thu.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button className="bg-[#00D68F] hover:bg-[#00c280] text-[#001A5F] font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2">
                  Nhận tư vấn ngay
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
                src="https://picsum.photos/seed/marketing/800/600" 
                alt="Marketing and Design" 
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
              Dịch Vụ Của Chúng Tôi
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Sáng tạo không giới hạn kết hợp với chiến lược thực chiến, đem lại tỷ lệ chuyển đổi tối ưu nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: PenTool,
                title: 'Thiết Kế Đồ Họa',
                desc: 'Thiết kế logo, bộ nhận diện thương hiệu, banner quảng cáo, bao bì sản phẩm chuyên nghiệp.',
                code: '7410'
              },
              {
                icon: TrendingUp,
                title: 'Quảng Cáo Trực Tuyến',
                desc: 'Thiết lập và tối ưu chiến dịch quảng cáo trên nền tảng Facebook Ads, Google Ads, TikTok Ads.',
                code: '7310'
              },
              {
                icon: Search,
                title: 'Dịch Vụ SEO',
                desc: 'Tối ưu hóa công cụ tìm kiếm, đưa website lên top Google bền vững để tiếp cận khách hàng tiềm năng.',
                code: '7310'
              },
              {
                icon: Layout,
                title: 'Thiết Kế UI/UX',
                desc: 'Tạo ra giao diện người dùng hiện đại, tăng trải nghiệm và tỷ lệ giữ chân khách hàng trên web/app.',
                code: '7410'
              },
              {
                icon: Megaphone,
                title: 'Quản Trị Fanpage',
                desc: 'Chăm sóc nội dung bài viết, hình ảnh và quản lý tương tác trên các kênh mạng xã hội.',
                code: '7310'
              },
              {
                icon: MonitorPlay,
                title: 'Sản Xuất Video',
                desc: 'Quay dựng video giới thiệu doanh nghiệp, TVC quảng cáo và motion graphics cuốn hút.',
                code: '7410'
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

      {/* Why Choose Us */}
      <section className="py-24 bg-[#001A5F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[32px] md:text-[40px] font-bold mb-6">
                Sáng tạo tạo nên sự khác biệt
              </h2>
              <p className="text-blue-200 text-lg mb-8">
                Chúng tôi cam kết đồng hành cùng doanh nghiệp trong quá trình xây dựng thương hiệu số và thu hút khách hàng mục tiêu.
              </p>
              <ul className="space-y-4">
                {[
                  'Chiến lược thực chiến bám sát mục tiêu kinh doanh',
                  'Đội ngũ sáng tạo trẻ trung, luôn cập nhật xu hướng',
                  'Tối ưu hóa tỷ suất hoàn vốn (ROI) cho các chiến dịch',
                  'Báo cáo minh bạch, số liệu rõ ràng theo thời gian thực'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#00D68F] shrink-0 mt-1" size={20} />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">200+</h4>
                  <p className="text-blue-200">Chiến dịch thành công</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">300%</h4>
                  <p className="text-blue-200">Tăng trưởng tiếp cận</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">24/7</h4>
                  <p className="text-blue-200">Hỗ trợ đối tác</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">5+</h4>
                  <p className="text-blue-200">Năm kinh nghiệm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}