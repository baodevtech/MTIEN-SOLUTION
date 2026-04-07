
"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ShoppingCart, Star, Zap, Cpu, Monitor, Wifi, HardDrive, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "@/data/products";

// Bento Grid Mock Images
const categoryBento = [
  { id: "laptop", name: "Laptop & Macbook", icon: Monitor, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80", count: "120+ Sản phẩm" },
  { id: "pc", name: "PC & Server", icon: HardDrive, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", count: "45+ Cấu hình" },
  { id: "linhkien", name: "Linh kiện PC", icon: Cpu, image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80", count: "500+ Linh kiện" },
  { id: "mang", name: "Thiết bị Mạng", icon: Wifi, image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80", count: "80+ Thiết bị" }
];

export default function EpicShopLayout() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter(p => {
     const matchCategory = activeTab === "all" || p.category === activeTab;
     const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
     return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 pt-16">
      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS & CATEGORIES */}
          <aside className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 md:sticky md:top-24 z-10">
             {/* Shop Identity */}
             <div className="mb-8 animate-fade-in-up">
               <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-[1.1] mb-2">
                 Shop <span className="text-blue-600">Pro.</span>
               </h1>
               <p className="text-slate-500 text-sm">Hệ thống phân phối Thiết bị IT & Phần cứng chính hãng toàn quốc.</p>
             </div>

             {/* Search Bar */}
             <div className="relative mb-6 shadow-sm">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search className="h-5 w-5 text-slate-400" />
               </div>
               <input 
                 type="text" 
                 placeholder="Tìm kiếm thiết bị..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
               />
             </div>

             {/* Category Nav */}
             <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm mb-6">
               <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                 <Cpu className="w-5 h-5 text-blue-600" /> Danh mục sản phẩm
               </h3>
               <nav className="flex flex-col gap-1.5">
                 <button 
                    onClick={() => setActiveTab("all")}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === "all" ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"}`}
                 >
                   <span>Tất cả sản phẩm</span>
                   <span className={`text-xs py-0.5 px-2.5 rounded-full font-bold ${activeTab === "all" ? "bg-blue-200/50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{PRODUCTS.length}</span>
                 </button>
                 {CATEGORIES.map(cat => {
                   const count = PRODUCTS.filter(p => p.category === cat.key).length;
                   return (
                     <button 
                        key={cat.key}
                        onClick={() => setActiveTab(cat.key)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === cat.key ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"}`}
                     >
                       <span>{cat.name}</span>
                       <span className={`text-xs py-0.5 px-2.5 rounded-full font-bold ${activeTab === cat.key ? "bg-blue-200/50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                     </button>
                   );
                 })}
               </nav>
             </div>

             {/* Banner Ads / Trust Side */}
             <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 p-6 hidden md:flex flex-col justify-end group cursor-pointer shadow-sm shadow-blue-900/5">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />
               <Image src="https://images.unsplash.com/photo-1624706591244-93e8a4a58baf?auto=format&fit=crop&w=500&q=80" alt="VGA Promo" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
               <div className="relative z-20">
                 <div className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase w-fit mb-2 shadow-lg shadow-red-500/30">Deal Sốc</div>
                 <h4 className="text-white font-black text-xl mb-1 group-hover:text-blue-300 transition-colors">Build PC Gaming</h4>
                 <p className="text-slate-200 text-sm mb-3">Tặng lót chuột & Voucher 1.000.000đ.</p>
                 <div className="flex items-center text-blue-300 text-sm font-bold gap-1 group-hover:gap-2 transition-all">Khám phá ngay <ArrowRight className="w-4 h-4"/></div>
               </div>
             </div>
          </aside>

          {/* RIGHT CONTENT: PRODUCT GRID */}
          <main className="flex-1 min-w-0">
             {/* Banners Grid (Bento mini) */}
             {activeTab === "all" && !searchQuery && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                   {categoryBento.slice(0, 2).map((cat, i) => (
                     <div key={i} className="relative aspect-[21/9] sm:aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-slate-200/60">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors" />
                        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                           <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm">
                             <cat.icon className="w-5 h-5"/>
                           </div>
                           <div>
                             <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors drop-shadow-md">{cat.name}</h3>
                             <p className="text-slate-200 text-sm drop-shadow">{cat.count}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             )}

             {/* Header Grid */}
             <div className="flex flex-wrap items-end justify-between mb-6 gap-2">
                <h2 className="text-2xl font-bold text-slate-800">
                  {searchQuery ? `Kết quả cho "${searchQuery}"` : activeTab === "all" ? "Sản phẩm mới nhất" : CATEGORIES.find(c => c.key === activeTab)?.name}
                </h2>
                <div className="text-slate-500 text-sm font-medium bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  Hiển thị <span className="text-blue-600 font-bold">{filteredProducts.length}</span> thiết bị
                </div>
             </div>

             {/* The Real Grid */}
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                 {filteredProducts.map((product, i) => (
                   <motion.div 
                     key={product.slug}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: (i % 10) * 0.05, duration: 0.4 }}
                     className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300 flex flex-col"
                   >
                     {/* Image Area */}
                     <div className="relative aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden w-full group-hover:bg-blue-50/50 transition-colors">
                       <Image src={product.image} alt={product.name} fill className="object-contain p-6 drop-shadow-[0_20px_20px_rgba(0,0,0,0.05)] group-hover:scale-110 transition-transform duration-500 z-10 relative mix-blend-multiply" unoptimized />
                       
                       {/* Floating Actions */}
                       <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-20">
                         <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-slate-700 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-md border border-slate-100">
                           <ShoppingCart className="w-4 h-4 md:w-4.5 md:h-4.5" />
                         </button>
                         <Link href={`/shop/${product.slug}`} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-cyan-500 transition-colors shadow-md">
                           <ArrowRight className="w-4 h-4 md:w-4.5 md:h-4.5" />
                         </Link>
                       </div>

                       {/* Badges */}
                       <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-20">
                         {product.discount && (
                           <span className="px-2.5 py-1 bg-red-500 shadow-sm shadow-red-500/20 text-[10px] font-bold text-white rounded-full uppercase tracking-wider block w-fit">
                             {product.discount}
                           </span>
                         )}
                         {product.badge === 'Flash Sale' && (
                           <span className="px-2.5 py-1 bg-[#FF6B00] shadow-sm shadow-[#FF6B00]/20 text-[10px] font-bold text-white rounded-full uppercase tracking-wider flex items-center gap-1 w-fit">
                             <Zap className="w-3 h-3"/> Sale
                           </span>
                         )}
                         {product.badge === 'Mới' && (
                           <span className="px-2.5 py-1 bg-emerald-500 shadow-sm shadow-emerald-500/20 text-[10px] font-bold text-white rounded-full uppercase tracking-wider w-fit">
                             Mới
                           </span>
                         )}
                         {product.badge === 'Best Seller' && (
                           <span className="px-2.5 py-1 bg-orange-500 shadow-sm shadow-orange-500/20 text-[10px] font-bold text-white rounded-full uppercase tracking-wider w-fit">
                             Best Seller
                           </span>
                         )}
                       </div>
                     </div>

                     {/* Content Area */}
                     <div className="p-4 md:p-5 flex flex-col flex-1 bg-white border-t border-slate-100">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{product.brand}</div>
                         <div className="flex items-center gap-0.5 text-slate-500 text-xs font-medium">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {product.rating}
                         </div>
                       </div>
                       
                       <Link href={`/shop/${product.slug}`} className="flex-1">
                         <h3 className="text-[15px] md:text-base font-bold text-slate-800 mb-2.5 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                           {product.name}
                         </h3>
                       </Link>
                       
                       <div className="hidden md:flex flex-wrap items-center gap-1.5 mb-4">
                         {product.specs?.slice(0, 2).map((s, idx) => (
                           <span key={idx} className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100 whitespace-nowrap">{s.value}</span>
                         ))}
                       </div>

                       <div className="flex items-end justify-between mt-auto pt-2">
                         <div>
                           {product.oldPriceDisplay && (
                             <div className="text-[11px] text-slate-400 line-through mb-0.5 font-medium">{product.oldPriceDisplay}</div>
                           )}
                           <div className="text-base md:text-lg font-black text-blue-600 tracking-tight">{product.priceDisplay}</div>
                         </div>
                         <Link href={`/shop/${product.slug}`} className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                           <ShoppingCart className="w-4 h-4" />
                         </Link>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
             ) : (
                <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                   <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center text-slate-400 mb-4 shadow-sm border border-slate-100">
                     <Search className="w-8 h-8" />
                   </div>
                   <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">Không tìm thấy thiết bị nào</h3>
                   <p className="text-slate-500 text-sm md:text-base">Vui lòng thử lại với từ khóa khác hoặc dọn dẹp bộ lọc.</p>
                   <button 
                     onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                     className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30"
                   >
                     Xóa bộ lọc
                   </button>
                </div>
             )}
          </main>

        </div>
      </div>
      
      {/* Brand Ticker (Optional Footer Info) */}
      <section className="py-8 border-y border-slate-200 bg-white mt-4 md:mt-12 overflow-hidden shadow-sm">
        <div className="container mx-auto max-w-7xl relative">
           <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
           <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />
           <motion.div 
             animate={{ x: ["0%", "-50%"] }} 
             transition={{ duration: 30, ease: "linear", repeat: Infinity }}
             className="flex items-center gap-16 md:gap-24 whitespace-nowrap min-w-max px-12"
           >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16 md:gap-24 items-center">
                  <span className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">NVIDIA</span>
                  <span className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">INTEL</span>
                  <span className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">AMD</span>
                  <span className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">APPLE</span>
                  <span className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">ASUS ROG</span>
                  <span className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">DELL EMC</span>
                  <span className="text-xl md:text-2xl font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-pointer">CISCO</span>
                </div>
              ))}
           </motion.div>
        </div>
      </section>

    </div>
  );
}
