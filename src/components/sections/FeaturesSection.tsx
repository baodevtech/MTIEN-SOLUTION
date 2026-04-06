'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Monitor, Zap, BarChart3, Megaphone, CheckCircle2, Globe, Smartphone, Shield, Code,
  ArrowRight, LayoutTemplate, RefreshCw, Users, Target, Search, TrendingUp, DollarSign, Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const featuresData = [
  {
    id: 'giao-dien',
    tab: { label: '+400 Giao diện', icon: Monitor },
    content: {
      badge: 'Cập nhật thư viện mỗi tuần',
      title: 'Thiết kế tinh tế, chuẩn UX/UI',
      desc: 'Sở hữu kho giao diện khổng lồ được thiết kế bởi chuyên gia. Cấu trúc chuẩn SEO giúp website dễ dàng leo top Google ngay từ khi khởi chạy.',
      // Đổi sang dải gradient đậm, sắc nét để nổi bật trên nền sáng
      iconGradients: ['from-blue-500 to-cyan-400', 'from-violet-500 to-fuchsia-400', 'from-emerald-500 to-teal-400', 'from-rose-500 to-orange-400'],
      features: [
        { icon: Globe, title: 'Chuẩn SEO Core', desc: 'Sitemap tự động, thẻ meta tối ưu.' },
        { icon: Smartphone, title: 'Mobile First', desc: 'Trải nghiệm hoàn hảo trên điện thoại.' },
        { icon: Shield, title: 'Bảo mật SSL', desc: 'Chứng chỉ SSL miễn phí, mã hóa dữ liệu.' },
        { icon: Code, title: 'Code sạch, nhẹ', desc: 'Minify HTML/CSS/JS tự động.' },
      ],
      mockupType: 'ui_light'
    }
  },
  {
    id: 'toc-do',
    tab: { label: 'Tốc độ tối đa', icon: Zap },
    content: {
      badge: 'Băng thông không giới hạn',
      title: 'Load dưới 1 giây, Core Web Vitals xanh',
      desc: 'Hệ thống hạ tầng đám mây mạnh mẽ kết hợp CDN toàn cầu giúp website của bạn tải trang chớp mắt, giữ chân khách hàng hiệu quả.',
      iconGradients: ['from-orange-500 to-amber-400', 'from-teal-500 to-emerald-400', 'from-pink-500 to-rose-400', 'from-blue-600 to-sky-400'],
      features: [
        { icon: Zap, title: 'Thời gian phản hồi', desc: 'Chỉ số LCP luôn dưới mức lý tưởng.' },
        { icon: LayoutTemplate, title: 'Lazy Load', desc: 'Tự động tải ảnh, video khi lướt đến.' },
        { icon: Code, title: 'Tối ưu ảnh WebP', desc: 'Tự nén và chuyển đổi định dạng ảnh.' },
        { icon: RefreshCw, title: 'Smart Cache', desc: 'Hệ thống cache đa tầng cực thông minh.' },
      ],
      mockupType: 'speed_light'
    }
  },
  {
    id: 'bao-cao',
    tab: { label: 'Báo cáo Data', icon: BarChart3 },
    content: {
      badge: 'AI Tracking & Phân tích',
      title: 'Thấu hiểu khách hàng qua từng cú click',
      desc: 'Theo dõi chi tiết mọi chỉ số kinh doanh qua hệ thống báo cáo trực quan. Dễ dàng nắm bắt hành vi người dùng để tối ưu tỷ lệ chuyển đổi.',
      iconGradients: ['from-indigo-500 to-blue-400', 'from-purple-500 to-violet-400', 'from-cyan-500 to-sky-400', 'from-emerald-500 to-green-400'],
      features: [
        { icon: BarChart3, title: 'Báo cáo Realtime', desc: 'Dữ liệu traffic cập nhật từng giây.' },
        { icon: Target, title: 'Phễu chuyển đổi', desc: 'Đo lường chi tiết các bước mua hàng.' },
        { icon: Users, title: 'Phân loại User', desc: 'Nhận diện tệp khách hàng tiềm năng.' },
        { icon: Search, title: 'Báo cáo nguồn', desc: 'Traffic đến từ Google, Facebook, Ads.' },
      ],
      mockupType: 'data_light'
    }
  },
  {
    id: 'marketing',
    tab: { label: 'Marketing', icon: Megaphone },
    content: {
      badge: 'Automation & CRM',
      title: 'Công cụ thúc đẩy doanh số mạnh mẽ',
      desc: 'Tích hợp sẵn các giải pháp nuôi dưỡng khách hàng tự động (Email, SMS Marketing), quản lý khách hàng (CRM) ngay trên một nền tảng duy nhất.',
      iconGradients: ['from-rose-500 to-pink-400', 'from-violet-500 to-purple-400', 'from-blue-500 to-cyan-400', 'from-emerald-600 to-teal-400'],
      features: [
        { icon: Megaphone, title: 'Email Marketing', desc: 'Gửi hàng ngàn email chăm sóc tự động.' },
        { icon: Target, title: 'Khuyến mãi động', desc: 'Tạo mã giảm giá theo kịch bản thông minh.' },
        { icon: Users, title: 'Quản lý CRM', desc: 'Quản lý tập trung mọi điểm chạm khách hàng.' },
        { icon: BarChart3, title: 'Đo lường ROI', desc: 'Đánh giá chính xác hiệu quả từng chiến dịch.' },
      ],
      mockupType: 'marketing_light'
    }
  }
];

