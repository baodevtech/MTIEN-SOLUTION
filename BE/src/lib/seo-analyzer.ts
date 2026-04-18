/**
 * SEO Analyzer Engine
 * Phân tích SEO chi tiết cho bài viết với điểm số 100
 *
 * Categories:
 *  - Title (15 điểm)
 *  - Meta Description (15 điểm)
 *  - Content Quality (20 điểm)
 *  - Heading Structure (15 điểm)
 *  - Keyword Optimization (15 điểm)
 *  - Images (8 điểm)
 *  - Links (7 điểm)
 *  - Technical SEO (5 điểm)
 */

export interface SEOIssue {
  type: 'error' | 'warning' | 'good' | 'info'
  category: string
  message: string
  detail?: string
}

export interface SEOCategory {
  name: string
  score: number
  maxScore: number
  issues: SEOIssue[]
}

export interface SEOAnalysisResult {
  score: number
  categories: SEOCategory[]
  issues: SEOIssue[]
  summary: {
    errors: number
    warnings: number
    good: number
    info: number
  }
}

interface AnalyzerInput {
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  seoTitle: string | null
  seoDescription: string | null
  focusKeyword: string | null
  seoKeywords: string[]
  coverImage: string | null
  ogImage: string | null
  canonicalUrl: string | null
  noIndex: boolean
  tags: string[]
  category: string | null
}

// ─── Helpers ──────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function countWords(text: string): number {
  const cleaned = text.trim()
  if (!cleaned) return 0
  // Vietnamese + English word counting
  return cleaned.split(/[\s\n\r]+/).filter(Boolean).length
}

function getHeadings(html: string): { tag: string; text: string }[] {
  const regex = /<(h[1-6])[^>]*>(.*?)<\/\1>/gi
  const headings: { tag: string; text: string }[] = []
  let match
  while ((match = regex.exec(html)) !== null) {
    headings.push({ tag: match[1].toLowerCase(), text: stripHtml(match[2]) })
  }
  return headings
}

function getImages(html: string): { src: string; alt: string }[] {
  const regex = /<img[^>]*>/gi
  const images: { src: string; alt: string }[] = []
  let match
  while ((match = regex.exec(html)) !== null) {
    const srcMatch = match[0].match(/src=["']([^"']*)["']/)
    const altMatch = match[0].match(/alt=["']([^"']*)["']/)
    images.push({
      src: srcMatch ? srcMatch[1] : '',
      alt: altMatch ? altMatch[1] : '',
    })
  }
  return images
}

function getLinks(html: string): { href: string; text: string; isExternal: boolean }[] {
  const regex = /<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi
  const links: { href: string; text: string; isExternal: boolean }[] = []
  let match
  while ((match = regex.exec(html)) !== null) {
    const href = match[1]
    links.push({
      href,
      text: stripHtml(match[2]),
      isExternal: href.startsWith('http') && !href.includes('mtiensolution.vn'),
    })
  }
  return links
}

function keywordDensity(text: string, keyword: string): number {
  if (!keyword || !text) return 0
  const words = countWords(text)
  if (words === 0) return 0
  const kw = keyword.toLowerCase()
  const textLower = text.toLowerCase()
  const count = textLower.split(kw).length - 1
  const kwWords = countWords(keyword)
  return (count * kwWords / words) * 100
}

function keywordInText(text: string, keyword: string): boolean {
  if (!keyword || !text) return false
  return text.toLowerCase().includes(keyword.toLowerCase())
}

// ─── Analyzers ────────────────────────────────────

