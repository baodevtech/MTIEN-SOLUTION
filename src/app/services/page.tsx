'use client';

import { motion } from 'motion/react';
import { 
  Code2, MonitorSmartphone, Server, Cloud, 
  Palette, PenTool, Cpu, Laptop, 
  Wrench, ShieldCheck, Headset, BarChart,
  ArrowRight, CheckCircle2, Zap, LayoutTemplate,
  Smartphone, Globe, Megaphone, HardDrive,
  PhoneCall
} from 'lucide-react';
import Image from 'next/image';

const serviceGroups = [
  {
    title: "Phần mềm & Nền tảng",
    desc: "Xây dựng hệ thống lõi vững chắc cho doanh nghiệp.",
    color: "blue",
    bg: "bg-blue-50",
    text: "text-[#0066FF]",
    border: "border-blue-100",
    items: [
      { code: "6201", icon: Code2, title: "Lập trình Phần mềm", desc: "Thiết kế web, app iOS/Android & phần mềm theo yêu cầu." },
      { code: "6202", icon: BarChart, title: "Tư vấn Giải pháp", desc: "Tư vấn hệ thống & quản trị máy vi tính." }
    ]
  },
  {
    title: "Hạ tầng & Dữ liệu",
    desc: "Lưu trữ bảo mật, tốc độ cao, vận hành 24/7.",
    color: "purple",
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
    items: [
      { code: "6311", icon: Cloud, title: "Cloud & Xử lý dữ liệu", desc: "Hosting, VPS, Server & các hoạt động lưu trữ." },
      { code: "6209", icon: ShieldCheck, title: "Dịch vụ CNTT", desc: "Bảo trì phần mềm & hệ thống mạng lõi." }
    ]
  },
  {
    title: "Thiết kế & Marketing",
    desc: "Thu hút khách hàng bằng hình ảnh và chiến lược.",
    color: "rose",
    bg: "bg-rose-50",
    text: "text-rose-500",
    border: "border-rose-100",
    items: [
      { code: "7410", icon: Palette, title: "Thiết kế Đồ họa", desc: "Thiết kế logo, banner, poster, hình ảnh truyền thông." },
      { code: "7310", icon: Megaphone, title: "Quảng cáo Media", desc: "Thiết kế nội dung và triển khai chiến dịch quảng cáo." }
    ]
  },
  {
    title: "Thiết bị & Bảo trì",
    desc: "Cung ứng phần cứng và đảm bảo tính liên tục.",
    color: "emerald",
    bg: "bg-emerald-50",
    text: "text-[#00D68F]",
    border: "border-emerald-100",
    items: [
      { code: "4651", icon: Cpu, title: "Bán buôn Thiết bị", desc: "Cung cấp sỉ máy tính, linh kiện, phần mềm." },
      { code: "4741", icon: Laptop, title: "Bán lẻ Công nghệ", desc: "Cửa hàng chuyên doanh laptop, thiết bị ngoại vi." },
      { code: "9511", icon: Wrench, title: "Sửa chữa & Nâng cấp", desc: "Sửa chữa máy vi tính, thay thế linh kiện tận nơi." },
      { code: "6209", icon: Headset, title: "Hỗ trợ Kỹ thuật", desc: "IT Helpdesk hỗ trợ xử lý sự cố máy tính." }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFD] overflow-hidden">
      
      {/* 1. HERO SECTION - Deep Blue Tech Theme (Giống trang chủ) */}
      <section className="bg-[#001A5F] pt-28 pb-32 md:pb-48 relative z-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#0066FF] rounded-full blur-[150px] opacity-40"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#00D68F] rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 text-[11px] md:text-xs font-bold mb-6"
          >
            <Zap size={14} className="text-[#00D68F]" />
            <span className="uppercase tracking-wider">Hệ sinh thái công nghệ toàn diện</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[38px] md:text-[56px] lg:text-[64px] font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            Giải pháp số. <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-emerald-300">
              Sức mạnh thật.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100/80 text-[15px] md:text-[18px] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Từ lập trình phần mềm, thiết kế thương hiệu, cung cấp máy chủ Cloud đến phân phối thiết bị IT. MTIEN SOLUTION cung cấp mọi mảnh ghép cho doanh nghiệp của bạn.
          </motion.p>
        </div>
      </section>

      {/* 2. CORE SERVICES GRID - Trải nghiệm App/Game cực đặc (Overlapping Hero) */}
      <section className="relative z-30 -mt-24 md:-mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {serviceGroups.map((group, groupIdx) => (
            <motion.div 
              key={groupIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="bg-white rounded-[24px] md:rounded-[32px] p-4 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100"
            >
              {/* Group Header */}
              <div className="flex flex-col mb-4 md:mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${group.bg} border-2 ${group.border}`}></div>
                  <h2 className="text-[18px] md:text-[22px] font-black text-slate-900 tracking-tight">{group.title}</h2>
                </div>
                <p className="text-[12px] md:text-[14px] text-slate-500">{group.desc}</p>
              </div>

              {/* Items - HIGH DENSITY MOBILE GRID (2 Cột nhỏ gọn chuẩn App) */}
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {group.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className="group/item relative bg-[#F8FAFC] hover:bg-white rounded-xl md:rounded-2xl p-3 md:p-5 border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                  >
                    {/* Mã ngành góc phải siêu nhỏ */}
                    <div className="absolute top-2 right-2 text-[8px] md:text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-1.5 py-0.5 rounded shadow-sm z-10">
                      MÃ: {item.code}
                    </div>

                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl ${group.bg} ${group.text} flex items-center justify-center mb-2 md:mb-4 transition-transform group-hover/item:scale-110`}>
                      <item.icon className="w-4 h-4 md:w-6 md:h-6" strokeWidth={2} />
                    </div>
                    
                    <h3 className="text-[12px] md:text-[15px] font-bold text-slate-900 mb-1 leading-tight group-hover/item:text-[#0066FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[9px] md:text-[12px] text-slate-500 leading-[1.4] line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. VISUAL SHOWCASE - Phong cách Dashboard lơ lửng lấp đầy không gian */}
      <section className="py-20 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-[#0066FF] rounded-md text-[11px] font-bold mb-4 border border-blue-100">
                  <Globe size={12} /> Tích hợp liền mạch
                </div>
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-slate-900 mb-4 leading-[1.15]">
                  Quản trị tập trung. <br/>
                  <span className="text-[#0066FF]">Mở rộng không giới hạn.</span>
                </h2>
                <p className="text-slate-600 text-[14px] md:text-[16px] mb-8 leading-relaxed">
                  Dù bạn cần một Website bán hàng (6201), cần thuê Server lưu trữ (6311), hay cần sửa chữa thiết bị văn phòng (9511). Mọi dịch vụ đều được đồng bộ hóa và hỗ trợ 24/7 bởi MTIEN SOLUTION.
                </p>

                {/* Checklist gọn gàng */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                  {['Tốc độ tải trang < 1s', 'Uptime 99.9%', 'Bảo mật SSL Đa tầng', 'Chi phí tối ưu'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px] font-medium text-slate-700">
                      <CheckCircle2 size={16} className="text-[#00D68F]" /> {item}
                    </li>
                  ))}
                </ul>

                <button className="bg-slate-900 hover:bg-[#0066FF] text-white rounded-xl px-6 py-3.5 font-bold text-[14px] transition-colors shadow-lg shadow-slate-900/20 flex items-center gap-2">
                  Nhận tư vấn giải pháp <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>

            {/* Visual Cluster (High Density) */}
            <div className="lg:col-span-7 relative h-[400px] md:h-[500px]">
              {/* Main Dashboard Box */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
              >
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D68F]"></div>
                </div>
                <div className="relative h-[250px] md:h-[300px] w-full">
                  <Image src="https://picsum.photos/seed/tech_dashboard/800/500" alt="Tech Dashboard" fill className="object-cover" />
                </div>
              </motion.div>

              {/* Floating Server Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 right-0 md:right-10 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                  <Server size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Cloud Server</p>
                  <p className="text-[14px] font-black text-slate-900">Uptime 99.9%</p>
                </div>
              </motion.div>

              {/* Floating Marketing Badge */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 md:left-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500">
                  <Palette size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Thiết kế & Ads</p>
                  <p className="text-[14px] font-black text-slate-900">+500 Dự án</p>
                </div>
              </motion.div>

              {/* Hardware / Setup Badge */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-20 right-4 md:right-16 bg-[#1A1A1A] text-white p-3 rounded-xl shadow-2xl flex items-center gap-3 z-20 border border-slate-700"
              >
                <HardDrive size={20} className="text-[#00D68F]" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Bảo trì & Thiết bị</p>
                  <p className="text-[12px] font-bold">Hỗ trợ tận nơi 24/7</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLE-STYLE CTA - Tối giản, thanh lịch */}
      <section className="py-20 md:py-28 bg-[#FBFBFD] relative border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[32px] md:text-[48px] font-semibold text-[#1D1D1F] tracking-tight leading-tight mb-4">
              Bạn cần giải pháp gì? <br/>
              <span className="text-[#86868B]">Hãy để chúng tôi lo.</span>
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#86868B] mb-10 font-medium">
              Điền thông tin hoặc liên hệ trực tiếp. Chuyên gia của MTIEN SOLUTION sẽ gọi lại trong <strong className="text-slate-900">5 phút</strong>.
            </p>

            <div className="relative max-w-lg mx-auto bg-white p-1.5 rounded-full shadow-sm border border-slate-200 focus-within:border-[#0066FF] focus-within:ring-4 focus-within:ring-blue-50 transition-all flex items-center">
              <input 
                type="text" 
                placeholder="Nhập số điện thoại của bạn..." 
                className="flex-1 bg-transparent px-6 py-3 text-[15px] outline-none placeholder:text-slate-400 font-medium"
              />
              <button className="bg-[#0066FF] hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-[14px] transition-colors flex items-center gap-2 whitespace-nowrap shadow-md">
                Gọi lại cho tôi <PhoneCall size={16} />
              </button>
            </div>
            
            <div className="mt-6 flex justify-center gap-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#00D68F]" /> Tư vấn miễn phí</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#00D68F]" /> Khảo sát tận nơi</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
