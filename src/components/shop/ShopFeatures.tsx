import { ShieldCheck, Award, Truck, Headphones } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    bg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: '100% Chính hãng',
    description:
      'Cam kết sản phẩm chính hãng, tem nhãn đầy đủ, nguồn gốc rõ ràng.',
  },
  {
    icon: Award,
    bg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Bảo hành uy tín',
    description:
      'Bảo hành theo chính sách hãng. Đổi mới trong 7 ngày nếu lỗi.',
  },
  {
    icon: Truck,
    bg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Giao hàng nhanh',
    description:
      'Giao hàng toàn quốc 1-3 ngày. Miễn phí giao từ 2 triệu.',
  },
  {
    icon: Headphones,
    bg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Hỗ trợ 24/7',
    description:
      'Tư vấn kỹ thuật chuyên sâu. Hotline & chat trực tuyến.',
  },
];

export default function ShopFeatures() {
  return (
    <section className="border-t border-slate-100 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 text-center md:p-8"
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${feature.bg}`}
                >
                  <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
