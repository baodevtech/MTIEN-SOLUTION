'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

/**
 * ContactForm - Form liên hệ với validation và trạng thái gửi thành công
 * Bao gồm: Họ tên, SĐT, Email, Dịch vụ quan tâm, Nội dung tin nhắn
 */
export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
    >
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Gửi Tin Nhắn</h2>
      <p className="text-slate-500 mb-8">
        Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24h làm việc.
      </p>

      {/* Trạng thái gửi thành công */}
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Gửi thành công!</h3>
          <p className="text-slate-600 mb-6">
            Cảm ơn bạn đã liên hệ. Đội ngũ TechNova sẽ sớm gọi lại cho bạn.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            Gửi tin nhắn khác
          </button>
        </motion.div>
      ) : (
        /* Form nhập liệu */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                Họ và tên *
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                Số điện thoại *
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="09xx xxx xxx"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="email@domain.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-semibold text-slate-700">
              Dịch vụ quan tâm
            </label>
            <select
              id="service"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-700"
            >
              <option value="">-- Chọn dịch vụ --</option>
              <option value="software">Phát triển phần mềm & Web</option>
              <option value="consulting">Tư vấn giải pháp IT</option>
              <option value="cloud">Cloud & Máy chủ</option>
              <option value="design">Thiết kế đồ họa & Quảng cáo</option>
              <option value="hardware">Cung cấp thiết bị IT</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-slate-700">
              Nội dung tin nhắn *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              placeholder="Mô tả chi tiết yêu cầu của bạn..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 transform hover:-translate-y-0.5"
          >
            Gửi Yêu Cầu <Send className="w-5 h-5" />
          </button>
          <p className="text-xs text-slate-400 text-center mt-4">
            Bằng việc gửi thông tin, bạn đồng ý với Chính sách bảo mật của chúng tôi.
          </p>
        </form>
      )}
    </motion.div>
  );
}
