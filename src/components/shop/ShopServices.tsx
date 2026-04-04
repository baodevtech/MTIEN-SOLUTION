'use client';

import Link from 'next/link';
import { Wrench, ArrowUpCircle, Wind, Download } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    bg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Sửa chữa máy tính',
    description:
      'Chẩn đoán & khắc phục mọi sự cố phần cứng, phần mềm. Linh kiện chính hãng.',
    price: 'Từ 200.000₫',
  },
  {
    icon: ArrowUpCircle,
    bg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Nâng cấp linh kiện',
    description:
      'Nâng cấp RAM, SSD, CPU, GPU. Tư vấn cấu hình phù hợp nhu cầu.',
    price: 'Từ 150.000₫ (chưa gồm linh kiện)',
  },
  {
    icon: Wind,
    bg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Vệ sinh & bảo trì',
    description:
      'Vệ sinh tản nhiệt, thay keo tản nhiệt, kiểm tra toàn diện hệ thống.',
    price: 'Từ 150.000₫',
  },
  {
    icon: Download,
    bg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Cài đặt phần mềm',
    description:
      'Cài đặt Windows, driver, phần mềm bản quyền. Backup dữ liệu an toàn.',
    price: 'Từ 100.000₫',
  },
];

export default function ShopServices() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Dịch vụ sửa chữa & nâng cấp
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            Đội ngũ kỹ thuật viên chứng nhận
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:-translate-y-1 hover:shadow-lg md:p-8"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${service.bg}`}
                >
                  <Icon className={`h-6 w-6 ${service.iconColor}`} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {service.price}
                </p>

                <Link
                  href="/lien-he"
                  className={`mt-4 inline-block text-sm font-medium ${service.iconColor} hover:underline`}
                >
                  Đặt lịch →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
