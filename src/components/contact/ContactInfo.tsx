'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

/**
 * ContactInfo - Section thông tin liên hệ
 * Hiển thị địa chỉ, điện thoại, email, giờ làm việc và placeholder bản đồ
 */
export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Thông Tin Liên Hệ</h2>

      <div className="space-y-8 mb-12">
        {/* Trụ sở chính */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Trụ sở chính</h3>
            <p className="text-slate-600 leading-relaxed">
              Tầng 12, Tòa nhà Tech, 123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh, Việt Nam
            </p>
          </div>
        </div>

        {/* Điện thoại */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Điện thoại</h3>
            <p className="text-slate-600 leading-relaxed">
              Hotline: 0123 456 789
              <br />
              Hỗ trợ kỹ thuật: 0987 654 321
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
            <p className="text-slate-600 leading-relaxed">
              Tư vấn: contact@technova.vn
              <br />
              Tuyển dụng: hr@technova.vn
            </p>
          </div>
        </div>

        {/* Giờ làm việc */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Giờ làm việc</h3>
            <p className="text-slate-600 leading-relaxed">
              Thứ 2 - Thứ 6: 08:00 - 17:30
              <br />
              Thứ 7: 08:00 - 12:00
            </p>
          </div>
        </div>
      </div>

      {/* Placeholder bản đồ */}
      <div className="w-full h-64 bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400">
          <MapPin className="w-10 h-10 mb-2 opacity-50" />
          <span className="font-medium">Bản đồ Google Maps</span>
        </div>
      </div>
    </motion.div>
  );
}
