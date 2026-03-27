'use client';

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold tracking-wider mb-6 border border-orange-100">
              LIÊN HỆ VỚI CHÚNG TÔI
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Sẵn sàng hợp tác cùng <span className="text-blue-600">TechNova</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Hãy để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Thông Tin Liên Hệ</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Trụ sở chính</h3>
                    <p className="text-slate-600 leading-relaxed">Tầng 12, Tòa nhà Tech, 123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Điện thoại</h3>
                    <p className="text-slate-600 leading-relaxed">Hotline: 0123 456 789<br />Hỗ trợ kỹ thuật: 0987 654 321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600 leading-relaxed">Tư vấn: contact@technova.vn<br />Tuyển dụng: hr@technova.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Giờ làm việc</h3>
                    <p className="text-slate-600 leading-relaxed">Thứ 2 - Thứ 6: 08:00 - 17:30<br />Thứ 7: 08:00 - 12:00</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400">
                  <MapPin className="w-10 h-10 mb-2 opacity-50" />
                  <span className="font-medium">Bản đồ Google Maps</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Gửi Tin Nhắn</h2>
              <p className="text-slate-500 mb-8">Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24h làm việc.</p>

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
                  <p className="text-slate-600 mb-6">Cảm ơn bạn đã liên hệ. Đội ngũ TechNova sẽ sớm gọi lại cho bạn.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                  >
                    Gửi tin nhắn khác
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-700">Họ và tên *</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Số điện thoại *</label>
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
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-semibold text-slate-700">Dịch vụ quan tâm</label>
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
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700">Nội dung tin nhắn *</label>
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

          </div>
        </div>
      </section>
    </div>
  );
}
