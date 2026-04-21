'use client'

import { useState, useEffect } from 'react'
import {
  Globe, Search as SearchIcon, FileText, Settings, AlertTriangle,
  CheckCircle2, XCircle, ExternalLink, RefreshCw, Download,
  ChevronDown, Eye, Link2, Image as ImageIcon, MapPin, Save, Loader2,
  BarChart2, Plus, Trash2, Pencil, Code, Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SEOPage {
  path: string
  title: string
  metaTitle: string
  metaDescription: string
  ogImage: string
  indexed: boolean
  score: number
  issues: string[]
}

function buildSEOPages(pages: Array<{ slug: string; title: string; seo: Record<string, unknown> }>): SEOPage[] {
  return pages.map(p => {
    const seo = (p.seo || {}) as Record<string, string | boolean | string[]>
    const issues: string[] = []
    if (!seo.metaDescription) issues.push('Thiếu meta description')
    if (!seo.ogImage) issues.push('Thiếu OG Image')
    if (seo.noIndex) issues.push('Trang chưa được index')
    const score = 100 - issues.length * 15
    return {
      path: p.slug,
      title: p.title,
      metaTitle: (seo.metaTitle as string) || p.title,
      metaDescription: (seo.metaDescription as string) || '',
      ogImage: (seo.ogImage as string) || '',
      indexed: !seo.noIndex,
      score: Math.max(score, 20),
      issues,
    }
  })
}

export default function SEOPage() {
  const [seoPages, setSeoPages] = useState<SEOPage[]>([])
  const [rawPages, setRawPages] = useState<Array<{ id: string; slug: string; title: string; seo: Record<string, unknown> }>>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pages' | 'sitemap' | 'robots' | 'global' | 'tracking'>('pages')
  const [expandedPath, setExpandedPath] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Tracking scripts
  interface TrackingScript {
    id: string
    name: string
    type: 'gtm' | 'ga4' | 'gsc' | 'fb_pixel' | 'tiktok' | 'custom_head' | 'custom_body'
    value: string
    active: boolean
    owner: string
  }

  const TRACKING_TYPES: Record<TrackingScript['type'], { label: string; placeholder: string; isCode: boolean }> = {
    gtm:         { label: 'Google Tag Manager', placeholder: 'GTM-XXXXXXX', isCode: false },
    ga4:         { label: 'Google Analytics 4', placeholder: 'G-XXXXXXXXXX', isCode: false },
    gsc:         { label: 'Google Search Console', placeholder: 'Mã xác minh HTML meta tag', isCode: false },
    fb_pixel:    { label: 'Facebook Pixel', placeholder: 'Pixel ID (số)', isCode: false },
    tiktok:      { label: 'TikTok Pixel', placeholder: 'Pixel ID', isCode: false },
    custom_head: { label: 'Custom Script (Head)', placeholder: '<script>...</script>', isCode: true },
    custom_body: { label: 'Custom Script (Body)', placeholder: '<script>...</script>', isCode: true },
  }

  const emptyScriptForm = { id: '', name: '', type: 'ga4' as TrackingScript['type'], value: '', active: true, owner: '' }
  const [trackingScripts, setTrackingScripts] = useState<TrackingScript[]>([])
  const [scriptModal, setScriptModal] = useState(false)
  const [editingScriptId, setEditingScriptId] = useState<string | null>(null)
  const [scriptForm, setScriptForm] = useState<typeof emptyScriptForm>(emptyScriptForm)

  useEffect(() => {
    fetch('/api/admin/pages')
      .then(r => r.json())
      .then(json => {
        const pages = json.data || []
        setRawPages(pages)
        setSeoPages(buildSEOPages(pages))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Load saved global SEO + robots from settings
  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(json => {
        const d = json.data || {}
        if (d.globalSEO) setGlobalSEO(prev => ({ ...prev, ...d.globalSEO }))
        if (d.robotsTxt) setRobotsTxt(d.robotsTxt)
        if (Array.isArray(d.trackingScripts)) setTrackingScripts(d.trackingScripts)
      })
      .catch(() => {})
  }, [])

  const avgScore = Math.round(seoPages.reduce((s, p) => s + p.score, 0) / seoPages.length)
  const indexedCount = seoPages.filter(p => p.indexed).length
  const issueCount = seoPages.reduce((s, p) => s + p.issues.length, 0)

  const [globalSEO, setGlobalSEO] = useState({
    defaultTitle: 'MTIEN Solution - Giải pháp công nghệ toàn diện',
    titleTemplate: '%s | MTIEN Solution',
    defaultDescription: 'MTIEN Solution cung cấp giải pháp phần mềm, marketing số, thiết kế thương hiệu và cloud server cho doanh nghiệp Việt Nam.',
    defaultKeywords: 'phần mềm, marketing, thiết kế, cloud server, MTIEN Solution',
    ogImage: '/og-default.jpg',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    googleSearchConsoleId: '',
    facebookPixelId: '',
  })

  const [robotsTxt, setRobotsTxt] = useState(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://mtiensolution.vn/sitemap.xml`)

  const showMsg = (type: 'success' | 'error', text: string) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 3000)
  }

  const handleSavePageSEO = async (pageId: string, fields: { metaTitle: string; metaDescription: string; canonicalUrl: string }) => {
    setSaving(true)
    try {
      const raw = rawPages.find(p => p.id === pageId)
      const seo = { ...(raw?.seo || {}), metaTitle: fields.metaTitle, metaDescription: fields.metaDescription, canonicalUrl: fields.canonicalUrl }
      const res = await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pageId, seo }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'SEO_PAGE_SAVE_FAILED')
      // Refresh pages
      const refreshRes = await fetch('/api/admin/pages')
      const refreshJson = await refreshRes.json()
      const pages = refreshJson.data || []
      setRawPages(pages)
      setSeoPages(buildSEOPages(pages))
      showMsg('success', 'Đã lưu SEO cho trang!')
    } catch (err) {
      showMsg('error', err instanceof Error ? err.message : 'Lỗi lưu SEO trang')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveGlobalSEO = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ globalSEO }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'GLOBAL_SEO_SAVE_FAILED')
      showMsg('success', 'Đã lưu cài đặt SEO toàn cục!')
    } catch (err) {
      showMsg('error', err instanceof Error ? err.message : 'Lỗi lưu SEO toàn cục')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveRobotsTxt = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ robotsTxt }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'ROBOTS_SAVE_FAILED')
      showMsg('success', 'Đã lưu robots.txt!')
    } catch (err) {
      showMsg('error', err instanceof Error ? err.message : 'Lỗi lưu robots.txt')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveTracking = async (scripts: typeof trackingScripts) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingScripts: scripts }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'TRACKING_SAVE_FAILED')
      showMsg('success', 'Đã lưu tracking scripts!')
    } catch (err) {
      showMsg('error', err instanceof Error ? err.message : 'Lỗi lưu tracking')
    } finally {
      setSaving(false)
    }
  }

  const openNewScript = () => {
    setEditingScriptId(null)
    setScriptForm(emptyScriptForm)
    setScriptModal(true)
  }

  const openEditScript = (s: typeof trackingScripts[0]) => {
    setEditingScriptId(s.id)
    setScriptForm({ id: s.id, name: s.name, type: s.type, value: s.value, active: s.active, owner: s.owner })
    setScriptModal(true)
  }

  const handleScriptSave = () => {
    if (!scriptForm.name || !scriptForm.value) return alert('Vui lòng nhập tên và giá trị script')
    let updated: typeof trackingScripts
    if (editingScriptId) {
      updated = trackingScripts.map(s => s.id === editingScriptId ? { ...scriptForm, id: editingScriptId } : s)
    } else {
      const newId = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
      updated = [...trackingScripts, { ...scriptForm, id: newId }]
    }
    setTrackingScripts(updated)
    setScriptModal(false)
    handleSaveTracking(updated)
  }

  const handleDeleteScript = (id: string) => {
    if (!confirm('Xoá script này?')) return
    const updated = trackingScripts.filter(s => s.id !== id)
    setTrackingScripts(updated)
    handleSaveTracking(updated)
  }

  const handleToggleScript = (id: string) => {
    const updated = trackingScripts.map(s => s.id === id ? { ...s, active: !s.active } : s)
    setTrackingScripts(updated)
    handleSaveTracking(updated)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {msg && (
        <div className={cn('flex items-center gap-2 p-3 rounded-lg text-sm fixed top-4 right-4 z-50 shadow-lg', msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200')}>
          {msg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {msg.text}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">SEO</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quản lý SEO cho toàn bộ website</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50">
            <RefreshCw size={14} /> Crawl lại
          </button>
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold">
            <Download size={14} /> Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500">Điểm SEO trung bình</p>
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold', avgScore >= 80 ? 'bg-green-100 text-green-700' : avgScore >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>{avgScore}</div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className={cn('h-2 rounded-full', avgScore >= 80 ? 'bg-green-500' : avgScore >= 60 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${avgScore}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Trang đã index</p>
          <p className="text-2xl font-bold text-slate-800">{indexedCount}<span className="text-sm text-slate-400 font-normal">/{seoPages.length}</span></p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Vấn đề cần sửa</p>
          <p className="text-2xl font-bold text-amber-600">{issueCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">Sitemap</p>
          <p className="text-sm font-medium text-green-600 flex items-center gap-1"><CheckCircle2 size={14} /> Đã cập nhật</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 w-fit flex-wrap">
        {([['pages', 'Trang', FileText], ['global', 'Cài đặt chung', Settings], ['tracking', 'Tracking & Analytics', BarChart2], ['sitemap', 'Sitemap', MapPin], ['robots', 'Robots.txt', Code]] as const).map(([key, label, Icon]) => (
          <button key={key} onClick={() => setTab(key as typeof tab)} className={cn('flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all', tab === key ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-700')}>
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {/* Tab: Pages */}
      {tab === 'pages' && (
        <div className="space-y-2">
          {seoPages.map((page) => {
            const expanded = expandedPath === page.path
            return (
              <div key={page.path} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpandedPath(expanded ? null : page.path)}>
                  {/* Score */}
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold', page.score >= 80 ? 'bg-green-100 text-green-700' : page.score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>
                    {page.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800">{page.title}</p>
                      <code className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{page.path}</code>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{page.metaTitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {page.indexed ? (
                      <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle2 size={12} /> Indexed</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-red-500"><XCircle size={12} /> Not indexed</span>
                    )}
                    {page.issues.length > 0 && (
                      <span className="flex items-center gap-1 text-xs text-amber-600"><AlertTriangle size={12} /> {page.issues.length}</span>
                    )}
                  </div>
                  <ChevronDown size={16} className={cn('text-slate-400 transition-transform', expanded && 'rotate-180')} />
                </div>

                {expanded && (
                  <div className="border-t border-slate-100 p-5 bg-slate-50 animate-fade-in space-y-4">
                    {/* Google Preview */}
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-2">Xem trước Google</p>
                      <div className="bg-white rounded-lg border border-slate-200 p-4 max-w-xl">
                        <p className="text-sm text-green-700 mb-0.5">mtiensolution.vn{page.path}</p>
                        <p className="text-lg text-blue-700 hover:underline cursor-pointer leading-snug">{page.metaTitle || 'Chưa có tiêu đề'}</p>
                        <p className="text-sm text-slate-500">{page.metaDescription || 'Chưa có mô tả meta.'}</p>
                      </div>
                    </div>

                    {/* Edit Fields */}
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const fd = new FormData(e.currentTarget)
                      const raw = rawPages.find(p => p.slug === page.path)
                      if (!raw) return
                      handleSavePageSEO(raw.id, {
                        metaTitle: fd.get('metaTitle') as string,
                        metaDescription: fd.get('metaDescription') as string,
                        canonicalUrl: fd.get('canonicalUrl') as string,
                      })
                    }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Meta Title <span className="text-slate-400">({(page.metaTitle || '').length}/60)</span></label>
                        <input name="metaTitle" type="text" defaultValue={page.metaTitle} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Canonical URL</label>
                        <input name="canonicalUrl" type="text" defaultValue={`https://mtiensolution.vn${page.path}`} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1">Meta Description <span className="text-slate-400">({(page.metaDescription || '').length}/160)</span></label>
                        <textarea name="metaDescription" defaultValue={page.metaDescription} rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                    </div>

                    {/* Issues */}
                    {page.issues.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-amber-600 mb-2 flex items-center gap-1"><AlertTriangle size={12} /> Vấn đề cần sửa</p>
                        <ul className="space-y-1">
                          {page.issues.map((issue, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-end">
                      <button type="submit" disabled={saving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        Lưu thay đổi
                      </button>
                    </div>
                    </form>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: Global */}
      {tab === 'global' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Tiêu đề mặc định</label>
              <input type="text" value={globalSEO.defaultTitle} onChange={(e) => setGlobalSEO({ ...globalSEO, defaultTitle: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Template tiêu đề <span className="text-slate-400">(%s = tên trang)</span></label>
              <input type="text" value={globalSEO.titleTemplate} onChange={(e) => setGlobalSEO({ ...globalSEO, titleTemplate: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Mô tả mặc định</label>
            <textarea value={globalSEO.defaultDescription} onChange={(e) => setGlobalSEO({ ...globalSEO, defaultDescription: e.target.value })} rows={3} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Từ khóa mặc định</label>
            <input type="text" value={globalSEO.defaultKeywords} onChange={(e) => setGlobalSEO({ ...globalSEO, defaultKeywords: e.target.value })} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>

          <hr className="border-slate-100" />

          <h3 className="text-sm font-semibold text-slate-700">Tracking & Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Google Analytics ID</label>
              <input type="text" value={globalSEO.googleAnalyticsId} onChange={(e) => setGlobalSEO({ ...globalSEO, googleAnalyticsId: e.target.value })} placeholder="G-XXXXXXXXXX" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Search Console ID</label>
              <input type="text" value={globalSEO.googleSearchConsoleId} onChange={(e) => setGlobalSEO({ ...globalSEO, googleSearchConsoleId: e.target.value })} placeholder="Verification code" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Facebook Pixel ID</label>
              <input type="text" value={globalSEO.facebookPixelId} onChange={(e) => setGlobalSEO({ ...globalSEO, facebookPixelId: e.target.value })} placeholder="Pixel ID" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none font-mono focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSaveGlobalSEO} disabled={saving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Lưu cài đặt SEO
            </button>
          </div>
        </div>
      )}

      {/* Tab: Sitemap */}
      {tab === 'sitemap' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-700">Sitemap XML</h3>
              <p className="text-xs text-slate-500 mt-0.5">Tự động tạo từ các trang đang published</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://mtiensolution.vn/sitemap.xml" target="_blank" className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><ExternalLink size={12} /> Xem sitemap</a>
              <button className="flex items-center gap-1 bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-semibold"><RefreshCw size={12} /> Tạo lại</button>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-200">
                  <th className="pb-2">URL</th>
                  <th className="pb-2">Priority</th>
                  <th className="pb-2">Changefreq</th>
                  <th className="pb-2">Trong Sitemap</th>
                </tr>
              </thead>
              <tbody>
                {seoPages.map((page) => (
                  <tr key={page.path} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 text-slate-600 font-mono text-xs">{page.path}</td>
                    <td className="py-2">
                      <select defaultValue={page.path === '/' ? '1.0' : '0.8'} className="text-xs border border-slate-200 rounded px-1.5 py-1 outline-none">
                        <option>1.0</option><option>0.8</option><option>0.6</option><option>0.4</option><option>0.2</option>
                      </select>
                    </td>
                    <td className="py-2">
                      <select defaultValue="weekly" className="text-xs border border-slate-200 rounded px-1.5 py-1 outline-none">
                        <option>always</option><option>hourly</option><option>daily</option><option value="weekly">weekly</option><option>monthly</option><option>yearly</option><option>never</option>
                      </select>
                    </td>
                    <td className="py-2">
                      <input type="checkbox" defaultChecked={page.indexed} className="accent-blue-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Tracking & Analytics */}
      {tab === 'tracking' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><BarChart2 size={18} /> Tracking & Analytics</h2>
                <p className="text-sm text-slate-500 mt-0.5">Quản lý các mã tracking — hỗ trợ nhiều loại và nhiều người dùng</p>
              </div>
              <button onClick={openNewScript} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold">
                <Plus size={14} /> Thêm script
              </button>
            </div>

            {/* Script type legend */}
            <div className="flex flex-wrap gap-2 mb-5 p-3 bg-slate-50 rounded-lg border border-slate-100">
              {(Object.entries(TRACKING_TYPES) as Array<[TrackingScript['type'], typeof TRACKING_TYPES[TrackingScript['type']]]>).map(([key, t]) => (
                <span key={key} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">
                  <Tag size={10} className="text-blue-400" /> {t.label}
                </span>
              ))}
            </div>

            {trackingScripts.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Code size={36} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Chưa có script nào. Nhấn <strong>Thêm script</strong> để bắt đầu.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {trackingScripts.map((script) => {
                  const typeInfo = TRACKING_TYPES[script.type]
                  return (
                    <div key={script.id} className={cn('flex items-center gap-4 p-4 border rounded-xl transition-all', script.active ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50 opacity-60')}>
                      {/* Active toggle */}
                      <button onClick={() => handleToggleScript(script.id)} className={cn('w-10 h-6 rounded-full transition-colors relative flex-shrink-0', script.active ? 'bg-blue-500' : 'bg-slate-200')}>
                        <span className={cn('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform', script.active ? 'left-5' : 'left-1')} />
                      </button>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-slate-800">{script.name}</span>
                          {script.owner && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">{script.owner}</span>
                          )}
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{typeInfo.label}</span>
                          {!script.active && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-500">Tắt</span>}
                        </div>
                        <code className="text-xs text-slate-400 font-mono mt-0.5 block truncate max-w-md">
                          {typeInfo.isCode ? script.value.slice(0, 60) + (script.value.length > 60 ? '…' : '') : script.value}
                        </code>
                      </div>
                      {/* Position badge */}
                      <span className={cn('text-xs px-2 py-0.5 rounded font-mono flex-shrink-0', script.type === 'custom_body' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700')}>
                        {script.type === 'custom_body' ? '<body>' : '<head>'}
                      </span>
                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => openEditScript(script)} className="p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"><Pencil size={14} /></button>
                        <button onClick={() => handleDeleteScript(script.id)} className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Hướng dẫn</h3>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li><strong>GTM / GA4 / Pixel</strong>: Nhập ID (VD: GTM-XXXXXXX, G-XXXXXXXXXX). Script sẽ tự động được tạo đúng chuẩn.</li>
              <li><strong>Search Console</strong>: Nhập chuỗi xác minh trong thẻ meta (VD: <code className="bg-blue-100 px-1 rounded">abc123xyz</code>).</li>
              <li><strong>Custom Script</strong>: Dán toàn bộ thẻ <code className="bg-blue-100 px-1 rounded">&lt;script&gt;</code>. Head = tải trước, Body = tải sau khi render xong.</li>
              <li><strong>Owner</strong>: Ghi tên admin/khách hàng để phân biệt khi có nhiều người quản lý.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Script Modal */}
      {scriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">{editingScriptId ? 'Sửa tracking script' : 'Thêm tracking script'}</h2>
              <button onClick={() => setScriptModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><XCircle size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Tên script *</label>
                  <input value={scriptForm.name} onChange={e => setScriptForm(f => ({ ...f, name: e.target.value }))} placeholder="VD: Admin - GA4" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Owner (ai sở hữu?)</label>
                  <input value={scriptForm.owner} onChange={e => setScriptForm(f => ({ ...f, owner: e.target.value }))} placeholder="VD: Admin, Client A" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Loại script</label>
                <select value={scriptForm.type} onChange={e => setScriptForm(f => ({ ...f, type: e.target.value as TrackingScript['type'], value: '' }))} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {(Object.entries(TRACKING_TYPES) as Array<[TrackingScript['type'], typeof TRACKING_TYPES[TrackingScript['type']]]>).map(([key, t]) => (
                    <option key={key} value={key}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {TRACKING_TYPES[scriptForm.type].isCode ? 'Nội dung script *' : 'ID / Mã xác minh *'}
                </label>
                {TRACKING_TYPES[scriptForm.type].isCode ? (
                  <textarea
                    value={scriptForm.value}
                    onChange={e => setScriptForm(f => ({ ...f, value: e.target.value }))}
                    placeholder={TRACKING_TYPES[scriptForm.type].placeholder}
                    rows={6}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                ) : (
                  <input
                    value={scriptForm.value}
                    onChange={e => setScriptForm(f => ({ ...f, value: e.target.value }))}
                    placeholder={TRACKING_TYPES[scriptForm.type].placeholder}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={scriptForm.active} onChange={e => setScriptForm(f => ({ ...f, active: e.target.checked }))} className="accent-blue-500 w-4 h-4" />
                <span className="text-sm text-slate-700">Kích hoạt script này</span>
              </label>
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100">
              <button onClick={() => setScriptModal(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Huỷ</button>
              <button onClick={handleScriptSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Robots.txt */}
      {tab === 'robots' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">Robots.txt</h3>
            <p className="text-xs text-slate-500">Chỉnh sửa nội dung file robots.txt</p>
          </div>
          <textarea value={robotsTxt} onChange={(e) => setRobotsTxt(e.target.value)} rows={10} className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm font-mono outline-none resize-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50" />
          <div className="flex justify-end">
            <button onClick={handleSaveRobotsTxt} disabled={saving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Lưu robots.txt
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
