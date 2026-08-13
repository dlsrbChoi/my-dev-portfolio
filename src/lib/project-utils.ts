// 프로젝트 유틸리티 함수

import type { Project, ProjectType } from '@/types/notion'

/**
 * Project 배열을 ProjectType에 따라 주요와 사이드로 분류
 * 주요 프로젝트: public, collaboration
 * 사이드 프로젝트: personal
 * 각 그룹 내에서 displayOrder 오름차순으로 정렬
 * @param projects - 분류할 프로젝트 배열
 * @returns 그룹핑된 프로젝트 객체 { main: Project[], side: Project[] }
 */
export function groupProjectsByType(projects: Project[]): {
  main: Project[]
  side: Project[]
} {
  const main = projects
    .filter((p) => p.projectType === 'public' || p.projectType === 'collaboration')
    .sort((a, b) => a.displayOrder - b.displayOrder)

  const side = projects
    .filter((p) => p.projectType === 'personal')
    .sort((a, b) => a.displayOrder - b.displayOrder)

  return { main, side }
}
