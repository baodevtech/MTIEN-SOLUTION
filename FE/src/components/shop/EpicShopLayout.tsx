
"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ShoppingCart, Star, Zap, Cpu, Monitor, Wifi, HardDrive, Search, SlidersHorizontal, X, ChevronDown, Flame, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"newest"|"price-asc"|"price-desc"|"hot">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Lọc sản phẩm
  let filteredProducts: Product[] = PRODUCTS.filter(p => {
     const matchCategory = activeTab === "all" || p.category === activeTab;
     const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
     return matchCategory && matchSearch;
  });

  // Sắp xếp sản phẩm
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "hot": return (b.sold || 0) - (a.sold || 0); // Giả sử những sản phẩm bán nhiều/đánh giá cao là Hot
      case "newest":
      default: return 0; // Giữ nguyên mảng mặc định được xem là Mới nhất
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 pt-16 md:pt-20 pb-20 md:pb-0">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl pt-2 sm:pt-4 md:pt-8 pb-12">
        
        {/* MOBILE BANNERS & CATEGORY NAV */}
        <div className="md:hidden mb-4">
           {/* Mobile Bento Banners - Now at Top */}
           {activeTab === "all" && !searchQuery && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                 {categoryBento.slice(0, 2).map((cat, i) => (
                   <div key={i} className="relative aspect-[2/1] rounded-xl overflow-hidden group shadow-sm border border-slate-200/60">
                      <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/20" />
                      <div className="absolute inset-0 p-3 flex flex-col justify-end">
                         <h3 className="text-sm font-bold text-white leading-tight drop-shadow-md">{cat.name}</h3>
                         <p className="text-white/80 text-[9px] drop-shadow">{cat.count}</p>
                      </div>
                   </div>
                 ))}
              </div>
           )}
           
           {/* Sticky Horizontal Scrolling Categories and Filter Button */}
           <div className="sticky top-16 md:static z-40 bg-slate-50/80 backdrop-blur-xl py-2 px-1 -mx-1 mb-2 flex items-center gap-1.5 overflow-x-auto scrollbar-hide no-scrollbar border-b border-slate-200/50">
             <button 
                onClick={() => setIsFilterOpen(true)}
                className="shrink-0 flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white text-slate-700 rounded-full shadow-sm border border-slate-200/80 text-[11px] md:text-[13px] font-semibold hover:bg-slate-50 hover:text-blue-600 transition-all hover:shadow"
             >
                <SlidersHorizontal className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Lọc & Tìm</span>
             </button>

             <div className="w-px h-4 md:h-5 bg-slate-200/80 mx-0.5 md:mx-1 shrink-0"></div>

             {/* All Category Pill */}
             <button 
                onClick={() => setActiveTab("all")}
                className={`shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 font-medium text-[11px] md:text-[13px] ${activeTab === "all" ? "bg-slate-900 text-white shadow-md shadow-slate-900/20" : "bg-transparent text-slate-500 hover:bg-slate-200/60 hover:text-slate-800"}`}
             >
               Tất cả
             </button>
             
             {/* Dynamic Category Pills */}
             {CATEGORIES.map(cat => (
               <button 
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 font-medium text-[11px] md:text-[13px] flex items-center gap-1.5 ${activeTab === cat.key ? "bg-slate-900 text-white shadow-md shadow-slate-900/20" : "bg-transparent text-slate-500 hover:bg-slate-200/60 hover:text-slate-800"}`}
               >
                 {cat.name}
               </button>
             ))}
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
          
          {/* DESKTOP SIDEBAR & MOBILE DRAWED FILTER */}
          <aside className={`fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 md:static md:bg-transparent md:backdrop-blur-none md:w-[240px] lg:w-[280px] md:flex-shrink-0 md:z-10 ${isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"}`}>
             
             {/* Filter Drawer Content */}
             <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col transition-transform duration-300 md:static md:w-full md:max-w-none md:shadow-none md:bg-transparent md:translate-x-0 ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}>
               {/* Mobile Drawer Header */}
               <div className="p-4 border-b border-slate-100 flex items-center justify-between md:hidden bg-slate-50">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">
                   <Search className="w-5 h-5 text-blue-600" />
                   Tìm kiếm nâng cao
                 </h3>
                 <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-white rounded-full text-slate-500 hover:text-red-500 shadow-sm border border-slate-200">
                   <X className="w-5 h-5" />
                 </button>
               </div>

               <div className="p-4 md:p-0 overflow-y-auto flex-1 md:sticky md:top-24">
                 {/* Shop Identity (Desktop only) */}
                 <div className="mb-4 md:mb-8 animate-fade-in-up hidden md:block">
                   <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-[1.1] mb-2">
                     Shop <span className="text-blue-600">Pro.</span>
                   </h1>
                   <p className="text-slate-500 text-sm">Hệ thống phân phối Thiết bị IT.</p>
                 </div>

                 {/* Search Bar */}
                 <div className="mb-6">
                   <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider md:hidden">Tìm theo tên</p>
                   <div className="relative shadow-sm">
                     <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                       <Search className="h-4 w-4 md:h-5 md:w-5 text-slate-400" />
                     </div>
                     <input 
                       type="text" 
                       placeholder="Nhập tên sản phẩm..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full bg-white border border-slate-200 rounded-xl md:rounded-2xl py-3 md:py-3.5 pl-10 md:pl-12 pr-4 text-sm md:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                     />
                   </div>
                 </div>

                 {/* Category Nav - Mobile & Desktop */}
                 <div className="bg-white md:border border-slate-200 md:rounded-3xl md:p-5 md:shadow-sm mb-4 md:mb-6">
                   <h3 className="flex text-slate-800 font-bold mb-3 md:mb-4 items-center gap-2 text-[13px] md:text-sm uppercase tracking-wider md:tracking-normal md:normal-case">
                     <Cpu className="hidden md:block w-5 h-5 text-blue-600" /> Danh mục sản phẩm
                   </h3>
                   <nav className="flex flex-col gap-2 md:gap-1.5">
                     <button 
                        onClick={() => { setActiveTab("all"); setIsFilterOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 md:px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm md:text-base ${activeTab === "all" ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100" : "bg-slate-50 md:bg-transparent text-slate-600 hover:text-slate-900 md:hover:bg-slate-50 border border-transparent"}`}
                     >
                       <span>Tất cả</span>
                       <span className={`text-xs py-0.5 px-2.5 rounded-full font-bold ${activeTab === "all" ? "bg-blue-200/50 text-blue-700" : "bg-slate-200 text-slate-600"}`}>{PRODUCTS.length}</span>
                     </button>
                     {CATEGORIES.map(cat => {
                       const count = PRODUCTS.filter(p => p.category === cat.key).length;
                       return (
                         <button 
                            key={cat.key}
                            onClick={() => { setActiveTab(cat.key); setIsFilterOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 md:px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm md:text-base ${activeTab === cat.key ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100" : "bg-slate-50 md:bg-transparent text-slate-600 hover:text-slate-900 md:hover:bg-slate-50 border border-transparent"}`}
                         >
                           <span>{cat.name}</span>
                           <span className={`text-xs py-0.5 px-2.5 rounded-full font-bold ${activeTab === cat.key ? "bg-blue-200/50 text-blue-700" : "bg-slate-200 text-slate-600"}`}>{count}</span>
                         </button>
                       );
                     })}
                   </nav>
                 </div>

                 {/* Desktop Trust Side */}
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
               </div>
             </div>
             {/* Backdrop click to close */}
             <div onClick={() => setIsFilterOpen(false)} className={`absolute inset-0 z-[-1] md:hidden ${isFilterOpen ? "block" : "hidden"}`}></div>
          </aside>

          {/* RIGHT CONTENT: PRODUCT GRID */}
          <main className="flex-1 min-w-0 w-full relative z-0">
             {/* Desktop Banners Grid (hidden on mobile, shown on md up) */}
             {activeTab === "all" && !searchQuery && (
                <div className="hidden md:grid grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
                   {categoryBento.slice(0, 2).map((cat, i) => (
                     <div key={i} className="relative sm:aspect-[16/9] lg:aspect-[21/9] rounded-xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-slate-200/60">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors" />
                        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                           <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm">
                             <cat.icon className="w-4 h-4 md:w-5 md:h-5"/>
                           </div>
                           <div>
                             <h3 className="sm:text-xl md:text-2xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-blue-300 transition-colors drop-shadow-md leading-tight">{cat.name}</h3>
                             <p className="text-white/80 text-[10px] md:text-sm drop-shadow">{cat.count}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             )}

             {/* Header Grid */}
             <div className="flex flex-row items-center justify-between mb-3 md:mb-4 gap-2 z-30 relative">
                <h2 className="text-base md:text-2xl font-bold text-slate-800 truncate flex items-center gap-1.5 md:gap-2">
                  {searchQuery ? (
                    <>Tìm: <span className="text-blue-600 font-black">"{searchQuery}"</span></>
                  ) : activeTab === "all" ? (
                    <>Khám phá <Flame className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B00]" /></>
                  ) : (
                    CATEGORIES.find(c => c.key === activeTab)?.name
                  )}
                  <span className="text-[10px] md:text-sm font-medium bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md border border-blue-100">({filteredProducts.length})</span>
                </h2>
                
                {/* Desktop/Tablet Sort Utilities */}
                <div className="flex items-center justify-end gap-2 shrink-0">
                  {/* Custom Sort Dropdown */}
                  <div className="relative z-40">
                     <button 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
                        className="flex items-center gap-1 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 bg-white border border-slate-200 rounded-full shadow-sm text-[10px] md:text-sm font-semibold text-slate-700 hover:border-slate-300 w-auto justify-between group"
                     >
                       <span className="truncate max-w-[70px] md:max-w-none">
                         {sortBy === "newest" && "Mới nhất"}
                         {sortBy === "price-asc" && "Giá thấp"}
                         {sortBy === "price-desc" && "Giá cao"}
                         {sortBy === "hot" && "Bán chạy"}
                       </span>
                       <ChevronDown className={`w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                     </button>

                     {/* Dropdown list */}
                     {isSortOpen && (
                       <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-50 animate-fade-in-up origin-top text-sm">
                         <button onClick={() => { setSortBy("newest"); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 font-medium ${sortBy === "newest" ? "text-blue-600 bg-blue-50/50" : "text-slate-600"}`}>
                            Mới & Nổi Bật {sortBy === "newest" && <Sparkles className="w-4 h-4"/>}
                         </button>
                         <button onClick={() => { setSortBy("hot"); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 font-medium ${sortBy === "hot" ? "text-[#FF6B00] bg-orange-50" : "text-slate-600"}`}>
                            Bán Chạy Nhất {sortBy === "hot" && <Flame className="w-4 h-4"/>}
                         </button>
                         <div className="h-px bg-slate-100 my-1 mx-4"></div>
                         <button onClick={() => { setSortBy("price-asc"); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 font-medium ${sortBy === "price-asc" ? "text-emerald-600 bg-emerald-50" : "text-slate-600"}`}>
                            Giá: Thấp đến Cao {sortBy === "price-asc" && <ArrowUpRight className="w-4 h-4"/>}
                         </button>
                         <button onClick={() => { setSortBy("price-desc"); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 font-medium ${sortBy === "price-desc" ? "text-rose-600 bg-rose-50" : "text-slate-600"}`}>
                            Giá: Cao xuống Thấp {sortBy === "price-desc" && <ArrowDownRight className="w-4 h-4"/>}
                         </button>
                       </div>
                     )}
                  </div>
                </div>
             </div>

             {/* The Real Grid */}
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                 {filteredProducts.map((product, i) => (
                   <motion.div 
                     key={product.slug}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: (i % 10) * 0.05, duration: 0.4 }}
                     className="group relative bg-white rounded-2xl md:rounded-3xl border border-slate-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300 flex flex-col"
                   >
                     {/* Image Area */}
                     <div className="relative aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden w-full group-hover:bg-blue-50/50 transition-colors">
                       <Image src={product.image} alt={product.name} fill className="object-contain p-4 md:p-6 drop-shadow-[0_20px_20px_rgba(0,0,0,0.05)] group-hover:scale-110 transition-transform duration-500 z-10 relative mix-blend-multiply" unoptimized />
                       
                       {/* Floating Actions */}
                       <div className="absolute right-2 md:right-3 top-2 md:top-3 flex flex-col gap-1.5 md:gap-2 opacity-100 md:opacity-0 md:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-20">
                         <button className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/80 md:bg-white backdrop-blur text-slate-700 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-sm md:shadow-md border border-slate-100">
                           <ShoppingCart className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
                         </button>
                         <Link href={`/shop/${product.slug}`} className="flex w-7 h-7 md:w-10 md:h-10 rounded-full bg-slate-900/80 md:bg-slate-900 backdrop-blur text-white items-center justify-center hover:bg-cyan-500 transition-colors shadow-sm md:shadow-md">
                           <ArrowRight className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
                         </Link>
                       </div>

                       {/* Badges */}
                       <div className="absolute left-2 md:left-3 top-2 md:top-3 flex flex-col gap-1.5 z-20">
                         {product.discount && (
                           <span className="px-2 py-0.5 md:px-2.5 md:py-1 bg-red-500 shadow-sm shadow-red-500/20 text-[9px] md:text-[10px] font-bold text-white rounded-full uppercase tracking-wider block w-fit">
                             {product.discount}
                           </span>
                         )}
                         {product.badge === 'Flash Sale' && (
                           <span className="px-2 py-0.5 md:px-2.5 md:py-1 bg-[#FF6B00] shadow-sm shadow-[#FF6B00]/20 text-[9px] md:text-[10px] font-bold text-white rounded-full uppercase tracking-wider flex items-center gap-1 w-fit">
                             <Zap className="w-2.5 h-2.5 md:w-3 md:h-3"/> Sale
                           </span>
                         )}
                         {product.badge === 'Mới' && (
                           <span className="px-2 py-0.5 md:px-2.5 md:py-1 bg-emerald-500 shadow-sm shadow-emerald-500/20 text-[9px] md:text-[10px] font-bold text-white rounded-full uppercase tracking-wider w-fit">
                             Mới
                           </span>
                         )}
                         {product.badge === 'Best Seller' && (
                           <span className="px-2 py-0.5 md:px-2.5 md:py-1 bg-orange-500 shadow-sm shadow-orange-500/20 text-[9px] md:text-[10px] font-bold text-white rounded-full uppercase tracking-wider w-fit">
                             Best
                           </span>
                         )}
                       </div>
                     </div>

                     {/* Content Area */}
                     <div className="p-3 md:p-5 flex flex-col flex-1 bg-white border-t border-slate-100">
                       <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                         <div className="text-[9px] md:text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-1.5 md:px-2 py-0.5 rounded border border-blue-100">{product.brand}</div>
                         <div className="flex items-center gap-0.5 text-slate-500 text-[10px] md:text-xs font-medium">
                            <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-400 fill-amber-400" /> {product.rating}
                         </div>
                       </div>
                       
                       <Link href={`/shop/${product.slug}`} className="flex-1">
                         <h3 className="text-sm md:text-base font-bold text-slate-800 mb-1.5 md:mb-2.5 line-clamp-2 group-hover:text-blue-600 transition-colors leading-[1.3] md:leading-snug">
                           {product.name}
                         </h3>
                       </Link>
                       
                       <div className="flex flex-wrap items-center gap-1 md:gap-1.5 mb-2.5 md:mb-4">
                         {product.specs?.slice(0, 2).map((s, idx) => (
                           <span key={idx} className="text-[9px] md:text-[11px] font-medium text-slate-500 bg-slate-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded border border-slate-100 whitespace-nowrap">{s.value}</span>
                         ))}
                       </div>

                       <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-auto pt-2 border-t border-slate-50 md:border-transparent gap-1.5 sm:gap-0">
                         <div>
                           {product.oldPriceDisplay && (
                             <div className="text-[10px] md:text-[11px] text-slate-400 line-through mb-0 md:mb-0.5 font-medium">{product.oldPriceDisplay}</div>
                           )}
                           <div className="text-sm sm:text-base md:text-lg font-black text-blue-600 tracking-tight">{product.priceDisplay}</div>
                         </div>
                         <button className="w-full sm:w-8 sm:h-8 md:w-10 md:h-10 py-1.5 sm:py-0 rounded-lg md:rounded-xl bg-blue-50 sm:bg-slate-50 border border-blue-100 sm:border-slate-200 text-blue-600 sm:text-slate-600 flex items-center justify-center gap-1.5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                           <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                           <span className="text-[10px] font-bold sm:hidden">Mua ngay</span>
                         </button>
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
