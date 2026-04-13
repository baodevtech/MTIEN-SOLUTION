'use client'

import { useState } from 'react'
import {
  TrendingUp, TrendingDown, Users, Eye, MousePointerClick,
  Clock, Globe, Monitor, Smartphone, Tablet, ArrowUpRight,
  Calendar, Download, RefreshCw,
} from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const trafficData = [
  { date: '01/07', visitors: 1240, pageViews: 3420, sessions: 1680 },
  { date: '02/07', visitors: 1380, pageViews: 3890, sessions: 1820 },
  { date: '03/07', visitors: 1190, pageViews: 3210, sessions: 1560 },
  { date: '04/07', visitors: 1520, pageViews: 4120, sessions: 2010 },
  { date: '05/07', visitors: 1680, pageViews: 4580, sessions: 2250 },
  { date: '06/07', visitors: 1450, pageViews: 3980, sessions: 1890 },
  { date: '07/07', visitors: 1890, pageViews: 5240, sessions: 2480 },
  { date: '08/07', visitors: 2100, pageViews: 5780, sessions: 2750 },
  { date: '09/07', visitors: 1760, pageViews: 4890, sessions: 2310 },
  { date: '10/07', visitors: 2340, pageViews: 6120, sessions: 3080 },
  { date: '11/07', visitors: 2180, pageViews: 5950, sessions: 2870 },
  { date: '12/07', visitors: 2560, pageViews: 6780, sessions: 3320 },
  { date: '13/07', visitors: 2890, pageViews: 7450, sessions: 3690 },
  { date: '14/07', visitors: 2720, pageViews: 7120, sessions: 3540 },
]

const topPages = [
  { path: '/', title: 'Trang chủ', views: 12450, avgTime: '2:34', bounceRate: 32 },
  { path: '/dich-vu/phan-mem', title: 'Phần mềm', views: 8320, avgTime: '3:12', bounceRate: 28 },
  { path: '/shop', title: 'Cửa hàng', views: 6780, avgTime: '4:05', bounceRate: 22 },
  { path: '/blog', title: 'Blog', views: 5490, avgTime: '2:48', bounceRate: 45 },
  { path: '/about', title: 'Giới thiệu', views: 4230, avgTime: '1:56', bounceRate: 52 },
  { path: '/contact', title: 'Liên hệ', views: 3890, avgTime: '1:22', bounceRate: 38 },
  { path: '/dich-vu/marketing', title: 'Marketing', views: 3560, avgTime: '2:58', bounceRate: 35 },
  { path: '/dich-vu/cloud-server', title: 'Cloud Server', views: 2980, avgTime: '3:45', bounceRate: 25 },
]

const sourceData = [
  { name: 'Google', value: 42, color: '#4285F4' },
  { name: 'Trực tiếp', value: 28, color: '#34A853' },
  { name: 'Facebook', value: 18, color: '#1877F2' },
  { name: 'Zalo', value: 8, color: '#0068FF' },
  { name: 'Khác', value: 4, color: '#94A3B8' },
]

const deviceData = [
  { name: 'Desktop', value: 58, icon: Monitor, color: '#3B82F6' },
  { name: 'Mobile', value: 35, icon: Smartphone, color: '#10B981' },
  { name: 'Tablet', value: 7, icon: Tablet, color: '#F59E0B' },
]

const conversionData = [
  { date: '01/07', contacts: 5, orders: 3 },
  { date: '02/07', contacts: 8, orders: 4 },
  { date: '03/07', contacts: 6, orders: 2 },
  { date: '04/07', contacts: 12, orders: 7 },
  { date: '05/07', contacts: 9, orders: 5 },
  { date: '06/07', contacts: 7, orders: 3 },
  { date: '07/07', contacts: 15, orders: 8 },
  { date: '08/07', contacts: 11, orders: 6 },
  { date: '09/07', contacts: 13, orders: 9 },
  { date: '10/07', contacts: 18, orders: 11 },
  { date: '11/07', contacts: 14, orders: 8 },
  { date: '12/07', contacts: 20, orders: 12 },
  { date: '13/07', contacts: 22, orders: 14 },
  { date: '14/07', contacts: 19, orders: 10 },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '14d' | '30d'>('14d')

  const stats = [
    { label: 'Số truy cập', value: 28_910, change: 12.5, icon: Users, color: 'bg-blue-500' },
    { label: 'Lượt xem trang', value: 82_360, change: 8.3, icon: Eye, color: 'bg-green-500' },
    { label: 'Tỷ lệ click', value: 3.8, change: -0.5, icon: MousePointerClick, color: 'bg-purple-500', suffix: '%' },
    { label: 'Thời gian trung bình', value: '2:48', change: 4.2, icon: Clock, color: 'bg-amber-500', isTime: true },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Phân tích lưu lượng truy cập & chuyển đổi</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
            {(['7d', '14d', '30d'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-all', period === p ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-700')}>
                {p === '7d' ? '7 ngày' : p === '14d' ? '14 ngày' : '30 ngày'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50"><Download size={14} /></button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          const isPositive = typeof stat.change === 'number' && stat.change >= 0
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-white', stat.color)}><Icon size={18} /></div>
                <span className={cn('text-xs font-semibold flex items-center gap-0.5', isPositive ? 'text-green-600' : 'text-red-500')}>
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(stat.change)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.isTime ? stat.value : typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}{stat.suffix || ''}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Traffic Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Lưu lượng truy cập</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="visitors" name="Truy cập" stroke="#3B82F6" fill="url(#gradVisitors)" strokeWidth={2} />
            <Area type="monotone" dataKey="pageViews" name="Lượt xem" stroke="#10B981" fill="url(#gradPageViews)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Trang xem nhiều nhất</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-2 font-medium">Trang</th>
                <th className="pb-2 font-medium text-right">Lượt xem</th>
                <th className="pb-2 font-medium text-right">TB thời gian</th>
                <th className="pb-2 font-medium text-right">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5">
                    <p className="text-sm font-medium text-slate-800">{page.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{page.path}</p>
                  </td>
                  <td className="py-2.5 text-right text-sm font-semibold text-slate-700">{formatNumber(page.views)}</td>
                  <td className="py-2.5 text-right text-xs text-slate-500">{page.avgTime}</td>
                  <td className="py-2.5 text-right">
                    <span className={cn('text-xs font-medium', page.bounceRate > 40 ? 'text-red-500' : page.bounceRate > 30 ? 'text-amber-500' : 'text-green-600')}>
                      {page.bounceRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sources & Devices */}
        <div className="space-y-6">
          {/* Traffic Sources */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Nguồn truy cập</h3>
            <div className="flex justify-center mb-4">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                    {sourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {sourceData.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-xs text-slate-600 flex-1">{s.name}</span>
                  <span className="text-xs font-semibold text-slate-700">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devices */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Thiết bị</h3>
            <div className="space-y-3">
              {deviceData.map((d) => {
                const Icon = d.icon
                return (
                  <div key={d.name} className="flex items-center gap-3">
                    <Icon size={16} style={{ color: d.color }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">{d.name}</span>
                        <span className="text-xs font-semibold text-slate-700">{d.value}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Chuyển đổi</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={conversionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="contacts" name="Liên hệ" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="orders" name="Đơn hàng" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
