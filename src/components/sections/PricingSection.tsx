'use client';

import { useState } from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Web Standard',
    desc: 'Website bán hàng chuyên nghiệp',
    price: { monthly: '499.000đ', yearly: '399.000đ' },
    features: ['Giao diện chuẩn SEO', 'Băng thông không giới hạn', 'Bảo mật SSL miễn phí', 'Hỗ trợ 24/7'],
    cta: 'Dùng thử 7 ngày',
    featured: false,
  },
  {
    name: 'Omni',
    desc: 'Quản lý và bán hàng hợp kênh',
    price: { monthly: '899.000đ', yearly: '699.000đ' },
    features: ['Mọi tính năng Standard', 'Bán hàng trên Facebook, Sàn', 'Quản lý kho tập trung', 'Tích hợp vận chuyển, thanh toán'],
    cta: 'Dùng thử 7 ngày',
    featured: true,
    badge: 'Phổ biến nhất',
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="py-12 md:py-24 bg-white relative" aria-label="Bảng giá">
      <div className="max-w-[1300px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-[22px] md:text-[40px] font-bold text-[#1A1A1A] tracking-tight">
            Bảng giá dịch vụ thiết kế website
          </h2>
        </div>

        {/* Billing Toggle — centered */}
        <div className="flex justify-center mb-8 md:mb-14">
          <div className="inline-flex items-center bg-slate-100 rounded-full p-1 text-[13px] md:text-sm font-semibold">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-all ${billing === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Theo tháng
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-all inline-flex items-center gap-1.5 ${billing === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Theo năm <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards — horizontal */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-8 max-w-[900px] mx-auto mb-6 md:mb-12 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl md:rounded-[20px] p-4 sm:p-6 md:p-10 flex flex-col h-full relative transition-all ${
                plan.featured
                  ? 'bg-[#001c54] text-white border border-[#002a7a] shadow-xl'
                  : 'bg-white border border-[#0066FF]'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-2.5 sm:right-4 md:right-10 -translate-y-1/2 bg-[#FF8C00] text-white px-2.5 sm:px-4 md:px-6 py-0.5 md:py-2 rounded-full text-[9px] sm:text-[11px] md:text-[13px] font-bold shadow-md">
                  {plan.badge}
                </div>
              )}

              <h3 className={`text-[14px] sm:text-[18px] md:text-[28px] font-bold mb-0.5 md:mb-2 ${plan.featured ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {plan.name}
              </h3>
              <p className={`text-[10px] sm:text-[12px] md:text-[15px] mb-3 sm:mb-4 md:mb-8 ${plan.featured ? 'text-blue-100/70' : 'text-gray-500'}`}>
                {plan.desc}
              </p>

              {/* Price */}
              <div className="mb-3 sm:mb-5 md:mb-10 flex items-baseline gap-0.5 md:gap-1 flex-wrap">
                <span className={`text-[18px] sm:text-[24px] md:text-[44px] font-extrabold leading-none ${plan.featured ? 'text-[#00D68F]' : 'text-[#FF6B00]'}`}>
                  {billing === 'monthly' ? plan.price.monthly : plan.price.yearly}
                </span>
                <span className={`font-medium text-[9px] sm:text-[11px] md:text-base ${plan.featured ? 'text-white/80' : 'text-gray-500'}`}>
                  /{billing === 'monthly' ? 'tháng' : 'tháng'}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-4 mb-4 sm:mb-5 md:mb-10 flex-1">
                {plan.features.map((item) => (
                  <li key={item} className={`flex items-start gap-1.5 sm:gap-2 md:gap-3 ${plan.featured ? 'text-white/90' : 'text-gray-600'}`}>
                    <CheckCircle2 className="text-[#00D68F] shrink-0 mt-0.5" size={12} strokeWidth={2} aria-hidden="true" />
                    <span className="text-[10px] sm:text-[12px] md:text-[15px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-2.5 sm:py-3 md:py-3.5 rounded-xl font-bold text-[11px] sm:text-[13px] md:text-[15px] mt-auto transition-colors ${
                  plan.featured
                    ? 'bg-[#00D68F] hover:bg-[#00c280] text-white'
                    : 'bg-white border border-[#0066FF] text-[#0066FF] hover:bg-blue-50'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="text-center">
          <a href="#" className="inline-flex items-center gap-1 text-[#0066FF] font-bold hover:underline text-[13px] md:text-[15px]">
            Chi tiết giá thiết kế web tại MTIEN SOLUTION <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