function analyzeTitle(input: AnalyzerInput): SEOCategory {
  const issues: SEOIssue[] = []
  let score = 0
  const maxScore = 15
  const title = input.seoTitle || input.title
  const kw = input.focusKeyword

  if (!title) {
    issues.push({ type: 'error', category: 'Tiêu đề', message: 'Chưa có tiêu đề bài viết', detail: 'Tiêu đề là yếu tố SEO quan trọng nhất. Hãy thêm tiêu đề ngay.' })
    return { name: 'Tiêu đề (Title)', score: 0, maxScore, issues }
  }

  // Length check
  if (title.length >= 30 && title.length <= 60) {
    score += 5
    issues.push({ type: 'good', category: 'Tiêu đề', message: `Độ dài tiêu đề tốt (${title.length}/60 ký tự)` })
  } else if (title.length < 30) {
    score += 2
    issues.push({ type: 'warning', category: 'Tiêu đề', message: `Tiêu đề quá ngắn (${title.length}/60 ký tự)`, detail: 'Tiêu đề nên có 30-60 ký tự để tối ưu SEO.' })
  } else {
    score += 2
    issues.push({ type: 'warning', category: 'Tiêu đề', message: `Tiêu đề quá dài (${title.length}/60 ký tự)`, detail: 'Google sẽ cắt tiêu đề dài hơn 60 ký tự trong kết quả tìm kiếm.' })
  }

  // Focus keyword in title
  if (kw) {
    if (keywordInText(title, kw)) {
      score += 5
      issues.push({ type: 'good', category: 'Tiêu đề', message: 'Từ khóa chính có trong tiêu đề' })

      // Keyword at beginning
      if (title.toLowerCase().startsWith(kw.toLowerCase()) || title.toLowerCase().indexOf(kw.toLowerCase()) < title.length * 0.3) {
        score += 3
        issues.push({ type: 'good', category: 'Tiêu đề', message: 'Từ khóa chính nằm ở đầu tiêu đề — rất tốt' })
      } else {
        score += 1
        issues.push({ type: 'info', category: 'Tiêu đề', message: 'Từ khóa nên đặt ở đầu tiêu đề để tối ưu hơn' })
      }
    } else {
      issues.push({ type: 'error', category: 'Tiêu đề', message: 'Tiêu đề không chứa từ khóa chính', detail: `Từ khóa "${kw}" cần xuất hiện trong tiêu đề.` })
    }
  } else {
    score += 2
    issues.push({ type: 'warning', category: 'Tiêu đề', message: 'Chưa đặt từ khóa chính (focus keyword)', detail: 'Hãy đặt focus keyword để phân tích SEO chính xác hơn.' })
  }

  // Unique characters / power words
  const powerWords = ['hướng dẫn', 'cách', 'bí quyết', 'tốt nhất', 'miễn phí', 'top', 'mới nhất', 'chi tiết', 'đầy đủ', 'so sánh', 'review', 'đánh giá']
  const hasPower = powerWords.some(w => title.toLowerCase().includes(w))
  if (hasPower) {
    score += 2
    issues.push({ type: 'good', category: 'Tiêu đề', message: 'Tiêu đề chứa "power word" thu hút click' })
  }

  return { name: 'Tiêu đề (Title)', score: Math.min(score, maxScore), maxScore, issues }
}

function analyzeMetaDescription(input: AnalyzerInput): SEOCategory {
  const issues: SEOIssue[] = []
  let score = 0
  const maxScore = 15
  const desc = input.seoDescription || input.excerpt || ''
  const kw = input.focusKeyword

  if (!desc) {
    issues.push({ type: 'error', category: 'Mô tả', message: 'Chưa có meta description', detail: 'Meta description quan trọng cho CTR trên Google. Hãy viết mô tả 120-160 ký tự.' })
    return { name: 'Mô tả Meta', score: 0, maxScore, issues }
  }

  // Length
  if (desc.length >= 120 && desc.length <= 160) {
    score += 5
    issues.push({ type: 'good', category: 'Mô tả', message: `Độ dài meta description tốt (${desc.length}/160 ký tự)` })
  } else if (desc.length < 120) {
    score += 2
    issues.push({ type: 'warning', category: 'Mô tả', message: `Meta description ngắn (${desc.length}/160 ký tự)`, detail: 'Nên viết 120-160 ký tự để hiển thị đầy đủ trên Google.' })
  } else {
    score += 3
    issues.push({ type: 'warning', category: 'Mô tả', message: `Meta description dài (${desc.length}/160 ký tự)`, detail: 'Google sẽ cắt mô tả dài hơn 160 ký tự.' })
  }

  // Keyword
  if (kw) {
    if (keywordInText(desc, kw)) {
      score += 5
      issues.push({ type: 'good', category: 'Mô tả', message: 'Từ khóa chính có trong meta description' })
    } else {
      issues.push({ type: 'error', category: 'Mô tả', message: 'Meta description không chứa từ khóa chính', detail: `Hãy thêm "${kw}" vào mô tả.` })
    }
  } else {
    score += 2
  }

  // CTA / actionable words
  const ctaWords = ['tìm hiểu', 'khám phá', 'xem ngay', 'đọc thêm', 'liên hệ', 'bắt đầu', 'tải về', 'miễn phí', 'thử ngay']
  const hasCTA = ctaWords.some(w => desc.toLowerCase().includes(w))
  if (hasCTA) {
    score += 3
    issues.push({ type: 'good', category: 'Mô tả', message: 'Meta description có call-to-action' })
  } else {
    score += 1
    issues.push({ type: 'info', category: 'Mô tả', message: 'Nên thêm call-to-action vào meta description', detail: 'Ví dụ: "Tìm hiểu ngay", "Khám phá chi tiết"...' })
  }

  // Uniqueness (not same as title)
  if (desc !== input.title && desc !== input.seoTitle) {
    score += 2
    issues.push({ type: 'good', category: 'Mô tả', message: 'Meta description khác biệt với tiêu đề' })
  } else {
    issues.push({ type: 'warning', category: 'Mô tả', message: 'Meta description giống tiêu đề', detail: 'Mô tả nên bổ sung thêm thông tin, không lặp lại tiêu đề.' })
  }

  return { name: 'Mô tả Meta', score: Math.min(score, maxScore), maxScore, issues }
}

