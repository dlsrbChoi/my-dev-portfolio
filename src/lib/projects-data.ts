// 정적 프로젝트(회사 프로젝트) 데이터 정의
// TODO: 아래 플레이스홀더 데이터를 실제 프로젝트 정보로 교체하세요.
import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'project-1',
    slug: 'project-1',
    title: 'TODO: 프로젝트 제목을 입력하세요',
    description: 'TODO: 프로젝트 설명을 입력하세요',
    summary: 'TODO: 한줄 요약',
    technologies: ['React', 'TypeScript', 'Node.js'],
    period: {
      start: 'YYYY-MM',
      end: 'YYYY-MM',
    },
    teamSize: 0,
    role: 'TODO: 본인의 역할',
    image: '/images/projects/project-1.png',
    features: ['TODO: 주요 기능 1', 'TODO: 주요 기능 2'],
  },
  {
    id: 'project-2',
    slug: 'project-2',
    title: 'TODO: 프로젝트 제목을 입력하세요',
    description: 'TODO: 프로젝트 설명을 입력하세요',
    summary: 'TODO: 한줄 요약',
    technologies: ['React', 'TypeScript', 'Node.js'],
    period: {
      start: 'YYYY-MM',
      end: 'YYYY-MM',
    },
    teamSize: 0,
    role: 'TODO: 본인의 역할',
    image: '/images/projects/project-2.png',
    features: ['TODO: 주요 기능 1', 'TODO: 주요 기능 2'],
  },
  {
    id: 'project-3',
    slug: 'project-3',
    title: 'TODO: 프로젝트 제목을 입력하세요',
    description: 'TODO: 프로젝트 설명을 입력하세요',
    summary: 'TODO: 한줄 요약',
    technologies: ['React', 'TypeScript', 'Node.js'],
    period: {
      start: 'YYYY-MM',
      end: 'YYYY-MM',
    },
    teamSize: 0,
    role: 'TODO: 본인의 역할',
    image: '/images/projects/project-3.png',
    features: ['TODO: 주요 기능 1', 'TODO: 주요 기능 2'],
  },
  {
    id: 'project-4',
    slug: 'project-4',
    title: 'TODO: 프로젝트 제목을 입력하세요',
    description: 'TODO: 프로젝트 설명을 입력하세요',
    summary: 'TODO: 한줄 요약',
    technologies: ['React', 'TypeScript', 'Node.js'],
    period: {
      start: 'YYYY-MM',
      end: 'YYYY-MM',
    },
    teamSize: 0,
    role: 'TODO: 본인의 역할',
    image: '/images/projects/project-4.png',
    features: ['TODO: 주요 기능 1', 'TODO: 주요 기능 2'],
  },
  {
    id: 'project-5',
    slug: 'project-5',
    title: 'TODO: 프로젝트 제목을 입력하세요',
    description: 'TODO: 프로젝트 설명을 입력하세요',
    summary: 'TODO: 한줄 요약',
    technologies: ['React', 'TypeScript', 'Node.js'],
    period: {
      start: 'YYYY-MM',
      end: 'YYYY-MM',
    },
    teamSize: 0,
    role: 'TODO: 본인의 역할',
    image: '/images/projects/project-5.png',
    features: ['TODO: 주요 기능 1', 'TODO: 주요 기능 2'],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectCount(): number {
  return projects.length
}
