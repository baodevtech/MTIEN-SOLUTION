'use client';

import { motion } from 'motion/react';
import { Cloud, Server, Database, Shield, ArrowRight, CheckCircle2, Zap, Activity } from 'lucide-react';
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
                <span>Hạ Tầng Số Vững Chắc</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[40px] md:text-[56px] font-bold leading-tight mb-6"
              >
                Cloud, Hosting & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#00b3d6]">Máy Chủ Server</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-200 text-lg mb-8 max-w-xl"
              >
                Dịch vụ xử lý dữ liệu, cho thuê server, hosting tốc độ cao, đảm bảo an toàn thông tin và hiệu suất tối đa cho doanh nghiệp của bạn.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button className="bg-[#00D68F] hover:bg-[#00c280] text-[#001A5F] font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2">
                  Xem bảng giá
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
                alt="Cloud Server Infrastructure" 
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
              Giải Pháp Hạ Tầng IT
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cung cấp nền tảng lưu trữ và xử lý dữ liệu mạnh mẽ, đáp ứng mã ngành 6311.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Server,
                title: 'Cho Thuê Máy Chủ (Server)',
                desc: 'Cung cấp máy chủ vật lý chuyên dụng (Dedicated Server) với cấu hình mạnh mẽ, đặt tại các Data Center chuẩn Tier III.',
              },
              {
                icon: Cloud,
                title: 'Cloud VPS & Hosting',
                desc: 'Máy chủ ảo và không gian lưu trữ website tốc độ cao, sử dụng ổ cứng SSD/NVMe, dễ dàng nâng cấp tài nguyên.',
              },
              {
                icon: Database,
                title: 'Xử Lý Dữ Liệu',
                desc: 'Dịch vụ lưu trữ, sao lưu (backup) và xử lý dữ liệu lớn (Big Data) an toàn, bảo mật tuyệt đối.',
              },
              {
                icon: Shield,
                title: 'Bảo Mật & Firewall',
                desc: 'Hệ thống tường lửa chống DDoS, bảo vệ website và ứng dụng khỏi các cuộc tấn công mạng.',
              },
              {
                icon: Zap,
                title: 'Tối Ưu Hiệu Suất',
                desc: 'Tối ưu hóa máy chủ, cài đặt các dịch vụ caching như Redis, Memcached giúp tăng tốc độ xử lý.',
              },
              {
                icon: Activity,
                title: 'Giám Sát Hệ Thống',
                desc: 'Theo dõi tình trạng hoạt động của server 24/7, cảnh báo sự cố tức thời qua SMS/Email.',
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
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#001A5F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[32px] md:text-[40px] font-bold mb-6">
                Cam kết chất lượng dịch vụ
              </h2>
              <p className="text-blue-200 text-lg mb-8">
                Hạ tầng mạnh mẽ, ổn định là chìa khóa giúp doanh nghiệp của bạn hoạt động liên tục không gián đoạn.
              </p>
              <ul className="space-y-4">
                {[
                  'Uptime 99.99% với hệ thống dự phòng N+1',
                  'Băng thông lớn, tốc độ truyền tải nhanh chóng',
                  'Hỗ trợ kỹ thuật trực tiếp 24/7/365',
                  'Sao lưu dữ liệu tự động hàng ngày/tuần'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#00D68F] shrink-0 mt-1" size={20} />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-green-500/20 rounded-full blur-3xl"></div>
              <Image 
                src="https://picsum.photos/seed/datacenter/800/600" 
                alt="Data Center" 
                fill 
                className="object-cover rounded-2xl shadow-2xl border border-white/10 relative z-10"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