function analyzeContent(input: AnalyzerInput): SEOCategory {
  const issues: SEOIssue[] = []
  let score = 0
  const maxScore = 20
  const content = input.content || ''
  const plainText = stripHtml(content)
  const wordCount = countWords(plainText)

  if (!content) {
    issues.push({ type: 'error', category: 'Nội dung', message: 'Bài viết chưa có nội dung' })
    return { name: 'Chất lượng Nội dung', score: 0, maxScore, issues }
  }

  // Word count
  if (wordCount >= 1500) {
    score += 8
    issues.push({ type: 'good', category: 'Nội dung', message: `Nội dung dài và chi tiết (${wordCount} từ) — tuyệt vời cho SEO` })
  } else if (wordCount >= 800) {
    score += 6
    issues.push({ type: 'good', category: 'Nội dung', message: `Nội dung đủ dài (${wordCount} từ)` })
  } else if (wordCount >= 300) {
    score += 3
    issues.push({ type: 'warning', category: 'Nội dung', message: `Nội dung ngắn (${wordCount} từ)`, detail: 'Bài viết nên có ít nhất 800 từ để xếp hạng tốt.' })
  } else {
    score += 1
    issues.push({ type: 'error', category: 'Nội dung', message: `Nội dung quá ngắn (${wordCount} từ)`, detail: 'Google ưu tiên nội dung dài, chi tiết. Nên viết ít nhất 300 từ.' })
  }

  // Paragraphs - check for structure
  const paragraphs = content.split(/<\/?p>/i).filter(p => stripHtml(p).length > 10)
  if (paragraphs.length >= 5) {
    score += 4
    issues.push({ type: 'good', category: 'Nội dung', message: `Bài viết có ${paragraphs.length} đoạn văn — cấu trúc tốt` })
  } else if (paragraphs.length >= 3) {
    score += 2
    issues.push({ type: 'info', category: 'Nội dung', message: `Bài viết có ${paragraphs.length} đoạn văn`, detail: 'Nên chia nội dung thành nhiều đoạn nhỏ hơn để dễ đọc.' })
  } else {
    issues.push({ type: 'warning', category: 'Nội dung', message: 'Nội dung chưa được chia đoạn tốt', detail: 'Chia nội dung thành các đoạn 2-3 câu để tăng readability.' })
  }

  // Check for lists
  const hasLists = /<(ul|ol)/i.test(content)
  if (hasLists) {
    score += 2
    issues.push({ type: 'good', category: 'Nội dung', message: 'Nội dung có danh sách (list) — tốt cho UX' })
  } else {
    issues.push({ type: 'info', category: 'Nội dung', message: 'Nên thêm danh sách (bullet/numbered) vào nội dung', detail: 'Danh sách giúp Google hiểu cấu trúc và có thể hiển thị featured snippet.' })
  }

  // Long paragraphs check
  const longParagraphs = paragraphs.filter(p => countWords(stripHtml(p)) > 150)
  if (longParagraphs.length > 0) {
    issues.push({ type: 'warning', category: 'Nội dung', message: `Có ${longParagraphs.length} đoạn văn quá dài (>150 từ)`, detail: 'Đoạn văn dài khó đọc trên mobile. Nên chia nhỏ.' })
  } else if (paragraphs.length >= 3) {
    score += 2
    issues.push({ type: 'good', category: 'Nội dung', message: 'Các đoạn văn có độ dài phù hợp' })
  }

  // Check for bold/strong text
  const hasBold = /<(strong|b)>/i.test(content)
  if (hasBold) {
    score += 2
    issues.push({ type: 'good', category: 'Nội dung', message: 'Nội dung có text in đậm — tốt cho readability' })
  }

  // Excerpt check
  if (input.excerpt && input.excerpt.length >= 50) {
    score += 2
    issues.push({ type: 'good', category: 'Nội dung', message: 'Có tóm tắt (excerpt) cho bài viết' })
  } else {
    issues.push({ type: 'warning', category: 'Nội dung', message: 'Chưa có tóm tắt (excerpt) hoặc quá ngắn', detail: 'Tóm tắt hiển thị ở trang danh sách blog và social sharing.' })
  }

  return { name: 'Chất lượng Nội dung', score: Math.min(score, maxScore), maxScore, issues }
}

