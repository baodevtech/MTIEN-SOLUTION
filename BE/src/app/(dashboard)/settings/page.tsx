'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Save, Globe, Building2, Phone, Mail, MapPin, Hash,
  Facebook, Youtube, Instagram, Linkedin, FileText, Send,
  Image as ImageIcon, Upload, Palette, Settings as SettingsIcon,
  ChevronRight, Eye, Shield, Database, Bell, Link2, Key,
  RefreshCw, CheckCircle2, XCircle, Copy, Zap, Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { key: 'connection', label: 'Kết nối Frontend', icon: Link2 },
  { key: 'general', label: 'Tổng quan', icon: Globe },
  { key: 'company', label: 'Công ty', icon: Building2 },
  { key: 'social', label: 'Mạng xã hội', icon: Facebook },
  { key: 'email', label: 'Email (SMTP)', icon: Send },
  { key: 'appearance', label: 'Giao diện', icon: Palette },
  { key: 'security', label: 'Bảo mật', icon: Shield },
  { key: 'backup', label: 'Sao lưu', icon: Database },
  { key: 'notifications', label: 'Thông báo', icon: Bell },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('connection')

  // Connection settings state
  const [connection, setConnection] = useState({
    frontendUrl: '',
    secretKey: '',
    lastConnected: null as string | null,
  })
  const [connStatus, setConnStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [connMessage, setConnMessage] = useState('')
  const [connSaving, setConnSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  // Load connection settings on mount
  useEffect(() => {
    fetch('/api/settings/connection')
      .then(r => r.json())
      .then(data => {
        if (data.frontendUrl || data.secretKey) {
          setConnection(data)
        }
      })
      .catch(() => {})
  }, [])

  const generateKey = useCallback(async () => {
    try {
      const res = await fetch('/api/settings/connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate-key' }),
      })
      const data = await res.json()
      if (data.secretKey) {
        setConnection(prev => ({ ...prev, secretKey: data.secretKey }))
      }
    } catch {}
  }, [])

  const saveConnection = useCallback(async () => {
    setConnSaving(true)
    try {
      const res = await fetch('/api/settings/connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', ...connection }),
      })
      const data = await res.json()
      if (data.success) {
        setConnMessage('Đã lưu cấu hình kết nối!')
        setConnStatus('success')
      } else {
        setConnMessage(data.error || 'Lỗi lưu cấu hình')
        setConnStatus('error')
      }
    } catch {
      setConnMessage('Lỗi kết nối server')
      setConnStatus('error')
    } finally {
      setConnSaving(false)
      setTimeout(() => setConnStatus('idle'), 3000)
    }
  }, [connection])

  const testConnection = useCallback(async () => {
    setConnStatus('loading')
    setConnMessage('Đang kiểm tra kết nối...')
    try {
      const res = await fetch('/api/settings/connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test' }),
      })
      const data = await res.json()
      if (data.success) {
        setConnStatus('success')
        setConnMessage(data.message)
        setConnection(prev => ({ ...prev, lastConnected: new Date().toISOString() }))
      } else {
        setConnStatus('error')
        setConnMessage(data.error || 'Kết nối thất bại')
      }
    } catch {
      setConnStatus('error')
      setConnMessage('Không thể kết nối đến server')
    }
  }, [])

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  const [general, setGeneral] = useState({
    siteName: 'MTIEN Solution',
    siteDescription: 'Giải pháp công nghệ toàn diện cho doanh nghiệp Việt Nam',
    siteUrl: 'https://mtiensolution.vn',
    logo: '/logo.svg',
    favicon: '/favicon.ico',
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    maintenance: false,
  })

  const [company, setCompany] = useState({
    name: 'Công ty TNHH MTIEN Solution',
    phone: '0901 234 567',
    email: 'contact@mtiensolution.vn',
    address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
    taxId: '0123456789',
    foundedYear: '2020',
    ceo: 'Nguyễn Minh Tiến',
  })

  const [social, setSocial] = useState({
    facebook: 'https://facebook.com/mtiensolution',
    youtube: 'https://youtube.com/@mtiensolution',
    instagram: '',
    linkedin: 'https://linkedin.com/company/mtiensolution',
    tiktok: '',
    zalo: '0901234567',
  })

  const [email, setEmail] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@mtiensolution.vn',
    smtpPassword: '',
    encryption: 'TLS',
    fromName: 'MTIEN Solution',
    fromEmail: 'noreply@mtiensolution.vn',
  })

  const [settingsSaving, setSettingsSaving] = useState(false)
  const [settingsMsg, setSettingsMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showSettingsMsg = (type: 'success' | 'error', text: string) => {
    setSettingsMsg({ type, text })
    setTimeout(() => setSettingsMsg(null), 3000)
  }

  // Load saved settings on mount
  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(json => {
        const d = json.data || {}
        if (d.general) setGeneral(prev => ({ ...prev, ...d.general }))
        if (d.company) setCompany(prev => ({ ...prev, ...d.company }))
        if (d.social) setSocial(prev => ({ ...prev, ...d.social }))
        if (d.email) setEmail(prev => ({ ...prev, ...d.email }))
      })
      .catch(() => {})
  }, [])

  const saveSettings = useCallback(async (keys?: string[]) => {
    setSettingsSaving(true)
    try {
      const allData: Record<string, unknown> = { general, company, social, email }
      const payload = keys ? Object.fromEntries(keys.map(k => [k, allData[k]])) : allData
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'SETTINGS_SAVE_FAILED')
      showSettingsMsg('success', 'Đã lưu cài đặt thành công!')
    } catch (err) {
      showSettingsMsg('error', err instanceof Error ? err.message : 'Lỗi lưu cài đặt')
    } finally {
      setSettingsSaving(false)
    }
  }, [general, company, social, email])

  return (
    <div className="space-y-6 animate-fade-in">
      {settingsMsg && (
        <div className={cn('flex items-center gap-2 p-3 rounded-lg text-sm fixed top-4 right-4 z-50 shadow-lg', settingsMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200')}>
          {settingsMsg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {settingsMsg.text}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cài đặt</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý cấu hình hệ thống</p>
        </div>
        <button onClick={() => saveSettings()} disabled={settingsSaving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm disabled:opacity-50">
          {settingsSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Lưu tất cả
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {tabs.map((t) => {
              const Icon = t.icon
              const active = tab === t.key
              return (
                <button key={t.key} onClick={() => setTab(t.key)} className={cn('w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors border-b border-slate-50 last:border-0', active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50')}>
                  <Icon size={16} />
                  {t.label}
                  {active && <ChevronRight size={14} className="ml-auto" />}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-4">
          {/* Connection */}
          {tab === 'connection' && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Link2 size={18} /> Kết nối Frontend</h2>
                <p className="text-sm text-slate-500">Cấu hình kết nối giữa Admin CMS và website Frontend. Khi xuất bản theme, admin sẽ tự động gửi tín hiệu xoá cache để website cập nhật ngay lập tức.</p>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-1.5"><Zap size={14} /> Cách hoạt động</h3>
                  <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Nhập <strong>Frontend URL</strong> (domain website chính)</li>
                    <li>Tạo <strong>Secret Key</strong> rồi copy sang file <code className="bg-blue-100 px-1 rounded">.env.local</code> của Frontend</li>
                    <li>Frontend cần 2 biến môi trường: <code className="bg-blue-100 px-1 rounded">ADMIN_API_URL</code> và <code className="bg-blue-100 px-1 rounded">REVALIDATION_SECRET</code></li>
                    <li>Nhấn <strong>Test kết nối</strong> để xác nhận hoạt động</li>
                  </ol>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Frontend URL *</label>
                  <input
                    type="url"
                    value={connection.frontendUrl}
                    onChange={(e) => setConnection({ ...connection, frontendUrl: e.target.value })}
                    placeholder="https://mtiensolution.vn"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20"
                  />
                  <p className="text-xs text-slate-400 mt-1">Domain chính của website (không có dấu / ở cuối)</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Secret Key *</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={connection.secretKey}
                        onChange={(e) => setConnection({ ...connection, secretKey: e.target.value })}
                        placeholder="Nhấn 'Tạo key' để tạo tự động"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20 pr-10"
                      />
                      {connection.secretKey && (
                        <button
                          onClick={() => copyToClipboard(connection.secretKey)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                          title="Copy"
                        >
                          {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                      )}
                    </div>
                    <button
                      onClick={generateKey}
                      className="px-3 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 whitespace-nowrap flex items-center gap-1.5"
                    >
                      <Key size={14} /> Tạo key
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Key này phải giống với <code className="bg-slate-100 px-1 rounded">REVALIDATION_SECRET</code> trong .env.local của Frontend</p>
                </div>

                {/* Env example box */}
                {connection.secretKey && (
                  <div className="relative">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Copy vào file .env.local của Frontend:</label>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`# Frontend .env.local
ADMIN_API_URL=${typeof window !== 'undefined' ? window.location.origin : 'https://admin.yourdomain.com'}
REVALIDATION_SECRET=${connection.secretKey}`}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`ADMIN_API_URL=${typeof window !== 'undefined' ? window.location.origin : 'https://admin.yourdomain.com'}\nREVALIDATION_SECRET=${connection.secretKey}`)}
                      className="absolute top-7 right-3 text-slate-400 hover:text-white text-xs flex items-center gap-1"
                    >
                      <Copy size={12} /> Copy
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={saveConnection}
                    disabled={connSaving}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm disabled:opacity-60"
                  >
                    <Save size={14} /> {connSaving ? 'Đang lưu...' : 'Lưu cấu hình'}
                  </button>
                  <button
                    onClick={testConnection}
                    disabled={connStatus === 'loading' || !connection.frontendUrl || !connection.secretKey}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm disabled:opacity-60"
                  >
                    <RefreshCw size={14} className={connStatus === 'loading' ? 'animate-spin' : ''} />
                    {connStatus === 'loading' ? 'Đang test...' : 'Test kết nối'}
                  </button>
                </div>

                {/* Status message */}
                {connStatus !== 'idle' && connStatus !== 'loading' && (
                  <div className={cn('flex items-center gap-2 p-3 rounded-lg text-sm', connStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200')}>
                    {connStatus === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {connMessage}
                  </div>
                )}

                {connection.lastConnected && (
                  <p className="text-xs text-slate-400">
                    Lần kết nối thành công gần nhất: {new Date(connection.lastConnected).toLocaleString('vi-VN')}
                  </p>
                )}
              </div>

              {/* Architecture diagram */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-700 mb-3">Kiến trúc hệ thống</h3>
                <div className="flex items-center justify-center gap-4 py-4">
                  <div className="text-center">
                    <div className="w-28 h-20 bg-blue-50 border-2 border-blue-300 rounded-xl flex items-center justify-center">
                      <div>
                        <Shield size={20} className="mx-auto text-blue-600" />
                        <p className="text-xs font-bold text-blue-700 mt-1">Admin CMS</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Theme Editor + API</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xs text-slate-500">1. Xuất bản</div>
                    <div className="w-20 h-0.5 bg-blue-300 relative">
                      <div className="absolute -right-1 -top-1 w-0 h-0 border-l-[6px] border-l-blue-400 border-y-4 border-y-transparent" />
                    </div>
                    <div className="text-xs text-emerald-600 font-mono">revalidateTag</div>
                    <div className="w-20 h-0.5 bg-emerald-300 relative">
                      <div className="absolute -right-1 -top-1 w-0 h-0 border-l-[6px] border-l-emerald-400 border-y-4 border-y-transparent" />
                    </div>
                    <div className="text-xs text-slate-500">2. Xoá cache</div>
                  </div>
                  <div className="text-center">
                    <div className="w-28 h-20 bg-emerald-50 border-2 border-emerald-300 rounded-xl flex items-center justify-center">
                      <div>
                        <Globe size={20} className="mx-auto text-emerald-600" />
                        <p className="text-xs font-bold text-emerald-700 mt-1">Frontend</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Website khách hàng</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* General */}
          {tab === 'general' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Globe size={18} /> Cài đặt tổng quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tên website *</label>
                  <input type="text" value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">URL website</label>
                  <input type="url" value={general.siteUrl} onChange={(e) => setGeneral({ ...general, siteUrl: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Mô tả website</label>
                <textarea value={general.siteDescription} onChange={(e) => setGeneral({ ...general, siteDescription: e.target.value })} rows={3} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Logo</label>
                  <div className="flex items-center gap-3 p-3 border border-dashed border-slate-200 rounded-lg">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center"><ImageIcon size={20} className="text-slate-400" /></div>
                    <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Upload size={12} /> Tải lên logo</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Favicon</label>
                  <div className="flex items-center gap-3 p-3 border border-dashed border-slate-200 rounded-lg">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400">ICO</div>
                    <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Upload size={12} /> Tải lên favicon</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Ngôn ngữ</label>
                  <select value={general.language} onChange={(e) => setGeneral({ ...general, language: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none">
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Múi giờ</label>
                  <select value={general.timezone} onChange={(e) => setGeneral({ ...general, timezone: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none">
                    <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (UTC+7)</option>
                    <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
                    <option value="UTC">UTC (UTC+0)</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div>
                  <p className="text-sm font-semibold text-amber-800">Chế độ bảo trì</p>
                  <p className="text-xs text-amber-600">Khi bật, người dùng sẽ thấy trang bảo trì</p>
                </div>
                <button onClick={() => setGeneral({ ...general, maintenance: !general.maintenance })} className={cn('w-12 h-7 rounded-full transition-colors relative', general.maintenance ? 'bg-amber-500' : 'bg-slate-200')}>
                  <span className={cn('absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform', general.maintenance ? 'left-6' : 'left-1')} />
                </button>
              </div>
            </div>
          )}

          {/* Company */}
          {tab === 'company' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Building2 size={18} /> Thông tin công ty</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tên công ty</label>
                  <input type="text" value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">CEO/Giám đốc</label>
                  <input type="text" value={company.ceo} onChange={(e) => setCompany({ ...company, ceo: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Số điện thoại</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="tel" value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Địa chỉ</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input type="text" value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mã số thuế</label>
                  <div className="relative">
                    <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" value={company.taxId} onChange={(e) => setCompany({ ...company, taxId: e.target.value })} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Năm thành lập</label>
                  <input type="text" value={company.foundedYear} onChange={(e) => setCompany({ ...company, foundedYear: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            </div>
          )}

          {/* Social */}
          {tab === 'social' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Facebook size={18} /> Mạng xã hội</h2>
              <p className="text-sm text-slate-500">Liên kết trang mạng xã hội hiển thị trên website</p>
              {[
                { key: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600', placeholder: 'https://facebook.com/page' },
                { key: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-600', placeholder: 'https://youtube.com/@channel' },
                { key: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600', placeholder: 'https://instagram.com/username' },
                { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', placeholder: 'https://linkedin.com/company/name' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center', item.color)}><Icon size={18} /></div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-600 mb-1">{item.label}</label>
                      <input type="url" value={(social as Record<string, string>)[item.key]} onChange={(e) => setSocial({ ...social, [item.key]: e.target.value })} placeholder={item.placeholder} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Email SMTP */}
          {tab === 'email' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Send size={18} /> Cấu hình Email (SMTP)</h2>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
                Cấu hình SMTP để gửi email thông báo, xác nhận đơn hàng và trả lời liên hệ.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">SMTP Host</label>
                  <input type="text" value={email.smtpHost} onChange={(e) => setEmail({ ...email, smtpHost: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">SMTP Port</label>
                  <input type="text" value={email.smtpPort} onChange={(e) => setEmail({ ...email, smtpPort: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">SMTP Username</label>
                  <input type="text" value={email.smtpUser} onChange={(e) => setEmail({ ...email, smtpUser: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">SMTP Password</label>
                  <input type="password" value={email.smtpPassword} onChange={(e) => setEmail({ ...email, smtpPassword: e.target.value })} placeholder="••••••••" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mã hoá</label>
                  <select value={email.encryption} onChange={(e) => setEmail({ ...email, encryption: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none">
                    <option value="TLS">TLS</option>
                    <option value="SSL">SSL</option>
                    <option value="none">Không mã hoá</option>
                  </select>
                </div>
              </div>
              <hr className="border-slate-100" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tên người gửi</label>
                  <input type="text" value={email.fromName} onChange={(e) => setEmail({ ...email, fromName: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email người gửi</label>
                  <input type="email" value={email.fromEmail} onChange={(e) => setEmail({ ...email, fromEmail: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-700">
                <Send size={14} /> Gửi email test
              </button>
            </div>
          )}

          {/* Appearance */}
          {tab === 'appearance' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Palette size={18} /> Giao diện</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">Màu chính (Primary)</label>
                  <div className="flex items-center gap-3">
                    {['#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B', '#EC4899'].map((c) => (
                      <button key={c} className="w-9 h-9 rounded-lg border-2 border-white shadow-md ring-1 ring-slate-200 hover:scale-110 transition-transform" style={{ background: c }} />
                    ))}
                    <input type="color" defaultValue="#3B82F6" className="w-9 h-9 rounded-lg cursor-pointer" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">Font chữ</label>
                  <select defaultValue="Inter" className="w-full max-w-xs px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none">
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">Layout</label>
                  <div className="grid grid-cols-3 gap-3 max-w-md">
                    {['Mặc định', 'Rộng', 'Thu gọn'].map((layout, i) => (
                      <button key={layout} className={cn('p-3 border rounded-lg text-xs font-medium text-center transition-all', i === 0 ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:border-slate-300')}>
                        {layout}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {tab === 'security' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Shield size={18} /> Bảo mật</h2>
              {[
                { label: 'Bắt buộc 2FA', description: 'Yêu cầu xác thực hai yếu tố cho tất cả admin', enabled: false },
                { label: 'Khoá sau 5 lần đăng nhập sai', description: 'Tạm khoá tài khoản sau 5 lần nhập sai mật khẩu', enabled: true },
                { label: 'Session timeout (30 phút)', description: 'Tự động đăng xuất sau 30 phút không hoạt động', enabled: true },
                { label: 'Log hoạt động', description: 'Ghi lại mọi thao tác của admin', enabled: true },
                { label: 'Giới hạn IP truy cập admin', description: 'Chỉ cho phép truy cập admin từ các IP được phép', enabled: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                  <button className={cn('w-12 h-7 rounded-full transition-colors relative', item.enabled ? 'bg-blue-500' : 'bg-slate-200')}>
                    <span className={cn('absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform', item.enabled ? 'left-6' : 'left-1')} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Backup */}
          {tab === 'backup' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Database size={18} /> Sao lưu & Khôi phục</h2>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-green-700">Sao lưu tự động đang bật</p>
                <p className="text-xs text-green-600 mt-0.5">Sao lưu hàng ngày lúc 02:00 AM. Bản sao lưu gần nhất: 15/07/2025 02:00</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Lịch sử sao lưu</h3>
                <div className="space-y-2">
                  {['15/07/2025 02:00', '14/07/2025 02:00', '13/07/2025 02:00', '12/07/2025 02:00', '11/07/2025 02:00'].map((date, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database size={16} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">Sao lưu tự động</p>
                          <p className="text-xs text-slate-400">{date} · 245 MB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-blue-600 hover:underline">Tải xuống</button>
                        <button className="text-xs text-slate-400 hover:text-slate-600">Khôi phục</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-700">
                <Database size={14} /> Tạo bản sao lưu ngay
              </button>
            </div>
          )}

          {/* Notifications */}
          {tab === 'notifications' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Bell size={18} /> Thông báo</h2>
              <p className="text-sm text-slate-500">Cấu hình thông báo email cho các sự kiện</p>
              {[
                { label: 'Đơn hàng mới', description: 'Nhận email khi có đơn hàng mới', enabled: true },
                { label: 'Liên hệ mới', description: 'Nhận email khi có liên hệ từ khách hàng', enabled: true },
                { label: 'Đăng ký tài khoản mới', description: 'Nhận email khi có người đăng ký mới', enabled: false },
                { label: 'Sản phẩm hết hàng', description: 'Cảnh báo khi sản phẩm hết hàng trong kho', enabled: true },
                { label: 'Báo cáo hàng tuần', description: 'Tổng hợp dữ liệu tuần gửi vào thứ Hai', enabled: true },
                { label: 'Cập nhật hệ thống', description: 'Thông báo khi có phiên bản mới', enabled: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                  <button className={cn('w-12 h-7 rounded-full transition-colors relative', item.enabled ? 'bg-blue-500' : 'bg-slate-200')}>
                    <span className={cn('absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform', item.enabled ? 'left-6' : 'left-1')} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Save Button at bottom */}
          <div className="flex justify-end mt-6">
            <button onClick={() => saveSettings()} disabled={settingsSaving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm disabled:opacity-50">
              {settingsSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Lưu cài đặt
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
