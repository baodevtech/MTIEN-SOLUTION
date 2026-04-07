'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

/**
 * StatsCapabilities - Section thống kê năng lực triển khai
 * Bao gồm hình ảnh văn hóa công ty bên trái và grid thống kê bên phải
 * (SLA, ISO, Kỹ sư Senior, Giám sát 24/7)
 */
export default function StatsCapabilities() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Hình ảnh văn hóa công ty */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
        >
          <Image
            src="https://picsum.photos/seed/officelife/800/1000"
            alt="Văn hóa TechNova"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <p className="text-2xl font-bold mb-2">&quot;Công nghệ vị nhân sinh&quot;</p>
            <p className="text-white/80">Môi trường làm việc cởi mở, sáng tạo tại TechNova.</p>
          </div>
        </motion.div>

        {/* Grid thống kê năng lực */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Năng lực triển khai vượt trội
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi tự tin đáp ứng các tiêu chuẩn khắt khe nhất từ các tập đoàn lớn, ngân hàng và tổ chức chính phủ.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-4xl font-extrabold text-blue-600 mb-2">100%</div>
              <div className="text-slate-800 font-bold mb-1">Cam kết SLA</div>
              <p className="text-sm text-slate-500">Đảm bảo thời gian uptime và phản hồi hỗ trợ.</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-500 mb-2">ISO</div>
              <div className="text-slate-800 font-bold mb-1">27001:2013</div>
              <p className="text-sm text-slate-500">Tiêu chuẩn bảo mật thông tin quốc tế.</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600 mb-2">50+</div>
              <div className="text-slate-800 font-bold mb-1">Kỹ sư Senior</div>
              <p className="text-sm text-slate-500">Được chứng nhận bởi AWS, Microsoft, Google.</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-500 mb-2">24/7</div>
              <div className="text-slate-800 font-bold mb-1">Giám sát hệ thống</div>
              <p className="text-sm text-slate-500">Trung tâm NOC hoạt động liên tục không nghỉ.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