export default function FeaturesSection() {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  const activeData = featuresData[activeTab].content;

  // Cinematic Light Background Animation (Aurora Effect)
  const auroraVariants = {
    animate: { 
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 15, repeat: Infinity, ease: 'linear' as const } 
    }
  };

  return (
    // Nền sáng (Light Theme) với màu bạc tinh tế chuẩn Apple (off-white/silver)
    <section className="bg-[#F5F5F7] py-20 md:py-28 relative -mt-8 z-10 overflow-hidden font-sans" aria-label="Tính năng nổi bật">
      
      {/* Cinematic Aurora Lights - Ánh sáng cực quang tán xạ (mix-blend-multiply để màu hoà quyện mượt trên nền sáng) */}
      {!reduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 mix-blend-multiply" aria-hidden="true">
          <motion.div variants={auroraVariants} animate="animate" className="absolute top-[-10%] left-[10%] w-[40vw] h-[40vw] bg-blue-300/40 rounded-full blur-[100px]"></motion.div>
          <motion.div variants={auroraVariants} animate="animate" className="absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vw] bg-rose-200/40 rounded-full blur-[120px] animation-delay-2000"></motion.div>
          <motion.div variants={auroraVariants} animate="animate" className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] bg-violet-300/30 rounded-full blur-[90px] animation-delay-4000"></motion.div>
        </div>
      )}

      <div className="max-w-[1300px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
      

        {/* Apple-style Segmented Control - Light Glassmorphism */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 bg-white/50 backdrop-blur-2xl rounded-full border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-x-auto scrollbar-hide max-w-full">
            {featuresData.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors whitespace-nowrap outline-none tracking-tight ${
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  {isActive && (
                    <motion.div
                      layoutId="appleTabIndicatorLight"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-slate-100"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.tab.icon size={16} className={isActive ? 'text-blue-600' : ''} strokeWidth={isActive ? 2 : 1.5} />
                    {item.tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Card - Frosted Glass (Kính mờ xuyên thấu) */}
        <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 lg:p-16 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.07)] relative overflow-hidden ring-1 ring-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 15, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, y: -15, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            >
              
              {/* Left Column: Text Content */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50/80 text-blue-700 rounded-full text-[12px] font-semibold mb-6 w-max border border-blue-100/50 shadow-sm tracking-tight">
                  <CheckCircle2 size={14} className="text-blue-600" /> 
                  {activeData.badge}
                </div>
                
                <h3 className="text-[28px] md:text-[38px] font-bold text-slate-900 mb-5 leading-[1.15] tracking-tight">
                  {activeData.title}
                </h3>
                
                <p className="text-slate-500 text-[16px] mb-10 leading-relaxed font-normal tracking-tight">
                  {activeData.desc}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-9 gap-x-6 mb-12">
                  {activeData.features.map((feature, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={`mt-0.5 w-10 h-10 rounded-2xl bg-gradient-to-br ${activeData.iconGradients[i]} flex items-center justify-center text-white shrink-0 shadow-md shadow-slate-200 ring-4 ring-white/50`}>
                        <feature.icon size={18} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-[15px] mb-1 tracking-tight">{feature.title}</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed tracking-tight">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="group bg-[#1D1D1F] hover:bg-[#000000] text-white rounded-full px-9 py-4 text-[15px] font-semibold transition-all flex items-center justify-center gap-2 w-max shadow-xl shadow-slate-900/10">
                  Khám phá chi tiết 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right Column: Mac Mockup & Cinematic Light Floating UI */}
              <div className="lg:col-span-7 relative w-full h-full min-h-[350px] md:min-h-[500px]">
                
                {/* Floating UI Elements - Glassmorphism Light */}
                {!reduced && (
                  <>
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 right-[10%] bg-white/80 backdrop-blur-xl p-3.5 rounded-2xl shadow-[0_15px_30px_rgb(0,0,0,0.08)] border border-white z-30 flex items-center gap-2.5 text-slate-800 text-sm font-semibold">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><TrendingUp size={14} /></div>
                      Tăng trưởng +24%
                    </motion.div>
                    
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -bottom-8 left-[5%] bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_20px_40px_rgb(0,0,0,0.12)] border border-white z-30 flex items-center gap-3.5 text-slate-900">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-inner"><DollarSign size={20} /></div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Doanh thu hôm nay</p>
                        <p className="text-xl font-bold tracking-tight">45.2M <span className="text-xs text-slate-400 font-medium">VNĐ</span></p>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Light macOS Window Frame */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_20px_40px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
                  
                  {/* Traffic Lights Header */}
                  <div className="h-12 w-full bg-white/60 backdrop-blur-md border-b border-slate-900/5 flex items-center px-4 gap-2 z-20">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/20 shadow-sm"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/20 shadow-sm"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/20 shadow-sm"></div>
                    </div>
                  </div>

                  {/* Image/Mockup Content Container */}
                  <div className="relative flex-1 w-full bg-[#F5F5F7] p-2 overflow-hidden">
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-900/5 shadow-inner bg-white">
                      <Image
                        src={`https://picsum.photos/seed/light_cinematic_${activeData.mockupType}/1000/700`}
                        alt={activeData.title}
                        fill
                        className="object-cover object-left-top pt-4 opacity-100 transition-transform duration-[1.5s] ease-out hover:scale-[1.04]"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                      />
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
}