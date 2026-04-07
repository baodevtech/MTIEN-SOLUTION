'use client';

/**
 * SoftwareEcosystem - Hệ sinh thái dịch vụ phần mềm với tab tương tác và auto-play
 * Bao gồm ecosystemData (8 mục), trạng thái activeService, isHovered,
 * auto-play interval, và AnimatePresence cho chuyển đổi nội dung.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Layers, Globe, Smartphone, Users, ShieldCheck, Sparkles, Cloud, Check, Cpu, BarChart3, Server, Activity } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

const fadeInRightBig = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

const ecosystemData = [
  {
    id: 0, label: "Web App", title: "Web Applications & Portals",
    desc: "Xây dựng nền tảng web hiệu năng cao, tối ưu trải nghiệm người dùng (UX) trên mọi thiết bị. Kiến trúc chuẩn SEO, tốc độ tải trang cực nhanh (<2.5s) vươn tầm quốc tế.",
    features: ['Kiến trúc Next.js SSR / SSG', 'Giao diện Responsive linh hoạt', 'Tối ưu hóa Core Web Vitals', 'Tích hợp Headless CMS', 'Hệ thống Quản trị (CMS) riêng'],
    techs: ['Next.js', 'React', 'Tailwind', 'Figma'],
    icon: <Globe size={22} />, color: "blue", hex: "#3B82F6", bg: "bg-blue-50 text-blue-600"
  },
  {
    id: 1, label: "Mobile", title: "Native & Cross-Platform Apps",
    desc: "Mang ứng dụng của bạn lên App Store và Google Play với giao diện vuốt chạm mượt mà (60fps). Đồng bộ hóa dữ liệu thời gian thực và trải nghiệm native hoàn hảo.",
    features: ['Hiệu năng như ứng dụng Native', 'Tích hợp Push Notification', 'Chế độ Offline thông minh', 'Đồng bộ hóa Real-time', 'Bảo mật dữ liệu người dùng'],
    techs: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
    icon: <Smartphone size={22} />, color: "purple", hex: "#A855F7", bg: "bg-purple-50 text-purple-600"
  },
  {
    id: 2, label: "ERP/CRM", title: "Hệ thống Quản trị Doanh nghiệp",
    desc: "Số hóa và tự động hóa các quy trình vận hành rườm rà. Tập trung dữ liệu, xóa bỏ silo phòng ban và tăng cường khả năng ra quyết định dựa trên dữ liệu thực tế.",
    features: ['Quản lý luồng việc tự động', 'Báo cáo thống kê trực quan', 'Phân quyền bảo mật đa tầng', 'Tích hợp chữ ký số', 'Quản lý Kho & Chuỗi cung ứng'],
    techs: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis'],
    icon: <Layers size={22} />, color: "orange", hex: "#F97316", bg: "bg-orange-50 text-orange-600"
  },
  {
    id: 3, label: "API Cloud", title: "Tích hợp API & Hạ tầng Cloud",
    desc: "Xây dựng hạ tầng dữ liệu liền mạch, kết nối các dịch vụ bên thứ ba an toàn, độ trễ thấp. Sẵn sàng tự động mở rộng (Auto-scaling) khi lưu lượng truy cập tăng cao.",
    features: ['Kiến trúc Microservices', 'Bảo mật chuẩn OAuth 2.0', 'Tự động mở rộng linh hoạt', 'Cân bằng tải (Load Balancing)', 'Giám sát hệ thống (Monitoring)'],
    techs: ['RESTful', 'GraphQL', 'AWS', 'Docker'],
    icon: <Cloud size={22} />, color: "cyan", hex: "#06B6D4", bg: "bg-cyan-50 text-cyan-600"
  },
  {
    id: 4, label: "Dedicated", title: "Đội ngũ Kỹ sư Dedicated",
    desc: "Bổ sung nguồn lực công nghệ chất lượng cao, hòa nhập nhanh chóng vào văn hóa doanh nghiệp. Cam kết tiến độ và chất lượng sản phẩm theo từng Sprint linh hoạt.",
    features: ['Kiểm soát chất lượng QA/QC', 'Cam kết tiến độ Agile/Scrum', 'Hỗ trợ kỹ thuật dài hạn', 'Bảo mật NDA tuyệt đối', 'Quản lý dự án chuyên nghiệp'],
    techs: ['Agile', 'Scrum', 'Jira', 'CI/CD'],
    icon: <Users size={22} />, color: "pink", hex: "#EC4899", bg: "bg-pink-50 text-pink-600"
  },
  {
    id: 5, label: "Security", title: "Bảo mật & DevSecOps",
    desc: "Bảo vệ hệ thống và dữ liệu khách hàng với các lớp bảo mật tiên tiến. Giám sát chủ động và ngăn chặn tấn công mạng 24/7 theo tiêu chuẩn ISO 27001.",
    features: ['Chống tấn công DDoS / WAF', 'Sao lưu dữ liệu tự động', 'Quét lỗ hổng định kỳ (Pen Test)', 'Mã hóa dữ liệu End-to-End', 'Quản lý định danh (IAM)'],
    techs: ['Cloudflare', 'Kubernetes', 'Linux', 'Datadog'],
    icon: <ShieldCheck size={22} />, color: "emerald", hex: "#10B981", bg: "bg-emerald-50 text-emerald-600"
  },
  {
    id: 6, label: "AI & ML", title: "AI & Machine Learning Integration",
    desc: "Ứng dụng trí tuệ nhân tạo để tự động hóa quy trình, chatbot thông minh và phân tích hành vi người dùng, tạo lợi thế cạnh tranh đột phá cho doanh nghiệp.",
    features: ['Tích hợp LLMs (GPT/Gemini)', 'Chatbot CSKH 24/7 tự động', 'Nhận diện hình ảnh/giọng nói', 'Mô hình dự báo xu hướng', 'Cá nhân hóa trải nghiệm'],
    techs: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API'],
    icon: <Cpu size={22} />, color: "indigo", hex: "#6366F1", bg: "bg-indigo-50 text-indigo-600"
  },
  {
    id: 7, label: "Data & BI", title: "Data Analytics & Business Intelligence",
    desc: "Khai thác sức mạnh của dữ liệu lớn (Big Data). Cung cấp các Dashboard quản trị trực quan theo thời gian thực giúp ban lãnh đạo ra quyết định chính xác.",
    features: ['Data Warehouse & Data Lake', 'ETL Data Pipeline', 'Dashboard BI Real-time', 'Phân tích Cohort', 'Báo cáo tự động'],
    techs: ['PowerBI', 'Tableau', 'Metabase', 'Snowflake'],
    icon: <BarChart3 size={22} />, color: "rose", hex: "#F43F5E", bg: "bg-rose-50 text-rose-600"
  }
];

export default function SoftwareEcosystem() {
  const [activeService, setActiveService] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const AUTO_PLAY_DURATION = 4000;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveService((prev) => (prev + 1) % ecosystemData.length);
    }, AUTO_PLAY_DURATION);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="py-[60px] lg:py-[80px] flex flex-col justify-center min-h-[calc(100vh-100px)] bg-white relative overflow-hidden border-b border-[#E8EDFA]">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-[40px] lg:mb-[50px]">
          <motion.span variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-bold text-[12px] tracking-[0.15em] uppercase mb-3 block text-slate-400">
            Ecosystem
          </motion.span>
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-[#061153] leading-tight tracking-tight">
            Giải Pháp Phần Mềm <br /> Toàn Diện & Chuyên Sâu
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-[40px] items-stretch"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
        >
          {/* LEFT: Tab Navigation - Dynamic Colors */}
          <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 flex flex-col gap-1.5 justify-between">
            {ecosystemData.map((node, i) => {
              const isActive = activeService === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveService(i)}
                  className="flex items-center gap-3 w-full p-2.5 md:p-3 rounded-[16px] transition-all duration-300 text-left group border"
                  style={{
                    backgroundColor: isActive ? node.hex : 'transparent',
                    borderColor: isActive ? node.hex : 'transparent',
                    boxShadow: isActive ? `0 8px 25px ${node.hex}40` : 'none',
                  }}
                >
                  {/* Icon Box */}
                  <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : `${node.hex}15`,
                      color: isActive ? '#ffffff' : node.hex
                    }}
                  >
                    {React.cloneElement(node.icon as React.ReactElement<{size?: number}>, { size: 18 })}
                  </div>
                  
                  {/* Label */}
                  <span className="font-bold text-[15px] md:text-[16px] tracking-tight group-hover:translate-x-1 transition-transform"
                    style={{ color: isActive ? '#ffffff' : '#64748B' }}
                  >
                    {node.label}
                  </span>
                  
                  {/* Arrow */}
                  {isActive && (
                    <motion.div layoutId="activeTabIndicator" className="ml-auto text-white">
                      <ArrowRight size={16} />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* RIGHT: Active Content Card - Dynamic Bento Grid */}
          <motion.div variants={fadeInRightBig} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 flex flex-col">
            
            <div className="bg-[#F8FAFC] rounded-[24px] md:rounded-[32px] p-[24px] md:p-[36px] relative overflow-hidden flex flex-col flex-1 transition-all duration-500 border shadow-[0_15px_40px_rgba(6,17,83,0.03)] z-10"
                 style={{ borderColor: `${ecosystemData[activeService].hex}25` }}>
              
              {/* 1. Dynamic Background Glow */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[32px]">
                <motion.div 
                  key={`glow-${activeService}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.12, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full blur-[80px]"
                  style={{ backgroundColor: ecosystemData[activeService].hex }}
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
              </div>

              {/* 2. Top Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-slate-200/50 z-20">
                <motion.div
                  key={`progress-${activeService}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "0%" : "100%" }}
                  transition={{ duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                  className="h-full shadow-sm"
                  style={{ backgroundColor: ecosystemData[activeService].hex, boxShadow: `0 0 10px ${ecosystemData[activeService].hex}80` }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 15 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(6px)", y: -15 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                  className="flex flex-col h-full relative z-10"
                >
                  {/* Header: Status Badge & Title */}
                  <div className="mb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border shadow-sm"
                           style={{ borderColor: `${ecosystemData[activeService].hex}30` }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ecosystemData[activeService].hex }}></span>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: ecosystemData[activeService].hex }}>
                          Node 0{activeService + 1}
                        </span>
                      </div>
                      <span className="text-slate-400 font-semibold text-[12px] tracking-wider uppercase">— {ecosystemData[activeService].label}</span>
                    </div>
                    
                    <h3 className="text-[28px] md:text-[36px] font-extrabold text-[#061153] leading-[1.15] tracking-tight mb-3">
                      {ecosystemData[activeService].title}
                    </h3>
                    
                    <p className="text-slate-500 text-[15px] md:text-[16px] leading-[1.5] font-medium max-w-[95%]">
                      {ecosystemData[activeService].desc}
                    </p>
                  </div>

                  {/* Bento Grid Content */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    
                    {/* Box 1: Core Features */}
                    <div className="md:col-span-3 bg-white rounded-[20px] p-4 md:p-5 shadow-sm border flex flex-col justify-center transition-all duration-300 hover:shadow-md"
                         style={{ borderColor: `${ecosystemData[activeService].hex}15` }}>
                      <h4 className="font-extrabold text-[#061153] mb-3.5 text-[15px] flex items-center gap-2">
                        <Sparkles size={16} style={{ color: ecosystemData[activeService].hex }} />
                        Năng lực triển khai
                      </h4>
                      <ul className="space-y-2.5">
                        {ecosystemData[activeService].features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border"
                                 style={{ backgroundColor: `${ecosystemData[activeService].hex}15`, borderColor: `${ecosystemData[activeService].hex}30` }}>
                              <Check size={12} strokeWidth={3} style={{ color: ecosystemData[activeService].hex }} />
                            </div>
                            <span className="text-slate-700 font-semibold text-[14px] leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Box 2 & 3: Tech Stack & Metrics */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                      
                      {/* Box 2: Tech Stack */}
                      <div className="bg-white rounded-[20px] p-4 shadow-sm border flex-1 flex flex-col justify-center transition-all duration-300 hover:shadow-md"
                           style={{ borderColor: `${ecosystemData[activeService].hex}15` }}>
                        <h4 className="font-extrabold text-[#061153] mb-3 text-[14px] flex items-center gap-1.5">
                          <Layers size={16} style={{ color: ecosystemData[activeService].hex }} />
                          Công nghệ
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {ecosystemData[activeService].techs.map((tech, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-md text-[12px] font-bold border"
                                  style={{ 
                                    color: ecosystemData[activeService].hex, 
                                    backgroundColor: `${ecosystemData[activeService].hex}10`,
                                    borderColor: `${ecosystemData[activeService].hex}25` 
                                  }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Box 3: Enterprise SLA - Phối màu đơn sắc (Monochromatic Harmony) */}
                      <div className="rounded-[20px] p-4 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-center border transition-all duration-500 hover:shadow-md"
                           style={{ 
                             background: `linear-gradient(135deg, ${ecosystemData[activeService].hex}15 0%, #ffffff 100%)`,
                             borderColor: `${ecosystemData[activeService].hex}30` 
                           }}>
                        {/* Decorative Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-40 transition-colors duration-500" 
                             style={{ backgroundColor: ecosystemData[activeService].hex, transform: 'translate(20%, -30%)' }}></div>
                        
                        <h4 className="font-extrabold mb-3 text-[11px] uppercase tracking-widest flex items-center gap-1.5 relative z-10"
                            style={{ color: ecosystemData[activeService].hex }}>
                          <Activity size={14} strokeWidth={2.5} /> Tiêu chuẩn Enterprise
                        </h4>
                        
                        <div className="space-y-3 relative z-10">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 font-semibold text-[13px] flex items-center gap-1.5">
                              <Server size={14} style={{ color: ecosystemData[activeService].hex }}/> Uptime SLA
                            </span>
                            <span className="font-extrabold text-[14px] text-[#061153]">99.99%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full overflow-hidden"
                               style={{ backgroundColor: `${ecosystemData[activeService].hex}20` }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: "99%" }} transition={{ duration: 1, delay: 0.2 }} 
                                        className="h-full rounded-full"
                                        style={{ 
                                          background: `linear-gradient(90deg, ${ecosystemData[activeService].hex}60 0%, ${ecosystemData[activeService].hex} 100%)`,
                                          boxShadow: `0 0 10px ${ecosystemData[activeService].hex}50` 
                                        }}>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="mt-auto flex items-center justify-between border-t border-slate-200/60 pt-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((num) => (
                        <img key={num} src={`https://inotek.themevally.com/wp-content/uploads/2025/11/social-img0${num}.webp`} alt="team" className="w-8 h-8 rounded-full border-[1.5px] border-white object-cover shadow-sm" />
                      ))}
                      <div className="w-8 h-8 rounded-full border-[1.5px] border-white bg-white flex items-center justify-center text-[9px] font-bold shadow-sm"
                           style={{ color: ecosystemData[activeService].hex }}>
                        +20 Dev
                      </div>
                    </div>
                    
                    <a href="#lien-he" className="group flex items-center gap-2 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[13px] md:text-[14px] font-bold transition-all duration-300 hover:-translate-y-0.5"
                       style={{ 
                         backgroundColor: ecosystemData[activeService].hex, 
                         boxShadow: `0 10px 25px ${ecosystemData[activeService].hex}40` 
                       }}>
                      Phân tích dự án
                      <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/40 transition-colors">
                        <ArrowRight size={14} />
                      </div>
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
