'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-[#FBFBFD] relative overflow-hidden border-t border-slate-100" aria-label="Bắt đầu miễn phí">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <h2 className="text-[24px] md:text-[44px] font-semibold text-[#1D1D1F] tracking-tight leading-tight mb-3 md:mb-4">
              Khởi đầu mới. <span className="text-slate-400">Ngay hôm nay.</span>
            </h2>
            <p className="text-[#86868B] text-[15px] md:text-[18px] mb-6 md:mb-10 tracking-tight font-medium">
              Dùng thử miễn phí <span className="text-[#0066FF]">7 ngày</span>. Thiết lập cửa hàng chỉ trong vài phút.
            </p>
          </div>

          <div className="w-full max-w-lg">
            <form className="relative bg-white p-1.5 md:p-1.5 rounded-full shadow-sm flex items-center border border-slate-200" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="cta-website-name" className="sr-only">Tên website của bạn</label>
              <input
                id="cta-website-name"
                type="text"
                placeholder="Tên website của bạn..."
                className="flex-1 bg-transparent px-4 md:px-6 py-2.5 md:py-2.5 text-[#1D1D1F] text-[14px] md:text-[16px] outline-none placeholder:text-slate-400 font-medium min-w-0"
              />
              <button type="submit" className="bg-[#1D1D1F] text-white px-5 md:px-6 py-2.5 md:py-2.5 rounded-full font-bold text-[13px] md:text-[14px] flex items-center gap-1.5 whitespace-nowrap shrink-0">
                Bắt đầu
                <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </form>
          </div>

          <div className="mt-5 md:mt-8 flex items-center gap-3 md:gap-5 text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-500" aria-hidden="true" /> No credit card
            </span>
            <span className="w-1 h-1 bg-slate-200 rounded-full" aria-hidden="true"></span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-500" aria-hidden="true" /> Setup in 5 mins
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
