'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Activity, CheckCircle2, XCircle, Plus, Minus, ArrowRight, Layers, Globe, Smartphone, Users, ShieldCheck, Zap, Sparkles, Cloud, Check, Cpu, BarChart3, Server, Shield, X, LifeBuoy, Clock, Lock, MessageCircle, Mail, Rocket, ChevronRight } from 'lucide-react';
import { Manrope } from 'next/font/google';

// --- CẤU HÌNH FONT CHỮ DUY NHẤT CHO TOÀN TRANG ---
const manrope = Manrope({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'] 
});

// --- CẤU HÌNH HIỆU ỨNG CHUYỂN ĐỘNG (Framer Motion) ---
const customEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: customEase } }
} as const;

const breadcrumbVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, ease: "easeOut" as const } }
} as const;

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

const slideInTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
} as const;

// --- COMPONENT ĐẾM SỐ ---
const NumberCounter = ({ to, duration = 2 }: { to: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const stepTime = Math.abs(Math.floor((duration * 1000) / to));
      const timer = setInterval(() => {
        start += Math.ceil(to / 100);
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

// --- DỮ LIỆU HỆ SINH THÁI ---
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

export default function ServicesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // States cho Section 3
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

  const faqs = [
    { question: "Thời gian hoàn thành một dự án website hoặc ứng dụng là bao lâu?", answer: "Thời gian triển khai phụ thuộc vào quy mô và độ phức tạp của dự án. Thông thường, một website cơ bản mất từ 2-4 tuần, trong khi hệ thống phần mềm có thể từ 2-6 tháng. Chúng tôi sẽ cung cấp tiến độ chi tiết sau khi khảo sát." },
    { question: "Công ty có hỗ trợ bảo hành và bảo trì sau khi bàn giao không?", answer: "Chắc chắn rồi! Tất cả các dự án đều được bảo hành miễn phí từ 6-12 tháng. Sau thời gian này, chúng tôi cung cấp các gói bảo trì server với chi phí tối ưu để hệ thống hoạt động ổn định 24/7." },
    { question: "Tôi có được sở hữu toàn bộ Source Code sau khi hoàn thành không?", answer: "Có. Sau khi dự án được nghiệm thu và thanh toán hoàn tất, chúng tôi sẽ bàn giao toàn bộ Source Code, tài liệu kỹ thuật và quyền quản trị cao nhất cho doanh nghiệp của bạn." },
    { question: "Chi phí xây dựng phần mềm được tính như thế nào?", answer: "Chi phí được tính dựa trên số lượng tính năng, nền tảng công nghệ và thời gian hoàn thành. Bạn có thể tham khảo các gói cơ bản ở trên, hoặc liên hệ trực tiếp để nhận báo giá thiết kế riêng." }
  ];

  return (
    // Sử dụng duy nhất class của Manrope ở thẻ root
    <main className={`${manrope.className} bg-white text-[#616161]`}>

      {/* 1. BREADCRUMB SECTION */}
      <section className="relative bg-[#061153] pt-[150px] pb-[130px] overflow-hidden rounded-b-[40px] md:mx-5 mt-5 shadow-2xl shadow-blue-900/10 border border-blue-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700/15 via-transparent to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-[url('https://inotek.themevally.com/wp-content/uploads/2025/10/breadcrumb.webp')] bg-cover bg-center"></div>

        <div className="container mx-auto px-6 relative z-30 flex flex-col items-start gap-10">
          <div className="w-full">
            <motion.h1 initial="hidden" animate="visible" variants={titleVariants} className="text-4xl md:text-[62px] font-extrabold text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-[0_2px_15px_rgba(16,83,243,0.3)]">
              Dịch Vụ Lập Trình & <br /> Giải Pháp <span className="text-blue-300">Công Nghệ</span>
            </motion.h1>

            <motion.div initial="hidden" animate="visible" variants={breadcrumbVariants} className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10 shadow-[0_8px_32px_0_rgba(16,83,243,0.1)]">
              <ul className="flex items-center gap-3 text-white/80 font-medium text-sm md:text-base tracking-wide">
                <li>
                  <a href="/" className="hover:text-blue-300 transition-colors flex items-center gap-2.5 group">
                    <svg className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                    <span className="group-hover:-translate-y-0.5 transition-transform">Trang chủ</span>
                  </a>
                </li>
                <li className="text-white/40">/</li>
                <li><a href="#" className="hover:text-blue-300 transition-colors group"><span className="group-hover:-translate-y-0.5 transition-transform">Dịch vụ</span></a></li>
                <li className="text-white/40">/</li>
                <li className="text-white font-semibold">Chuyên sâu</li>
              </ul>
            </motion.div>
          </div>

          <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full z-20 pointer-events-none">
            <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/circle.webp" className="absolute top-[20%] left-[20%] opacity-40" alt="shape" />
            <motion.img animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/star-1.webp" className="absolute top-[30%] right-[30%] opacity-80" alt="shape" />
            <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/snake.webp" className="absolute bottom-[20%] left-[30%] opacity-40" alt="shape" />
            <motion.img animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/doot.webp" className="absolute bottom-[30%] right-[20%] opacity-80" alt="shape" />
          </div>
        </div>
      </section>

      {/* 2. FEATURE SECTION */}
      <section className="bg-[#F4F7FF] py-[120px]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }} className="bg-white p-[40px] rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(16,83,243,0.1)] transition-all duration-500 border border-transparent hover:border-blue-50 group">
              <div className="flex items-center mb-[30px]">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((num) => (
                    <img key={num} src={`https://inotek.themevally.com/wp-content/uploads/2025/11/social-img0${num}.webp`} alt="khach-hang" className="w-[52px] h-[52px] rounded-full border-4 border-white object-cover shadow-sm group-hover:-translate-y-1 transition-transform duration-300" style={{ transitionDelay: `${num * 50}ms` }} />
                  ))}
                  <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#1053F3] to-blue-700 border-4 border-white flex items-center justify-center text-white font-bold text-sm z-10 relative shadow-md">
                    +500
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-[50px] font-extrabold text-[#1053F3] leading-none tracking-tight drop-shadow-sm">
                  <NumberCounter to={500} />+
                </h3>
                <motion.img animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/scribble.webp" className="w-[50px]" alt="shape" />
              </div>
              <p className="text-slate-500 text-base leading-relaxed mb-[30px]">Dự án phần mềm & web đã triển khai thành công.</p>
              <a href="#lien-he" className="inline-flex items-center justify-between w-full bg-[#061153] text-white px-[30px] py-[15px] rounded-full font-semibold hover:bg-[#1053F3] hover:shadow-[0_10px_20px_rgba(16,83,243,0.3)] transition-all duration-300 group/btn">
                <span className="relative overflow-hidden flex flex-col h-[24px]">
                  <span className="group-hover/btn:-translate-y-full transition-transform duration-300">Nhận báo giá ngay</span>
                  <span className="absolute top-full group-hover/btn:-translate-y-full transition-transform duration-300">Nhận báo giá ngay</span>
                </span>
                <span className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-[#1053F3] transition-colors shadow-sm">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </a>
            </motion.div>

            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true }} className="bg-white p-[40px] rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(16,83,243,0.1)] transition-all duration-500 relative group hover:-translate-y-2 border border-transparent hover:border-blue-50">
              <div className="absolute top-[40px] right-[40px]">
                <div className="w-[50px] h-[50px] rounded-full bg-[#F4F7FF] flex items-center justify-center text-[#061153] group-hover:bg-[#1053F3] group-hover:text-white transition-all duration-300 cursor-pointer">
                  <ArrowRight size={18} strokeWidth={2.5} className="group-hover:-rotate-45 transition-transform duration-300" />
                </div>
              </div>
              <div className="mb-[40px]">
                <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon01.webp" alt="icon" className="h-[60px] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h2 className="text-[24px] font-extrabold text-[#061153] mb-4 leading-snug tracking-tight">Tư Vấn & Thiết Kế <br /> Kiến Trúc IT</h2>
              <p className="text-slate-500 leading-relaxed text-base">Phân tích quy trình kinh doanh, định hướng nền tảng công nghệ bền vững cho doanh nghiệp.</p>
            </motion.div>

            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true }} className="bg-gradient-to-br from-[#061153] to-blue-950 p-[40px] rounded-[30px] relative group hover:-translate-y-2 transition-all duration-500 shadow-[0_10px_30px_rgba(6,17,83,0.2)] hover:shadow-[0_20px_40px_rgba(16,83,243,0.3)]">
              <div className="absolute top-[40px] right-[40px]">
                <div className="w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#1053F3] transition-all duration-300 cursor-pointer">
                  <ArrowRight size={18} strokeWidth={2.5} className="group-hover:-rotate-45 transition-transform duration-300" />
                </div>
              </div>
              <div className="mb-[40px]">
                <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon02.webp" alt="icon" className="h-[60px] brightness-0 invert group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h2 className="text-[24px] font-extrabold text-white mb-4 leading-snug tracking-tight">Chuyển Đổi Số & <br /> Tự Động Hóa</h2>
              <p className="text-blue-100/80 leading-relaxed text-base">Số hóa quy trình làm việc thủ công, nâng cao hiệu suất và bảo mật dữ liệu an toàn tuyệt đối.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. HỆ SINH THÁI DỊCH VỤ - LIGHT BENTO GRID & HARMONIC COLORS */}
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

      {/* 4. MARQUEE SECTION */}
      <section className="bg-[#F4F7FF] py-[25px] overflow-hidden flex items-center border-y border-[#E8EDFA]">
        <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }} className="flex whitespace-nowrap items-center min-w-max">
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex items-center">
              {['Thiết Kế Website', 'Lập Trình App Mobile', 'Phần Mềm ERP', 'Kiểm Thử Phần Mềm', 'Bảo Mật Server'].map((text, idx) => (
                <div key={idx} className="flex items-center mx-[40px] group">
                  <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm3-icon1.png" alt="icon" className="w-[30px] h-[30px] mr-4 group-hover:rotate-12 transition-transform" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#061153] to-[#061153] hover:from-[#1053F3] hover:to-[#5080FF] text-4xl font-extrabold tracking-tight cursor-pointer transition-all duration-300" style={{ WebkitTextStroke: '1px #061153' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* 5. PROCESS SECTION - MODERNIZED ORIGINAL */}
      <section className="relative bg-[#F4F7FF] pb-8 md:pb-12">
        
        {/* Top Shape */}
        <motion.div variants={slideInTop} initial="hidden" whileInView="visible" viewport={{ once: true }} className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-shape-01.webp" alt="Shape" className="drop-shadow-sm" />
        </motion.div>
        
        {/* Main Navy Container */}
        <div className="bg-[#09155C] pt-[140px] pb-[120px] rounded-b-[40px] md:mx-5 relative z-0 overflow-hidden shadow-[0_20px_50px_rgba(9,21,92,0.15)] border border-[#061153]/10">
          
          {/* Subtle Background Textures */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#1053F3]/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#5080FF]/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            
            {/* Header Titles */}
            <div className="text-center mb-[80px] -mt-[25px] relative">
              <h2 className="text-5xl md:text-[80px] font-black text-white/[0.04] tracking-[0.05em] uppercase leading-none absolute left-1/2 -translate-x-1/2 -top-6 md:-top-10 w-full select-none pointer-events-none">
                QUY TRÌNH CHUẨN
              </h2>
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white tracking-tight relative z-10 drop-shadow-sm">
                Cách Chúng Tôi Làm Việc
              </h2>
            </div>

            {/* Grid Flow Layout */}
            <div className="relative">
              
              {/* Connecting Dashed Line (Desktop Only) */}
              <div className="hidden lg:block absolute top-[110px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-white/10 z-0">
                {/* Moving dot animation */}
                <motion.div 
                  className="w-3 h-3 bg-[#1053F3] rounded-full shadow-[0_0_10px_#1053F3] absolute -top-[7px]"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] relative z-10">
                {[
                  { title: 'Khảo Sát & Tư Vấn', desc: 'Tìm hiểu chi tiết bài toán kinh doanh và đề xuất giải pháp công nghệ tối ưu.' },
                  { title: 'Phân Tích & Thiết Kế', desc: 'Xây dựng tài liệu kỹ thuật, luồng dữ liệu, và thiết kế UI/UX Mockups.' },
                  { title: 'Lập Trình & Kiểm Thử', desc: 'Code và test (QA/QC) nghiêm ngặt để đảm bảo sản phẩm mượt mà, không lỗi.' },
                  { title: 'Bàn Giao & Vận Hành', desc: 'Triển khai lên server, đào tạo sử dụng và hỗ trợ bảo trì hệ thống định kỳ.' },
                ].map((step, idx) => (
                  <motion.div key={idx} variants={fadeInRightBig} initial="hidden" whileInView="visible" custom={idx * 0.15} viewport={{ once: true }} className="relative group h-full">
                    
                    {/* Modern Glass Card */}
                    <div className="bg-white/[0.04] backdrop-blur-md p-[40px] rounded-[30px] h-full transition-all duration-500 border border-white/10 group-hover:border-blue-400/40 group-hover:bg-gradient-to-br group-hover:from-white/[0.08] group-hover:to-transparent group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col items-start z-10">
                      
                      {/* Faint Background Number inside card */}
                      <div className="absolute -bottom-4 -right-4 text-[100px] font-black text-white/[0.03] group-hover:text-blue-400/[0.05] transition-colors duration-500 pointer-events-none select-none">
                        0{idx + 1}
                      </div>

                      {/* Pill Badge Step */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5080FF] animate-pulse"></span>
                        <span className="text-blue-200 font-extrabold tracking-widest text-[11px] uppercase">
                          BƯỚC 0{idx + 1}
                        </span>
                      </div>

                      {/* Icon Container */}
                      <div className="mb-[30px] relative">
                        {/* Glow effect behind image */}
                        <div className="absolute inset-0 bg-[#1053F3] blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full scale-150"></div>
                        <img 
                          src={`https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon${idx + 1}.webp`} 
                          className="w-[64px] h-[64px] relative z-10 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 drop-shadow-lg" 
                          alt="icon" 
                        />
                      </div>

                      {/* Text Content */}
                      <h3 className="text-[22px] font-extrabold text-white mb-3 tracking-tight relative z-10 drop-shadow-sm group-hover:text-blue-100 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-300/90 text-[15px] leading-relaxed relative z-10">
                        {step.desc}
                      </p>

                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
        {/* 6. PRICING SECTION - ENTERPRISE UNIFIED BOARD */}
        <section className="py-[60px] lg:py-[80px] flex flex-col justify-center min-h-[calc(100vh-80px)] bg-[#F8FAFC] relative overflow-hidden z-10 border-t border-[#E8EDFA]">
          
          {/* Background Ambient Gradient */}
          <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[500px] rounded-full opacity-40 blur-[120px] pointer-events-none mix-blend-multiply"
              style={{ background: 'radial-gradient(circle, rgba(16,83,243,0.15) 0%, rgba(6,17,83,0.05) 50%, transparent 100%)' }}>
          </div>

          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            
            {/* Header */}
            <div className="text-center mb-[40px]">
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-blue-100 shadow-sm mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1053F3] animate-pulse"></span>
                <span className="text-[#1053F3] font-bold text-[11px] uppercase tracking-widest">Đầu Tư Thông Minh</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-[#061153] leading-tight tracking-tighter drop-shadow-sm">
                Bảng Giá Dịch Vụ
              </motion.h2>
            </div>

            {/* UNIFIED PRICING BOARD */}
            <motion.div 
              variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-2xl rounded-[40px] p-2.5 md:p-3 shadow-[0_40px_100px_rgba(6,17,83,0.08)] border border-white relative flex flex-col"
            >
              {/* 3 Pricing Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 flex-1">
                
                {/* GÓI 1: KHỞI NGHIỆP */}
                <div className="bg-white rounded-[32px] p-[32px] flex flex-col h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100">
                  <div className="mb-6">
                    <h5 className="text-[12px] font-extrabold text-slate-400 mb-2 uppercase tracking-widest">Khởi Nghiệp</h5>
                    <h2 className="text-[32px] font-black text-[#061153] leading-none tracking-tight mb-3">Web Cơ Bản</h2>
                    <p className="text-slate-500 text-[14px] font-medium leading-relaxed min-h-[42px]">Dành cho cá nhân, cửa hàng nhỏ cần xây dựng thương hiệu online chuyên nghiệp.</p>
                  </div>

                  <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 border border-slate-100">
                    <Clock size={14} className="text-[#1053F3]" /> Triển khai: <span className="text-[#061153]">2 - 4 tuần</span>
                  </div>
                  
                  <ul className="space-y-[14px] mb-8 flex-1">
                    {[
                      { text: 'Website chuẩn SEO (Score 90+)', active: true },
                      { text: 'Responsive mượt mà (Mobile-First)', active: true },
                      { text: 'Hosting tiêu chuẩn (1 Năm)', active: true },
                      { text: 'Thiết kế Mobile App (Native)', active: false },
                      { text: 'Hệ thống Quản trị Doanh nghiệp (ERP)', active: false },
                    ].map((item, idx) => (
                      <li key={idx} className={`flex items-start gap-3 text-[14px] ${item.active ? 'text-slate-700 font-semibold' : 'text-slate-400 font-medium'}`}>
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.active ? 'bg-blue-50 text-[#1053F3]' : 'bg-slate-50 text-slate-300'}`}>
                          {item.active ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
                        </div>
                        <span className="leading-tight">{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#lien-he" className="w-full py-3.5 rounded-[16px] font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-[#F4F7FF] text-[#061153] border border-blue-100/50 hover:bg-[#061153] hover:text-white group text-[14px]">
                    Yêu cầu báo giá <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* GÓI 2: TĂNG TRƯỞNG (HIGHLIGHT - METALLIC DARK) */}
                <div className="bg-gradient-to-b from-[#061153] to-[#111A3A] rounded-[32px] p-[32px] flex flex-col h-full relative overflow-hidden shadow-[0_20px_50px_rgba(6,17,83,0.4)] border border-[#1053F3]/50 z-10 transform lg:scale-[1.03]">
                  
                  {/* Glow & Texture */}
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#1053F3]/30 rounded-full blur-[60px] pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1053F3] to-[#5080FF] text-white px-4 py-1.5 rounded-b-[12px] text-[10px] font-black uppercase tracking-widest shadow-[0_5px_15px_rgba(16,83,243,0.4)] flex items-center gap-1.5 z-10">
                    <Zap size={12} className="fill-white" /> Phổ biến nhất
                  </div>

                  <div className="mb-6 relative z-10 mt-3">
                    <h5 className="text-[12px] font-extrabold text-[#5080FF] mb-2 uppercase tracking-widest">Tăng Trưởng</h5>
                    <h2 className="text-[36px] font-black text-white leading-none tracking-tighter mb-3 drop-shadow-md">Web + App</h2>
                    <p className="text-slate-300 text-[14px] font-medium leading-relaxed min-h-[42px]">Doanh nghiệp SME cần hệ sinh thái đa kênh, đồng bộ dữ liệu Real-time.</p>
                  </div>

                  <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-white/10 rounded-lg text-[13px] font-semibold text-white border border-white/10 backdrop-blur-sm relative z-10">
                    <Clock size={14} className="text-[#5080FF]" /> Triển khai: <span className="text-white">4 - 8 tuần</span>
                  </div>
                  
                  <ul className="space-y-[14px] mb-8 flex-1 relative z-10">
                    {[
                      { text: 'Mọi tính năng từ Gói Khởi Nghiệp', active: true },
                      { text: 'Thiết kế App iOS/Android (Flutter/React Native)', active: true },
                      { text: 'API đồng bộ dữ liệu bảo mật (OAuth 2.0)', active: true },
                      { text: 'Tích hợp cổng thanh toán (VNPay, Momo, Stripe)', active: true },
                      { text: 'Hệ thống Quản trị Doanh nghiệp (ERP)', active: false },
                    ].map((item, idx) => (
                      <li key={idx} className={`flex items-start gap-3 text-[14px] ${item.active ? 'text-white font-semibold' : 'text-slate-400 font-medium'}`}>
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.active ? 'bg-[#1053F3] text-white shadow-[0_0_12px_rgba(16,83,243,0.8)]' : 'bg-white/10 text-slate-500'}`}>
                          {item.active ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
                        </div>
                        <span className="leading-tight">{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#lien-he" className="relative z-10 w-full py-3.5 rounded-[16px] font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-[#1053F3] text-white hover:bg-white hover:text-[#061153] shadow-[0_10px_20px_rgba(16,83,243,0.4)] group text-[14px]">
                    Bắt đầu dự án <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* GÓI 3: CHUYÊN SÂU */}
                <div className="bg-white rounded-[32px] p-[32px] flex flex-col h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100">
                  <div className="mb-6">
                    <h5 className="text-[12px] font-extrabold text-slate-400 mb-2 uppercase tracking-widest">Chuyên Sâu</h5>
                    <h2 className="text-[32px] font-black text-[#061153] leading-none tracking-tight mb-3">Custom ERP</h2>
                    <p className="text-slate-500 text-[14px] font-medium leading-relaxed min-h-[42px]">Tập đoàn, hệ thống chuỗi cần phần mềm đặc thù & chuyển đổi số toàn diện.</p>
                  </div>

                  <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 border border-slate-100">
                    <Clock size={14} className="text-[#1053F3]" /> Triển khai: <span className="text-[#061153]">Theo từng Sprint</span>
                  </div>
                  
                  <ul className="space-y-[14px] mb-8 flex-1">
                    {[
                      { text: 'Phân tích & thiết kế kiến trúc Server lớn', active: true },
                      { text: 'Phần mềm nghiệp vụ Custom theo yêu cầu', active: true },
                      { text: 'Hạ tầng Auto-scaling & Load Balancing', active: true },
                      { text: 'Cam kết SLA 99.99% & Hỗ trợ 24/7', active: true },
                      { text: 'Bàn giao 100% Source Code & IP', active: true },
                    ].map((item, idx) => (
                      <li key={idx} className={`flex items-start gap-3 text-[14px] ${item.active ? 'text-slate-700 font-semibold' : 'text-slate-400 font-medium'}`}>
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
              <div className="mt-2.5 bg-slate-50/80 backdrop-blur-md border border-slate-200 rounded-[24px] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-[#061153] font-bold text-[14px]">
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

      {/* 6.5 FAQ SECTION - PREMIUM SAAS STYLE */}
      <section className="py-[80px] lg:py-[120px] bg-white relative overflow-hidden z-10 border-t border-[#E8EDFA]">
        
        {/* Background Mesh Decor */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#F4F7FF] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[50px] lg:gap-[80px] items-start">
            
            {/* LEFT COLUMN: Title & Support Card (Sticky) */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 lg:sticky lg:top-[120px]">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F7FF] border border-blue-100 shadow-sm mb-5">
                <span className="text-[#1053F3] font-extrabold text-[11px] uppercase tracking-widest">Hỗ Trợ Khách Hàng</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#061153] leading-[1.15] tracking-tight mb-[24px]">
                Những Câu Hỏi <br /> Thường Gặp
              </h2>
              
              <p className="text-slate-500 text-[16px] leading-relaxed mb-[40px] max-w-[90%]">
                Tìm hiểu thêm về quy trình làm việc, chính sách bảo hành và các dịch vụ đi kèm. Đội ngũ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn.
              </p>
              
              {/* Premium Support Card */}
              <div className="bg-gradient-to-br from-[#061153] to-[#18225F] rounded-[24px] p-6 shadow-[0_20px_40px_rgba(6,17,83,0.15)] relative overflow-hidden border border-[#1053F3]/20 max-w-[360px]">
                {/* Glow effect inside card */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1053F3]/40 rounded-full blur-2xl"></div>
                
                <h4 className="text-white font-bold text-[18px] mb-2 relative z-10">Vẫn còn thắc mắc?</h4>
                <p className="text-blue-200/80 text-[14px] mb-6 relative z-10 leading-relaxed">
                  Liên hệ trực tiếp với chuyên gia công nghệ của chúng tôi để được tư vấn 1:1.
                </p>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((num) => (
                      <img key={num} src={`https://inotek.themevally.com/wp-content/uploads/2025/11/social-img0${num}.webp`} alt="team" className="w-10 h-10 rounded-full border-2 border-[#061153] object-cover shadow-sm" />
                    ))}
                  </div>
                  
                  <a href="#lien-he" className="flex items-center gap-2 bg-[#1053F3] text-white px-5 py-2.5 rounded-full text-[13px] font-bold hover:bg-white hover:text-[#061153] transition-colors duration-300 shadow-md">
                    <MessageCircle size={16} /> Chat ngay
                  </a>
                </div>
              </div>

            </motion.div>

            {/* RIGHT COLUMN: Interactive Accordions */}
            <motion.div variants={fadeInRightBig} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-7 space-y-[16px]">
              {faqs.map((faq, index) => {
                const isActive = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 border ${
                      isActive 
                        ? 'border-[#1053F3]/30 shadow-[0_15px_30px_rgba(16,83,243,0.08)] bg-[#F4F7FF]/50' 
                        : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveFaq(isActive ? null : index)} 
                      className="w-full text-left px-6 py-6 md:px-8 md:py-7 flex items-center justify-between focus:outline-none group"
                    >
                      <h4 className={`text-[16px] md:text-[18px] font-extrabold pr-6 transition-colors duration-300 leading-snug tracking-tight ${isActive ? 'text-[#1053F3]' : 'text-[#061153] group-hover:text-[#1053F3]'}`}>
                        {faq.question}
                      </h4>
                      
                      {/* Interactive Plus Icon */}
                      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm border ${
                        isActive 
                          ? 'bg-[#1053F3] text-white border-[#1053F3] rotate-45' 
                          : 'bg-slate-50 text-slate-500 border-slate-100 group-hover:bg-[#F4F7FF] group-hover:text-[#1053F3] group-hover:border-blue-100'
                      }`}>
                        <Plus size={20} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-500 text-[15px] leading-relaxed border-t border-blue-100/50 pt-5 mt-1">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>
      {/* 7. COLLABORATE CTA SECTION - LIGHT MODE APPLE-LIKE */}
      <section id="lien-he" className="py-[80px] lg:py-[120px] bg-[#F8FAFC] relative overflow-hidden border-t border-[#E8EDFA]">
        
        {/* Background Ambient (Very subtle global glow) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#1053F3]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <motion.div 
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} 
            className="bg-white rounded-[40px] md:rounded-[64px] p-[50px] md:p-[80px] lg:p-[100px] relative overflow-hidden flex flex-col items-center text-center shadow-[0_20px_80px_rgba(6,17,83,0.04)] border border-[#E8EDFA]"
          >
            {/* Soft Monochromatic Inner Glows */}
            <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] bg-blue-50/60 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-[#1053F3]/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Minimalist Top Label */}
            <h4 className="text-[#1053F3] font-bold text-[13px] md:text-[14px] uppercase tracking-[0.15em] mb-5 relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1053F3] animate-pulse"></span>
              Khởi tạo tương lai
            </h4>
            
            {/* Stark, Clean Headline */}
            <h2 className="text-[42px] md:text-[64px] lg:text-[80px] font-extrabold text-[#061153] mb-6 leading-[1.05] tracking-tighter relative z-10">
              Sẵn Sàng Để <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1053F3] to-[#5080FF]">
                Chuyển Đổi Số.
              </span>
            </h2>
            
            {/* Clean Subtitle */}
            <p className="text-slate-500 text-[18px] md:text-[21px] leading-[1.6] max-w-2xl mb-10 md:mb-12 font-medium relative z-10">
              Đội ngũ kỹ sư chuyên sâu của chúng tôi luôn sẵn sàng lắng nghe bài toán của bạn. Nhận bản phác thảo kiến trúc hệ thống và báo giá hoàn toàn miễn phí.
            </p>
            
            {/* Apple-style Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full relative z-10">
              
              {/* Primary CTA: Solid Brand Blue */}
              <a href="#lien-he" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1053F3] text-white px-8 py-4 rounded-full font-semibold text-[16px] md:text-[17px] hover:bg-[#061153] hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(16,83,243,0.25)] transition-all duration-300">
                Đăng ký tư vấn
              </a>

              {/* Secondary CTA: Soft Monochromatic Button with Chevron */}
              <a href="mailto:contact@yourdomain.com" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#F4F7FF] text-[#061153] px-8 py-4 rounded-full font-semibold text-[16px] md:text-[17px] hover:bg-blue-50 hover:text-[#1053F3] transition-colors duration-300 group">
                Gửi email cho chúng tôi
                <ChevronRight size={18} className="ml-1 text-slate-400 group-hover:text-[#1053F3] group-hover:translate-x-1 transition-all" />
              </a>
              
            </div>
            
          </motion.div>
        </div>
      </section>

    </main>
  );
}