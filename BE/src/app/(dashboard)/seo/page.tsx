'use client'

import { useState, useEffect } from 'react'
import {
  Globe, Search as SearchIcon, FileText, Settings, AlertTriangle,
  CheckCircle2, XCircle, ExternalLink, RefreshCw, Download,
  ChevronDown, Eye, Link2, Image as ImageIcon, MapPin,
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
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pages' | 'sitemap' | 'robots' | 'global'>('pages')
  const [expandedPath, setExpandedPath] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/pages')
      .then(r => r.json())
      .then(json => setSeoPages(buildSEOPages(json.data || [])))
      .catch(() => {})
      .finally(() => setLoading(false))
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

  return (
    <div className="space-y-6 animate-fade-in">
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
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 w-fit">
        {([['pages', 'Trang', FileText], ['global', 'Cài đặt chung', Settings], ['sitemap', 'Sitemap', MapPin], ['robots', 'Robots.txt', FileText]] as const).map(([key, label, Icon]) => (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Meta Title <span className="text-slate-400">({(page.metaTitle || '').length}/60)</span></label>
                        <input type="text" defaultValue={page.metaTitle} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Canonical URL</label>
                        <input type="text" defaultValue={`https://mtiensolution.vn${page.path}`} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-600 mb-1">Meta Description <span className="text-slate-400">({(page.metaDescription || '').length}/160)</span></label>
                        <textarea defaultValue={page.metaDescription} rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20" />
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
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Lưu thay đổi</button>
                    </div>
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold">Lưu cài đặt SEO</button>
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

      {/* Tab: Robots.txt */}
      {tab === 'robots' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">Robots.txt</h3>
            <p className="text-xs text-slate-500">Chỉnh sửa nội dung file robots.txt</p>
          </div>
          <textarea value={robotsTxt} onChange={(e) => setRobotsTxt(e.target.value)} rows={10} className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm font-mono outline-none resize-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50" />
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold">Lưu robots.txt</button>
          </div>
        </div>
      )}
    </div>
  )
}
