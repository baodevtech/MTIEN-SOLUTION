'use client';

import { motion } from 'motion/react';
import { 
  Server, Palette, ArrowRight, CheckCircle2, 
  Globe, HardDrive
} from 'lucide-react';
import Image from 'next/image';

/**
 * ServicesShowcase - Phần trưng bày dashboard mockup với các floating badge
 * Hiển thị bảng điều khiển trung tâm cùng các badge nổi (Server, Marketing, Hardware)
 * và danh sách tính năng nổi bật của hệ sinh thái dịch vụ.
 */
export default function ServicesShowcase() {
  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-[#0066FF] rounded-md text-[11px] font-bold mb-4 border border-blue-100">
                  <Globe size={12} /> Tích hợp liền mạch
                </div>
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-slate-900 mb-4 leading-[1.15]">
                  Quản trị tập trung. <br/>
                  <span className="text-[#0066FF]">Mở rộng không giới hạn.</span>
                </h2>
                <p className="text-slate-600 text-[14px] md:text-[16px] mb-8 leading-relaxed">
                  Dù bạn cần một Website bán hàng (6201), cần thuê Server lưu trữ (6311), hay cần sửa chữa thiết bị văn phòng (9511). Mọi dịch vụ đều được đồng bộ hóa và hỗ trợ 24/7 bởi MTIEN SOLUTION.
                </p>

                {/* Checklist gọn gàng */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                  {['Tốc độ tải trang < 1s', 'Uptime 99.9%', 'Bảo mật SSL Đa tầng', 'Chi phí tối ưu'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
                      <CheckCircle2 size={16} className="text-[#00D68F]" /> {item}
                    </li>
                  ))}
                </ul>

                <button className="bg-slate-900 hover:bg-[#0066FF] text-white rounded-xl px-6 py-3.5 font-bold text-[14px] transition-colors shadow-lg shadow-slate-900/20 flex items-center gap-2">
                  Nhận tư vấn giải pháp <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>

            {/* Visual Cluster (High Density) */}
            <div className="lg:col-span-7 relative h-[400px] md:h-[500px]">
              {/* Main Dashboard Box */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
              >
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D68F]"></div>
                </div>
                <div className="relative h-[250px] md:h-[300px] w-full">
                  <Image src="https://picsum.photos/seed/tech_dashboard/800/500" alt="Tech Dashboard" fill className="object-cover" />
                </div>
              </motion.div>

              {/* Floating Server Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 right-0 md:right-10 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                  <Server size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Cloud Server</p>
                  <p className="text-[14px] font-black text-slate-900">Uptime 99.9%</p>
                </div>
              </motion.div>

              {/* Floating Marketing Badge */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 md:left-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500">
                  <Palette size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Thiết kế & Ads</p>
                  <p className="text-[14px] font-black text-slate-900">+500 Dự án</p>
                </div>
              </motion.div>

              {/* Hardware / Setup Badge */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-20 right-4 md:right-16 bg-[#1A1A1A] text-white p-3 rounded-xl shadow-2xl flex items-center gap-3 z-20 border border-slate-700"
              >
                <HardDrive size={20} className="text-[#00D68F]" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Bảo trì & Thiết bị</p>
                  <p className="text-[12px] font-bold">Hỗ trợ tận nơi 24/7</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
  );
}
