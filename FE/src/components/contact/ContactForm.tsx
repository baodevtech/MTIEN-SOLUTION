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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
    >
      <h2 className="text-3xl font-bold text-slate-900 mb-2">{formTitle}</h2>
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
            {successMessage}
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
                name="name"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Nguyễn Văn A"
              />
            </div>
            {showPhoneField && (
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                Số điện thoại *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="09xx xxx xxx"
              />
            </div>
            )}
          </div>

          {showCompanyField && (
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-semibold text-slate-700">
              Công ty
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Tên công ty"
            />
          </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="email@domain.com"
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
            <label htmlFor="message" className="text-sm font-semibold text-slate-700">
              Nội dung tin nhắn *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              placeholder="Mô tả chi tiết yêu cầu của bạn..."
            ></textarea>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 disabled:transform-none"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Đang gửi...</>
            ) : (
              <>{buttonText} <Send className="w-5 h-5" /></>
            )}
          </button>
          <p className="text-xs text-slate-400 text-center mt-4">
            Bằng việc gửi thông tin, bạn đồng ý với Chính sách bảo mật của chúng tôi.
          </p>
        </form>
      )}
    </motion.div>
  );
}
