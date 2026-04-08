'use client';

/**
 * ControlPanel - Phần giới thiệu giao diện quản trị (Panel) Cloud Server.
 * Hiển thị mockup dashboard dạng MacOS với các tính năng quản lý:
 * Rebuild 1-Click, Web Console SSH, Realtime Monitor, Auto Snapshots.
 */

import { Sparkles, RefreshCcw, Terminal, LineChart, Clock } from 'lucide-react';
import Image from 'next/image';

export default function ControlPanel() {
  return (
    <section className="py-12 md:py-24 bg-white border-y border-slate-200/60 relative z-20 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6">

          {/* === MOBILE LAYOUT === */}
          <div className="lg:hidden flex flex-col">
            {/* Badge + Heading */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-slate-600 text-[11px] font-bold mb-4 border border-slate-200 uppercase tracking-widest">
                <Sparkles size={14} className="text-blue-500"/> Panel
              </div>
              <h2 className="text-[28px] md:text-[36px] font-bold text-slate-900 tracking-tighter leading-[1.08]">
                Làm chủ Server.<br/><span className="text-slate-400">Trực quan và mạnh mẽ.</span>
              </h2>
            </div>

            {/* MacOS Mockup — edge-to-edge feel */}
            <div className="-mx-4 md:-mx-6 mb-8">
              <div className="mx-3 bg-[#E8E8ED] rounded-2xl p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-300/80 ring-1 ring-white/50 overflow-hidden">
                <div className="bg-[#1D1D1F] rounded-[0.7rem] p-[3px] overflow-hidden shadow-inner">
                  <div className="bg-white rounded-[0.55rem] overflow-hidden flex flex-col shadow-inner">
                    <div className="h-7 w-full bg-slate-50 border-b border-slate-100 flex items-center px-3 justify-between">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="bg-slate-200/50 rounded-full px-6 py-0.5 text-[7px] text-slate-400 font-bold tracking-tight">CLOUD.MTIENSOLUTION.VN</div>
                      <div className="w-6" />
                    </div>
                    <div className="relative aspect-[16/10] bg-slate-50/50">
                      <Image src="https://picsum.photos/seed/mac_dashboard_pro/1200/900" alt="Control Panel" fill className="object-cover object-top" priority />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features — Apple-style pill cards */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { i: RefreshCcw, t: "Rebuild 1-Click", d: "Cài lại OS tức thì" },
                { i: Terminal, t: "Web SSH", d: "Terminal trên trình duyệt" },
                { i: LineChart, t: "Monitoring", d: "CPU · RAM · Disk I/O" },
                { i: Clock, t: "Snapshots", d: "Tự động sao lưu" },
              ].map((feat, idx) => (
                <div key={idx} className="group bg-[#F5F5F7] hover:bg-white rounded-2xl p-4 transition-all duration-300 border border-transparent hover:border-slate-200 hover:shadow-lg">
                  <div className="w-9 h-9 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm border border-slate-200/60 mb-3 group-hover:scale-110 transition-transform duration-300"><feat.i size={16} strokeWidth={2}/></div>
                  <h4 className="font-bold text-slate-900 text-[14px] tracking-tight leading-tight">{feat.t}</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">{feat.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* === DESKTOP LAYOUT === */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-slate-600 text-[11px] font-bold mb-6 border border-slate-200 uppercase tracking-widest w-max">
                <Sparkles size={14} className="text-blue-500"/> Giao diện quản trị (Panel)
              </div>
              <h2 className="text-[42px] font-bold text-slate-900 tracking-tighter leading-[1.1] mb-6">
                Làm chủ Server.<br/><span className="text-slate-400">Trực quan và mạnh mẽ.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
                 {[
                   { i: RefreshCcw, t: "Rebuild 1-Click", d: "Cài lại hệ điều hành nhanh chóng." },
                   { i: Terminal, t: "Web Console SSH", d: "Truy cập terminal ngay trên web." },
                   { i: LineChart, t: "Realtime Monitor", d: "Theo dõi CPU, RAM, Disk I/O." },
                   { i: Clock, t: "Auto Snapshots", d: "Sao lưu toàn bộ máy chủ." },
                 ].map((feat, idx) => (
                   <div key={idx} className="flex flex-col gap-2">
                     <div className="w-10 h-10 rounded-[1rem] bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm"><feat.i size={18}/></div>
                     <h4 className="font-bold text-slate-900 text-[15px] tracking-tight mt-1">{feat.t}</h4>
                     <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{feat.d}</p>
                   </div>
                 ))}
              </div>
            </div>
            <div className="lg:col-span-7 relative h-[600px]">
              <div className="absolute inset-0 bg-[#E8E8ED] rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-300 ring-1 ring-white/50 overflow-hidden flex flex-col">
                 <div className="w-full h-full bg-[#1D1D1F] rounded-[3rem] p-1.5 overflow-hidden relative shadow-inner">
                   <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col shadow-inner">
                     <div className="h-10 w-full bg-slate-50 border-b border-slate-100 flex items-center px-6 justify-between">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/5" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/5" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/5" />
                        </div>
                        <div className="bg-slate-200/50 rounded-full px-12 py-1 text-[9px] text-slate-400 font-bold tracking-tight">CLOUD.MTIENSOLUTION.VN</div>
                        <div className="w-10" />
                     </div>
                     <div className="flex-1 relative bg-slate-50/50">
                        <Image src="https://picsum.photos/seed/mac_dashboard_pro/1200/900" alt="Control Panel" fill className="object-cover object-top opacity-95" priority />
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>
  );
}
