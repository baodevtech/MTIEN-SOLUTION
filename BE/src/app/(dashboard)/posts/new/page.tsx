'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Save, Eye, Clock, Image as ImageIcon, X, Plus,
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon,
  Quote, Code, Heading1, Heading2, AlignLeft, AlignCenter, Upload,
  ChevronDown, Loader2, Target, AlertTriangle,
  CheckCircle2, XCircle, Info, Search as SearchIcon, ChevronRight,
} from 'lucide-react'
import { cn, slugify } from '@/lib/utils'

const categories = ['Thiết kế', 'Cloud', 'Marketing', 'E-commerce', 'AI', 'Bảo mật', 'Chuyển đổi số', 'Phần mềm']

interface SEOIssue {
  type: 'error' | 'warning' | 'good' | 'info'
  category: string
  message: string
  detail?: string
}

interface SEOCategory {
  name: string
  score: number
  maxScore: number
  issues: SEOIssue[]
}

interface SEOAnalysis {
  score: number
  categories: SEOCategory[]
  issues: SEOIssue[]
  summary: { errors: number; warnings: number; good: number; info: number }
}

export default function PostEditorPage() {
  return <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>}><PostEditorInner /></Suspense>
}

function PostEditorInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  // Core fields
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft')
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [saving, setSaving] = useState(false)
  const [author, setAuthor] = useState('')

  // SEO fields
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [focusKeyword, setFocusKeyword] = useState('')
  const [seoKeywords, setSeoKeywords] = useState<string[]>([])
  const [seoKeywordInput, setSeoKeywordInput] = useState('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [noIndex, setNoIndex] = useState(false)

  // SEO Analysis
  const [seoExpanded, setSeoExpanded] = useState(true)
  const [seoAnalysis, setSeoAnalysis] = useState<SEOAnalysis | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Load post data if editing
  useEffect(() => {
    if (!editId) return
    fetch(`/api/admin/posts?search=&limit=100`)
      .then(r => r.json())
      .then(json => {
        const p = (json.data || []).find((item: { id: string }) => item.id === editId)
        if (p) {
          setTitle(p.title || '')
          setSlug(p.slug || '')
          setContent(p.content || '')
          setExcerpt(p.excerpt || '')
          setCategory(p.category || '')
          setTags(p.tags || [])
          setStatus(p.status || 'draft')
          setFeaturedImage(p.coverImage || null)
          setAuthor(p.author || '')
          setSeoTitle(p.seoTitle || '')
          setSeoDescription(p.seoDescription || '')
          setFocusKeyword(p.focusKeyword || '')
          setSeoKeywords(p.seoKeywords || [])
          setCanonicalUrl(p.canonicalUrl || '')
          setOgImage(p.ogImage || '')
          setNoIndex(p.noIndex || false)
          if (p.seoIssues) setSeoAnalysis(p.seoIssues)
        }
      })
      .catch(() => {})
  }, [editId])

  // Auto-analyze SEO (debounced)
  const runSeoAnalysis = useCallback(async () => {
    setAnalyzing(true)
    try {
      const res = await fetch('/api/admin/posts/seo-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editId && { id: editId }),
          title, slug: slug || slugify(title), content, excerpt,
          seoTitle, seoDescription, focusKeyword, seoKeywords,
          coverImage: featuredImage, ogImage, canonicalUrl, noIndex, tags, category,
        }),
      })
      const json = await res.json()
      if (json.success) setSeoAnalysis(json.data)
    } catch { /* ignore */ }
    finally { setAnalyzing(false) }
  }, [title, slug, content, excerpt, seoTitle, seoDescription, focusKeyword, seoKeywords, featuredImage, ogImage, canonicalUrl, noIndex, tags, category, editId])

  useEffect(() => {
    if (!title) return
    const timer = setTimeout(runSeoAnalysis, 1500)
    return () => clearTimeout(timer)
  }, [runSeoAnalysis, title])

  const handleSave = async (saveStatus: 'draft' | 'published') => {
    if (!title) return alert('Vui lòng nhập tiêu đề bài viết')
    setSaving(true)
    try {
      const body = {
        ...(editId && { id: editId }),
        title, slug: slug || slugify(title), content, excerpt, category, tags,
        author, coverImage: featuredImage, status: saveStatus,
        seoTitle, seoDescription, seoKeywords, focusKeyword,
        canonicalUrl, ogImage, noIndex,
        seoScore: seoAnalysis?.score || 0,
        seoIssues: seoAnalysis || null,
      }
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.success) router.push('/posts')
      else alert(json.message || 'Lưu thất bại')
    } catch { alert('Lỗi kết nối') }
    finally { setSaving(false) }
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug || slug === slugify(title)) setSlug(slugify(value))
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput('') }
  }
  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag))

  const addSeoKeyword = () => {
    const k = seoKeywordInput.trim()
    if (k && !seoKeywords.includes(k)) { setSeoKeywords([...seoKeywords, k]); setSeoKeywordInput('') }
  }
  const removeSeoKeyword = (k: string) => setSeoKeywords(seoKeywords.filter(kw => kw !== k))

  const scoreColor = (score: number) =>
    score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'
  const scoreBg = (score: number) =>
    score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
  const scoreLabel = (score: number) =>
    score >= 80 ? 'Tốt' : score >= 50 ? 'Cần cải thiện' : 'Yếu'

  const issueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle size={14} className="text-red-500 shrink-0" />
      case 'warning': return <AlertTriangle size={14} className="text-amber-500 shrink-0" />
      case 'good': return <CheckCircle2 size={14} className="text-green-500 shrink-0" />
      case 'info': return <Info size={14} className="text-blue-500 shrink-0" />
      default: return null
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/posts" className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{editId ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h1>
            <p className="text-sm text-slate-500">Soạn thảo và tối ưu SEO</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {seoAnalysis && (
            <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold',
              seoAnalysis.score >= 80 ? 'bg-green-50 border-green-200 text-green-700'
              : seoAnalysis.score >= 50 ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-red-50 border-red-200 text-red-700'
            )}>
              <Target size={16} />
              SEO: {seoAnalysis.score}/100
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Eye size={16} /> Xem trước
          </button>
          <button onClick={() => handleSave('draft')} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
            Lưu nháp
          </button>
          <button onClick={() => handleSave('published')} disabled={saving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Xuất bản
          </button>
        </div>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Editor */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <input
              type="text"
              placeholder="Nhập tiêu đề bài viết..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-2xl font-bold text-slate-800 placeholder:text-slate-300 outline-none"
            />
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-slate-400">Đường dẫn:</span>
              <span className="text-xs text-slate-500">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded border border-blue-200 outline-none focus:ring-1 focus:ring-blue-400 flex-1"
                placeholder="tieu-de-bai-viet"
              />
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center border-b border-slate-200">
              <button onClick={() => setActiveTab('editor')} className={cn('px-5 py-3 text-sm font-medium border-b-2 transition-colors', activeTab === 'editor' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700')}>
                Soạn thảo
              </button>
              <button onClick={() => setActiveTab('preview')} className={cn('px-5 py-3 text-sm font-medium border-b-2 transition-colors', activeTab === 'preview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700')}>
                Xem trước
              </button>
            </div>
            {activeTab === 'editor' && (
              <div className="flex items-center gap-0.5 px-4 py-2 border-b border-slate-100 flex-wrap">
                {[
                  { icon: <Heading1 size={16} />, title: 'Heading 1' },
                  { icon: <Heading2 size={16} />, title: 'Heading 2' },
                  null,
                  { icon: <Bold size={16} />, title: 'Bold' },
                  { icon: <Italic size={16} />, title: 'Italic' },
                  { icon: <Underline size={16} />, title: 'Underline' },
                  null,
                  { icon: <List size={16} />, title: 'Bullet list' },
                  { icon: <ListOrdered size={16} />, title: 'Numbered list' },
                  { icon: <Quote size={16} />, title: 'Quote' },
                  { icon: <Code size={16} />, title: 'Code' },
                  null,
                  { icon: <LinkIcon size={16} />, title: 'Link' },
                  { icon: <ImageIcon size={16} />, title: 'Image' },
                  null,
                  { icon: <AlignLeft size={16} />, title: 'Align left' },
                  { icon: <AlignCenter size={16} />, title: 'Align center' },
                ].map((item, i) =>
                  item === null ? (
                    <div key={`sep-${i}`} className="w-px h-5 bg-slate-200 mx-1" />
                  ) : (
                    <button key={item.title} title={item.title} className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                      {item.icon}
                    </button>
                  )
                )}
              </div>
            )}
            <div className="p-5">
              {activeTab === 'editor' ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Bắt đầu viết nội dung bài viết tại đây...&#10;&#10;Hỗ trợ Markdown, HTML và rich text."
                  className="w-full editor-content resize-none outline-none text-slate-700 placeholder:text-slate-300"
                  rows={20}
                />
              ) : (
                <div className="editor-content prose prose-slate max-w-none">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
                  ) : (
                    <p className="text-slate-400 italic">Chưa có nội dung để xem trước...</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Tóm tắt (Excerpt)</h3>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Viết mô tả ngắn cho bài viết, hiển thị ở trang danh sách..."
              className="w-full text-sm text-slate-600 placeholder:text-slate-400 outline-none resize-none border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              rows={3}
            />
            <p className="text-xs text-slate-400 mt-2">{excerpt.length}/300 ký tự</p>
          </div>

          {/* ═══════ SEO Analysis Panel ═══════ */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button onClick={() => setSeoExpanded(!seoExpanded)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center',
                  seoAnalysis ? (seoAnalysis.score >= 80 ? 'bg-green-50' : seoAnalysis.score >= 50 ? 'bg-amber-50' : 'bg-red-50') : 'bg-slate-50'
                )}>
                  <Target size={18} className={seoAnalysis ? scoreColor(seoAnalysis.score) : 'text-slate-400'} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-slate-700">Phân tích SEO</h3>
                    {seoAnalysis && (
                      <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full',
                        seoAnalysis.score >= 80 ? 'bg-green-100 text-green-700'
                        : seoAnalysis.score >= 50 ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                      )}>
                        {seoAnalysis.score}/100 — {scoreLabel(seoAnalysis.score)}
                      </span>
                    )}
                    {analyzing && <Loader2 size={14} className="animate-spin text-blue-500" />}
                  </div>
                  <p className="text-xs text-slate-500">
                    {seoAnalysis
                      ? `${seoAnalysis.summary.errors} lỗi · ${seoAnalysis.summary.warnings} cảnh báo · ${seoAnalysis.summary.good} tốt`
                      : 'Nhập nội dung để bắt đầu phân tích'
                    }
                  </p>
                </div>
              </div>
              <ChevronDown size={16} className={cn('text-slate-400 transition-transform', seoExpanded && 'rotate-180')} />
            </button>

            {seoExpanded && (
              <div className="border-t border-slate-100">
                {/* Focus Keyword */}
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">Từ khóa chính (Focus Keyword)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="VD: thiết kế website, cloud server..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                    />
                    <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  {focusKeyword && content && (
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span>Mật độ: <strong className={cn(
                        (() => {
                          const d = (content.toLowerCase().split(focusKeyword.toLowerCase()).length - 1) / (content.split(/\s+/).length || 1) * 100
                          return d >= 1 && d <= 3 ? 'text-green-600' : d > 3 ? 'text-red-600' : 'text-amber-600'
                        })()
                      )}>
                        {((content.toLowerCase().split(focusKeyword.toLowerCase()).length - 1) / (content.split(/\s+/).length || 1) * 100).toFixed(1)}%
                      </strong></span>
                      <span>Xuất hiện: <strong>{content.toLowerCase().split(focusKeyword.toLowerCase()).length - 1} lần</strong></span>
                    </div>
                  )}
                </div>

                {/* Score Overview */}
                {seoAnalysis && (
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-black',
                        seoAnalysis.score >= 80 ? 'bg-green-100 text-green-700'
                        : seoAnalysis.score >= 50 ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                      )}>
                        {seoAnalysis.score}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-slate-700">Điểm SEO tổng</span>
                          <span className={cn('text-xs font-bold', scoreColor(seoAnalysis.score))}>{scoreLabel(seoAnalysis.score)}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div className={cn('h-2.5 rounded-full transition-all duration-500', scoreBg(seoAnalysis.score))} style={{ width: `${seoAnalysis.score}%` }} />
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          <span className="flex items-center gap-1 text-red-600"><XCircle size={12} /> {seoAnalysis.summary.errors} lỗi</span>
                          <span className="flex items-center gap-1 text-amber-600"><AlertTriangle size={12} /> {seoAnalysis.summary.warnings} cảnh báo</span>
                          <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={12} /> {seoAnalysis.summary.good} tốt</span>
                        </div>
                      </div>
                    </div>

                    {/* Category scores */}
                    <div className="space-y-2">
                      {seoAnalysis.categories.map((cat) => (
                        <div key={cat.name} className="border border-slate-100 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold',
                                cat.score >= cat.maxScore * 0.8 ? 'bg-green-100 text-green-700'
                                : cat.score >= cat.maxScore * 0.5 ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                              )}>
                                {cat.score}
                              </div>
                              <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">{cat.score}/{cat.maxScore}</span>
                              <div className="w-20 bg-slate-100 rounded-full h-1.5">
                                <div className={cn('h-1.5 rounded-full', scoreBg(cat.score / cat.maxScore * 100))} style={{ width: `${(cat.score / cat.maxScore) * 100}%` }} />
                              </div>
                              <ChevronRight size={14} className={cn('text-slate-400 transition-transform', expandedCategory === cat.name && 'rotate-90')} />
                            </div>
                          </button>
                          {expandedCategory === cat.name && (
                            <div className="px-3 pb-3 space-y-1.5 border-t border-slate-50 pt-2">
                              {cat.issues.map((issue, i) => (
                                <div key={i} className={cn('flex items-start gap-2 px-2.5 py-2 rounded-lg text-xs',
                                  issue.type === 'error' ? 'bg-red-50' :
                                  issue.type === 'warning' ? 'bg-amber-50' :
                                  issue.type === 'good' ? 'bg-green-50' : 'bg-blue-50'
                                )}>
                                  {issueIcon(issue.type)}
                                  <div>
                                    <p className="font-medium text-slate-700">{issue.message}</p>
                                    {issue.detail && <p className="text-slate-500 mt-0.5">{issue.detail}</p>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SEO Meta Fields */}
                <div className="px-5 py-4 space-y-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Thẻ Meta & SEO</h4>

                  {/* Google Preview */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-wider font-bold">Xem trước trên Google</p>
                    <div className="space-y-0.5">
                      <p className="text-blue-700 text-base font-medium truncate">{seoTitle || title || 'Tiêu đề bài viết'} | MTIEN Solution</p>
                      <p className="text-green-800 text-xs">mtiensolution.vn/blog/{slug || 'duong-dan'}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{seoDescription || excerpt || 'Mô tả meta sẽ hiển thị ở đây...'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">SEO Title</label>
                    <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder={title || 'Nhập SEO title...'} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-400">{(seoTitle || title).length}/60 ký tự</p>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5">
                        <div className={cn('h-1.5 rounded-full transition-all', (seoTitle || title).length <= 60 ? 'bg-green-500' : 'bg-red-500')} style={{ width: `${Math.min(((seoTitle || title).length / 60) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                    <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder={excerpt || 'Mô tả ngắn gọn cho SEO (120-160 ký tự)...'} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" rows={3} />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-400">{seoDescription.length}/160 ký tự</p>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5">
                        <div className={cn('h-1.5 rounded-full transition-all',
                          seoDescription.length >= 120 && seoDescription.length <= 160 ? 'bg-green-500' : seoDescription.length > 160 ? 'bg-red-500' : 'bg-amber-500'
                        )} style={{ width: `${Math.min((seoDescription.length / 160) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Từ khóa phụ</label>
                    <div className="flex items-center gap-2 mb-2">
                      <input type="text" value={seoKeywordInput} onChange={(e) => setSeoKeywordInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSeoKeyword())}
                        placeholder="Thêm từ khóa..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                      <button onClick={addSeoKeyword} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200"><Plus size={16} /></button>
                    </div>
                    {seoKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {seoKeywords.map(k => (
                          <span key={k} className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-md">
                            {k}
                            <button onClick={() => removeSeoKeyword(k)} className="text-green-400 hover:text-green-700"><X size={12} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Canonical URL</label>
                    <input type="text" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder="https://mtiensolution.vn/blog/..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">OG Image URL</label>
                    <input type="text" value={ogImage} onChange={(e) => setOgImage(e.target.value)}
                      placeholder="URL ảnh OG (để trống sẽ dùng ảnh đại diện)" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="noindex" checked={noIndex} onChange={(e) => setNoIndex(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-500" />
                    <label htmlFor="noindex" className="text-sm text-slate-600">No Index (ẩn khỏi Google)</label>
                  </div>

                  <button onClick={runSeoAnalysis} disabled={analyzing || !title}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 disabled:opacity-50 transition-colors">
                    {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Target size={16} />}
                    Phân tích SEO ngay
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-5">
          {/* Publish box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Xuất bản</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Trạng thái</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản ngay</option>
                  <option value="scheduled">Lên lịch</option>
                </select>
              </div>
              {status === 'scheduled' && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Ngày xuất bản</label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Ảnh đại diện</h3>
            {featuredImage ? (
              <div className="relative rounded-lg overflow-hidden group">
                <img src={featuredImage} alt="" className="w-full h-40 object-cover" />
                <button onClick={() => setFeaturedImage(null)} className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => setFeaturedImage('https://picsum.photos/seed/featured/600/300')} className="w-full h-40 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
                <Upload size={24} />
                <span className="text-sm font-medium">Chọn hoặc tải ảnh lên</span>
                <span className="text-xs">JPG, PNG, WebP — Tối đa 5MB</span>
              </button>
            )}
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Chuyên mục</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="category" value={cat} checked={category === cat} onChange={() => setCategory(cat)} className="w-4 h-4 text-blue-500 border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-600">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Thẻ (Tags)</h3>
            <div className="flex items-center gap-2 mb-3">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Nhập thẻ..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              <button onClick={addTag} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"><Plus size={16} /></button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-md">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-blue-400 hover:text-blue-700"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Author */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Tác giả</h3>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
              placeholder="Tên tác giả..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>

          {/* Quick SEO Checklist */}
          {seoAnalysis && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Target size={14} className="text-blue-600" />
                Checklist SEO
              </h3>
              <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                {[...seoAnalysis.issues]
                  .sort((a, b) => {
                    const order: Record<string, number> = { error: 0, warning: 1, info: 2, good: 3 }
                    return (order[a.type] ?? 3) - (order[b.type] ?? 3)
                  })
                  .slice(0, 15)
                  .map((issue, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs py-1">
                      {issueIcon(issue.type)}
                      <span className={cn('leading-snug', issue.type === 'good' ? 'text-slate-500' : 'text-slate-700')}>{issue.message}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
