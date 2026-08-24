// 정적 사이드 프로젝트(개인 프로젝트) 데이터 정의
// TODO: 아래 플레이스홀더 데이터를 실제 프로젝트 정보로 교체하세요.
import type { SideProject } from '@/types/project'

export const sideProjects: SideProject[] = [
  {
    id: 'side-project-1',
    slug: 'side-project-1',
    title: 'TODO: 개인 프로젝트 제목',
    description: 'TODO: 개인 프로젝트 설명',
    technologies: ['React', 'TypeScript'],
    images: ['/images/side-projects/side-project-1.png'],
    features: ['TODO: 구현한 기능 1'],
    learnings: ['TODO: 학습한 내용 1'],
  },
  {
    id: 'side-project-2',
    slug: 'side-project-2',
    title: 'TODO: 개인 프로젝트 제목',
    description: 'TODO: 개인 프로젝트 설명',
    technologies: ['React', 'TypeScript'],
    images: ['/images/side-projects/side-project-2.png'],
    features: ['TODO: 구현한 기능 1'],
    learnings: ['TODO: 학습한 내용 1'],
  },
  {
    id: 'side-project-3',
    slug: 'side-project-3',
    title: 'TODO: 개인 프로젝트 제목',
    description: 'TODO: 개인 프로젝트 설명',
    technologies: ['React', 'TypeScript'],
    images: ['/images/side-projects/side-project-3.png'],
    features: ['TODO: 구현한 기능 1'],
    learnings: ['TODO: 학습한 내용 1'],
  },
  {
    id: 'side-project-4',
    slug: 'side-project-4',
    title: 'TODO: 개인 프로젝트 제목',
    description: 'TODO: 개인 프로젝트 설명',
    technologies: ['React', 'TypeScript'],
    images: ['/images/side-projects/side-project-4.png'],
    features: ['TODO: 구현한 기능 1'],
    learnings: ['TODO: 학습한 내용 1'],
  },
  {
    id: 'side-project-5',
    slug: 'side-project-5',
    title: 'TODO: 개인 프로젝트 제목',
    description: 'TODO: 개인 프로젝트 설명',
    technologies: ['React', 'TypeScript'],
    images: ['/images/side-projects/side-project-5.png'],
    features: ['TODO: 구현한 기능 1'],
    learnings: ['TODO: 학습한 내용 1'],
  },
]

export function getSideProjectBySlug(slug: string): SideProject | undefined {
  return sideProjects.find((p) => p.slug === slug)
}

export function getSideProjectCount(): number {
  return sideProjects.length
}
