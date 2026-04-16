'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Monitor, Smartphone, Search, Bell, Settings, ShoppingCart, Users, Layers,
  LayoutDashboard, TrendingUp, ArrowRight, MousePointerClick, Palette,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const themeColors: Record<string, { main: string; light: string }> = {
  blue: { main: '#0066FF', light: '#eff6ff' },
  emerald: { main: '#00D68F', light: '#ecfdf5' },
  rose: { main: '#f43f5e', light: '#fff1f2' },
  amber: { main: '#f59e0b', light: '#fffbeb' },
};

const features = [
  {
    icon: MousePointerClick,
    title: 'Trình kiến tạo trực quan (No-code)',
    desc: 'Thao tác kéo thả đơn giản, chỉnh sửa nội dung, hình ảnh trực tiếp ngay trên giao diện như đang sử dụng Word. Thay đổi áp dụng Real-time.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard All-in-One',
    desc: 'Đồng bộ quản lý sản phẩm, đơn hàng, khách hàng và doanh thu từ đa kênh (Website, Shopee, Facebook) trên một màn hình duy nhất.',
  },
  {
    icon: Palette,
    title: 'Cá nhân hóa thương hiệu',
    desc: 'Thiết lập nhận diện thương hiệu (Màu sắc, Font chữ, Logo) chỉ với vài click chuột. Hệ thống tự động đồng bộ xuyên suốt toàn website.',
  },
];