function analyzeHeadings(input: AnalyzerInput): SEOCategory {
  const issues: SEOIssue[] = []
  let score = 0
  const maxScore = 15
  const content = input.content || ''
  const headings = getHeadings(content)
  const kw = input.focusKeyword

  if (headings.length === 0) {
    issues.push({ type: 'error', category: 'Thẻ heading', message: 'Nội dung không có thẻ heading (H2, H3...)', detail: 'Thẻ heading giúp Google hiểu cấu trúc bài viết. Hãy thêm ít nhất 1 H2.' })
    return { name: 'Cấu trúc Heading', score: 0, maxScore, issues }
  }

  // H1 check (should NOT be in content, H1 is the title)
  const h1s = headings.filter(h => h.tag === 'h1')
  if (h1s.length > 0) {
    issues.push({ type: 'error', category: 'Thẻ heading', message: `Nội dung có ${h1s.length} thẻ H1`, detail: 'Chỉ nên có 1 H1 duy nhất (là tiêu đề bài viết). Trong nội dung dùng H2, H3.' })
  } else {
    score += 3
    issues.push({ type: 'good', category: 'Thẻ heading', message: 'Không có H1 trùng trong nội dung (H1 = tiêu đề)' })
  }

  // H2 check
  const h2s = headings.filter(h => h.tag === 'h2')
  if (h2s.length >= 2) {
    score += 4
    issues.push({ type: 'good', category: 'Thẻ heading', message: `Có ${h2s.length} thẻ H2 — cấu trúc tốt` })
  } else if (h2s.length === 1) {
    score += 2
    issues.push({ type: 'warning', category: 'Thẻ heading', message: 'Chỉ có 1 thẻ H2', detail: 'Nên có 2-5 thẻ H2 để chia nội dung thành các phần rõ ràng.' })
  } else {
    issues.push({ type: 'error', category: 'Thẻ heading', message: 'Không có thẻ H2 nào', detail: 'H2 là heading phụ quan trọng nhất sau tiêu đề (H1).' })
  }

  // H3 check
  const h3s = headings.filter(h => h.tag === 'h3')
  if (h3s.length >= 2) {
    score += 2
    issues.push({ type: 'good', category: 'Thẻ heading', message: `Có ${h3s.length} thẻ H3 — sub-heading chi tiết` })
  }

  // Heading hierarchy check (no skipping levels)
  let prevLevel = 1
  let hierarchyOk = true
  for (const h of headings) {
    const level = parseInt(h.tag[1])
    if (level > prevLevel + 1) {
      hierarchyOk = false
      issues.push({ type: 'error', category: 'Thẻ heading', message: `Nhảy thứ tự heading: ${`H${prevLevel}`} → ${h.tag.toUpperCase()}`, detail: `Heading nên theo thứ tự: H2 → H3 → H4, không được nhảy từ H${prevLevel} sang H${level}.` })
      break
    }
    prevLevel = level
  }
  if (hierarchyOk && headings.length >= 2) {
    score += 3
    issues.push({ type: 'good', category: 'Thẻ heading', message: 'Thứ tự heading đúng cấu trúc (không nhảy cấp)' })
  }

  // Keyword in headings
  if (kw) {
    const kwInH2 = h2s.some(h => keywordInText(h.text, kw))
    if (kwInH2) {
      score += 3
      issues.push({ type: 'good', category: 'Thẻ heading', message: 'Từ khóa chính có trong ít nhất 1 thẻ H2' })
    } else {
      issues.push({ type: 'warning', category: 'Thẻ heading', message: 'Từ khóa chính chưa có trong thẻ H2 nào', detail: `Hãy thêm "${kw}" vào 1 H2 để tăng relevancy.` })
    }
  }

  return { name: 'Cấu trúc Heading', score: Math.min(score, maxScore), maxScore, issues }
}

