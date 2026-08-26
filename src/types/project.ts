// 프로젝트 데이터 타입 정의 (정적 데이터 기반, Notion 의존성 없음)

// 메인 프로젝트 (회사 프로젝트)
export interface Project {
  id: string
  slug: string
  title: string
  description: string
  summary?: string
  technologies: string[]
  period: {
    start: string // YYYY-MM 형식
    end: string | null // null이면 진행 중
  }
  teamSize?: number
  role?: string
  image?: string
  images?: string[]
  links?: {
    github?: string
    demo?: string
    website?: string
  }
  features?: (string | { title: string; description: string })[]
  content?: string
}

// 사이드 프로젝트 (개인 프로젝트)
export interface SideProject {
  id: string
  slug: string
  title: string
  description: string
  technologies: string[]
  images: string[]
  features: string[]
  learnings: string[]
  links?: {
    github?: string
    demo?: string
  }
}
