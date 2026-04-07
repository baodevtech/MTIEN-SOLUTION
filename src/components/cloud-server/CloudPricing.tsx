'use client';

/**
 * CloudPricing - Phần bảng giá các gói dịch vụ Cloud Server.
 * Hiển thị 3 gói Starter, Professional (khuyên dùng), Business
 * kèm thông số cấu hình và nút CTA. Bao gồm cả phần Final CTA
 * kêu gọi tạo tài khoản miễn phí ở cuối trang.
 */

import { CheckCircle2, Cloud, ArrowRight } from 'lucide-react';

const pricingPlans = [
  { 
    name: 'Starter', price: '120', desc: 'Môi trường test, Web cá nhân', 
    specs: ['1 vCPU Core (Intel Xeon)', '2 GB ECC RAM', '30 GB NVMe Storage', 'Băng thông Unlimited', '1 IPv4 Dedicated'], pro: false 
  },
  { 
    name: 'Professional', price: '250', desc: 'Doanh nghiệp SMEs, Database', 
    specs: ['2 vCPU Cores (Intel Xeon)', '4 GB ECC RAM', '60 GB NVMe Storage', 'Băng thông Unlimited', 'Free Weekly Backup'], pro: true 
  },
  { 
    name: 'Business', price: '480', desc: 'E-commerce, Hệ thống chịu tải lớn', 
    specs: ['4 vCPU Cores (Intel Xeon)', '8 GB ECC RAM', '120 GB NVMe Storage', 'Băng thông Unlimited', 'Free Daily Backup'], pro: false 
  },
];

export default function CloudPricing() {
  return (
    <>
      {/* ==========================================
          8. PRICING TIERS
      ========================================== */}
      <section className="py-20 relative z-20 bg-[#F8FAFC] border-t border-slate-200/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-[44px] font-bold text-slate-900 tracking-tighter mb-4">Chi phí tối giản. <br/><span className="text-slate-400">Giá trị tối đa.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`rounded-[2.5rem] p-10 flex flex-col relative transition-all duration-500 ${plan.pro ? 'bg-[#1D1D1F] text-white shadow-2xl scale-105 border border-slate-800 z-10' : 'bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] text-slate-900 ring-1 ring-slate-900/5'}`}>
                {plan.pro && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Khuyên dùng</div>}
                <h3 className={`text-[22px] font-bold mb-2 tracking-tight ${plan.pro ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-[13px] mb-8 font-medium ${plan.pro ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-slate-200/10">
                  <span className={`text-5xl font-black tracking-tighter ${plan.pro ? 'text-white' : 'text-slate-900'}`}>{plan.price}k</span>
                  <span className={`text-sm font-medium ${plan.pro ? 'text-slate-400' : 'text-slate-500'}`}>/ tháng</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.specs.map((spec, i) => (
                    <li key={i} className={`flex items-start gap-3 text-[13px] font-semibold tracking-tight ${plan.pro ? 'text-slate-300' : 'text-slate-600'}`}>
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${plan.pro ? 'text-blue-400' : 'text-blue-500'}`} strokeWidth={2.5}/> {spec}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-full font-bold text-[14px] transition-all ${plan.pro ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
                  Khởi tạo ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          9. FINAL CTA
      ========================================== */}
      <section className="py-24 relative z-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] ring-1 ring-slate-900/5">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/20 mb-8"><Cloud size={32}/></div>
              <h2 className="text-4xl md:text-[56px] font-bold tracking-tighter mb-6 text-slate-900 leading-[1.1]">Sẵn sàng để đưa <br/>hệ thống lên Cloud?</h2>
              <p className="text-slate-500 text-[16px] mb-10 max-w-xl mx-auto font-medium">Khởi tạo và thiết lập máy chủ chuyên nghiệp chỉ với vài thao tác. Tận hưởng hiệu năng phần cứng đỉnh cao ngay hôm nay.</p>
              <button className="bg-[#1D1D1F] hover:bg-blue-600 text-white rounded-full px-10 py-4 font-bold text-[15px] transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2 mx-auto">
                Tạo tài khoản miễn phí <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
