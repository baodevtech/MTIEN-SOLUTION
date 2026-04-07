'use client';

import { CheckCircle2 } from 'lucide-react';

export default function PricingSection() {
  return (
    <section className="py-8 md:py-24 bg-white relative" aria-label="Bảng giá">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-5 md:mb-16">
          <h2 className="text-[20px] md:text-[40px] font-bold text-[#1A1A1A]">
            Bảng giá dịch vụ thiết kế website
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-2.5 md:gap-8 max-w-[850px] mx-auto mb-5 md:mb-12 items-stretch">
          {/* Standard */}
          <div className="bg-white rounded-lg md:rounded-[20px] p-3 md:p-10 border border-[#0066FF] flex flex-col h-full">
            <h3 className="text-[15px] md:text-[28px] font-bold text-[#1A1A1A] mb-0.5 md:mb-2">Web Standard</h3>
            <p className="text-gray-500 text-[11px] md:text-[15px] mb-2.5 md:mb-8">Website bán hàng chuyên nghiệp</p>
            <div className="mb-3 md:mb-10 flex items-baseline gap-0.5 md:gap-1">
              <span className="text-[18px] md:text-[44px] font-extrabold text-[#FF6B00] leading-none">499.000đ</span>
              <span className="text-gray-500 font-medium text-[10px] md:text-base">/tháng</span>
            </div>
            <ul className="space-y-2 md:space-y-4 mb-3 md:mb-10 flex-1">
              {['Giao diện chuẩn SEO', 'Băng thông không giới hạn', 'Bảo mật SSL miễn phí', 'Hỗ trợ 24/7'].map((item) => (
                <li key={item} className="flex items-center gap-1.5 md:gap-3 text-gray-600">
                  <CheckCircle2 className="text-[#00D68F] shrink-0" size={12} strokeWidth={2} aria-hidden="true" />
                  <span className="text-[11px] md:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-white border border-[#0066FF] text-[#0066FF] py-2 md:py-3.5 rounded-lg md:rounded-xl font-bold text-[12px] md:text-[15px] mt-auto">
              Dùng thử 7 ngày
            </button>
          </div>

          {/* Omni */}
          <div className="bg-[#001c54] rounded-lg md:rounded-[20px] p-3 md:p-10 shadow-xl flex flex-col relative text-white border border-[#002a7a]">
            <div className="absolute top-0 right-2 md:right-10 transform -translate-y-1/2 bg-[#FF8C00] text-white px-2 md:px-6 py-0.5 md:py-2 rounded-full text-[9px] md:text-[13px] font-bold shadow-md">
              Phổ biến nhất
            </div>
            <h3 className="text-[15px] md:text-[28px] font-bold text-white mb-0.5 md:mb-2">Omni</h3>
            <p className="text-blue-100/70 text-[11px] md:text-[15px] mb-2.5 md:mb-8">Quản lý và bán hàng hợp kênh</p>
            <div className="mb-3 md:mb-10 flex items-baseline gap-0.5 md:gap-1">
              <span className="text-[18px] md:text-[44px] font-extrabold text-[#00D68F] leading-none">899.000đ</span>
              <span className="text-white/80 font-medium text-[10px] md:text-[15px]">/tháng</span>
            </div>
            <ul className="space-y-2 md:space-y-4 mb-3 md:mb-10 flex-1">
              {['Mọi tính năng Standard', 'Bán hàng trên Facebook, Sàn', 'Quản lý kho tập trung', 'Tích hợp vận chuyển, thanh toán'].map((item) => (
                <li key={item} className="flex items-center gap-1.5 md:gap-3 text-white/90">
                  <CheckCircle2 className="text-[#00D68F] shrink-0" size={12} strokeWidth={2} aria-hidden="true" />
                  <span className="text-[11px] md:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-[#00D68F] hover:bg-[#00c280] text-white py-2 md:py-3.5 rounded-lg md:rounded-xl font-bold text-[12px] md:text-[15px] mt-auto">
              Dùng thử 7 ngày
            </button>
          </div>
        </div>

        <div className="text-center">
          <a href="#" className="inline-flex items-center gap-1 text-[#0066FF] font-bold hover:underline text-[14px] md:text-[15px]">
            Chi tiết giá thiết kế web tại MTIEN SOLUTION <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
