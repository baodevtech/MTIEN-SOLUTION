'use client';

import Link from 'next/link';
import { Wrench, ArrowUpCircle, Wind, Download, Phone, ChevronRight, Clock, Star } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    gradient: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderHover: 'hover:border-blue-200',
    title: 'Sửa chữa máy tính',
    description: 'Chẩn đoán & khắc phục mọi sự cố phần cứng, phần mềm. Linh kiện chính hãng, bảo hành sau sửa.',
    price: 'Từ 200.000₫',
    time: 'Hoàn thành trong 24h',
    tag: 'Phổ biến',
  },
  {
    icon: ArrowUpCircle,
    gradient: 'from-emerald-500 to-emerald-600',
    lightBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderHover: 'hover:border-emerald-200',
    title: 'Nâng cấp linh kiện',
    description: 'Nâng cấp RAM, SSD, CPU, GPU. Tư vấn cấu hình phù hợp ngân sách. Tặng vệ sinh miễn phí.',
    price: 'Từ 150.000₫',
    time: 'Tư vấn miễn phí',
    tag: 'Tiết kiệm',
  },
  {
    icon: Wind,
    gradient: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderHover: 'hover:border-amber-200',
    title: 'Vệ sinh & bảo trì',
    description: 'Vệ sinh tản nhiệt, thay keo tản nhiệt, kiểm tra toàn diện. Kéo dài tuổi thọ thiết bị.',
    price: 'Từ 150.000₫',
    time: 'Trong vòng 2 giờ',
    tag: 'Nhanh',
  },
  {
    icon: Download,
    gradient: 'from-violet-500 to-purple-600',
    lightBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderHover: 'hover:border-violet-200',
    title: 'Cài đặt phần mềm',
    description: 'Cài Windows, driver, phần mềm bản quyền. Backup dữ liệu an toàn. Tối ưu hệ thống.',
    price: 'Từ 100.000₫',
    time: 'Nhận máy – giao tận nơi',
    tag: 'Tiện lợi',
  },
];

export default function ShopServices() {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0066FF]">VSIC 9511 · Dịch vụ</span>
            <h2 className="mt-1 text-[18px] font-bold text-gray-900 md:text-[22px]">
              Sửa chữa & Nâng cấp chuyên nghiệp
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-gray-700">4.9/5</span>
            <span>· 2.400+ khách đã dùng dịch vụ</span>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${s.borderHover}`}
              >
                {/* Tag */}
                <span className="absolute right-4 top-4 rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold text-gray-500">
                  {s.tag}
                </span>

                {/* Icon */}
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${s.lightBg}`}>
                  <Icon className={`h-5 w-5 ${s.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="mt-3.5 text-[14px] font-bold text-gray-900">{s.title}</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-gray-500">{s.description}</p>

                {/* Meta row */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">{s.price}</p>
                    <div className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="h-3 w-3" />
                      {s.time}
                    </div>
                  </div>
                  <Link
                    href="/lien-he"
                    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold ${s.iconColor} bg-gray-50 transition-colors hover:brightness-105`}
                  >
                    Đặt lịch <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#001A5F] to-[#0066FF] px-6 py-5 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-[15px] font-bold text-white">Cần tư vấn kỹ thuật miễn phí?</p>
            <p className="mt-0.5 text-[12px] text-white/70">Đội ngũ kỹ thuật viên chứng nhận, hỗ trợ 8h–20h hàng ngày</p>
          </div>
          <a
            href="tel:1900xxxx"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-[13px] font-bold text-[#0066FF] transition-opacity hover:opacity-90"
          >
            <Phone className="h-4 w-4" />
            1900.xxxx
          </a>
        </div>
      </div>
    </section>
  );
}
