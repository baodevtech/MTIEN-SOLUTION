'use client';

/**
 * MigrationSupport - Phần hỗ trợ di dời hệ thống và vận hành 24/7.
 * Hiển thị quy trình 3 bước (Khảo sát, Chuyển đổi, Tối ưu) bên trái
 * và card NOC Support 24/7/365 với thống kê phản hồi & mức độ hỗ trợ bên phải.
 */

import { Activity, ArrowRightLeft, Gauge, Headphones, CheckCircle2, Workflow } from 'lucide-react';

export default function MigrationSupport() {
  return (
    <section className="py-12 md:py-24 bg-white relative z-20">
        <div className="max-w-[1260px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
            
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full text-emerald-600 text-[11px] font-bold mb-6 border border-emerald-200 uppercase tracking-widest">
                <Workflow size={14}/> Di dời hệ thống
              </div>
              <h2 className="text-[26px] md:text-[44px] font-bold text-slate-900 tracking-tighter mb-4 md:mb-6 leading-tight">Chuyển đổi dữ liệu.<br/><span className="text-slate-400">Không một giây gián đoạn.</span></h2>
              <p className="text-slate-500 text-[14px] md:text-[16px] font-medium leading-relaxed mb-6 md:mb-10">Đội ngũ kỹ sư L2/L3 của chúng tôi sẽ trực tiếp lên phương án và thực hiện di dời toàn bộ dữ liệu từ nhà cung cấp cũ sang hệ thống mới một cách an toàn tuyệt đối (Zero-downtime).</p>
              
              <div className="space-y-6">
                 {[
                   { icon: Activity, title: "1. Khảo sát & Đánh giá", desc: "Phân tích kiến trúc hiện tại và lên kịch bản di dời." },
                   { icon: ArrowRightLeft, title: "2. Chuyển đổi dữ liệu", desc: "Đồng bộ hóa Database & Files ngầm mà không gây downtime." },
                   { icon: Gauge, title: "3. Tối ưu hiệu năng", desc: "Tinh chỉnh Kernel, Webserver (Nginx/LiteSpeed) & Caching." }
                 ].map((step, i) => (
                   <div key={i} className="flex gap-4 items-start group">
                     <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors shrink-0">
                       <step.icon size={20}/>
                     </div>
                     <div>
                       <h4 className="text-[16px] font-bold text-slate-900 tracking-tight mb-1">{step.title}</h4>
                       <p className="text-[14px] text-slate-500 font-medium">{step.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-slate-50 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-slate-200/60 relative overflow-hidden">
                {/* Visual Graphic */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.2rem] bg-white border border-slate-200 flex items-center justify-center text-emerald-500 shadow-xl mb-5 md:mb-8"><Headphones size={24} strokeWidth={1.5} className="md:w-8 md:h-8"/></div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-5 md:mb-8">NOC Support 24/7/365</h3>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phản hồi Ticket</p>
                    <p className="text-lg md:text-2xl font-black text-slate-900">&lt; 15 Phút</p>
                  </div>
                  <div className="bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mức độ hỗ trợ</p>
                    <p className="text-lg md:text-2xl font-black text-slate-900">Bậc L3</p>
                  </div>
                  <div className="bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm col-span-2 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bảo toàn dữ liệu</p>
                      <p className="text-lg md:text-2xl font-black text-slate-900">100% Cam kết</p>
                    </div>
                    <CheckCircle2 size={32} className="text-emerald-500 opacity-20"/>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
  );
}
