'use client';

import { motion } from 'motion/react';
import { Cloud, Server, Shield, HardDrive, Database, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CloudServerPage() {
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
                <Cloud size={16} className="text-[#00D68F]" />
                <span>Hạ Tầng Đám Mây Đỉnh Cao</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[40px] md:text-[56px] font-bold leading-tight mb-6"
              >
                Cloud Server & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#00b3d6]">Web Hosting</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-200 text-lg mb-8 max-w-xl"
              >
                Cung cấp giải pháp lưu trữ, máy chủ ảo VPS, Web Hosting, cho thuê không gian mạng và quản trị hệ thống dữ liệu an toàn, tốc độ cao cho doanh nghiệp.
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
                src="https://picsum.photos/seed/server/800/600" 
                alt="Cloud Server" 
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
              Giải pháp hạ tầng mạng mạnh mẽ, đảm bảo website và ứng dụng của bạn luôn hoạt động trơn tru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: 'Xử Lý Dữ Liệu',
                desc: 'Xử lý dữ liệu, cho thuê phần cứng và cung cấp các dịch vụ liên quan đến cơ sở dữ liệu quy mô lớn.',
                code: '6311'
              },
              {
                icon: Server,
                title: 'Máy Chủ Ảo (Cloud VPS)',
                desc: 'Cho thuê máy chủ ảo linh hoạt, cấu hình mạnh mẽ đáp ứng mọi nhu cầu tính toán và lưu trữ.',
                code: '6311'
              },
              {
                icon: HardDrive,
                title: 'Dịch Vụ Web Hosting',
                desc: 'Lưu trữ website ổn định với tốc độ cao, hỗ trợ đa dạng Control Panel (cPanel, DirectAdmin).',
                code: '6311'
              },
              {
                icon: Shield,
                title: 'Bảo Mật Máy Chủ',
                desc: 'Triển khai Firewall, chống DDoS và hệ thống sao lưu tự động để bảo vệ an toàn dữ liệu.',
                code: '6202'
              },
              {
                icon: Globe,
                title: 'Tên Miền & SSL',
                desc: 'Đăng ký và quản lý tên miền quốc gia/quốc tế, tích hợp chứng chỉ bảo mật SSL uy tín.',
                code: '6311'
              },
              {
                icon: Cloud,
                title: 'Quản Trị Hệ Thống',
                desc: 'Dịch vụ giám sát, tối ưu hóa và hỗ trợ vận hành máy chủ chuyên nghiệp 24/7.',
                code: '6202'
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
                Hạ tầng vững chắc cho doanh nghiệp
              </h2>
              <p className="text-blue-200 text-lg mb-8">
                Hệ thống máy chủ của chúng tôi được tối ưu hóa để mang lại hiệu suất cao nhất và độ bảo mật tuyệt đối.
              </p>
              <ul className="space-y-4">
                {[
                  'Thời gian hoạt động (Uptime) cam kết đạt 99.9%',
                  'Tốc độ truy xuất cực nhanh với ổ cứng NVMe Enterprise',
                  'Hệ thống phòng chống tấn công DDoS thông minh',
                  'Đội ngũ kỹ thuật giám sát và hỗ trợ trực tiếp 24/7'
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
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">99.9%</h4>
                  <p className="text-blue-200">Uptime đảm bảo</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">500+</h4>
                  <p className="text-blue-200">Khách hàng tin dùng</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">24/7</h4>
                  <p className="text-blue-200">Giám sát hệ thống</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">10G</h4>
                  <p className="text-blue-200">Băng thông mạng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
