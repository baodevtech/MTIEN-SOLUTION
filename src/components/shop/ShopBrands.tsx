const brands = [
  { name: 'Apple', color: '#1d1d1f' },
  { name: 'Dell', color: '#007DB8' },
  { name: 'ASUS', color: '#00539F' },
  { name: 'Lenovo', color: '#E2231A' },
  { name: 'HP', color: '#0096D6' },
  { name: 'MSI', color: '#D22630' },
  { name: 'Intel', color: '#0068B5' },
  { name: 'NVIDIA', color: '#76B900' },
  { name: 'Samsung', color: '#1428A0' },
  { name: 'Logitech', color: '#00B3A4' },
  { name: 'Microsoft', color: '#737373' },
  { name: 'Kingston', color: '#BA0C2F' },
];

/* Duplicate for infinite marquee */
const doubled = [...brands, ...brands];

export default function ShopBrands() {
  return (
    <section className="overflow-hidden border-y border-gray-100 bg-white py-6">
      <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        Thương hiệu phân phối chính hãng
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        {/* Marquee track */}
        <div
          className="flex gap-4"
          style={{
            animation: 'marquee 28s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex h-9 min-w-[110px] flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white px-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className="text-[13px] font-bold tracking-tight"
                style={{ color: brand.color }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
