'use client';

import { motion } from 'motion/react';
import { Code2, Smartphone, Server, ShieldCheck, ArrowRight, CheckCircle2, Cpu, Settings } from 'lucide-react';
import Image from 'next/image';

export default function SoftwareAppPage() {
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
                <Code2 size={16} className="text-[#00D68F]" />
                <span>Giải Pháp Phần Mềm Toàn Diện</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[40px] md:text-[56px] font-bold leading-tight mb-6"
              >
                Lập Trình Phần Mềm & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#00b3d6]">App Di Động</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-200 text-lg mb-8 max-w-xl"
              >
                Cung cấp dịch vụ lập trình máy vi tính, thiết kế phần mềm theo yêu cầu, phát triển ứng dụng di động (iOS/Android) và tư vấn giải pháp quản trị hệ thống chuyên nghiệp.
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
                src="https://picsum.photos/seed/software/800/600" 
                alt="Software Development" 
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
              Đáp ứng mọi nhu cầu số hóa của doanh nghiệp với các giải pháp công nghệ tiên tiến nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Lập Trình Phần Mềm',
                desc: 'Thiết kế và phát triển phần mềm quản lý, CRM, ERP theo yêu cầu đặc thù của từng doanh nghiệp.',
                code: '6201'
              },
              {
                icon: Smartphone,
                title: 'Thiết Kế App Di Động',
                desc: 'Phát triển ứng dụng di động Native và Cross-platform trên cả hai nền tảng iOS và Android.',
                code: '6201'
              },
              {
                icon: Server,
                title: 'Tư Vấn Giải Pháp',
                desc: 'Tư vấn máy vi tính, quản trị hệ thống và đưa ra giải pháp phần mềm tối ưu chi phí, hiệu quả cao.',
                code: '6202'
              },
              {
                icon: Settings,
                title: 'Bảo Trì Phần Mềm',
                desc: 'Hỗ trợ kỹ thuật, bảo trì, nâng cấp hệ thống phần mềm đảm bảo vận hành ổn định 24/7.',
                code: '6209'
              },
              {
                icon: ShieldCheck,
                title: 'Bảo Mật Hệ Thống',
                desc: 'Đánh giá và triển khai các giải pháp bảo mật dữ liệu, chống tấn công mạng cho doanh nghiệp.',
                code: '6202'
              },
              {
                icon: Cpu,
                title: 'Tích Hợp Hệ Thống',
                desc: 'Kết nối và đồng bộ dữ liệu giữa các phần mềm, nền tảng khác nhau qua API an toàn.',
                code: '6201'
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
                Tại sao chọn MTIEN SOLUTION?
              </h2>
              <p className="text-blue-200 text-lg mb-8">
                Chúng tôi không chỉ viết code, chúng tôi xây dựng giải pháp công nghệ mang lại giá trị thực cho doanh nghiệp của bạn.
              </p>
              <ul className="space-y-4">
                {[
                  'Đội ngũ kỹ sư giàu kinh nghiệm, nắm bắt công nghệ mới',
                  'Quy trình phát triển chuẩn Agile/Scrum minh bạch',
                  'Bảo mật dữ liệu tuyệt đối theo tiêu chuẩn quốc tế',
                  'Hỗ trợ kỹ thuật nhanh chóng, tận tâm 24/7'
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
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">50+</h4>
                  <p className="text-blue-200">Dự án phần mềm</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">99%</h4>
                  <p className="text-blue-200">Khách hàng hài lòng</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">24/7</h4>
                  <p className="text-blue-200">Hỗ trợ kỹ thuật</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">10+</h4>
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
