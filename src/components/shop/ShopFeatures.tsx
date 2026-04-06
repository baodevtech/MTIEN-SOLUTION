import { ShieldCheck, Award, Truck, Headphones, RotateCcw, BadgePercent } from 'lucide-react';

const features = [
  { icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50', label: '100% Chính hãng' },
  { icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Bảo hành uy tín' },
  { icon: Truck, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Giao hàng toàn quốc' },
  { icon: RotateCcw, color: 'text-violet-600', bg: 'bg-violet-50', label: 'Đổi trả 7 ngày' },
  { icon: Headphones, color: 'text-sky-600', bg: 'bg-sky-50', label: 'Hỗ trợ 8h–20h' },
  { icon: BadgePercent, color: 'text-rose-500', bg: 'bg-rose-50', label: 'Giá tốt nhất' },
];

export default function ShopFeatures() {
  return (
    <section className="border-t border-gray-100 bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-4 text-center transition-shadow hover:shadow-sm"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.bg}`}>
                  <Icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <p className="text-[11px] font-semibold leading-tight text-gray-700">{f.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
