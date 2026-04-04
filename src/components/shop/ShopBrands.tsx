import Image from 'next/image';

const brands = [
  'Apple',
  'Dell',
  'ASUS',
  'Lenovo',
  'HP',
  'MSI',
  'Intel',
  'NVIDIA',
  'Samsung',
  'Logitech',
  'Microsoft',
  'Kingston',
];

export default function ShopBrands() {
  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-slate-400">
          Đối tác thương hiệu
        </p>

        <div className="grid grid-cols-4 items-center gap-8 md:grid-cols-6">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center justify-center">
              <Image
                src={`https://picsum.photos/seed/${brand.toLowerCase()}/160/60`}
                alt={brand}
                width={160}
                height={60}
                className="h-8 w-auto object-contain opacity-50 grayscale transition hover:opacity-100 md:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
