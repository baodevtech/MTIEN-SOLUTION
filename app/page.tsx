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
  ChevronLeft
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

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
      
      {/* 3. Features Section 1 */}
      <section className="bg-[#001A5F] pt-32 pb-24 relative -mt-16 z-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#00288A] rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#00D68F] rounded-full blur-[100px] opacity-20"></div>
          <svg className="absolute top-40 right-20 w-24 h-24 text-white/5" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="10" cy="10" r="2" />
            <circle cx="30" cy="10" r="2" />
            <circle cx="50" cy="10" r="2" />
            <circle cx="70" cy="10" r="2" />
            <circle cx="90" cy="10" r="2" />
            <circle cx="10" cy="30" r="2" />
            <circle cx="30" cy="30" r="2" />
            <circle cx="50" cy="30" r="2" />
            <circle cx="70" cy="30" r="2" />
            <circle cx="90" cy="30" r="2" />
            <circle cx="10" cy="50" r="2" />
            <circle cx="30" cy="50" r="2" />
            <circle cx="50" cy="50" r="2" />
            <circle cx="70" cy="50" r="2" />
            <circle cx="90" cy="50" r="2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
            >
              <Zap size={16} className="text-[#00D68F]" />
              <span>Tính năng vượt trội</span>
            </motion.div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-4">
              Thiết kế website tại MTIEN SOLUTION, chúng tôi có...
            </h2>
          </div>
          
          <div className="bg-white rounded-[24px] overflow-hidden shadow-2xl p-8 md:p-12 relative">
            {/* Subtle pattern inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>
            
            {/* Tabs */}
            <div className="flex justify-between mb-12">
              {[
                { label: '+400 giao diện đẹp', active: true, icon: Monitor },
                { label: 'Tăng tốc độ tải trang', active: false, icon: Zap },
                { label: 'Báo cáo Analytics', active: false, icon: BarChart3 },
                { label: 'Tối ưu Marketing', active: false, icon: Megaphone }
              ].map((tab, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center cursor-pointer group relative">
                  <div className={`w-16 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    tab.active ? 'bg-[#0066FF] text-white' : 'bg-white border border-gray-200 text-gray-300 group-hover:border-[#0066FF] group-hover:text-[#0066FF]'
                  }`}>
                    <tab.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className={`text-[15px] font-medium mb-4 transition-colors ${
                    tab.active ? 'text-[#1A1A1A]' : 'text-gray-400 group-hover:text-[#1A1A1A]'
                  }`}>
                    {tab.label}
                  </span>
                  <div className={`absolute bottom-0 left-0 w-full h-[2px] transition-colors ${
                    tab.active ? 'bg-[#00D68F] z-10' : 'bg-gray-100'
                  }`}></div>
                </div>
              ))}
            </div>
            
            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-[24px] font-bold text-[#1A1A1A] mb-6 leading-tight">
                  Giao diện chuẩn SEO, đa dạng ngành nghề, nội dung
                </h3>
                <ul className="space-y-5 mb-10">
                  {[
                    'Mọi giao diện tại MTIEN SOLUTION được thiết kế hiện đại, tối ưu chất lượng dựa theo tiêu chí xếp hạng và đánh giá của các công cụ tìm kiếm',
                    'Dịch vụ thiết kế website MTIEN SOLUTION cung cấp giao diện đảm bảo UX-UI đáp ứng hầu hết tất cả nhu cầu của khách hàng với hơn 50 ngành nghề, lĩnh vực khác nhau.',
                    'Tất cả các giao diện sử dụng công nghệ Responsive, đồng bộ hiển thị tất cả thiết bị: PC, Laptop, Table & Mobile.'
                  ].map((text, idx) => (
                    <li key={idx} className="flex gap-4 text-gray-700 text-[15px] leading-relaxed">
                      <CheckCircle2 className="text-[#00D68F] shrink-0 mt-0.5" size={20} strokeWidth={2} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <button className="bg-gradient-to-r from-[#00D68F] to-[#00E5A3] hover:from-[#00c280] hover:to-[#00d195] text-white rounded-full pl-8 pr-2 py-2 flex items-center gap-4 shadow-lg shadow-green-200/50 transition-all transform hover:scale-105 w-fit">
                  <span className="font-bold text-[16px]">Dùng thử miễn phí</span>
                  <div className="bg-white text-black rounded-full p-1.5">
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </div>
                </button>
              </div>
              <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-green-50 rounded-full blur-3xl opacity-50"></div>
                <Image src="https://picsum.photos/seed/responsive/800/600" alt="Responsive Design" fill className="object-contain mix-blend-multiply relative z-10" unoptimized />
                
                {/* Floating SEO Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-10 right-0 bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#0066FF]">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">Chuẩn SEO</p>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#00D68F]"></div>)}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Speed Badge */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 left-0 bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-[#00D68F]">
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">Tốc độ tải</p>
                    <p className="text-xs text-gray-500 font-medium">&lt; 1 giây</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section 2 */}
      <section className="py-24 bg-[#F0F5FA] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
          <svg className="absolute bottom-10 left-10 w-32 h-32 text-blue-100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10,50 Q50,10 90,50 T170,50" strokeDasharray="5,5" />
            <path d="M10,70 Q50,30 90,70 T170,70" strokeDasharray="5,5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 text-[#0066FF] text-sm font-bold mb-6 shadow-sm border border-blue-200/50"
            >
              <Settings size={16} />
              <span className="uppercase tracking-wider">MTIEN SOLUTION</span>
            </motion.div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight mb-4">
              Quản trị đơn giản, tự điều chỉnh web dễ dàng
            </h2>
            <p className="text-gray-600 text-[18px] max-w-3xl mx-auto font-medium">
              CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ MINH TIẾN mang đến hệ thống quản trị mạnh mẽ, giúp bạn làm chủ website hoàn toàn.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[500px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/50 to-green-100/50 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl border-[8px] border-white/50 backdrop-blur-sm">
                <Image src="https://picsum.photos/seed/dashboard/800/800" alt="Dashboard" fill className="object-cover z-10" unoptimized />
              </div>
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-1/3 -right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center text-[#00D68F] shadow-inner">
                  <CheckCircle2 size={20} strokeWidth={2.5} />
                </div>
                <p className="text-[15px] font-bold text-[#1A1A1A]">Đã lưu thay đổi</p>
              </motion.div>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative p-4">
              {/* Connecting lines between cards (decorative) */}
              <div className="absolute inset-0 border-2 border-dashed border-blue-300/40 rounded-[40px] pointer-events-none hidden sm:block"></div>
              
              {[
                { icon: Monitor, title: 'Hệ thống quản lý rõ ràng,\nthao tác ngắn gọn' },
                { icon: Settings, title: 'Tự điều chỉnh giao diện\ntheo ý muốn' },
                { icon: RefreshCw, title: 'Website tự động nâng cấp,\nmiễn phí bảo trì' },
                { icon: PlusCircle, title: 'Dễ dàng tự thêm/bớt\ncác tính năng' }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-[#001A5F] to-[#00287A] rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-[0_20px_40px_rgba(0,102,255,0.2)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-white/10 relative overflow-hidden"
                >
                  {/* Subtle highlight effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-inner relative z-10">
                    <feature.icon size={32} className="text-[#00D68F]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-[16px] text-white leading-snug whitespace-pre-line relative z-10">{feature.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button className="bg-[#00D68F] hover:bg-[#00c280] text-[#1A1A1A] rounded-full pl-8 pr-2 py-2 flex items-center gap-4 shadow-lg shadow-green-200/50 transition-all transform hover:scale-105 mx-auto">
              <span className="font-bold text-[16px]">Dùng thử miễn phí</span>
              <div className="bg-white text-black rounded-full p-1.5">
                <ArrowRight size={18} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Templates Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] mb-4">
              Kho giao diện đẹp, đáp ứng mọi nhu cầu kinh doanh
            </h2>
            <p className="text-gray-600 text-[18px]">
              MTIEN SOLUTION liên tục cập nhật các mẫu giao diện cho tất cả ngành nghề
            </p>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-gray-100 pb-4">
            {['Giao diện mới', 'Giao diện miễn phí', 'Dưới 1 triệu', 'Được mua nhiều'].map((filter, idx) => (
              <button 
                key={idx}
                className={`pb-4 text-[16px] font-bold transition-all duration-300 relative ${
                  idx === 0 
                    ? 'text-[#0066FF]' 
                    : 'text-[#1A1A1A] hover:text-[#0066FF]'
                }`}
              >
                {filter}
                {idx === 0 && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-[#0066FF] rounded-t-md">
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0066FF] rotate-45"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Template Grid */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#00D68F] z-10 hover:bg-gray-50">
              <ChevronLeft size={24} />
            </button>
            <button className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#00D68F] z-10 hover:bg-gray-50">
              <ArrowRight size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4">
              {[
                { name: 'Dualeo-x', category: 'Phù hợp cho siêu thị', price: '1,500,000 đ', img: 'fashion' },
                { name: 'Sea Fruits', category: 'Phù hợp cho siêu thị', price: '1,500,000 đ', img: 'food' },
                { name: 'Box Home', category: 'Phù hợp cho nội thất', price: '800,000 đ', img: 'decor' }
              ].map((template, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-[240px] bg-gray-50 overflow-hidden border-b border-gray-100">
                    <Image src={`https://picsum.photos/seed/${template.img}/600/400`} alt={template.name} fill className="object-cover object-top" unoptimized />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-[18px] text-[#1A1A1A] mb-1">{template.name}</h3>
                    <p className="text-gray-500 text-[14px] mb-4">{template.category}</p>
                    <p className="font-bold text-[18px] text-[#00D68F] mb-6 mt-auto">{template.price}</p>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-[#00D68F] hover:bg-[#00c280] text-white py-2.5 rounded-full font-bold text-[15px] transition-colors">
                        Xem thử
                      </button>
                      <button className="flex-1 bg-white border border-[#00D68F] text-[#00D68F] hover:bg-green-50 py-2.5 rounded-full font-bold text-[15px] transition-colors">
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="#" className="inline-flex items-center gap-2 text-[#0066FF] font-medium hover:underline text-[16px]">
              Xem thêm giao diện <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>


      {/* 6. App Store Section */}
      <section className="py-24 bg-[#001A5F] relative overflow-hidden">
        {/* Background Gradients & Patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#0066FF] rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00D68F] rounded-full blur-[100px] opacity-20"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
              >
                <ShoppingBag size={16} className="text-[#00D68F]" />
                <span>Kho ứng dụng MTIEN SOLUTION</span>
              </motion.div>
              <h2 className="text-[36px] md:text-[44px] font-bold text-white mb-8 leading-[1.2]">
                Tăng tốc cho website với kho ứng dụng mạnh mẽ của MTIEN SOLUTION
              </h2>
              <ul className="space-y-6 mb-12">
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-[#00D68F]/20 flex items-center justify-center">
                    <CheckCircle2 className="text-[#00D68F]" size={16} strokeWidth={3} />
                  </div>
                  <span className="text-blue-100 text-[18px] leading-relaxed">Hơn 100 ứng dụng đa dạng từ hỗ trợ bán hàng, marketing, tài chính thanh toán, vận chuyển, quản trị website đến chăm sóc khách hàng, phù hợp với mọi ngành nghề kinh doanh.</span>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-[#00D68F]/20 flex items-center justify-center">
                    <CheckCircle2 className="text-[#00D68F]" size={16} strokeWidth={3} />
                  </div>
                  <span className="text-blue-100 text-[18px] leading-relaxed">Các ứng dụng tích hợp trên website này giúp các chủ shop tăng doanh số bán hàng, tăng doanh thu trên từng đơn hàng, thúc đẩy khách mua hàng nhiều hơn cũng như quản trị hệ thống website một cách đơn giản nhất.</span>
                </li>
              </ul>
              <button className="bg-gradient-to-r from-[#00D68F] to-[#00E5A3] hover:from-[#00c280] hover:to-[#00d195] text-white rounded-full px-8 py-3 font-bold text-[18px] shadow-lg shadow-green-500/30 transition-transform hover:scale-105">
                Khám phá kho ứng dụng
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-green-400/20 rounded-full blur-3xl"></div>
              <Image src="https://picsum.photos/seed/apps/800/800" alt="App Store" fill className="object-contain drop-shadow-2xl relative z-10" unoptimized />
              
              {/* Floating App Icons */}
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-16 h-16 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center z-20"
              >
                <Image src="https://picsum.photos/seed/app1/64/64" alt="App Icon" width={40} height={40} className="rounded-xl" unoptimized />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-10 w-20 h-20 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center z-20"
              >
                <Image src="https://picsum.photos/seed/app2/80/80" alt="App Icon" width={50} height={50} className="rounded-xl" unoptimized />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-green-50 to-transparent rounded-tr-full opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#0066FF] text-sm font-medium mb-6"
            >
              <BarChart3 size={16} />
              <span>Bảng giá minh bạch</span>
            </motion.div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A]">
              Bảng giá dịch vụ thiết kế website MTIEN SOLUTION
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Standard Plan */}
            <div className="bg-white rounded-[24px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col hover:border-[#0066FF] transition-colors">
              <h3 className="text-[28px] font-bold text-[#1A1A1A] mb-2">Web Standard</h3>
              <p className="text-gray-500 text-[16px] mb-8">Website bán hàng chuyên nghiệp</p>
              <div className="mb-10">
                <span className="text-[40px] font-bold text-[#FF6B00]">499.000đ</span>
                <span className="text-gray-500 font-medium">/tháng</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Giao diện chuẩn SEO', 'Băng thông không giới hạn', 'Bảo mật SSL miễn phí', 'Hỗ trợ 24/7'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 className="text-[#00D68F]" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white border-2 border-[#0066FF] text-[#0066FF] hover:bg-blue-50 py-4 rounded-xl font-bold text-[16px] transition-colors mt-auto">
                Dùng thử 7 ngày
              </button>
            </div>
            
            {/* Omni Plan */}
            <div className="bg-gradient-to-b from-[#001A5F] to-[#00287A] rounded-[24px] p-10 shadow-2xl flex flex-col relative transform md:-translate-y-4 text-white">
              <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                Phổ biến nhất
              </div>
              <h3 className="text-[28px] font-bold text-white mb-2">Omni</h3>
              <p className="text-blue-200 text-[16px] mb-8">Quản lý và bán hàng hợp kênh</p>
              <div className="mb-10">
                <span className="text-[40px] font-bold text-[#00D68F]">899.000đ</span>
                <span className="text-blue-200 font-medium">/tháng</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Mọi tính năng của Web Standard', 'Bán hàng trên Facebook, Sàn TMĐT', 'Quản lý kho hàng tập trung', 'Tích hợp vận chuyển, thanh toán'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-blue-50">
                    <CheckCircle2 className="text-[#00D68F]" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-[#00D68F] to-[#00E5A3] hover:from-[#00c280] hover:to-[#00d195] text-white py-4 rounded-xl font-bold text-[16px] transition-colors mt-auto shadow-lg shadow-green-500/20">
                Dùng thử 7 ngày
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <a href="#" className="inline-flex items-center gap-2 text-[#0066FF] font-bold hover:underline text-[16px]">
              Chi tiết giá thiết kế web tại MTIEN SOLUTION <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 8. Industry Section */}
      <section className="py-24 bg-[#001A5F] text-white relative overflow-hidden">
        {/* Background Gradients & Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00287A] to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#0066FF] rounded-full blur-[120px] opacity-30 pointer-events-none"></div>
        <svg className="absolute top-10 left-10 w-32 h-32 text-white/5 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="10" cy="10" r="2" />
          <circle cx="30" cy="10" r="2" />
          <circle cx="50" cy="10" r="2" />
          <circle cx="10" cy="30" r="2" />
          <circle cx="30" cy="30" r="2" />
          <circle cx="50" cy="30" r="2" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
              >
                <LayoutTemplate size={16} className="text-[#00D68F]" />
                <span>Đa dạng lĩnh vực</span>
              </motion.div>
              <h2 className="text-[32px] md:text-[40px] font-bold mb-6 leading-tight">
                Thiết kế website chuyên nghiệp theo ngành nghề
              </h2>
              <p className="text-blue-200 text-[18px] leading-relaxed">
                Những mẫu website đẹp, phù hợp với ngành nghề, lĩnh vực bạn quan tâm
              </p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                'Mỹ phẩm', 'Thực phẩm', 'Công nghệ', 'Khách sạn',
                'Gia dụng', 'Bất động sản', 'Nội thất', 'Sách - VP phẩm'
              ].map((industry, idx) => (
                <div key={idx} className="bg-[#00287A]/50 hover:bg-[#003399] transition-all duration-300 rounded-2xl p-6 text-center cursor-pointer border border-blue-400/20 hover:border-blue-400/50 hover:-translate-y-1 group">
                  <div className="w-14 h-14 mx-auto bg-white/10 rounded-full mb-4 flex items-center justify-center group-hover:bg-[#00D68F]/20 transition-colors">
                    <LayoutTemplate className="text-blue-200 group-hover:text-[#00D68F] transition-colors" size={24} />
                  </div>
                  <h3 className="font-medium text-[16px]">{industry}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Clients Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#0066FF] text-sm font-medium mb-6"
          >
            <User size={16} />
            <span className="uppercase tracking-wider">Thiết kế website không khó</span>
          </motion.div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] mb-16">
            +230,000 khách hàng đã tin tưởng để MTIEN SOLUTION lo
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos Placeholder */}
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-32 h-16 relative hover:scale-110 transition-transform cursor-pointer"
              >
                <Image src={`https://picsum.photos/seed/logo${i}/200/100`} alt={`Client ${i}`} fill className="object-contain mix-blend-multiply" unoptimized />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="py-24 bg-[#F0F5FA] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
        <svg className="absolute top-20 right-20 w-48 h-48 text-blue-100/50 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="20" strokeDasharray="4 4" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-[#0066FF] text-sm font-medium mb-6"
              >
                <RefreshCw size={16} />
                <span>Hỗ trợ khách hàng</span>
              </motion.div>
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-tight mb-6">
                Một số câu hỏi thường gặp khi thiết kế website
              </h2>
              <p className="text-gray-600 text-[16px]">
                Bạn có thắc mắc? Hãy xem qua các câu hỏi phổ biến dưới đây hoặc liên hệ với chúng tôi để được giải đáp.
              </p>
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[16px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className={`font-bold text-[18px] ${activeFaq === idx ? 'text-[#0066FF]' : 'text-[#1A1A1A]'}`}>{faq.question}</span>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeFaq === idx ? 'bg-blue-50 text-[#0066FF]' : 'bg-gray-50 text-gray-400'}`}>
                      {activeFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 text-gray-600 text-[16px] leading-relaxed border-t border-gray-50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Bottom CTA */}
      <section className="py-24 bg-gradient-to-r from-[#00D68F] to-[#00b3d6] text-white text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-[36px] md:text-[48px] font-bold mb-6 leading-tight">
            MTIEN SOLUTION - Tất cả những gì bạn cần để quản lý và kinh doanh
          </h2>
          <p className="text-[20px] mb-12 text-white/90">
            Chúc mừng bạn có 7 ngày dùng thử miễn phí. Nhanh tay đăng ký ngay!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-white p-2 rounded-full shadow-2xl">
            <input 
              type="text" 
              placeholder="Nhập tên cửa hàng/doanh nghiệp của bạn" 
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none text-[16px]"
            />
            <button className="bg-[#001A5F] hover:bg-[#00287A] text-white px-10 py-4 rounded-full font-bold text-[18px] transition-colors whitespace-nowrap">
              Dùng thử miễn phí
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
