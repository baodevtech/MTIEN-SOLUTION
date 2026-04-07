'use client';

import { motion } from 'motion/react';
import { Globe, Target } from 'lucide-react';

/**
 * VisionMission - Section Tầm nhìn & Sứ mệnh (Bento Grid)
 * Hiển thị tầm nhìn công ty (card lớn 2 cột) và sứ mệnh (card nhỏ 1 cột)
 */
export default function VisionMission() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Tầm nhìn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 bg-slate-50 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200 transition-colors"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
              <Globe size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tầm nhìn</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Trở thành tập đoàn công nghệ hàng đầu khu vực, tiên phong trong việc cung cấp hệ sinh thái IT toàn diện. Chúng tôi khát vọng đưa công nghệ Việt Nam vươn tầm quốc tế, tạo ra những sản phẩm mang tiêu chuẩn toàn cầu.
            </p>
          </div>
        </motion.div>

        {/* Sứ mệnh */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-orange-500 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
            <Target size={200} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Sứ mệnh</h2>
            <p className="text-orange-50 text-lg leading-relaxed">
              Trao quyền cho doanh nghiệp thông qua các giải pháp công nghệ tối ưu, an toàn và dễ tiếp cận. Biến những ý tưởng phức tạp thành hiện thực đơn giản.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
