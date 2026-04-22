'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useThemeValue } from '@/lib/theme-context';

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API_URL || (typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https://localhost:3001' : 'http://localhost:3001');

export default function ContactForm() {
  const formTitle = useThemeValue('contact', 'form', 'title', 'Gửi yêu cầu tư vấn') as string;
  const buttonText = useThemeValue('contact', 'form', 'buttonText', 'Gửi tin nhắn') as string;
  const successMessage = useThemeValue('contact', 'form', 'successMessage', 'Chúng tôi đã nhận tin nhắn. Sẽ phản hồi trong 24h!') as string;
  const showCompanyField = useThemeValue('contact', 'form', 'showCompanyField', true) as boolean;
  const showPhoneField = useThemeValue('contact', 'form', 'showPhoneField', true) as boolean;
  const showServiceField = useThemeValue('contact', 'form', 'showServiceField', true) as boolean;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${ADMIN_API}/api/public/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('service'),
          message: formData.get('message'),
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.message || 'Gửi thất bại, vui lòng thử lại.');
      }
    } catch {
      setError('Không thể kết nối server, vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
      className="bg-white p-6 sm:p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border-2 border-white/50"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-3 leading-tight">
        {formTitle}
      </h2>
      <p className="text-zinc-500 mb-8 md:mb-10 font-medium">
        Điền thông tin bên dưới, chúng tôi sẽ phản hồi lại bạn bằng đường truyền sớm nhất! 🚀
      </p>

      {/* Trạng thái gửi thành công */}
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-950 tracking-tight mb-3">Gửi thành công!</h3>
          <p className="text-emerald-800 opacity-90 font-medium mb-8">
            {successMessage}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors bg-white px-6 py-2.5 rounded-full shadow-sm"
          >
            Gửi cái nữa không?
          </button>
        </motion.div>
      ) : (
        /* Form nhập liệu */
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-zinc-700 ml-1">
                Họ và tên *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-5 py-4 rounded-[1rem] bg-zinc-50/80 border-2 border-transparent focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100/50 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400"
                placeholder="Nguyễn Văn A"
              />
            </div>
            {showPhoneField && (
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-bold text-zinc-700 ml-1">
                Số điện thoại *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-5 py-4 rounded-[1rem] bg-zinc-50/80 border-2 border-transparent focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100/50 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400"
                placeholder="09xx xxx xxx"
              />
            </div>
            )}
          </div>

          {showCompanyField && (
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-bold text-zinc-700 ml-1">
             Công ty
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-5 py-4 rounded-[1rem] bg-zinc-50/80 border-2 border-transparent focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100/50 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400"
              placeholder="Ghi vào nếu có"
            />
          </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-zinc-700 ml-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-5 py-4 rounded-[1rem] bg-zinc-50/80 border-2 border-transparent focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100/50 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400"
              placeholder="thu-nay-ai-gui@domain.com"
            />
          </div>

          {showServiceField && (
          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-semibold text-slate-700">
              Dịch vụ quan tâm
            </label>
            <select
              id="service"
              name="service"
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
          )}

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-bold text-zinc-700 ml-1">
              Mô tả chi tiết *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-5 py-4 rounded-[1rem] bg-zinc-50/80 border-2 border-transparent focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100/50 outline-none transition-all font-medium text-zinc-900 placeholder:text-zinc-400 resize-none"
              placeholder="Nhập Mô Tả Chi Tiết Vấn Đề Của Bạn Vào Đây, Càng Nhiều Thông Tin Càng Tốt Cho Chúng Tôi Để Có Thể Hỗ Trợ Bạn Tốt Hơn!"
            ></textarea>
          </div>

          {error && (
            <p className="text-rose-500 font-bold bg-rose-50 px-4 py-3 rounded-xl text-center text-sm">{error}</p>
          )}

           <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 disabled:transform-none"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Đang bắt đầu gửi...</>
            ) : (
              <>{buttonText} <Send className="w-5 h-5 ml-1" /></>
            )}
          </button>
          <p className="text-xs font-medium text-zinc-400 text-center mt-4">
            Bằng việc gửi thông tin, bạn đồng ý với Chính sách bảo mật của chúng tôi.
          </p>
        </form>
      )}
    </motion.div>
  );
}