function analyzeKeywords(input: AnalyzerInput): SEOCategory {
  const issues: SEOIssue[] = []
  let score = 0
  const maxScore = 15
  const content = input.content || ''
  const plainText = stripHtml(content)
  const kw = input.focusKeyword

  if (!kw) {
    issues.push({ type: 'warning', category: 'Từ khóa', message: 'Chưa đặt từ khóa chính (focus keyword)', detail: 'Focus keyword giúp đánh giá mật độ từ khóa và tối ưu nội dung.' })
    // Still give some points for having tags/keywords
    if (input.seoKeywords.length > 0 || input.tags.length > 0) {
      score += 3
      issues.push({ type: 'good', category: 'Từ khóa', message: `Có ${input.seoKeywords.length + input.tags.length} từ khóa/tag` })
    }
    return { name: 'Tối ưu Từ khóa', score: Math.min(score, maxScore), maxScore, issues }
  }

  // Keyword in first paragraph
  const firstParagraph = plainText.substring(0, 300)
  if (keywordInText(firstParagraph, kw)) {
    score += 3
    issues.push({ type: 'good', category: 'Từ khóa', message: 'Từ khóa xuất hiện trong đoạn đầu tiên — rất tốt' })
  } else {
    issues.push({ type: 'warning', category: 'Từ khóa', message: 'Từ khóa chưa có trong đoạn đầu tiên', detail: 'Google ưu tiên từ khóa xuất hiện sớm trong bài viết.' })
  }

  // Keyword density
  const density = keywordDensity(plainText, kw)
  if (density >= 1 && density <= 3) {
    score += 5
    issues.push({ type: 'good', category: 'Từ khóa', message: `Mật độ từ khóa ${density.toFixed(1)}% — lý tưởng (1-3%)` })
  } else if (density > 0 && density < 1) {
    score += 2
    issues.push({ type: 'warning', category: 'Từ khóa', message: `Mật độ từ khóa thấp (${density.toFixed(1)}%)`, detail: 'Nên đạt 1-3% mật độ từ khóa. Hãy thêm từ khóa tự nhiên vào nội dung.' })
  } else if (density > 3) {
    score += 1
    issues.push({ type: 'error', category: 'Từ khóa', message: `Mật độ từ khóa quá cao (${density.toFixed(1)}%) — keyword stuffing!`, detail: 'Mật độ >3% có thể bị Google coi là spam. Giảm bớt từ khóa.' })
  } else {
    issues.push({ type: 'error', category: 'Từ khóa', message: 'Từ khóa chính không xuất hiện trong nội dung', detail: `"${kw}" cần được đề cập ít nhất 2-3 lần trong bài viết.` })
  }

  // Keyword in slug
  if (keywordInText(input.slug.replace(/-/g, ' '), kw)) {
    score += 3
    issues.push({ type: 'good', category: 'Từ khóa', message: 'Từ khóa có trong URL (slug)' })
  } else {
    issues.push({ type: 'warning', category: 'Từ khóa', message: 'URL chưa chứa từ khóa chính', detail: `Slug "${input.slug}" nên chứa "${kw}".` })
  }

  // SEO keywords / tags
  const totalKw = input.seoKeywords.length + input.tags.length
  if (totalKw >= 3) {
    score += 2
    issues.push({ type: 'good', category: 'Từ khóa', message: `Có ${totalKw} từ khóa phụ và tag` })
  } else if (totalKw > 0) {
    score += 1
    issues.push({ type: 'info', category: 'Từ khóa', message: 'Nên thêm 3-5 từ khóa phụ (tags + SEO keywords)' })
  } else {
    issues.push({ type: 'warning', category: 'Từ khóa', message: 'Chưa có từ khóa phụ hoặc tag nào' })
  }

  // Keyword variations (LSI-like check)
  const kwParts = kw.toLowerCase().split(/\s+/)
  if (kwParts.length > 1) {
    const partialMatches = kwParts.filter(part => plainText.toLowerCase().includes(part))
    if (partialMatches.length === kwParts.length) {
      score += 2
      issues.push({ type: 'good', category: 'Từ khóa', message: 'Tất cả thành phần của từ khóa đều xuất hiện trong nội dung' })
    }
  }

  return { name: 'Tối ưu Từ khóa', score: Math.min(score, maxScore), maxScore, issues }
}