/* ── Shared inner dashboard content (device mock) ── */
function DashboardContent({ builderColor, deviceMode }: { builderColor: string; deviceMode: string }) {
  return (
    <>
      {/* Device Header */}
      <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 z-20">
        {deviceMode === 'pc' ? (
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
          </div>
        ) : (
          <div className="w-24 h-5 bg-slate-200 mx-auto rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2"></div>
        )}
      </div>

      <div className="flex-1 flex bg-slate-50/50 overflow-hidden">
        {/* Sidebar (PC Only) */}
        {deviceMode === 'pc' && (
          <div className="bg-white border-r border-slate-100 flex flex-col items-center py-4 gap-6 shrink-0 z-10 w-12 md:w-16">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-md">M</div>
            <div className="flex flex-col gap-3 w-full px-3">
              {[LayoutDashboard, ShoppingCart, Users, Layers, Settings].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                  style={i === 0 ? { backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main } : { color: '#94a3b8' }}
                >
                  <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Dashboard */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-12 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-slate-400 w-1/2 max-w-[150px]">
              <Search size={12} aria-hidden="true" /> <span className="text-[10px] font-medium">Tìm kiếm...</span>
            </div>
            <div className="flex items-center gap-3">
              <Bell size={14} className="text-slate-400" aria-hidden="true" />
              <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300"></div>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Tổng quan</h3>
                <p className="text-[10px] text-slate-500">Tháng này</p>
              </div>
              <button
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white transition-colors duration-500 shadow-sm"
                style={{ backgroundColor: themeColors[builderColor].main }}
              >
                + Báo cáo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Doanh thu', val: '24.5M', inc: '+12%', icon: TrendingUp },
                { label: 'Đơn hàng', val: '1,240', inc: '+8%', icon: ShoppingCart },
                { label: 'Truy cập', val: '8.4K', inc: '-2%', icon: Users, hideMobile: true },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2 ${stat.hideMobile && deviceMode === 'mobile' ? 'hidden' : 'flex'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main }}>
                      <stat.icon size={12} strokeWidth={3} aria-hidden="true" />
                    </div>
                    <span className={`text-[9px] font-bold ${stat.inc.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.inc}</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium mb-0.5">{stat.label}</div>
                    <div className="text-sm font-black text-slate-800">{stat.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
              <div className="text-[11px] font-bold text-slate-700">Tăng trưởng</div>
              <div className="flex items-end gap-1.5 h-16 w-full" role="img" aria-label="Biểu đồ tăng trưởng">
                {[30, 50, 40, 80, 60, 45, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-700 hover:opacity-80 cursor-pointer"
                    style={{ height: `${h}%`, backgroundColor: i === 6 ? themeColors[builderColor].main : themeColors[builderColor].light }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-1">
              {[1, 2, 3].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-slate-100"></div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-700">Đơn hàng #{1042 + i}</div>
                      <div className="text-[8px] text-slate-400">2 phút trước</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-600">450k</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DashboardSection() {
  const [builderColor, setBuilderColor] = useState('blue');
  const [deviceMode, setDeviceMode] = useState('pc');
  const [activeFeature, setActiveFeature] = useState(0);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const skipAnim = reduced || isMobile;

  return (
    <section className="py-10 md:py-32 bg-white relative overflow-hidden" aria-label="Trình kiến tạo Dashboard">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[120px] -z-10 pointer-events-none hidden md:block" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-start md:items-center">
          {/* Interactive Dashboard Visual */}
          <div className="order-2 md:order-1">
          {skipAnim ? (
            <div className="relative h-[420px] md:h-[500px] lg:h-[650px] w-full bg-slate-50/80 md:bg-slate-50/50 rounded-2xl md:rounded-[2.5rem] md:border md:border-slate-100/80 flex items-center justify-center md:p-10 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:shadow-[inset_0_0_80px_rgba(0,0,0,0.02)]">
              <div
                className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-200/80 overflow-hidden flex flex-col relative z-10"
                style={{
                  width: deviceMode === 'pc' ? '100%' : '260px',
                  height: deviceMode === 'pc' ? '100%' : '85%',
                  borderRadius: deviceMode === 'pc' ? '16px' : '36px',
                }}
              >
                <DashboardContent builderColor={builderColor} deviceMode={deviceMode} />
              </div>

              {/* Desktop-only controls */}
              <div className="absolute top-6 left-6 hidden md:flex items-center gap-3 z-20">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
                  <div className="flex gap-2" role="radiogroup" aria-label="Chọn màu chủ đạo">
                    {(['blue', 'emerald', 'rose', 'amber'] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => setBuilderColor(color)}
                        className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${builderColor === color ? 'scale-110 shadow-md' : 'hover:scale-110 opacity-60 hover:opacity-100'}`}
                        style={{
                          backgroundColor: themeColors[color].main,
                          boxShadow: builderColor === color ? `0 0 0 2px white, 0 0 0 3px ${themeColors[color].main}` : 'none',
                        }}
                        aria-label={`Màu ${color}`}
                        aria-pressed={builderColor === color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Device Toggle — desktop only (centered bottom) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-slate-700/50 hidden md:flex items-center gap-1 z-20">
                <button
                  onClick={() => setDeviceMode('pc')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${deviceMode === 'pc' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  aria-pressed={deviceMode === 'pc'}
                >
                  <Monitor size={14} aria-hidden="true" /> Desktop
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${deviceMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  aria-pressed={deviceMode === 'mobile'}
                >
                  <Smartphone size={14} aria-hidden="true" /> Mobile
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[420px] md:h-[500px] lg:h-[650px] w-full bg-slate-50/80 md:bg-slate-50/50 rounded-2xl md:rounded-[2.5rem] md:border md:border-slate-100/80 flex items-center justify-center md:p-10 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:shadow-[inset_0_0_80px_rgba(0,0,0,0.02)]"
            >
              <motion.div
                layout
                initial={false}
                animate={{
                  width: deviceMode === 'pc' ? '100%' : '260px',
                  height: deviceMode === 'pc' ? '100%' : '85%',
                  borderRadius: deviceMode === 'pc' ? '16px' : '36px',
                }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.8 }}
                className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-200/80 overflow-hidden flex flex-col relative z-10"
              >
                {/* Device Header */}
                <motion.div layout className="h-10 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 z-20">
                  {deviceMode === 'pc' ? (
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    </div>
                  ) : (
                    <div className="w-24 h-5 bg-slate-200 mx-auto rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2"></div>
                  )}
                </motion.div>

                <motion.div layout className="flex-1 flex bg-slate-50/50 overflow-hidden">
                  {/* Sidebar (PC Only) */}
                  <AnimatePresence>
                    {deviceMode === 'pc' && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 64 }}
                        exit={{ opacity: 0, width: 0 }}
                        className="bg-white border-r border-slate-100 flex flex-col items-center py-4 gap-6 shrink-0 z-10"
                      >
                        <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-md">M</div>
                        <div className="flex flex-col gap-3 w-full px-3">
                          {[LayoutDashboard, ShoppingCart, Users, Layers, Settings].map((Icon, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                              style={i === 0 ? { backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main } : { color: '#94a3b8' }}
                            >
                              <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Main Dashboard */}
                  <motion.div layout className="flex-1 flex flex-col min-w-0">
                    <div className="h-12 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 shrink-0">
                      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-slate-400 w-1/2 max-w-[150px]">
                        <Search size={12} aria-hidden="true" /> <span className="text-[10px] font-medium">Tìm kiếm...</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Bell size={14} className="text-slate-400" aria-hidden="true" />
                        <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300"></div>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">Tổng quan</h3>
                          <p className="text-[10px] text-slate-500">Tháng này</p>
                        </div>
                        <button
                          className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white transition-colors duration-500 shadow-sm"
                          style={{ backgroundColor: themeColors[builderColor].main }}
                        >
                          + Báo cáo
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { label: 'Doanh thu', val: '24.5M', inc: '+12%', icon: TrendingUp },
                          { label: 'Đơn hàng', val: '1,240', inc: '+8%', icon: ShoppingCart },
                          { label: 'Truy cập', val: '8.4K', inc: '-2%', icon: Users, hideMobile: true },
                        ].map((stat, i) => (
                          <div
                            key={i}
                            className={`bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2 ${stat.hideMobile && deviceMode === 'mobile' ? 'hidden' : 'flex'}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main }}>
                                <stat.icon size={12} strokeWidth={3} aria-hidden="true" />
                              </div>
                              <span className={`text-[9px] font-bold ${stat.inc.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.inc}</span>
                            </div>
                            <div>
                              <div className="text-[10px] text-slate-500 font-medium mb-0.5">{stat.label}</div>
                              <div className="text-sm font-black text-slate-800">{stat.val}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chart */}
                      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
                        <div className="text-[11px] font-bold text-slate-700">Tăng trưởng</div>
                        <div className="flex items-end gap-1.5 h-16 w-full" role="img" aria-label="Biểu đồ tăng trưởng">
                          {[30, 50, 40, 80, 60, 45, 90].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm transition-all duration-700 hover:opacity-80 cursor-pointer"
                              style={{ height: `${h}%`, backgroundColor: i === 6 ? themeColors[builderColor].main : themeColors[builderColor].light }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Orders */}
                      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-1">
                        {[1, 2, 3].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-2 border-b border-slate-50 last:border-0">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-slate-100"></div>
                              <div>
                                <div className="text-[10px] font-bold text-slate-700">Đơn hàng #{1042 + i}</div>
                                <div className="text-[8px] text-slate-400">2 phút trước</div>
                              </div>
                            </div>
                            <div className="text-[10px] font-bold text-slate-600">450k</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Desktop-only controls */}
              <div className="absolute top-6 left-6 hidden md:flex items-center gap-3 z-20">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
                  <div className="flex gap-2" role="radiogroup" aria-label="Chọn màu chủ đạo">
                    {(['blue', 'emerald', 'rose', 'amber'] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => setBuilderColor(color)}
                        className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${builderColor === color ? 'scale-110 shadow-md' : 'hover:scale-110 opacity-60 hover:opacity-100'}`}
                        style={{
                          backgroundColor: themeColors[color].main,
                          boxShadow: builderColor === color ? `0 0 0 2px white, 0 0 0 3px ${themeColors[color].main}` : 'none',
                        }}
                        aria-label={`Màu ${color}`}
                        aria-pressed={builderColor === color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Device Toggle — desktop only (centered bottom) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-slate-700/50 hidden md:flex items-center gap-1 z-20">
                <button
                  onClick={() => setDeviceMode('pc')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${deviceMode === 'pc' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  aria-pressed={deviceMode === 'pc'}
                >
                  <Monitor size={14} aria-hidden="true" /> Desktop
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${deviceMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  aria-pressed={deviceMode === 'mobile'}
                >
                  <Smartphone size={14} aria-hidden="true" /> Mobile
                </button>
              </div>
            </motion.div>
          )}

          {/* Mobile controls toolbar */}
          <div className="flex md:hidden items-center justify-between mt-4 px-1">
            <div className="flex items-center gap-2.5" role="radiogroup" aria-label="Chọn màu chủ đạo">
              {(['blue', 'emerald', 'rose', 'amber'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setBuilderColor(color)}
                  className={`w-7 h-7 rounded-full cursor-pointer transition-all duration-300 ${builderColor === color ? 'scale-110 shadow-md' : 'opacity-50'}`}
                  style={{
                    backgroundColor: themeColors[color].main,
                    boxShadow: builderColor === color ? `0 0 0 2.5px white, 0 0 0 4px ${themeColors[color].main}` : 'none',
                  }}
                  aria-label={`Màu ${color}`}
                  aria-pressed={builderColor === color}
                />
              ))}
            </div>
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-0.5">
              <button
                onClick={() => setDeviceMode('pc')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${deviceMode === 'pc' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                aria-pressed={deviceMode === 'pc'}
              >
                <Monitor size={14} aria-hidden="true" /> PC
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${deviceMode === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                aria-pressed={deviceMode === 'mobile'}
              >
                <Smartphone size={14} aria-hidden="true" /> Mobile
              </button>
            </div>
          </div>
          </div>

          {/* Right: Stepper */}
          <div className="order-1 md:order-2 md:pl-8">
            {skipAnim ? (
              <div className="mb-6 md:mb-12">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide mb-3 md:mb-4 transition-colors duration-500"
                  style={{ backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main }}
                >
                  <LayoutDashboard size={12} aria-hidden="true" /> TRÌNH KIẾN TẠO
                </div>
                <h2 className="text-[24px] md:text-[48px] font-black text-slate-900 leading-[1.15] tracking-tight mb-3 md:mb-6">
                  Sáng tạo không rào cản.{' '}
                  <span className="md:block" />
                  <span
                    className="text-transparent bg-clip-text transition-colors duration-500"
                    style={{ backgroundImage: `linear-gradient(135deg, ${themeColors[builderColor].main}, ${themeColors[builderColor].main}80)` }}
                  >
                    Quản trị tinh gọn.
                  </span>
                </h2>
                <p className="text-slate-500 text-[13px] md:text-[18px] leading-[1.7] max-w-lg">
                  Nền tảng được thiết kế tập trung vào tính hiệu quả. Bạn chỉ cần tập trung kinh doanh, công nghệ để chúng tôi lo.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 md:mb-12"
              >
                <motion.div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide mb-3 md:mb-4 transition-colors duration-500"
                  style={{ backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main }}
                >
                  <LayoutDashboard size={12} aria-hidden="true" /> TRÌNH KIẾN TẠO
                </motion.div>
                <h2 className="text-[24px] md:text-[48px] font-black text-slate-900 leading-[1.15] tracking-tight mb-3 md:mb-6">
                  Sáng tạo không rào cản.{' '}
                  <span className="md:block" />
                  <motion.span
                    className="text-transparent bg-clip-text transition-colors duration-500"
                    style={{ backgroundImage: `linear-gradient(135deg, ${themeColors[builderColor].main}, ${themeColors[builderColor].main}80)` }}
                  >
                    Quản trị tinh gọn.
                  </motion.span>
                </h2>
                <p className="text-slate-500 text-[13px] md:text-[18px] leading-[1.7] max-w-lg">
                  Nền tảng được thiết kế tập trung vào tính hiệu quả. Bạn chỉ cần tập trung kinh doanh, công nghệ để chúng tôi lo.
                </p>
              </motion.div>
            )}

            <div className="relative pl-5 md:pl-8 space-y-3 md:space-y-8 border-l-2 border-slate-200/60 md:border-slate-100">
              {skipAnim ? (
                <div
                  className="absolute left-[-2px] w-[2px] rounded-full"
                  style={{
                    top: `${activeFeature * (100 / 3)}%`,
                    height: '33.33%',
                    backgroundColor: themeColors[builderColor].main,
                  }}
                />
              ) : (
                <motion.div
                  className="absolute left-[-2px] w-[2px] rounded-full transition-colors duration-500"
                  animate={{ top: `${activeFeature * (100 / 3)}%`, height: '33.33%', backgroundColor: themeColors[builderColor].main }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setActiveFeature(idx)}
                  onClick={() => setActiveFeature(idx)}
                >
                  {skipAnim ? (
                    <div
                      className="absolute -left-[29px] md:-left-[41px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm"
                      style={{ backgroundColor: activeFeature === idx ? themeColors[builderColor].main : '#e2e8f0' }}
                    />
                  ) : (
                    <motion.div
                      className="absolute -left-[29px] md:-left-[41px] top-1 w-4 h-4 rounded-full border-4 border-white bg-slate-200 transition-colors duration-500 shadow-sm"
                      animate={{ backgroundColor: activeFeature === idx ? themeColors[builderColor].main : '#e2e8f0' }}
                    />
                  )}
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <div
                      className="w-6 h-6 md:hidden rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500"
                      style={activeFeature === idx ? { backgroundColor: themeColors[builderColor].light, color: themeColors[builderColor].main } : { backgroundColor: '#f1f5f9', color: '#94a3b8' }}
                    >
                      <feature.icon size={13} strokeWidth={2.5} aria-hidden="true" />
                    </div>
                    <p className={`text-[15px] md:text-xl font-bold transition-colors duration-500 ${activeFeature === idx ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {feature.title}
                    </p>
                  </div>
                  {skipAnim ? (
                    <div className={`overflow-hidden ${activeFeature === idx ? 'block mt-2' : 'hidden'}`}>
                      <p className="text-[12px] md:text-[15px] leading-relaxed text-slate-500 max-w-md">{feature.desc}</p>
                    </div>
                  ) : (
                    <motion.div
                      initial={false}
                      animate={{ height: activeFeature === idx ? 'auto' : 0, opacity: activeFeature === idx ? 1 : 0, marginTop: activeFeature === idx ? 8 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[12px] md:text-[15px] leading-relaxed text-slate-500 max-w-md">{feature.desc}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {skipAnim ? (
              <button
                className="mt-5 md:mt-12 w-full md:w-auto text-white rounded-2xl md:rounded-full px-5 md:px-8 py-3.5 md:py-4 font-bold text-[14px] md:text-[15px] shadow-lg transition-all duration-500 flex items-center justify-center gap-2"
                style={{ backgroundColor: themeColors[builderColor].main, boxShadow: `0 10px 25px -5px ${themeColors[builderColor].main}60` }}
              >
                Trải nghiệm miễn phí <ArrowRight size={18} aria-hidden="true" />
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-5 md:mt-12 w-full md:w-auto text-white rounded-2xl md:rounded-full px-5 md:px-8 py-3.5 md:py-4 font-bold text-[14px] md:text-[15px] shadow-lg transition-all duration-500 flex items-center justify-center gap-2"
                style={{ backgroundColor: themeColors[builderColor].main, boxShadow: `0 10px 25px -5px ${themeColors[builderColor].main}60` }}
              >
                Trải nghiệm miễn phí <ArrowRight size={18} aria-hidden="true" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
