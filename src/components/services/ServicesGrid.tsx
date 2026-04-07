'use client';

import { motion } from 'motion/react';
import { 
  Code2, Cloud, Palette, Cpu, Laptop, 
  Wrench, ShieldCheck, Headset, BarChart,
  Megaphone
} from 'lucide-react';

/**
 * ServicesGrid - Lưới 4 nhóm dịch vụ chính (Phần mềm, Hạ tầng, Thiết kế, Thiết bị)
 * Mỗi nhóm chứa các dịch vụ con với mã ngành, icon và mô tả.
 * Phần này chồng lên hero section với -mt-24.
 */

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

export default function ServicesGrid() {
  return (
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
  );
}
