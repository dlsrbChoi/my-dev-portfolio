// 경력/학력/자격증 데이터 타입 정의
// (기존 src/types/notion.ts에서 이동됨 — Notion API 의존성 제거에 따른 재배치)

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

export type EducationEntry = ExperienceEntry
