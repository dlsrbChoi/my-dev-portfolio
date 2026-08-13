// Notion 데이터 모델 타입 정의

export type ProjectType = 'public' | 'personal' | 'collaboration'

export interface Project {
  id: string
  name: string
  slug: string
  summary: string
  period: { start: string; end: string }
  role: string[]
  techStack: string[]
  impactMetrics: string[]
  coverImage?: { url: string; alt: string }
  status: 'draft' | 'published'
  displayOrder: number
  projectType: ProjectType
  externalLink?: string
}

export interface ExperienceEntry {
  id: string
  name: string
  entryType: 'experience' | 'education' | 'certificate'
  organization: string
  position: string
  period: { start: string; end: string }
  description: string
  displayOrder: number
}
