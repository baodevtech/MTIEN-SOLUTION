'use client';

import React, { Activity, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Plus, Minus, ArrowRight, Layers, Globe, Smartphone, Users, ShieldCheck, Zap, Sparkles, Cloud, Check, Cpu, BarChart3, Server, Shield } from 'lucide-react';
import { Manrope } from 'next/font/google';

// --- CẤU HÌNH FONT CHỮ DUY NHẤT CHO TOÀN TRANG ---
const manrope = Manrope({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'] 
});

// --- CẤU HÌNH HIỆU ỨNG CHUYỂN ĐỘNG (Framer Motion) ---
const customEase = [0.25, 0.46, 0.45, 0.94]; // Cubic bezier chuẩn Apple

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: customEase } }
};

const breadcrumbVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, ease: "easeOut" } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" } })
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" } })
};

const fadeInRightBig = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" } })
};

const slideInTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
};

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

     {/* 3. HỆ SINH THÁI DỊCH VỤ - CẤU TRÚC APPLE & MÀU SẮC ĐỒNG BỘ */}
      <section className="py-[120px] bg-white relative overflow-hidden border-b border-[#E8EDFA]">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          
          <div className="text-center mb-[80px]">
            <motion.span variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#1053F3] font-bold text-[13px] tracking-[0.15em] uppercase mb-4 block">
              Ecosystem
            </motion.span>
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold text-[#061153] leading-tight tracking-tight">
              Giải Pháp Phần Mềm <br /> Toàn Diện & Chuyên Sâu
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] lg:gap-[50px] items-start"
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
          >
            {/* LEFT: Tab Navigation - Tech Colors */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 flex flex-col gap-2">
              {ecosystemData.map((node, i) => {
                const isActive = activeService === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveService(i)}
                    className={`flex items-center gap-4 w-full p-4 rounded-[20px] transition-all duration-300 text-left group border ${
                      isActive 
                        ? 'bg-[#1053F3] border-[#1053F3] text-white shadow-[0_10px_25px_rgba(16,83,243,0.3)]' 
                        : 'bg-transparent border-transparent text-slate-500 hover:bg-[#F4F7FF] hover:text-[#1053F3]'
                    }`}
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F4F7FF] text-[#1053F3] group-hover:bg-white group-hover:shadow-sm'
                    }`}>
                      {React.cloneElement(node.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <span className="font-bold text-[17px] tracking-tight">
                      {node.label}
                    </span>
                    {isActive && (
                      <motion.div layoutId="activeTabIndicator" className="ml-auto text-white">
                        <ArrowRight size={18} />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </motion.div>

           {/* RIGHT: Active Content Card - BENTO GRID & DASHBOARD UI */}
            <motion.div variants={fadeInRightBig} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 h-full">
              <div className="bg-[#F4F7FF] rounded-[32px] p-[30px] md:p-[50px] relative overflow-hidden flex flex-col h-full transition-all duration-500 border border-[#E8EDFA] shadow-[0_20px_50px_rgba(6,17,83,0.03)] z-10">
                
                {/* 1. Dynamic Background Effects (Quầng sáng & Lưới công nghệ) */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[32px]">
                  <motion.div 
                    key={`glow-${activeService}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -top-[150px] -right-[150px] w-[500px] h-[500px] rounded-full blur-[100px]"
                    style={{ backgroundColor: ecosystemData[activeService].hex }}
                  />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                </div>

                {/* 2. Top Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-blue-100/60 z-20">
                  <motion.div
                    key={`progress-${activeService}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered ? "0%" : "100%" }}
                    transition={{ duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                    className="h-full shadow-[0_0_10px_rgba(16,83,243,0.5)]"
                    style={{ backgroundColor: ecosystemData[activeService].hex }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(8px)", y: -20 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col h-full relative z-10"
                  >
                    {/* Header: Status Badge & Title */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-50 shadow-sm">
                          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: ecosystemData[activeService].hex }}></span>
                          <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#061153]">
                            Node 0{activeService + 1}
                          </span>
                        </div>
                        <span className="text-slate-400 font-semibold text-sm tracking-wider uppercase">— {ecosystemData[activeService].label}</span>
                      </div>
                      
                      <h3 className="text-[32px] md:text-[44px] font-extrabold text-[#061153] leading-[1.15] tracking-tight mb-5">
                        {ecosystemData[activeService].title}
                      </h3>
                      
                      <p className="text-slate-500 text-[17px] md:text-[19px] leading-[1.6] font-medium max-w-[95%]">
                        {ecosystemData[activeService].desc}
                      </p>
                    </div>

                    {/* Bento Grid Content */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-10">
                      
                      {/* Box 1: Core Features (Chiếm 3 cột) */}
                      <div className="md:col-span-3 bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-blue-100 transition-colors group/box">
                        <h4 className="font-extrabold text-[#061153] mb-5 text-[16px] flex items-center gap-2">
                          <Sparkles size={18} style={{ color: ecosystemData[activeService].hex }} />
                          Năng lực triển khai
                        </h4>
                        <ul className="space-y-3.5">
                          {ecosystemData[activeService].features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                              <div className="mt-0.5 bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                <Check size={14} strokeWidth={3} style={{ color: ecosystemData[activeService].hex }} />
                              </div>
                              <span className="text-slate-700 font-semibold text-[15px]">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Box 2 & 3: Tech Stack & Metrics (Chiếm 2 cột, chia dòng) */}
                      <div className="md:col-span-2 flex flex-col gap-5">
                        
                        {/* Box 2: Tech Stack */}
                        <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-blue-100 transition-colors flex-1">
                          <h4 className="font-extrabold text-[#061153] mb-4 text-[16px] flex items-center gap-2">
                            <Layers size={18} style={{ color: ecosystemData[activeService].hex }} />
                            Công nghệ
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {ecosystemData[activeService].techs.map((tech, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-[#F4F7FF] rounded-lg text-[13px] font-bold text-[#061153] border border-blue-50/50">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Box 3: Enterprise SLA (Khối UI hoành tráng) */}
                        <div className="bg-gradient-to-br from-[#061153] to-[#18225F] rounded-[24px] p-6 shadow-[0_15px_30px_rgba(6,17,83,0.15)] relative overflow-hidden group/sla border border-white/10">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover/sla:bg-blue-500/30 transition-colors"></div>
                          <h4 className="font-bold text-blue-200 mb-4 text-[13px] uppercase tracking-widest flex items-center gap-2">
                            <Activity size={14} className="text-blue-400" /> Tiêu chuẩn Enterprise
                          </h4>
                          <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-semibold text-sm flex items-center gap-2"><Server size={14} className="text-blue-400"/> Uptime SLA</span>
                              <span className="text-white font-extrabold text-sm">99.99%</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: "99%" }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-blue-400 rounded-full"></motion.div>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-white font-semibold text-sm flex items-center gap-2"><Shield size={14} className="text-emerald-400"/> Bảo mật dữ liệu</span>
                              <span className="text-emerald-400 font-extrabold text-sm">ISO 27001</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-auto flex items-center justify-between border-t border-blue-100/50 pt-6">
                      <div className="flex -space-x-3">
                        {/* Giả lập hình ảnh team/dev */}
                        {[1, 2, 3].map((num) => (
                          <img key={num} src={`https://inotek.themevally.com/wp-content/uploads/2025/11/social-img0${num}.webp`} alt="team" className="w-10 h-10 rounded-full border-2 border-[#F4F7FF] object-cover" />
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-[#F4F7FF] bg-white flex items-center justify-center text-[10px] font-bold text-[#061153] shadow-sm">
                          +20 Dev
                        </div>
                      </div>
                      
                      <a href="#lien-he" className="group flex items-center gap-3 bg-[#061153] text-white px-8 py-4 rounded-full text-[15px] font-bold hover:bg-[#1053F3] hover:shadow-[0_15px_30px_rgba(16,83,243,0.3)] hover:-translate-y-1 transition-all duration-300">
                        Phân tích dự án ngay
                        <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white group-hover:text-[#1053F3] transition-colors">
                          <ArrowRight size={16} />
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

      {/* 5. PROCESS SECTION */}
      <section className="relative bg-[#F4F7FF]">
        <motion.div variants={slideInTop} initial="hidden" whileInView="visible" viewport={{ once: true }} className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-shape-01.webp" alt="Shape" />
        </motion.div>
        <div className="bg-[#09155C] pt-[140px] pb-[120px] rounded-b-[40px] md:mx-5 relative z-0 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-[80px] -mt-[25px]">
              <h2 className="text-5xl md:text-7xl font-black text-white/5 tracking-[0.05em] uppercase leading-none absolute left-1/2 -translate-x-1/2 -top-4 w-full">QUY TRÌNH CHUẨN</h2>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative z-10">Cách Chúng Tôi Làm Việc</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] relative">
              {[
                { title: 'Khảo Sát & Tư Vấn', desc: 'Tìm hiểu chi tiết bài toán kinh doanh và đề xuất giải pháp công nghệ tối ưu.' },
                { title: 'Phân Tích & Thiết Kế', desc: 'Xây dựng tài liệu kỹ thuật, luồng dữ liệu, và thiết kế UI/UX Mockups.' },
                { title: 'Lập Trình & Kiểm Thử', desc: 'Code và test (QA/QC) nghiêm ngặt để đảm bảo sản phẩm mượt mà, không lỗi.' },
                { title: 'Bàn Giao & Vận Hành', desc: 'Triển khai lên server, đào tạo sử dụng và hỗ trợ bảo trì hệ thống định kỳ.' },
              ].map((step, idx) => (
                <motion.div key={idx} variants={fadeInRightBig} initial="hidden" whileInView="visible" custom={idx * 0.1} viewport={{ once: true }} className="relative group">
                  <h4 className="text-[#5080FF] font-extrabold mb-5 tracking-widest text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1053F3] animate-pulse"></span> BƯỚC 0{idx + 1}
                  </h4>
                  <div className="bg-white/5 backdrop-blur-sm p-[40px] rounded-[24px] h-full transition-all duration-500 border border-white/10 group-hover:border-[#1053F3] group-hover:bg-[#18225F] group-hover:-translate-y-2 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
                    <div className="mb-[30px] relative">
                      <div className="absolute inset-0 bg-[#1053F3] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
                      <img src={`https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon${idx + 1}.webp`} className="w-[60px] h-[60px] relative z-10" alt="icon" />
                    </div>
                    <h3 className="text-xl font-extrabold text-white mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-slate-300 text-[15px] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section className="py-[120px] bg-[#F4F7FF]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-[80px]">
            <span className="text-[#1053F3] font-bold flex items-center justify-center gap-2 mb-4 text-sm uppercase tracking-wider bg-blue-100/50 w-fit mx-auto px-4 py-1.5 rounded-full">
              <CheckCircle2 size={16} /> Gói Giải Pháp Trọn Gói
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#061153] leading-tight tracking-tight">Minh Bạch Chi Phí <br /> Phù Hợp Mọi Quy Mô</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] items-end max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }} className="bg-white rounded-[30px] p-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-blue-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-300">
              <h5 className="text-lg font-bold text-slate-400 mb-2">Gói Khởi Nghiệp</h5>
              <div className="mb-4 flex items-baseline gap-2"><h2 className="text-4xl font-extrabold text-[#061153] leading-none tracking-tight">Web Cơ Bản</h2></div>
              <p className="text-slate-500 mb-[30px] min-h-[48px] leading-relaxed text-[15px]">Dành cho cá nhân, cửa hàng nhỏ cần xây dựng thương hiệu online.</p>
              <a href="#lien-he" className="w-full mt-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 mb-[30px] bg-slate-50 text-[#061153] hover:bg-[#1053F3] hover:text-white hover:shadow-lg">
                Nhận tư vấn <ArrowRight size={18} />
              </a>
              <h4 className="font-extrabold text-[#061153] mb-[20px] text-lg">Bao gồm:</h4>
              <ul className="space-y-[16px]">
                <li className="flex items-start gap-3 text-slate-600 font-medium text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Website chuẩn SEO, Tốc độ cao</li>
                <li className="flex items-start gap-3 text-slate-600 font-medium text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Giao diện Responsive (Mobile)</li>
                <li className="flex items-start gap-3 text-slate-600 font-medium text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Domain & Hosting 1 năm</li>
                <li className="flex items-start gap-3 text-slate-300 text-[15px]"><XCircle className="shrink-0" size={20} /> Ứng dụng di động (App)</li>
                <li className="flex items-start gap-3 text-slate-300 text-[15px]"><XCircle className="shrink-0" size={20} /> Hệ thống API phức tạp</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true }} className="bg-white rounded-[30px] p-[50px] shadow-[0_20px_50px_rgba(16,83,243,0.15)] relative border-2 border-[#1053F3] md:-translate-y-6 flex flex-col h-full z-10 overflow-hidden group">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
              <div className="absolute top-[30px] right-[40px] bg-gradient-to-r from-[#FF9D10] to-orange-400 text-white text-xs font-extrabold px-5 py-2 rounded-full uppercase tracking-wide flex items-center gap-2 z-10 shadow-md">Khuyên dùng</div>
              <motion.img animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/spin-shape02.webp" className="absolute top-[25px] right-[40px] w-[50px] opacity-20" alt="spin" />
              <h5 className="text-lg font-bold text-[#1053F3] mb-2 relative z-10">Gói Tăng Trưởng</h5>
              <div className="mb-4 flex items-baseline gap-2 relative z-10"><h2 className="text-4xl font-extrabold text-[#061153] leading-none tracking-tight">Web + App</h2></div>
              <p className="text-slate-500 mb-[30px] min-h-[48px] leading-relaxed text-[15px] relative z-10">Doanh nghiệp SME cần hệ sinh thái bán hàng đa kênh đồng bộ.</p>
              <a href="#lien-he" className="relative z-10 w-full mt-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 mb-[30px] bg-gradient-to-r from-[#1053F3] to-blue-600 text-white shadow-[0_10px_20px_rgba(16,83,243,0.3)] hover:shadow-[0_15px_25px_rgba(16,83,243,0.4)] hover:-translate-y-1">
                Nhận tư vấn ngay <ArrowRight size={18} />
              </a>
              <h4 className="font-extrabold text-[#061153] mb-[20px] text-lg relative z-10">Bao gồm:</h4>
              <ul className="space-y-[16px] relative z-10">
                <li className="flex items-start gap-3 text-slate-700 font-bold text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Mọi tính năng Gói Khởi Nghiệp</li>
                <li className="flex items-start gap-3 text-slate-700 font-bold text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Thiết kế App Mobile (iOS/Android)</li>
                <li className="flex items-start gap-3 text-slate-700 font-bold text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> API đồng bộ dữ liệu Web-App</li>
                <li className="flex items-start gap-3 text-slate-700 font-bold text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Tích hợp cổng thanh toán</li>
                <li className="flex items-start gap-3 text-slate-400 text-[15px]"><XCircle className="shrink-0" size={20} /> Phần mềm quản lý ERP</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true }} className="bg-white rounded-[30px] p-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-blue-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-300">
              <h5 className="text-lg font-bold text-slate-400 mb-2">Gói Chuyên Sâu</h5>
              <div className="mb-4 flex items-baseline gap-2"><h2 className="text-4xl font-extrabold text-[#061153] leading-none tracking-tight">Custom ERP</h2></div>
              <p className="text-slate-500 mb-[30px] min-h-[48px] leading-relaxed text-[15px]">Thiết kế riêng biệt cho hệ thống lớn, chuyển đổi số toàn diện.</p>
              <a href="#lien-he" className="w-full mt-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 mb-[30px] bg-slate-50 text-[#061153] hover:bg-[#1053F3] hover:text-white hover:shadow-lg">
                Nhận tư vấn <ArrowRight size={18} />
              </a>
              <h4 className="font-extrabold text-[#061153] mb-[20px] text-lg">Bao gồm:</h4>
              <ul className="space-y-[16px]">
                <li className="flex items-start gap-3 text-slate-600 font-medium text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Phân tích, tư vấn Server lớn</li>
                <li className="flex items-start gap-3 text-slate-600 font-medium text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Phần mềm nghiệp vụ đặc thù</li>
                <li className="flex items-start gap-3 text-slate-600 font-medium text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Bảo mật cao cấp, Load Balancing</li>
                <li className="flex items-start gap-3 text-slate-600 font-medium text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Bảo hành & hỗ trợ 24/7</li>
                <li className="flex items-start gap-3 text-slate-600 font-medium text-[15px]"><CheckCircle2 className="text-[#1053F3] shrink-0" size={20} /> Bàn giao Source Code 100%</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6.5 FAQ SECTION */}
      <section className="py-[100px] bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-blue-50/80 to-transparent rounded-l-[100px] opacity-70 z-0 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-start">
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 sticky top-[100px]">
              <span className="text-[#1053F3] font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-wider"><CheckCircle2 size={18} /> Giải Đáp Thắc Mắc</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#061153] leading-tight tracking-tight mb-[24px]">Những Câu Hỏi <br /> Thường Gặp</h2>
              <p className="text-slate-500 text-[16px] leading-relaxed mb-[40px] max-w-[90%]">Tìm hiểu thêm về quy trình làm việc, chính sách bảo hành và các dịch vụ đi kèm của chúng tôi. Nếu bạn có câu hỏi khác, đừng ngần ngại liên hệ!</p>
              <div className="flex gap-4">
                <div className="w-[120px] h-[120px] bg-gradient-to-br from-[#1053F3] to-blue-700 rounded-[30px] flex flex-col items-center justify-center text-white shadow-[0_15px_30px_rgba(16,83,243,0.3)] hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-4xl font-extrabold tracking-tight">24/7</span>
                  <span className="text-[11px] uppercase tracking-widest font-bold mt-1 opacity-80">Hỗ trợ</span>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInRightBig} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-7 space-y-[16px]">
              {faqs.map((faq, index) => (
                <div key={index} className={`border rounded-[24px] overflow-hidden transition-all duration-300 ${activeFaq === index ? 'border-[#1053F3]/30 shadow-[0_10px_30px_rgba(16,83,243,0.08)] bg-gradient-to-br from-blue-50/50 to-white' : 'border-slate-200 bg-white hover:border-[#1053F3]/30 hover:bg-blue-50/20'}`}>
                  <button onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none">
                    <h4 className={`text-lg font-extrabold pr-6 transition-colors duration-300 leading-snug tracking-tight ${activeFaq === index ? 'text-[#1053F3]' : 'text-[#061153]'}`}>{faq.question}</h4>
                    <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? 'bg-[#1053F3] text-white shadow-md' : 'bg-slate-50 text-[#1053F3] border border-slate-100'}`}>
                      {activeFaq === index ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <div className="px-8 pb-8 text-slate-500 text-[15px] leading-relaxed border-t border-blue-100/50 pt-5 mt-2">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. COLLABORATE CTA SECTION */}
      <section id="lien-he" className="py-[120px] bg-[#F4F7FF] border-t border-[#E8EDFA]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-[#1053F3] font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-wider"><CheckCircle2 size={18} /> Khởi tạo dự án</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#061153] mb-[24px] leading-[1.2] tracking-tight">Hãy Để Chúng Tôi <br /> Hiện Thực Hóa Ý Tưởng </h2>
              <p className="text-slate-500 mb-[40px] text-[16px] leading-relaxed max-w-md">Đội ngũ chuyên gia kỹ thuật luôn sẵn sàng lắng nghe bài toán của bạn. Liên hệ ngay để nhận bản phác thảo giải pháp và báo giá hoàn toàn miễn phí.</p>
              <a href="#" className="inline-flex items-center justify-between bg-[#1053F3] text-white px-[32px] py-[16px] rounded-full font-bold hover:bg-[#061153] hover:shadow-[0_15px_30px_rgba(16,83,243,0.3)] hover:-translate-y-1 transition-all duration-300 group">
                <span className="mr-[20px]">Đăng ký tư vấn miễn phí</span>
                <span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors group-hover:bg-white group-hover:text-[#061153]"><ArrowRight size={18} strokeWidth={2.5} /></span>
              </a>
            </motion.div>
            <motion.div variants={fadeInRightBig} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative h-[550px] w-full">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.04] z-0">
                {Array.from({ length: 16 }).map((_, i) => (<div key={i} className="border-r border-b border-[#061153]"></div>))}
              </div>
              <div className="absolute inset-0 z-10 flex gap-[24px] items-center px-4">
                <div className="w-1/2 space-y-[24px]">
                  <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/details01.webp" alt="Hình ảnh 1" className="w-full rounded-[30px] shadow-lg hover:scale-[1.02] transition-transform duration-500" />
                  <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/details03.webp" alt="Hình ảnh 3" className="w-full rounded-[30px] shadow-lg hover:scale-[1.02] transition-transform duration-500" />
                </div>
                <div className="w-1/2 space-y-[24px] -mt-[80px]">
                  <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/details02.webp" alt="Hình ảnh 2" className="w-full rounded-[30px] shadow-lg hover:scale-[1.02] transition-transform duration-500" />
                  <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/details04.webp" alt="Hình ảnh 4" className="w-[85%] rounded-[30px] shadow-lg hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[140px] h-[140px] bg-white rounded-full shadow-[0_20px_50px_rgba(16,83,243,0.2)] flex items-center justify-center border-8 border-[#F4F7FF]">
                <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/icon-handshake.png" className="w-[65px]" alt="Hợp tác" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}