function analyzeImages(input: AnalyzerInput): SEOCategory {
  const issues: SEOIssue[] = []
  let score = 0
  const maxScore = 8
  const content = input.content || ''
  const images = getImages(content)

  // Cover image
  if (input.coverImage) {
    score += 2
    issues.push({ type: 'good', category: 'Hình ảnh', message: 'Có ảnh đại diện (cover image)' })
  } else {
    issues.push({ type: 'error', category: 'Hình ảnh', message: 'Chưa có ảnh đại diện', detail: 'Ảnh đại diện quan trọng cho social sharing và trang danh sách blog.' })
  }

  // Content images
  if (images.length >= 2) {
    score += 2
    issues.push({ type: 'good', category: 'Hình ảnh', message: `Nội dung có ${images.length} hình ảnh` })
  } else if (images.length === 1) {
    score += 1
    issues.push({ type: 'info', category: 'Hình ảnh', message: 'Nên thêm ít nhất 2 hình ảnh minh họa' })
  } else {
    issues.push({ type: 'warning', category: 'Hình ảnh', message: 'Nội dung chưa có hình ảnh nào', detail: 'Hình ảnh tăng engagement và thời gian đọc trang.' })
  }

  // Alt text check
  const missingAlt = images.filter(img => !img.alt || img.alt.trim() === '')
  if (images.length > 0) {
    if (missingAlt.length === 0) {
      score += 3
      issues.push({ type: 'good', category: 'Hình ảnh', message: 'Tất cả hình ảnh đều có alt text' })
    } else {
      score += 1
      issues.push({ type: 'error', category: 'Hình ảnh', message: `${missingAlt.length}/${images.length} hình ảnh thiếu alt text`, detail: 'Alt text giúp Google hiểu nội dung ảnh và cải thiện accessibility.' })
    }

    // Keyword in alt
    if (input.focusKeyword) {
      const kwInAlt = images.some(img => keywordInText(img.alt, input.focusKeyword!))
      if (kwInAlt) {
        score += 1
        issues.push({ type: 'good', category: 'Hình ảnh', message: 'Từ khóa có trong alt text hình ảnh' })
      } else {
        issues.push({ type: 'info', category: 'Hình ảnh', message: 'Nên thêm từ khóa vào alt text của ít nhất 1 ảnh' })
      }
    }
  }

  return { name: 'Hình ảnh', score: Math.min(score, maxScore), maxScore, issues }
}

