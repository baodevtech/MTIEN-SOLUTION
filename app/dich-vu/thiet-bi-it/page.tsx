'use client';

import { motion } from 'motion/react';
import { Monitor, Cpu, Wrench, HardDrive, ArrowRight, CheckCircle2, Laptop, Network } from 'lucide-react';
import Image from 'next/image';

export default function ITEquipmentPage() {
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
                <Monitor size={16} className="text-[#00D68F]" />
                <span>Thiết Bị & Linh Kiện Chính Hãng</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[40px] md:text-[56px] font-bold leading-tight mb-6"
              >
                Thiết Bị IT & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#00b3d6]">Sửa Chữa Máy Tính</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-200 text-lg mb-8 max-w-xl"
              >
                Bán buôn, bán lẻ máy vi tính, thiết bị ngoại vi, phần mềm. Dịch vụ sửa chữa, nâng cấp linh kiện và bảo trì hệ thống máy tính chuyên nghiệp.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button className="bg-[#00D68F] hover:bg-[#00c280] text-[#001A5F] font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2">
                  Liên hệ báo giá
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
                src="https://picsum.photos/seed/hardware/800/600" 
                alt="IT Equipment and Repair" 
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
              Sản Phẩm & Dịch Vụ
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cung cấp giải pháp phần cứng toàn diện, từ thiết bị văn phòng đến hệ thống mạng phức tạp (Mã ngành 4651, 4741, 9511).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Laptop,
                title: 'Bán Buôn / Bán Lẻ Máy Tính',
                desc: 'Phân phối máy tính để bàn, laptop, máy trạm (Workstation) chính hãng từ các thương hiệu lớn như Dell, HP, Lenovo.',
                code: '4651, 4741'
              },
              {
                icon: Cpu,
                title: 'Linh Kiện & Phụ Kiện',
                desc: 'Cung cấp CPU, RAM, SSD, VGA, Mainboard, màn hình, bàn phím, chuột và các thiết bị ngoại vi khác.',
                code: '4651, 4741'
              },
              {
                icon: HardDrive,
                title: 'Thiết Bị Văn Phòng',
                desc: 'Cung cấp máy in, máy scan, máy photocopy, thiết bị trình chiếu, thiết bị hội nghị trực tuyến.',
                code: '4741'
              },
              {
                icon: Wrench,
                title: 'Sửa Chữa & Nâng Cấp',
                desc: 'Dịch vụ sửa chữa máy tính, laptop, thay thế linh kiện, nâng cấp cấu hình máy tính tận nơi.',
                code: '9511'
              },
              {
                icon: Network,
                title: 'Thi Công Mạng LAN/WAN',
                desc: 'Khảo sát, thiết kế và thi công hệ thống mạng nội bộ, hệ thống camera an ninh cho văn phòng.',
                code: '9511'
              },
              {
                icon: CheckCircle2,
                title: 'Bảo Trì IT Doanh Nghiệp',
                desc: 'Dịch vụ IT Helpdesk, bảo trì định kỳ hệ thống máy tính, máy in, mạng nội bộ cho doanh nghiệp.',
                code: '9511'
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
                Chất Lượng & Uy Tín
              </h2>
              <p className="text-blue-200 text-lg mb-8">
                Chúng tôi cam kết mang đến những sản phẩm công nghệ tốt nhất cùng dịch vụ hậu mãi chu đáo.
              </p>
              <ul className="space-y-4">
                {[
                  'Sản phẩm chính hãng 100%, có đầy đủ hóa đơn chứng từ',
                  'Chính sách bảo hành nhanh chóng, 1 đổi 1 trong 30 ngày',
                  'Đội ngũ kỹ thuật viên lành nghề, xử lý sự cố nhanh',
                  'Giá cả cạnh tranh, chiết khấu cao cho doanh nghiệp'
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
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">100%</h4>
                  <p className="text-blue-200">Hàng chính hãng</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">24h</h4>
                  <p className="text-blue-200">Xử lý bảo hành</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">500+</h4>
                  <p className="text-blue-200">Khách hàng DN</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h4 className="text-4xl font-bold text-[#00D68F] mb-2">30</h4>
                  <p className="text-blue-200">Phút có mặt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
