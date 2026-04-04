'use client';

import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronDown, Monitor, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-[#F0F5FA] pt-8 md:pt-8 pb-20 md:pb-40 relative overflow-hidden" aria-label="Giới thiệu">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Sub Navbar — desktop only */}
        <nav className="hidden md:flex items-center space-x-6 text-[15px] font-medium mb-16" aria-label="Danh mục website">
          <span className="font-bold text-gray-900 cursor-pointer">Kênh website</span>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Web bán hàng</span>
          <span className="text-[#0066FF] cursor-pointer">Web doanh nghiệp</span>
          <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Bảng giá</span>
          <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Giao diện</span>
          <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Ứng dụng</span>
          <span className="text-gray-600 hover:text-[#0066FF] cursor-pointer">Khách hàng</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 items-center">
          {reduced ? (
            <div className="max-w-xl">
              <h1 className="text-[28px] sm:text-[36px] md:text-[54px] font-bold text-[#1A1A1A] leading-[1.15] mb-3 md:mb-6">
                Giải pháp thiết kế website<br />chuyên nghiệp
              </h1>
              <p className="text-[14px] md:text-[18px] text-gray-600 mb-6 md:mb-10">
                Phù hợp với tất cả doanh nghiệp, cửa hàng quy mô lớn, vừa &amp; nhỏ
              </p>
              <div className="flex flex-row items-center gap-4 md:gap-6 mb-3 md:mb-8">
                <button className="bg-gradient-to-r from-[#00D68F] to-[#00E5A3] text-white rounded-full pl-4 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 flex items-center gap-2 md:gap-4 shadow-lg shadow-green-200/50">
                  <span className="font-bold text-[13px] md:text-[18px]">Dùng thử miễn phí</span>
                  <div className="bg-white text-black rounded-full p-1.5 md:p-2">
                    <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                  </div>
                </button>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                      <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt={`Khách hàng ${i}`} fill className="object-cover" sizes="40px" />
                    </div>
                  ))}
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] md:text-xs font-bold text-gray-600 z-10">
                    230k+
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-4 text-[13px] md:text-sm font-medium text-gray-600">
                {['Không cần thẻ tín dụng', 'Hủy bất cứ lúc nào', 'Hỗ trợ 24/7'].map((text) => (
                  <div key={text} className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-[#00D68F]" aria-hidden="true" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-xl">
              <h1 className="text-[28px] sm:text-[36px] md:text-[54px] font-bold text-[#1A1A1A] leading-[1.15] mb-3 md:mb-6 relative">
                Giải pháp thiết kế website<br />chuyên nghiệp
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
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
                Phù hợp với tất cả doanh nghiệp, cửa hàng quy mô lớn, vừa &amp; nhỏ
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <button className="bg-gradient-to-r from-[#00D68F] to-[#00E5A3] hover:from-[#00c280] hover:to-[#00d195] text-white rounded-full pl-8 pr-2 py-2 flex items-center gap-4 shadow-lg shadow-green-200/50 transition-all transform hover:scale-105">
                  <span className="font-bold text-[18px]">Dùng thử miễn phí</span>
                  <div className="bg-white text-black rounded-full p-2">
                    <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
                  </div>
                </button>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                      <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt={`Khách hàng ${i}`} fill className="object-cover" sizes="40px" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-600 z-10">
                    230k+
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
                {['Không cần thẻ tín dụng', 'Hủy bất cứ lúc nào', 'Hỗ trợ 24/7'].map((text) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <CheckCircle2 size={18} className="text-[#00D68F]" aria-hidden="true" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Hero Image — simplified on mobile, full on desktop */}
          <div className="relative">
            {/* Blur background — desktop only */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D6E6F5] rounded-full blur-3xl opacity-70"></div>

            {/* Browser Mockup — LCP image */}
            <div className="relative w-full aspect-[16/10] bg-white rounded-xl md:shadow-2xl overflow-hidden border border-gray-100 z-10 shadow-lg">
              <div className="absolute top-0 w-full h-7 md:h-10 bg-white border-b border-gray-100 flex items-center px-3 md:px-4 justify-between">
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="hidden md:flex gap-2 text-gray-400">
                  <ChevronDown size={16} className="rotate-90" aria-hidden="true" />
                  <ChevronDown size={16} className="-rotate-90" aria-hidden="true" />
                </div>
                <div className="hidden md:flex gap-3 text-gray-400">
                  <PlusCircle size={16} aria-hidden="true" />
                  <Monitor size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="mt-7 md:mt-10 w-full h-full relative bg-gray-50">
                <Image
                  src="https://picsum.photos/seed/yody/800/500"
                  alt="Giao diện website mẫu MTIEN SOLUTION"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-red-600 to-red-500 opacity-80 mix-blend-multiply"></div>
              </div>
            </div>

            {/* Floating decorations — desktop only */}
            <div className="hidden md:block absolute -right-6 top-1/3 bg-white rounded-full p-4 shadow-xl z-20 border border-gray-50" aria-hidden="true">
              <div className="relative">
                <div className="w-8 h-8 text-[#0066FF]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </div>
                <span className="absolute -top-2 -right-2 bg-[#00D68F] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">1</span>
              </div>
            </div>

            <div className="hidden md:flex absolute -bottom-10 left-8 bg-white rounded-xl shadow-2xl p-3 items-center gap-4 z-20 border border-gray-100 w-[320px]" aria-hidden="true">
              <div className="w-16 h-20 bg-yellow-100 rounded-lg overflow-hidden relative">
                <Image src="https://picsum.photos/seed/tshirt/100/150" alt="" fill className="object-cover" sizes="64px" />
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
          </div>
        </div>
      </div>
    </section>
  );
}
