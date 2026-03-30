// Types TypeScript pour ReduceLink

export interface Link {
  id: number
  originalUrl: string
  shortCode: string
  clickCount: number
  createdAt: Date
  title?: string | null
  favicon?: string | null
}

export interface CreateLinkRequest {
  url: string
  customAlias?: string
}

export interface CreateLinkResponse {
  success: boolean
  link?: Link
  shortUrl?: string
  isReused?: boolean
  error?: string
}

export interface GlobalStats {
  totalLinks: number
  totalClicks: number
  linksToday: number
  clicksToday: number
}

export interface LinkPreview {
  url: string
  domain: string
  favicon: string
  title?: string
  isValid: boolean
  isSuspicious: boolean
  suspiciousReason?: string
}

export interface PaginatedLinks {
  links: Link[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type SortOption = 'recent' | 'popular' | 'alphabetical'
