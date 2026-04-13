import Link from 'next/link';
import { Laptop, Monitor, Cpu, Keyboard, Shield, Wifi, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CategoryItem {
  label: string;
  sub: string;
  icon: LucideIcon;
  href: string;
  bg: string;
  iconColor: string;
  accent: string;
}

const categories: CategoryItem[] = [
  { label: 'Laptop', sub: '120+ sản phẩm', icon: Laptop, href: '/shop?cat=laptop', bg: 'bg-blue-50', iconColor: 'text-blue-600', accent: 'group-hover:bg-blue-100' },
  { label: 'PC & Máy bàn', sub: '85+ sản phẩm', icon: Monitor, href: '/shop?cat=pc', bg: 'bg-violet-50', iconColor: 'text-violet-600', accent: 'group-hover:bg-violet-100' },
  { label: 'Linh kiện', sub: '350+ sản phẩm', icon: Cpu, href: '/shop?cat=linhkien', bg: 'bg-orange-50', iconColor: 'text-orange-500', accent: 'group-hover:bg-orange-100' },
  { label: 'Ngoại vi', sub: '200+ sản phẩm', icon: Keyboard, href: '/shop?cat=ngoaivi', bg: 'bg-emerald-50', iconColor: 'text-emerald-600', accent: 'group-hover:bg-emerald-100' },
  { label: 'Phần mềm', sub: '60+ sản phẩm', icon: Shield, href: '/shop?cat=phanmem', bg: 'bg-sky-50', iconColor: 'text-sky-600', accent: 'group-hover:bg-sky-100' },
  { label: 'Thiết bị mạng', sub: '45+ sản phẩm', icon: Wifi, href: '/shop?cat=mang', bg: 'bg-teal-50', iconColor: 'text-teal-600', accent: 'group-hover:bg-teal-100' },
  { label: 'Sửa chữa', sub: 'Đặt lịch ngay', icon: Wrench, href: '/shop?cat=suachua', bg: 'bg-rose-50', iconColor: 'text-rose-500', accent: 'group-hover:bg-rose-100' },
];

export default function ShopCategories() {
  return (
    <section className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide md:grid md:grid-cols-7 md:overflow-visible">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex min-w-[100px] flex-shrink-0 flex-col items-center gap-2.5 rounded-2xl border border-gray-100 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF]/20 hover:shadow-md md:min-w-0"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 ${cat.bg} ${cat.accent}`}>
                  <Icon className={`h-6 w-6 ${cat.iconColor}`} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold leading-tight text-gray-800 group-hover:text-[#0066FF]">{cat.label}</p>
                  <p className="mt-0.5 text-[10px] text-gray-400">{cat.sub}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
