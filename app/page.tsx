'use client';

import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  User, 
  LayoutTemplate, 
  ShoppingBag,
  Monitor,
  Settings,
  RefreshCw,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Heart,
  Zap,
  BarChart3,
  Megaphone,
  ChevronLeft,
  Search,
  SlidersHorizontal,
  Eye,
  ShoppingCart,
  Smartphone,
  Star,
  Download,
  Globe,
  Shield,
  Code,
  ArrowUpRight,
  LayoutDashboard,
  Palette,
  MousePointerClick,
  Sparkles,
  Type,
  Users,
  Layers,
  Bell,
  TrendingUp,ShieldCheck,
  Coffee, Laptop, Building2, Home as HomeIcon, MapPin, Sofa, BookOpen,
   MessageCircle, Award, Gift,
   HelpCircle, PhoneCall, Mail,
     Command, Plus, Minus, MessageSquare, ChevronRight, Layout
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  // State cho phần 4 (Builder & Admin)
  const [builderColor, setBuilderColor] = useState('blue');
  const [deviceMode, setDeviceMode] = useState('pc');
  const [activeFeature, setActiveFeature] = useState(0); // <-- Thêm dòng này
  
  const themeColors: Record<string, {main: string, light: string}> = {
    blue: { main: '#0066FF', light: '#eff6ff' },
    emerald: { main: '#00D68F', light: '#ecfdf5' },
    rose: { main: '#f43f5e', light: '#fff1f2' },
    amber: { main: '#f59e0b', light: '#fffbeb' },
  };
  // THÊM DÒNG NÀY CHO PHẦN 8 (Lĩnh vực)
  const [activeIndustry, setActiveIndustry] = useState(0);
  const faqs = [
    {
      question: 'Thiết kế web là gì?',
      answer: 'Thiết kế web là công việc tạo ra một trang web cho cá nhân, công ty, doanh nghiệp hoặc tổ chức. Có 2 phương thức chính để thiết kế web đó là thiết kế web tĩnh và thiết kế web động.'
    },
    { question: 'Thiết kế website có những dạng nào?', answer: 'Có nhiều dạng website như web bán hàng, web doanh nghiệp, landing page, blog, v.v.' },
    { question: 'Giá thiết kế website là bao nhiêu?', answer: 'Giá thiết kế website phụ thuộc vào yêu cầu tính năng và giao diện cụ thể của bạn.' },
    { question: 'Thiết kế trang web có tùy chỉnh được không?', answer: 'Có, bạn hoàn toàn có thể tùy chỉnh giao diện và tính năng theo ý muốn.' },
    { question: 'Có được dùng thử web trước khi dùng không?', answer: 'MTIEN SOLUTION cung cấp 7 ngày dùng thử miễn phí để bạn trải nghiệm dịch vụ.' },
    { question: 'Thiết kế website có chịu thuế GTGT không?', answer: 'Dịch vụ phần mềm và thiết kế website thường thuộc đối tượng không chịu thuế GTGT hoặc thuế suất 0% tùy quy định.' }
  ];
  

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="bg-[#F0F5FA] pt-8 pb-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Sub Navbar */}
          <div className="hidden md:flex items-center space-x-6 text-[15px] font-medium mb-16">
            <span className="font-bold text-gray-900 cursor-pointer">Kênh website</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Web bán hàng</span>
            <span className="text-[#0066FF] cursor-pointer">Web doanh nghiệp</span>
            <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Bảng giá</span>
            <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Giao diện</span>
            <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Ứng dụng</span>
            <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Khách hàng</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h1 className="text-[44px] md:text-[54px] font-bold text-[#1A1A1A] leading-[1.15] mb-6 relative">
                Giải pháp thiết kế website<br/>chuyên nghiệp
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -top-8 -right-4 bg-white px-4 py-2 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2"
                >
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D68F]"></span>
                  </span>
                  <span className="text-sm font-bold text-gray-700">#1 Nền tảng TMĐT</span>
                </motion.div>
              </h1>
              <p className="text-[18px] text-gray-600 mb-10">
                Phù hợp với tất cả doanh nghiệp, cửa hàng quy mô lớn, vừa & nhỏ
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <button className="bg-gradient-to-r from-[#00D68F] to-[#00E5A3] hover:from-[#00c280] hover:to-[#00d195] text-white rounded-full pl-8 pr-2 py-2 flex items-center gap-4 shadow-lg shadow-green-200/50 transition-all transform hover:scale-105">
                  <span className="font-bold text-[18px]">Dùng thử miễn phí</span>
                  <div className="bg-white text-black rounded-full p-2">
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </div>
                </button>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                      <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" fill className="object-cover" unoptimized />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-600 z-10">
                    230k+
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-[#00D68F]" />
                  <span>Không cần thẻ tín dụng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-[#00D68F]" />
                  <span>Hủy bất cứ lúc nào</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-[#00D68F]" />
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D6E6F5] rounded-full blur-3xl opacity-70"></div>
              
              {/* Main Browser Mockup */}
              <div className="relative w-full aspect-[16/10] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-10">
                {/* Browser Header */}
                <div className="absolute top-0 w-full h-10 bg-white border-b border-gray-100 flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="flex gap-2 text-gray-400">
                    <ChevronDown size={16} className="rotate-90" />
                    <ChevronDown size={16} className="-rotate-90" />
                  </div>
                  <div className="flex gap-3 text-gray-400">
                    <PlusCircle size={16} />
                    <Monitor size={16} />
                  </div>
                </div>
                {/* Browser Content (Placeholder Image matching the red banner) */}
                <div className="mt-10 w-full h-full relative bg-gray-50">
                   <Image src="https://picsum.photos/seed/yody/800/500" alt="Website Mockup" fill className="object-cover" unoptimized />
                   {/* Overlaying a red block to simulate the banner */}
                   <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-red-600 to-red-500 opacity-80 mix-blend-multiply"></div>
                </div>
              </div>

              {/* Floating Elements */}
              {/* Cart Icon */}
              <div className="absolute -right-6 top-1/3 bg-white rounded-full p-4 shadow-xl z-20 border border-gray-50">
                <div className="relative">
                  <div className="w-8 h-8 text-[#0066FF]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  </div>
                  <span className="absolute -top-2 -right-2 bg-[#00D68F] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">1</span>
                </div>
              </div>

              {/* Dashed Line (SVG) */}
              <svg className="absolute -right-8 bottom-12 w-32 h-32 z-10 text-[#0066FF] opacity-60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 10 C 90 40, 70 80, 10 90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round"/>
                <path d="M15 85 L 10 90 L 15 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Yellow arrow head */}
                <path d="M75 5 L 85 15 L 70 20 Z" fill="#FFBD2E" />
              </svg>

              {/* Product Card */}
              <div className="absolute -bottom-10 left-8 bg-white rounded-xl shadow-2xl p-3 flex items-center gap-4 z-20 border border-gray-100 w-[320px]">
                <div className="w-16 h-20 bg-yellow-100 rounded-lg overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/tshirt/100/150" alt="Áo thun" fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">Áo thun nữ</h4>
                  <p className="text-lg font-bold text-[#1A1A1A] mb-2">260.000đ</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button className="px-2 py-0.5 text-gray-500 hover:bg-gray-50">-</button>
                      <span className="px-2 py-0.5 text-sm font-medium border-x border-gray-200">1</span>
                      <button className="px-2 py-0.5 text-gray-500 hover:bg-gray-50">+</button>
                    </div>
                    <button className="bg-[#0066FF] text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-blue-700 transition-colors">
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section (Overlapping) */}
      <section className="relative -mt-24 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: User, 
              badge: <Heart className="w-5 h-5 text-[#00D68F] absolute bottom-0 right-0 bg-white rounded-full p-0.5" />,
              title: 'Được tin tưởng bởi', 
              value: '230,000+ khách hàng' 
            },
            { 
              icon: LayoutTemplate, 
              badge: <CheckCircle2 className="w-5 h-5 text-[#00D68F] absolute bottom-0 right-0 bg-white rounded-full p-0.5" />,
              title: 'Có sẵn', 
              value: '400+ giao diện đẹp, chuẩn SEO' 
            },
            { 
              icon: ShoppingBag, 
              badge: <PlusCircle className="w-5 h-5 text-[#00D68F] absolute bottom-0 right-0 bg-white rounded-full p-0.5" />,
              title: 'Đáp ứng', 
              value: '50+ lĩnh vực, ngành nghề' 
            }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#8A9BD8] to-[#4B5EAA] rounded-2xl p-8 text-white shadow-xl flex items-center gap-5"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 relative shadow-inner">
                <stat.icon size={30} className="text-[#4B5EAA]" strokeWidth={1.5} />
                {stat.badge}
              </div>
              <div>
                <p className="text-blue-100 text-[15px] italic mb-0.5">{stat.title}</p>
                <p className="font-bold text-[22px] leading-tight">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* 3. Features Section 1 - Compact High Density */}
      <section className="bg-[#001A5F] pt-20 pb-16 relative -mt-8 z-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#00288A] rounded-full blur-[100px] opacity-60"></div>
          <div className="absolute bottom-20 right-10 w-[300px] h-[300px] bg-[#00D68F] rounded-full blur-[100px] opacity-20"></div>
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 text-xs font-bold mb-4"
            >
              <Zap size={14} className="text-[#00D68F]" />
              <span className="uppercase tracking-wider">Hệ sinh thái tính năng</span>
            </motion.div>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-white mb-4 leading-tight">
              Sức mạnh vượt trội từ nền tảng <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-emerald-300">MTIEN SOLUTION</span>
            </h2>
            <p className="text-blue-100/80 text-[15px] md:text-base">Hệ thống cốt lõi được tối ưu hóa cho mọi mô hình kinh doanh, đảm bảo tốc độ, bảo mật và khả năng mở rộng không giới hạn.</p>
          </div>
          
          <div className="bg-white rounded-[28px] overflow-hidden shadow-2xl relative border border-slate-100">
            {/* Top Tabs Header - Thinner padding */}
            <div className="flex overflow-x-auto border-b border-slate-100 bg-slate-50/50 scrollbar-hide">
              {[
                { label: '+400 Giao diện', sub: 'Đa ngành nghề', active: true, icon: Monitor },
                { label: 'Tốc độ tối đa', sub: 'Tối ưu Core Web', active: false, icon: Zap },
                { label: 'Báo cáo Data', sub: 'Analytics Tracking', active: false, icon: BarChart3 },
                { label: 'Marketing', sub: 'Tích hợp CRM', active: false, icon: Megaphone }
              ].map((tab, idx) => (
                <div key={idx} className={`flex-1 min-w-[200px] p-4 lg:p-5 cursor-pointer border-r border-slate-100 last:border-0 relative transition-all group ${tab.active ? 'bg-white' : 'hover:bg-white'}`}>
                  {tab.active && <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-600"></div>}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      tab.active ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}>
                      <tab.icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className={`font-bold text-[14px] leading-tight mb-0.5 ${tab.active ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{tab.label}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{tab.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Main Content Area - Reduced Padding & Gaps */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                {/* Text & Features (Left: 5 cols) */}
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[11px] font-bold mb-4 border border-emerald-100">
                    <CheckCircle2 size={12} /> Cập nhật phiên bản mới nhất
                  </div>
                  <h3 className="text-[24px] md:text-[28px] font-extrabold text-slate-900 mb-3 leading-tight">
                    Giao diện chuẩn UX/UI, tối ưu chuyển đổi
                  </h3>
                  <p className="text-slate-600 text-[14px] mb-6 leading-relaxed">
                    Sở hữu kho giao diện khổng lồ thiết kế bởi chuyên gia. Cấu trúc chuẩn SEO giúp website dễ dàng leo top Google.
                  </p>
                  
                  {/* Density Grid - Tighter boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <Globe className="text-blue-600 mb-2" size={20} />
                      <h4 className="font-bold text-slate-900 text-[13px] mb-1">Chuẩn SEO Core</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Tự động tạo sitemap, tối ưu thẻ meta.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <Smartphone className="text-blue-600 mb-2" size={20} />
                      <h4 className="font-bold text-slate-900 text-[13px] mb-1">Mobile First</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Hiển thị mượt mà trên mọi thiết bị.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <Shield className="text-blue-600 mb-2" size={20} />
                      <h4 className="font-bold text-slate-900 text-[13px] mb-1">Bảo mật đa tầng</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Chứng chỉ SSL miễn phí, mã hóa dữ liệu.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <Code className="text-blue-600 mb-2" size={20} />
                      <h4 className="font-bold text-slate-900 text-[13px] mb-1">Mã nguồn tối ưu</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">Minify HTML/CSS/JS gọn nhẹ, tốc độ cao.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button className="bg-slate-900 hover:bg-blue-600 text-white rounded-xl px-6 py-3 font-bold text-[13px] transition-colors shadow-md flex items-center gap-2">
                      Xem kho giao diện <ArrowUpRight size={14} />
                    </button>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Hệ thống ổn định
                    </div>
                  </div>
                </div>

                {/* Visuals (Right: 7 cols) - Reduced Height */}
                <div className="lg:col-span-7 relative mt-8 lg:mt-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/60 to-emerald-50/60 rounded-full blur-3xl"></div>
                  
                  {/* Main Dashboard Image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 z-10 bg-white">
                    {/* Fake Browser Bar */}
                    <div className="bg-slate-100 px-3 py-2.5 flex items-center gap-2 border-b border-slate-200">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                      </div>
                      <div className="ml-3 bg-white/60 text-[10px] text-slate-500 px-3 py-1 rounded-md w-48 text-center font-mono border border-slate-200/50">
                        admin.mtiensolution.vn
                      </div>
                    </div>
                    {/* Giảm chiều cao ảnh */}
                    <div className="relative h-[280px] md:h-[380px] w-full bg-slate-50">
                       <Image src="https://picsum.photos/seed/dashboard_analytics/1000/700" alt="Dashboard Preview" fill className="object-cover object-left-top" unoptimized />
                    </div>
                  </div>
                  
                  {/* Floating SEO Badge */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 md:-right-6 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex flex-col gap-2 z-20 min-w-[130px]"
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center text-blue-600">
                        <Zap size={12} />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">99/100</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 mb-1">Điểm SEO</p>
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full w-[99%] rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Speed Badge */}
                  <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-4 md:-left-6 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-20"
                  >
                    <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                      <RefreshCw size={16} className="animate-spin-slow" />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Thời gian phản hồi</p>
                      <p className="text-xl font-black text-slate-900 leading-none">0.8<span className="text-xs text-slate-400 font-semibold ml-0.5">s</span></p>
                    </div>
                  </motion.div>

                  {/* Floating Tech Stack */}
                  <motion.div
                     animate={{ x: [0, -8, 0] }}
                     transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                     className="absolute top-1/2 -right-8 md:-right-10 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-md border border-slate-100 z-20 flex flex-col gap-2"
                  >
                    <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm" title="Next.js">N</div>
                    <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm" title="React">R</div>
                    <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm" title="Tailwind">T</div>
                  </motion.div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

       {/* 4. Features Section 2 - Ultra Realistic & Minimalist */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Soft Background Blurs */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* 1. Realistic Dashboard Visual (Left Side) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1 h-[550px] md:h-[650px] w-full bg-slate-50/50 rounded-[2.5rem] border border-slate-100/80 flex items-center justify-center p-6 md:p-10 overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.02)]"
            >
              {/* Dynamic Interactive Device */}
              <motion.div
                 layout
                 initial={false}
                 animate={{ 
                    width: deviceMode === 'pc' ? '100%' : '320px',
                    height: deviceMode === 'pc' ? '100%' : '560px',
                    borderRadius: deviceMode === 'pc' ? '16px' : '40px'
                 }}
                 transition={{ type: 'spring', bounce: 0.15, duration: 0.8 }}
                 className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-200/80 overflow-hidden flex flex-col relative z-10"
              >
                 {/* Fake Device Header */}
                 <motion.div layout className="h-10 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 z-20">
                    {deviceMode === 'pc' ? (
                       <div className="flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-rose-400 transition-colors"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-amber-400 transition-colors"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-emerald-400 transition-colors"></div>
                       </div>
                    ) : (
                       <div className="w-24 h-5 bg-slate-200 mx-auto rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2"></div>
                    )}
                 </motion.div>
                 
                 {/* 🌟 REALISTIC DASHBOARD CONTENT 🌟 */}
                 <motion.div layout className="flex-1 flex bg-slate-50/50 overflow-hidden">
                    {/* Sidebar (PC Only) */}
                    <AnimatePresence>
                      {deviceMode === 'pc' && (
                        <motion.div 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 64 }}
                          exit={{ opacity: 0, width: 0 }}
                          className="bg-white border-r border-slate-100 flex-col items-center py-4 gap-6 shrink-0 z-10 hidden md:flex"
                        >
                          <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-md">M</div>
                          <div className="flex flex-col gap-3 w-full px-3">
                            {[LayoutDashboard, ShoppingCart, Users, Layers, Settings].map((Icon, i) => (
                              <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300" 
                                style={i === 0 ? { backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main } : { color: '#94a3b8' }}>
                                <Icon size={16} strokeWidth={2.5} />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Main Dashboard Area */}
                    <motion.div layout className="flex-1 flex flex-col min-w-0">
                       {/* Topbar */}
                       <div className="h-12 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 shrink-0">
                          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-slate-400 w-1/2 max-w-[150px]">
                             <Search size={12}/> <span className="text-[10px] font-medium">Tìm kiếm...</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <Bell size={14} className="text-slate-400"/>
                             <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300"></div>
                          </div>
                       </div>
                       
                       {/* Dashboard Content */}
                       <div className="p-4 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-sm font-bold text-slate-800">Tổng quan</h3>
                              <p className="text-[10px] text-slate-500">Tháng này</p>
                            </div>
                            <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white transition-colors duration-500 shadow-sm" style={{ backgroundColor: themeColors[builderColor].main }}>
                              + Báo cáo
                            </button>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                             {[
                               { label: 'Doanh thu', val: '24.5M', inc: '+12%', icon: TrendingUp },
                               { label: 'Đơn hàng', val: '1,240', inc: '+8%', icon: ShoppingCart },
                               { label: 'Truy cập', val: '8.4K', inc: '-2%', icon: Users, hideMobile: true }
                             ].map((stat, i) => (
                               <div key={i} className={`bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2 ${stat.hideMobile && deviceMode === 'mobile' ? 'hidden md:flex' : 'flex'}`}>
                                  <div className="flex justify-between items-start">
                                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main }}>
                                      <stat.icon size={12} strokeWidth={3} />
                                    </div>
                                    <span className={`text-[9px] font-bold ${stat.inc.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.inc}</span>
                                  </div>
                                  <div>
                                    <div className="text-[10px] text-slate-500 font-medium mb-0.5">{stat.label}</div>
                                    <div className="text-sm font-black text-slate-800">{stat.val}</div>
                                  </div>
                               </div>
                             ))}
                          </div>

                          {/* Fake Chart Area */}
                          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
                             <div className="text-[11px] font-bold text-slate-700">Tăng trưởng</div>
                             <div className="flex items-end gap-1.5 h-16 w-full">
                                {[30, 50, 40, 80, 60, 45, 90].map((h, i) => (
                                   <div key={i} className="flex-1 rounded-sm transition-all duration-700 hover:opacity-80 cursor-pointer" 
                                      style={{ 
                                        height: `${h}%`, 
                                        backgroundColor: i === 6 ? themeColors[builderColor].main : themeColors[builderColor].light 
                                      }}>
                                   </div>
                                ))}
                             </div>
                          </div>

                          {/* Recent List */}
                          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-1">
                            {[1, 2, 3].map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-2 border-b border-slate-50 last:border-0">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-slate-100"></div>
                                  <div>
                                    <div className="text-[10px] font-bold text-slate-700">Đơn hàng #{1042 + i}</div>
                                    <div className="text-[8px] text-slate-400">2 phút trước</div>
                                  </div>
                                </div>
                                <div className="text-[10px] font-bold text-slate-600">450k</div>
                              </div>
                            ))}
                          </div>
                       </div>
                    </motion.div>
                 </motion.div>
              </motion.div>

              {/* FLOATING CONTROLS (CLICKABLE) */}
              {/* 1. Interactive Color Palette */}
              <motion.div 
                className="absolute top-6 left-4 md:left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 z-20"
              >
                <div className="flex gap-2">
                   {['blue', 'emerald', 'rose', 'amber'].map(color => (
                     <div 
                       key={color}
                       onClick={() => setBuilderColor(color)}
                       className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${builderColor === color ? 'scale-110 shadow-md' : 'hover:scale-110 opacity-60 hover:opacity-100'}`}
                       style={{ 
                         backgroundColor: themeColors[color].main,
                         boxShadow: builderColor === color ? `0 0 0 2px white, 0 0 0 3px ${themeColors[color].main}` : 'none'
                       }}
                     ></div>
                   ))}
                </div>
              </motion.div>

              {/* 2. Interactive Device Toggle */}
              <motion.div 
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-slate-700/50 flex items-center gap-1 z-20"
              >
                <button 
                   onClick={() => setDeviceMode('pc')}
                   className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${deviceMode === 'pc' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                   <Monitor size={14}/> <span className="hidden md:block">Desktop</span>
                </button>
                <button 
                   onClick={() => setDeviceMode('mobile')}
                   className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${deviceMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                   <Smartphone size={14}/> <span className="hidden md:block">Mobile</span>
                </button>
              </motion.div>
            </motion.div>
            
            {/* 2. Sleek Typography & Stepper (Right Side) */}
            <div className="order-1 lg:order-2 lg:pl-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-[36px] md:text-[48px] font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
                  Sáng tạo không rào cản. <br/>
                  <motion.span 
                    className="text-transparent bg-clip-text transition-colors duration-500"
                    style={{ backgroundImage: `linear-gradient(to right, ${themeColors[builderColor].main}, ${themeColors[builderColor].main}90)` }}
                  >
                    Quản trị tinh gọn.
                  </motion.span>
                </h2>
                <p className="text-slate-500 text-[18px] leading-relaxed max-w-lg">
                  Nền tảng được thiết kế tập trung vào tính hiệu quả. Bạn chỉ cần tập trung kinh doanh, công nghệ để chúng tôi lo.
                </p>
              </motion.div>
              
              {/* Minimalist Stepper / Accordion */}
              <div className="relative pl-6 md:pl-8 space-y-8 border-l-2 border-slate-100">
                {/* Highlight Line moving based on active Feature */}
                <motion.div 
                   className="absolute left-[-2px] w-[2px] rounded-full transition-colors duration-500"
                   animate={{ 
                     top: `${activeFeature * (100/3)}%`, 
                     height: '33.33%', 
                     backgroundColor: themeColors[builderColor].main 
                   }}
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {[
                  {
                    icon: MousePointerClick,
                    title: 'Trình kiến tạo trực quan (No-code)',
                    desc: 'Thao tác kéo thả đơn giản, chỉnh sửa nội dung, hình ảnh trực tiếp ngay trên giao diện như đang sử dụng Word. Thay đổi áp dụng Real-time.'
                  },
                  {
                    icon: LayoutDashboard,
                    title: 'Dashboard All-in-One',
                    desc: 'Đồng bộ quản lý sản phẩm, đơn hàng, khách hàng và doanh thu từ đa kênh (Website, Shopee, Facebook) trên một màn hình duy nhất.'
                  },
                  {
                    icon: Palette,
                    title: 'Cá nhân hóa thương hiệu',
                    desc: 'Thiết lập nhận diện thương hiệu (Màu sắc, Font chữ, Logo) chỉ với vài click chuột. Hệ thống tự động đồng bộ xuyên suốt toàn website.'
                  }
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setActiveFeature(idx)}
                    onClick={() => setActiveFeature(idx)}
                  >
                    {/* Stepper Dot */}
                    <motion.div 
                      className="absolute -left-[33px] md:-left-[41px] top-1 w-4 h-4 rounded-full border-4 border-white bg-slate-200 transition-colors duration-500 shadow-sm"
                      animate={{ backgroundColor: activeFeature === idx ? themeColors[builderColor].main : '#e2e8f0' }}
                    />
                    
                    <h4 className={`text-xl font-bold mb-2 transition-colors duration-500 ${activeFeature === idx ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {feature.title}
                    </h4>
                    
                    <motion.div 
                       initial={false}
                       animate={{ 
                         height: activeFeature === idx ? 'auto' : 0, 
                         opacity: activeFeature === idx ? 1 : 0,
                         marginTop: activeFeature === idx ? 8 : 0
                       }}
                       className="overflow-hidden"
                    >
                       <p className="text-[15px] leading-relaxed text-slate-500 max-w-md">
                          {feature.desc}
                       </p>
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-12 text-white rounded-full px-8 py-4 font-bold text-[15px] shadow-lg transition-all duration-500 flex items-center gap-3"
                style={{ 
                  backgroundColor: themeColors[builderColor].main,
                  boxShadow: `0 10px 25px -5px ${themeColors[builderColor].main}60`
                }}
              >
                Trải nghiệm miễn phí <ArrowRight size={18} />
              </motion.button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Templates Section - High Density */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header & Stats */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100/80 text-blue-700 text-xs font-bold mb-4 uppercase tracking-wider"
              >
                <LayoutTemplate size={14} />
                <span>Kho giao diện (Template Store)</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[32px] md:text-[40px] font-extrabold text-slate-900 mb-4 leading-tight"
              >
                Khám phá +500 giao diện <br className="hidden md:block"/> chuẩn SEO, tối ưu chuyển đổi
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 text-[16px]"
              >
                Hệ sinh thái giao diện đa ngành nghề được thiết kế bởi các chuyên gia UX/UI hàng đầu. Dễ dàng tùy chỉnh, tương thích mọi thiết bị và tích hợp sẵn các công cụ Marketing.
              </motion.p>
            </div>
            
            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 border-l-2 border-slate-200 pl-6 md:flex"
            >
              <div>
                <p className="text-3xl font-black text-slate-900">500+</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Giao diện sẵn sàng</p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-600">12k+</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Khách hàng tin dùng</p>
              </div>
            </motion.div>
          </div>
          
          {/* Toolbar: Search, Filters & Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {['Tất cả', 'Bán hàng', 'Doanh nghiệp', 'Landing Page', 'Blog/Tin tức'].map((filter, idx) => (
                <button 
                  key={idx}
                  className={`px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all whitespace-nowrap ${
                    idx === 0 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            {/* Search & Sort */}
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Tìm giao diện..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-all">
                <SlidersHorizontal size={16} />
                <span className="hidden sm:block">Lọc</span>
              </button>
            </div>
          </div>
          
          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Dualeo Supermarket', category: 'Siêu thị / Tạp hóa', price: '1,500,000 đ', oldPrice: '2,500,000 đ', img: 'fashion', rating: 4.9, sales: '1.2k', tags: ['Bán chạy', 'Mới'] },
              { name: 'Organic Sea Fruits', category: 'Thực phẩm sạch', price: '1,500,000 đ', oldPrice: '2,000,000 đ', img: 'food', rating: 4.8, sales: '850', tags: ['Tốc độ cao'] },
              { name: 'Box Home Decor', category: 'Nội thất / Kiến trúc', price: '800,000 đ', oldPrice: '1,200,000 đ', img: 'decor', rating: 5.0, sales: '2.1k', tags: ['Premium'] }
            ].map((template, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Section */}
                <div className="relative h-[240px] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <Image src={`https://picsum.photos/seed/${template.img}/600/400`} alt={template.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" unoptimized />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {template.tags.map((tag, i) => (
                      <span key={i} className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${i === 0 ? 'bg-rose-500' : 'bg-blue-600'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm transition-all z-10">
                    <Heart size={16} />
                  </button>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                     <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg" title="Xem trước">
                       <Eye size={20} />
                     </button>
                     <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-emerald-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg" title="Thêm vào giỏ">
                       <ShoppingCart size={20} />
                     </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Meta: Category & Devices */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md flex items-center gap-1.5">
                      <LayoutTemplate size={12} /> {template.category}
                    </span>
                    <div className="flex text-slate-400 gap-1.5">
                      <div title="Desktop responsive">
                        <Monitor size={14} />
                      </div>
                      <div title="Mobile responsive">
                        <Smartphone size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-slate-900 mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </h3>

                  {/* Ratings & Sales */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center text-amber-400">
                      <Star size={12} className="fill-current" />
                      <span className="ml-1 font-semibold text-slate-700">{template.rating}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <div className="flex items-center gap-1">
                      <Download size={12} /> {template.sales} lượt mua
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <Zap size={12} className="fill-current" /> Speed 99/100
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-1 mb-5 text-[13px] text-slate-600">
                    <li className="flex items-start gap-1.5"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" /> Chuẩn SEO</li>
                    <li className="flex items-start gap-1.5"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" /> Tích hợp giỏ hàng</li>
                    <li className="flex items-start gap-1.5"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" /> Responsive 100%</li>
                    <li className="flex items-start gap-1.5"><CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" /> Code tối ưu</li>
                  </ul>

                  {/* Price & Actions */}
                  <div className="mt-auto flex items-end justify-between pt-2">
                    <div>
                      <p className="text-xs text-slate-400 line-through mb-0.5">{template.oldPrice}</p>
                      <p className="font-extrabold text-xl text-emerald-600 leading-none">{template.price}</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
                      Chi tiết <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Footer Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-200 pt-8 mt-4">
            <p className="text-slate-500 text-sm">Không tìm thấy mẫu phù hợp?</p>
            <button className="px-6 py-2.5 rounded-full bg-blue-50 text-blue-700 font-bold hover:bg-blue-600 hover:text-white transition-all text-sm">
              Yêu cầu thiết kế riêng
            </button>
            <span className="hidden sm:block text-slate-300">|</span>
            <button className="inline-flex items-center gap-2 text-slate-700 font-bold hover:text-blue-600 transition-all group text-sm">
              Xem toàn bộ thư viện 
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>


      {/* 6. App Store Section - Deep Blue Vibrant Theme */}
      <section className="py-24 md:py-32 bg-[#021253] relative overflow-hidden">
        {/* Majestic Glowing Background to match the image */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-[#0044FF] rounded-full blur-[150px] opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#0022AA] rounded-full blur-[120px] opacity-40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content: Typography & List */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-[36px] md:text-[48px] font-bold text-white leading-[1.2] mb-10 tracking-tight">
                Tăng tốc cho website với kho <br className="hidden md:block" /> ứng dụng mạnh mẽ của MTIEN SOLUTION
              </h2>
              
              <ul className="space-y-6 mb-12">
                {[
                  'Hơn 100 ứng dụng đa dạng từ hỗ trợ bán hàng, marketing, tài chính thanh toán, vận chuyển, quản trị website đến chăm sóc khách hàng, phù hợp với mọi ngành nghề kinh doanh.',
                  'Các ứng dụng tích hợp trên website này giúp các chủ shop tăng doanh số bán hàng, tăng doanh thu trên từng đơn hàng, thúc đẩy khách mua hàng nhiều hơn cũng như quản trị hệ thống website một cách đơn giản nhất.'
                ].map((text, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex gap-4 items-start"
                  >
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="text-[#00D68F]" size={24} strokeWidth={2} />
                    </div>
                    <span className="text-white/90 text-[15px] md:text-[16px] leading-relaxed font-medium">
                      {/* Gạch chân nhấn mạnh giống trong ảnh thiết kế */}
                      {idx === 0 ? (
                        <>
                          <span className="underline decoration-[#00D68F] underline-offset-4">Hơn 100 ứng dụng</span> đa dạng từ hỗ trợ bán hàng, marketing, tài chính thanh toán, vận chuyển, quản trị website đến chăm sóc khách hàng, phù hợp với mọi ngành nghề kinh doanh.
                        </>
                      ) : text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Right Visuals: Laptop & Floating Icons */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center"
            >
              {/* Laptop Image Mockup */}
              <div className="relative w-full max-w-[550px] aspect-[4/3] z-10">
                <Image 
                  src="https://picsum.photos/seed/laptop_dashboard/800/600" 
                  alt="Laptop Mockup" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                  unoptimized 
                />
              </div>
              
              {/* Floating App Icons (Matching the vibrant colors from the image) */}
              
              {/* 1. Top Center (Blue/Zalo) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-[5%] left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center z-20 border border-white/10"
              >
                <MessageCircle size={28} className="text-blue-500" fill="currentColor" />
              </motion.div>
              
              {/* 2. Top Right (Search - Teal) */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute top-[20%] right-[5%] w-12 h-12 bg-[#005B7C] text-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center z-20 border border-white/10"
              >
                 <Search size={20} strokeWidth={3} />
              </motion.div>
              
              {/* 3. Middle Left (Gold Badge) */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                className="absolute top-[40%] left-[5%] w-12 h-12 bg-[#C2A32B] text-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center z-20 border border-white/10"
              >
                <Award size={24} />
              </motion.div>
              
              {/* 4. Bottom Left (Red Gift) */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[20%] left-[15%] w-14 h-14 bg-[#FF3B00] text-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center z-20 border border-white/10"
              >
                 <Gift size={24} />
              </motion.div>
              
              {/* 5. Bottom Right (Orange Chart) */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[15%] right-[10%] w-14 h-14 bg-[#FF8C00] text-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center z-20 border border-white/10"
              >
                 <BarChart3 size={24} />
              </motion.div>

            </motion.div>
          </div>

          {/* Centered Bottom CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
             <button className="bg-[#00D68F] hover:bg-[#00c280] text-[#021253] rounded-full pl-8 pr-2 py-2 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,214,143,0.3)] transition-all transform hover:scale-105 group">
                <span className="font-bold text-[16px]">Dùng thử miễn phí</span>
                <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                  <ArrowRight size={20} strokeWidth={2.5} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
             </button>
          </motion.div>
        </div>
      </section>

      {/* 7. Pricing Section - Exact Match UI */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A]">
              Bảng giá dịch vụ thiết kế website MTIEN SOLUTION
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[850px] mx-auto mb-12 items-center">
            {/* Standard Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[20px] p-8 md:p-10 border border-[#0066FF] flex flex-col h-full shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
            >
              <h3 className="text-[28px] font-bold text-[#1A1A1A] mb-2">Web Standard</h3>
              <p className="text-gray-500 text-[15px] mb-8">Website bán hàng chuyên nghiệp</p>
              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-[44px] font-extrabold text-[#FF6B00] leading-none">499.000đ</span>
                <span className="text-gray-500 font-medium">/tháng</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Giao diện chuẩn SEO', 'Băng thông không giới hạn', 'Bảo mật SSL miễn phí', 'Hỗ trợ 24/7'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 className="text-[#00D68F]" size={20} strokeWidth={2} />
                    <span className="text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white border border-[#0066FF] text-[#0066FF] hover:bg-blue-50 py-3.5 rounded-xl font-bold text-[15px] transition-colors mt-auto">
                Dùng thử 7 ngày
              </button>
            </motion.div>
            
            {/* Omni Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#001c54] rounded-[20px] p-8 md:p-10 shadow-xl flex flex-col relative md:scale-105 z-10 text-white border border-[#002a7a]"
            >
              <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-[#FF8C00] text-white px-6 py-2 rounded-full text-[13px] font-bold shadow-md">
                Phổ biến nhất
              </div>
              <h3 className="text-[28px] font-bold text-white mb-2">Omni</h3>
              <p className="text-blue-100/70 text-[15px] mb-8">Quản lý và bán hàng hợp kênh</p>
              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-[44px] font-extrabold text-[#00D68F] leading-none">899.000đ</span>
                <span className="text-white/80 font-medium text-[15px]">/tháng</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Mọi tính năng của Web Standard', 'Bán hàng trên Facebook, Sàn TMĐT', 'Quản lý kho hàng tập trung', 'Tích hợp vận chuyển, thanh toán'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 className="text-[#00D68F]" size={20} strokeWidth={2} />
                    <span className="text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#00D68F] hover:bg-[#00c280] text-white py-3.5 rounded-xl font-bold text-[15px] transition-colors mt-auto shadow-lg shadow-[#00D68F]/20">
                Dùng thử 7 ngày
              </button>
            </motion.div>
          </div>
          
          <div className="text-center">
            <a href="#" className="inline-flex items-center gap-2 text-[#0066FF] font-bold hover:underline text-[15px]">
              Chi tiết giá thiết kế web tại MTIEN SOLUTION <ArrowRight size={16} className="transform translate-y-px" />
            </a>
          </div>
        </div>
      </section>
      {/* 8. Industry Section - Apple-like Minimalism (Refined Colors) */}
      <section className="py-24 md:py-32 bg-[#FBFBFD] relative overflow-hidden">
        {/* Rất nhẹ: Một vầng sáng mờ ảo ở góc để tạo độ sâu, không bị phẳng lì */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">
          
          {/* 🌟 APPLE-STYLE HEADER 🌟 */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[12px] font-bold mb-6 shadow-sm"
            >
              <LayoutTemplate size={14} className="text-[#00D68F]" />
              <span className="uppercase tracking-[0.1em]">Giao diện đa ngành</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[42px] md:text-[60px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.05] mb-6"
            >
              Thiết kế độc bản. <br/>
              <span className="text-slate-400">Dành riêng cho bạn.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[19px] md:text-[22px] text-[#86868B] tracking-tight leading-relaxed max-w-2xl mx-auto"
            >
              Hệ sinh thái giao diện được chế tác tinh xảo, tối ưu chuyển đổi cho từng mô hình kinh doanh đặc thù.
            </motion.p>
          </div>

          {/* 🌟 BORDERLESS ACCORDION GALLERY 🌟 */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full h-[650px] md:h-[550px]">
            {[
              { name: 'Mỹ phẩm & Beauty', subtitle: 'Sang trọng', icon: Sparkles, img: 'cosmetics_light' },
              { name: 'Thực phẩm sạch', subtitle: 'Tươi mới', icon: Coffee, img: 'organic_food' },
              { name: 'Đồ công nghệ', subtitle: 'Hiện đại', icon: Laptop, img: 'tech_gadget' },
              { name: 'Khách sạn', subtitle: 'Đẳng cấp', icon: Building2, img: 'hotel_resort' },
              { name: 'Gia dụng', subtitle: 'Tiện nghi', icon: HomeIcon, img: 'home_appliance_light' },
              { name: 'Bất động sản', subtitle: 'Không gian sống', icon: MapPin, img: 'real_estate_light' },
              { name: 'Nội thất', subtitle: 'Tối giản', icon: Sofa, img: 'modern_furniture' },
              { name: 'Sách & VPP', subtitle: 'Tri thức', icon: BookOpen, img: 'bookstore_light' }
            ].map((industry, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveIndustry(idx)}
                onClick={() => setActiveIndustry(idx)}
                className={`group relative overflow-hidden rounded-[28px] md:rounded-[36px] cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-end
                  ${activeIndustry === idx 
                    ? 'flex-[10] md:flex-[12] bg-white shadow-2xl md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]' 
                    : 'flex-[2] md:flex-[1.5] bg-[#F2F2F7] hover:bg-slate-200'
                  }
                `}
              >
                {/* Image: Fade in vividly when active */}
                <Image 
                  src={`https://picsum.photos/seed/${industry.img}/800/1000`} 
                  alt={industry.name}
                  fill 
                  className={`object-cover transition-all duration-1000 origin-center
                    ${activeIndustry === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                  `} 
                  unoptimized 
                />

                {/* 1. STATE ĐANG ĐÓNG (INACTIVE) */}
                <div className={`absolute inset-0 flex flex-row md:flex-col items-center justify-start md:py-10 px-4 md:px-0 transition-opacity duration-500 ${activeIndustry === idx ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  {/* Soft Icon Circle */}
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white text-slate-400 flex items-center justify-center mb-0 md:mb-8 mr-4 md:mr-0 group-hover:text-[#00D68F] transition-colors duration-300 shadow-sm">
                    <industry.icon size={22} strokeWidth={1.5} />
                  </div>
                  {/* Vertical Text */}
                  <span className="hidden md:block font-bold text-[#86868B] tracking-wider text-[14px] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap group-hover:text-[#1D1D1F] transition-colors duration-300">
                    {industry.name}
                  </span>
                  <span className="md:hidden font-bold text-[#86868B] text-[15px] whitespace-nowrap">
                    {industry.name}
                  </span>
                </div>

                {/* 2. STATE ĐANG MỞ (ACTIVE) - Refined Frosted Glass */}
                <div 
                  className={`absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${activeIndustry === idx ? 'translate-y-0 opacity-100 delay-150' : 'translate-y-12 opacity-0 pointer-events-none'}
                  `}
                >
                   <div className="p-6 md:p-7 rounded-[28px] bg-white/80 backdrop-blur-xl border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                     <div>
                        <span className="block text-[#00D68F] text-[12px] font-black tracking-[0.1em] uppercase mb-1.5">
                          {industry.subtitle}
                        </span>
                        <h3 className="text-2xl md:text-[32px] font-bold text-[#1D1D1F] tracking-tight leading-none">
                          {industry.name}
                        </h3>
                     </div>
                     {/* Elegant Dark Button */}
                     <button className="self-start md:self-auto shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#1D1D1F] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
                        <ArrowRight size={22} strokeWidth={2} />
                     </button>
                   </div>
                </div>

              </div>
            ))}
          </div>
          
          {/* Apple-style Link CTA - Subtle Grey to Blue */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24 text-center"
          >
            <p className="text-[#86868B] text-[17px] mb-4 font-medium">Bạn muốn xem thêm nhiều hơn?</p>
            <a href="#" className="text-[18px] md:text-[20px] font-semibold text-[#0066CC] hover:text-[#0044BB] transition-colors inline-flex items-center gap-1.5 group">
              Khám phá thư viện +400 giao diện
              <ChevronRight size={18} strokeWidth={2.5} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </section>
      {/* 9. Clients / Social Proof Section */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
        {/* Clean Ambient Center Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-50/80 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Trust Rating Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
              <div className="flex gap-0.5 text-[#FFB800]">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <span className="text-[12px] font-bold text-slate-700 flex items-center gap-1.5">
                4.9/5 từ <span className="text-[#0066FF]">10.000+</span> đánh giá
              </span>
            </div>
          </motion.div>

          {/* Majestic Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] md:text-[48px] font-black text-slate-900 mb-5 tracking-tight leading-[1.15]"
          >
            Thiết kế website không khó. <br className="hidden md:block"/>
            Đã có <span className="text-[#0066FF]">MTIEN SOLUTION</span> lo.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-[16px] md:text-[18px] mb-14 max-w-2xl mx-auto leading-relaxed"
          >
            Tự hào là bệ phóng công nghệ, mang đến giải pháp chuyển đổi số toàn diện cho hơn <strong className="text-slate-900 font-black">+230.000</strong> doanh nghiệp và chủ shop trên toàn quốc.
          </motion.p>
          
          {/* Premium Logo Line-up */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative"
          >
            {/* Fade edges for wide screens */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 hidden md:block"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 hidden md:block"></div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-20 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 cursor-pointer">
              {[
                { id: 1, name: 'Client A' },
                { id: 2, name: 'Client B' },
                { id: 3, name: 'Client C' },
                { id: 4, name: 'Client D' },
                { id: 5, name: 'Client E' },
                { id: 6, name: 'Client F' }
              ].map((client, idx) => (
                <div 
                  key={client.id} 
                  className="w-24 h-10 md:w-32 md:h-12 relative transition-transform duration-300 hover:scale-110"
                >
                  {/* Sử dụng text thay thế nếu ảnh Picsum không tải chuẩn logo, 
                      ở dự án thực tế bạn sẽ thay src bằng URL logo PNG trong suốt của đối tác */}
                  <Image 
                    src={`https://picsum.photos/seed/techlogo${client.id}/200/100`} 
                    alt={client.name} 
                    fill 
                    className="object-contain mix-blend-multiply opacity-80" 
                    unoptimized 
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trust Guarantee Note */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-2 text-[13px] font-bold text-slate-400"
          >
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>Cam kết đồng hành và hỗ trợ kỹ thuật trọn đời 24/7</span>
          </motion.div>

        </div>
      </section>

      {/* 10. FAQ Section - Detailed Knowledge Base Style */}
      <section className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
        {/* Architectural Background Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAxMDIsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-60"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* 🌟 LEFT COLUMN: Context, Search & Sticky Helpdesk 🌟 */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 text-[12px] font-bold mb-6 w-fit"
              >
                <HelpCircle size={14} className="text-[#0066FF]" />
                <span className="uppercase tracking-wider">Trung tâm trợ giúp</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[36px] md:text-[44px] font-black text-slate-900 leading-[1.15] tracking-tight mb-4"
              >
                Giải đáp nhanh <br />
                <span className="text-[#0066FF]">mọi thắc mắc</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-[16px] leading-relaxed mb-8"
              >
                Tìm hiểu chi tiết về quy trình triển khai, tính năng nền tảng và chính sách hỗ trợ của chúng tôi.
              </motion.p>

              {/* Fake Search Bar - Adds immense detail and tech feel */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative group mb-12"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066FF] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Nhập từ khóa cần tìm..." 
                  className="w-full bg-white border border-slate-200 focus:border-[#0066FF] focus:ring-4 focus:ring-blue-50 rounded-xl py-3.5 pl-12 pr-16 text-[15px] outline-none shadow-sm transition-all" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1.5 rounded border border-slate-200">
                  <Command size={12} /> K
                </div>
              </motion.div>
              
              {/* Premium Helpdesk Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden"
              >
                {/* Visual avatars */}
                <div className="flex -space-x-3 mb-6">
                  {[1, 2, 3].map((avatar) => (
                    <div key={avatar} className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm">
                       <Image src={`https://i.pravatar.cc/100?img=${avatar + 30}`} alt="Support Team" fill className="object-cover" unoptimized />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-50 text-[#0066FF] flex items-center justify-center text-[10px] font-bold shadow-sm z-10">
                    <MessageSquare size={16} />
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-2">Vẫn cần hỗ trợ thêm?</h3>
                <p className="text-slate-500 text-[14px] mb-6">Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn 1:1 cho dự án của bạn.</p>
                
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-slate-900 hover:bg-[#0066FF] text-white py-3 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-md">
                    <PhoneCall size={16} /> Liên hệ Hotline: 1900 xxxx
                  </button>
                  <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 py-3 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2">
                    <Mail size={16} className="text-slate-400" /> Gửi yêu cầu qua Email
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* 🌟 RIGHT COLUMN: Detailed Accordion 🌟 */}
            <div className="lg:col-span-7 pt-4 lg:pt-0">
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className={`group bg-white rounded-[20px] transition-all duration-300 border ${
                      activeFaq === idx 
                        ? 'border-[#0066FF] shadow-[0_10px_40px_rgba(0,102,255,0.08)] ring-4 ring-blue-50/50 relative z-10' 
                        : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full px-6 py-5 md:px-8 md:py-6 text-left flex justify-between items-center focus:outline-none"
                    >
                      <span className={`font-bold text-[16px] md:text-[18px] pr-6 transition-colors ${
                        activeFaq === idx ? 'text-[#0066FF]' : 'text-slate-900 group-hover:text-[#0066FF]'
                      }`}>
                        {faq.question}
                      </span>
                      {/* Rotating Plus/Minus Icon */}
                      <div className={`shrink-0 relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeFaq === idx 
                          ? 'bg-[#0066FF] text-white rotate-180 shadow-md shadow-blue-500/30' 
                          : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0066FF]'
                      }`}>
                        {activeFaq === idx ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                            {/* Decorative Line inside expanded content */}
                            <div className="w-full h-px bg-gradient-to-r from-slate-100 via-slate-200 to-transparent mb-6"></div>
                            
                            <p className="text-slate-600 text-[15px] md:text-[16px] leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            {/* Detailed Micro-interaction: Helpful feedback */}
                            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-50">
                               <span className="text-[13px] font-medium text-slate-400">Câu trả lời này có hữu ích không?</span>
                               <div className="flex gap-2">
                                 <button className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 text-[12px] font-bold transition-colors border border-slate-100 hover:border-emerald-200">
                                   👍 Có, rất hữu ích
                                 </button>
                                 <button className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 text-[12px] font-bold transition-colors border border-slate-100 hover:border-rose-200">
                                   👎 Không hẳn
                                 </button>
                               </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Bottom CTA - Compact & Minimalist Apple Style */}
      <section className="py-16 md:py-20 bg-[#FBFBFD] relative overflow-hidden border-t border-slate-100">
        {/* Very Subtle Glows - Chỉ là những điểm nhấn cực nhẹ */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-50/50 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            
            {/* 1. Minimalist Header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-[32px] md:text-[44px] font-semibold text-[#1D1D1F] tracking-tight leading-tight mb-4">
                Khởi đầu mới. <span className="text-slate-400">Ngay hôm nay.</span>
              </h2>
              <p className="text-[#86868B] text-[16px] md:text-[18px] mb-10 tracking-tight font-medium">
                Dùng thử miễn phí <span className="text-[#0066FF]">7 ngày</span>. Thiết lập cửa hàng chỉ trong vài phút.
              </p>
            </motion.div>

            {/* 2. Compact Conversational Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-lg relative group"
            >
              <div className="relative bg-white p-1.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center border border-slate-200 focus-within:border-[#0066FF] focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
                <input 
                  type="text" 
                  placeholder="Tên website của bạn..." 
                  className="flex-1 bg-transparent px-6 py-2.5 text-[#1D1D1F] text-[15px] md:text-[16px] outline-none placeholder:text-slate-400 font-medium"
                />
                <button className="bg-[#1D1D1F] hover:bg-black text-white px-6 py-2.5 rounded-full font-bold text-[14px] transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap group/btn">
                  Bắt đầu ngay
                  <ArrowRight size={16} strokeWidth={2.5} className="transform group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* 3. Human Trust Note - Gọn gàng bên dưới */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex items-center gap-5 text-[12px] font-bold text-slate-400 uppercase tracking-widest"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" /> No credit card
              </span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" /> Setup in 5 mins
              </span>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
