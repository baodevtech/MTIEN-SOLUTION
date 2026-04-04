'use client';

import { Laptop, Monitor, Cpu, Keyboard, Shield, Wifi, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Category {
  name: string;
  icon: LucideIcon;
  count: string;
}

const categories: Category[] = [
  { name: 'Laptop & MacBook', icon: Laptop, count: '120+ sản phẩm' },
  { name: 'PC & Máy bàn', icon: Monitor, count: '85+ sản phẩm' },
  { name: 'Linh kiện máy tính', icon: Cpu, count: '350+ sản phẩm' },
  { name: 'Thiết bị ngoại vi', icon: Keyboard, count: '200+ sản phẩm' },
  { name: 'Phần mềm bản quyền', icon: Shield, count: '60+ sản phẩm' },
  { name: 'Thiết bị mạng', icon: Wifi, count: '45+ sản phẩm' },
];

export default function ShopCategories() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section heading */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-[12px] font-semibold tracking-wide text-[#0066FF]">
            Danh mục
          </span>
          <h2 className="text-[22px] font-bold text-slate-900 md:text-[26px]">
            Danh mục sản phẩm
          </h2>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <a
                key={category.name}
                href="#"
                className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0066FF] hover:shadow-md"
              >
                {/* Icon circle */}
                <div className="mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#EFF6FF] transition-colors duration-300 group-hover:bg-[#DBEAFE]">
                  <Icon className="h-6 w-6 text-[#0066FF]" strokeWidth={1.8} />
                </div>

                {/* Category name */}
                <span className="mb-1 text-[15px] font-bold leading-snug text-slate-900">
                  {category.name}
                </span>

                {/* Product count */}
                <span className="text-[13px] text-slate-400">
                  {category.count}
                </span>

                {/* Hover arrow */}
                <ArrowRight className="mt-3 h-4 w-4 translate-x-0 text-[#0066FF] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