function analyzeLinks(input: AnalyzerInput): SEOCategory {
  const issues: SEOIssue[] = []
  let score = 0
  const maxScore = 7
  const content = input.content || ''
  const links = getLinks(content)

  const internalLinks = links.filter(l => !l.isExternal)
  const externalLinks = links.filter(l => l.isExternal)

  // Internal links
  if (internalLinks.length >= 2) {
    score += 3
    issues.push({ type: 'good', category: 'Liên kết', message: `Có ${internalLinks.length} internal link — tốt cho SEO` })
  } else if (internalLinks.length === 1) {
    score += 1
    issues.push({ type: 'info', category: 'Liên kết', message: 'Nên thêm ít nhất 2 liên kết nội bộ', detail: 'Internal links giúp Google crawl và phân bổ page authority.' })
  } else {
    issues.push({ type: 'warning', category: 'Liên kết', message: 'Nội dung chưa có internal link nào', detail: 'Hãy liên kết đến các bài viết hoặc trang liên quan trên website.' })
  }

  // External links
  if (externalLinks.length >= 1) {
    score += 2
    issues.push({ type: 'good', category: 'Liên kết', message: `Có ${externalLinks.length} external link — tăng độ uy tín` })
  } else {
    score += 1
    issues.push({ type: 'info', category: 'Liên kết', message: 'Nên thêm 1-2 liên kết đến nguồn tham khảo uy tín' })
  }

  // Check for empty anchor text
  const emptyAnchors = links.filter(l => !l.text.trim())
  if (emptyAnchors.length > 0) {
    issues.push({ type: 'error', category: 'Liên kết', message: `${emptyAnchors.length} liên kết thiếu anchor text`, detail: 'Anchor text giúp Google hiểu nội dung trang đích.' })
  } else if (links.length > 0) {
    score += 2
    issues.push({ type: 'good', category: 'Liên kết', message: 'Tất cả liên kết đều có anchor text' })
  }

  return { name: 'Liên kết', score: Math.min(score, maxScore), maxScore, issues }
}

function analyzeTechnical(input: AnalyzerInput): SEOCategory {
  const issues: SEOIssue[] = []
  let score = 0
  const maxScore = 5

  // Slug quality
  if (input.slug && input.slug.length > 0 && input.slug.length <= 75) {
    score += 1
    issues.push({ type: 'good', category: 'Kỹ thuật', message: `URL slug ngắn gọn (${input.slug.length} ký tự)` })
  } else if (input.slug && input.slug.length > 75) {
    issues.push({ type: 'warning', category: 'Kỹ thuật', message: 'URL slug quá dài', detail: 'Slug nên ngắn gọn, dưới 75 ký tự.' })
  }

  // Canonical URL
  if (input.canonicalUrl) {
    score += 1
    issues.push({ type: 'good', category: 'Kỹ thuật', message: 'Đã đặt canonical URL' })
  } else {
    issues.push({ type: 'info', category: 'Kỹ thuật', message: 'Chưa đặt canonical URL (sẽ dùng URL mặc định)' })
    score += 0.5
  }

  // OG Image
  if (input.ogImage || input.coverImage) {
    score += 1
    issues.push({ type: 'good', category: 'Kỹ thuật', message: 'Có OG image cho social sharing' })
  } else {
    issues.push({ type: 'warning', category: 'Kỹ thuật', message: 'Chưa có OG Image', detail: 'OG Image hiển thị khi chia sẻ trên Facebook, Twitter, Zalo...' })
  }

  // No index check
  if (input.noIndex) {
    issues.push({ type: 'warning', category: 'Kỹ thuật', message: 'Trang đang ở chế độ No Index', detail: 'Trang này sẽ KHÔNG xuất hiện trên Google.' })
  } else {
    score += 1
    issues.push({ type: 'good', category: 'Kỹ thuật', message: 'Trang được phép index trên Google' })
  }

  // Category check
  if (input.category) {
    score += 0.5
    issues.push({ type: 'good', category: 'Kỹ thuật', message: 'Đã phân loại danh mục' })
  } else {
    issues.push({ type: 'info', category: 'Kỹ thuật', message: 'Chưa chọn danh mục cho bài viết' })
  }

  return { name: 'SEO Kỹ thuật', score: Math.min(Math.round(score), maxScore), maxScore, issues }
}

// ─── Main Analyzer ────────────────────────────────

export function analyzeSEO(input: AnalyzerInput): SEOAnalysisResult {
  const categories = [
    analyzeTitle(input),
    analyzeMetaDescription(input),
    analyzeContent(input),
    analyzeHeadings(input),
    analyzeKeywords(input),
    analyzeImages(input),
    analyzeLinks(input),
    analyzeTechnical(input),
  ]

  const score = categories.reduce((sum, cat) => sum + cat.score, 0)
  const allIssues = categories.flatMap(cat => cat.issues)

  return {
    score: Math.min(100, Math.round(score)),
    categories,
    issues: allIssues,
    summary: {
      errors: allIssues.filter(i => i.type === 'error').length,
      warnings: allIssues.filter(i => i.type === 'warning').length,
      good: allIssues.filter(i => i.type === 'good').length,
      info: allIssues.filter(i => i.type === 'info').length,
    },
  }
}
