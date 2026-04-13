'use client';

/**
 * SoftwarePricing - Bảng giá dịch vụ phần mềm với 3 gói: Khởi Nghiệp, Tăng Trưởng, Chuyên Sâu
 * Bao gồm dải tính năng Enterprise chung ở cuối.
 */

import { motion } from 'motion/react';
import { ArrowRight, Zap, Check, X, Clock, Shield, Lock, Server, LifeBuoy } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

export default function SoftwarePricing() {
  return (
    <section className="py-[40px] md:py-[60px] lg:py-[80px] flex flex-col justify-center min-h-0 md:min-h-[calc(100vh-80px)] bg-[#F8FAFC] relative overflow-hidden z-10 border-t border-[#E8EDFA]">
      
      {/* Background Ambient Gradient */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[500px] rounded-full opacity-40 blur-[120px] pointer-events-none mix-blend-multiply"
          style={{ background: 'radial-gradient(circle, rgba(16,83,243,0.15) 0%, rgba(6,17,83,0.05) 50%, transparent 100%)' }}>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-[24px] md:mb-[40px]">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-blue-100 shadow-sm mb-3 md:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1053F3] animate-pulse"></span>
            <span className="text-[#1053F3] font-bold text-[10px] md:text-[11px] uppercase tracking-widest">Đầu Tư Thông Minh</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true }} className="text-[26px] md:text-3xl md:text-5xl font-black text-[#061153] leading-tight tracking-tighter drop-shadow-sm">
            Bảng Giá Dịch Vụ
          </motion.h2>
        </div>

        {/* UNIFIED PRICING BOARD */}
        <motion.div 
          variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-2xl rounded-[24px] md:rounded-[40px] p-2 md:p-2.5 md:p-3 shadow-[0_40px_100px_rgba(6,17,83,0.08)] border border-white relative flex flex-col"
        >
          {/* 3 Pricing Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-2.5 flex-1">
            
            {/* GÓI 1: KHỞI NGHIỆP */}
            <div className="bg-white rounded-2xl md:rounded-[32px] p-5 md:p-[32px] flex flex-col h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100">
              <div className="mb-4 md:mb-6">
                <h5 className="text-[11px] md:text-[12px] font-extrabold text-slate-400 mb-1.5 md:mb-2 uppercase tracking-widest">Khởi Nghiệp</h5>
                <h2 className="text-[26px] md:text-[32px] font-black text-[#061153] leading-none tracking-tight mb-2 md:mb-3">Web Cơ Bản</h2>
                <p className="text-slate-500 text-[13px] md:text-[14px] font-medium leading-relaxed min-h-0 md:min-h-[42px]">Dành cho cá nhân, cửa hàng nhỏ cần xây dựng thương hiệu online chuyên nghiệp.</p>
              </div>

              <div className="flex items-center gap-2 mb-4 md:mb-6 px-3 py-2 bg-slate-50 rounded-lg text-[12px] md:text-[13px] font-semibold text-slate-600 border border-slate-100">
                <Clock size={14} className="text-[#1053F3]" /> Triển khai: <span className="text-[#061153]">2 - 4 tuần</span>
              </div>
              
              <ul className="space-y-[10px] md:space-y-[14px] mb-6 md:mb-8 flex-1">
                {[
                  { text: 'Website chuẩn SEO (Score 90+)', active: true },
                  { text: 'Responsive mượt mà (Mobile-First)', active: true },
                  { text: 'Hosting tiêu chuẩn (1 Năm)', active: true },
                  { text: 'Thiết kế Mobile App (Native)', active: false },
                  { text: 'Hệ thống Quản trị Doanh nghiệp (ERP)', active: false },
                ].map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 md:gap-3 text-[13px] md:text-[14px] ${item.active ? 'text-slate-700 font-semibold' : 'text-slate-400 font-medium'}`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.active ? 'bg-blue-50 text-[#1053F3]' : 'bg-slate-50 text-slate-300'}`}>
                      {item.active ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
                    </div>
                    <span className="leading-tight">{item.text}</span>
                  </li>
                ))}
              </ul>

              <a href="#lien-he" className="w-full py-3 md:py-3.5 rounded-[12px] md:rounded-[16px] font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-[#F4F7FF] text-[#061153] border border-blue-100/50 hover:bg-[#061153] hover:text-white group text-[13px] md:text-[14px]">
                Yêu cầu báo giá <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* GÓI 2: TĂNG TRƯỢNG (HIGHLIGHT - METALLIC DARK) */}
            <div className="bg-gradient-to-b from-[#061153] to-[#111A3A] rounded-2xl md:rounded-[32px] p-5 md:p-[32px] flex flex-col h-full relative overflow-hidden shadow-[0_20px_50px_rgba(6,17,83,0.4)] border border-[#1053F3]/50 z-10 transform lg:scale-[1.03]">
              
              {/* Glow & Texture */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#1053F3]/30 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
              
              {/* Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1053F3] to-[#5080FF] text-white px-4 py-1.5 rounded-b-[12px] text-[10px] font-black uppercase tracking-widest shadow-[0_5px_15px_rgba(16,83,243,0.4)] flex items-center gap-1.5 z-10">
                <Zap size={12} className="fill-white" /> Phổ biến nhất
              </div>

              <div className="mb-4 md:mb-6 relative z-10 mt-3">
                <h5 className="text-[11px] md:text-[12px] font-extrabold text-[#5080FF] mb-1.5 md:mb-2 uppercase tracking-widest">Tăng Trưởng</h5>
                <h2 className="text-[28px] md:text-[36px] font-black text-white leading-none tracking-tighter mb-2 md:mb-3 drop-shadow-md">Web + App</h2>
                <p className="text-slate-300 text-[13px] md:text-[14px] font-medium leading-relaxed min-h-0 md:min-h-[42px]">Doanh nghiệp SME cần hệ sinh thái đa kênh, đồng bộ dữ liệu Real-time.</p>
              </div>

              <div className="flex items-center gap-2 mb-4 md:mb-6 px-3 py-2 bg-white/10 rounded-lg text-[12px] md:text-[13px] font-semibold text-white border border-white/10 backdrop-blur-sm relative z-10">
                <Clock size={14} className="text-[#5080FF]" /> Triển khai: <span className="text-white">4 - 8 tuần</span>
              </div>
              
              <ul className="space-y-[10px] md:space-y-[14px] mb-6 md:mb-8 flex-1 relative z-10">
                {[
                  { text: 'Mọi tính năng từ Gói Khởi Nghiệp', active: true },
                  { text: 'Thiết kế App iOS/Android (Flutter/React Native)', active: true },
                  { text: 'API đồng bộ dữ liệu bảo mật (OAuth 2.0)', active: true },
                  { text: 'Tích hợp cổng thanh toán (VNPay, Momo, Stripe)', active: true },
                  { text: 'Hệ thống Quản trị Doanh nghiệp (ERP)', active: false },
                ].map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 md:gap-3 text-[13px] md:text-[14px] ${item.active ? 'text-white font-semibold' : 'text-slate-400 font-medium'}`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.active ? 'bg-[#1053F3] text-white shadow-[0_0_12px_rgba(16,83,243,0.8)]' : 'bg-white/10 text-slate-500'}`}>
                      {item.active ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
                    </div>
                    <span className="leading-tight">{item.text}</span>
                  </li>
                ))}
              </ul>

              <a href="#lien-he" className="relative z-10 w-full py-3 md:py-3.5 rounded-[12px] md:rounded-[16px] font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-[#1053F3] text-white hover:bg-white hover:text-[#061153] shadow-[0_10px_20px_rgba(16,83,243,0.4)] group text-[13px] md:text-[14px]">
                Bắt đầu dự án <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* GÓI 3: CHUYÊN SÂU */}
            <div className="bg-white rounded-2xl md:rounded-[32px] p-5 md:p-[32px] flex flex-col h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100">
              <div className="mb-4 md:mb-6">
                <h5 className="text-[11px] md:text-[12px] font-extrabold text-slate-400 mb-1.5 md:mb-2 uppercase tracking-widest">Chuyên Sâu</h5>
                <h2 className="text-[26px] md:text-[32px] font-black text-[#061153] leading-none tracking-tight mb-2 md:mb-3">Custom ERP</h2>
                <p className="text-slate-500 text-[13px] md:text-[14px] font-medium leading-relaxed min-h-0 md:min-h-[42px]">Tập đoàn, hệ thống chuỗi cần phần mềm đặc thù & chuyển đổi số toàn diện.</p>
              </div>

              <div className="flex items-center gap-2 mb-4 md:mb-6 px-3 py-2 bg-slate-50 rounded-lg text-[12px] md:text-[13px] font-semibold text-slate-600 border border-slate-100">
                <Clock size={14} className="text-[#1053F3]" /> Triển khai: <span className="text-[#061153]">Theo từng Sprint</span>
              </div>
              
              <ul className="space-y-[10px] md:space-y-[14px] mb-6 md:mb-8 flex-1">
                {[
                  { text: 'Phân tích & thiết kế kiến trúc Server lớn', active: true },
                  { text: 'Phần mềm nghiệp vụ Custom theo yêu cầu', active: true },
                  { text: 'Hạ tầng Auto-scaling & Load Balancing', active: true },
                  { text: 'Cam kết SLA 99.99% & Hỗ trợ 24/7', active: true },
                  { text: 'Bàn giao 100% Source Code & IP', active: true },
                ].map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 md:gap-3 text-[13px] md:text-[14px] ${item.active ? 'text-slate-700 font-semibold' : 'text-slate-400 font-medium'}`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.active ? 'bg-blue-50 text-[#1053F3]' : 'bg-slate-50 text-slate-300'}`}>
                      {item.active ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
                    </div>
                    <span className="leading-tight">{item.text}</span>
                  </li>
                ))}
              </ul>

              <a href="#lien-he" className="w-full py-3.5 rounded-[16px] font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-[#F4F7FF] text-[#061153] border border-blue-100/50 hover:bg-[#061153] hover:text-white group text-[14px]">
                Tư vấn chuyên sâu <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* GLOBAL ENTERPRISE FEATURES STRIP (New Element) */}
          <div className="mt-2 md:mt-2.5 bg-slate-50/80 backdrop-blur-md border border-slate-200 rounded-2xl md:rounded-[24px] p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-2.5 text-[#061153] font-bold text-[13px] md:text-[14px]">
              <Shield size={18} className="text-[#1053F3]" />
              Mọi dự án đều bao gồm tiêu chuẩn Enterprise:
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
              <div className="flex items-center gap-1.5 text-slate-600 text-[13px] font-semibold">
                <Lock size={14} className="text-slate-400" /> Miễn phí SSL & WAF
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 text-[13px] font-semibold">
                <Server size={14} className="text-slate-400" /> Backup dữ liệu tự động
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 text-[13px] font-semibold">
                <LifeBuoy size={14} className="text-slate-400" /> Support Kỹ thuật 24/7
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
