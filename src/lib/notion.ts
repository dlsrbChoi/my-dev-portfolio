// Notion API 클라이언트 및 데이터 페칭 함수

import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client'
import type { Project, ExperienceEntry } from '@/types/notion'
import { mapNotionProjectToApp, mapNotionExperienceToApp } from './notion-mappers'

// Notion 클라이언트 초기화
const notion = new Client({ auth: process.env.NOTION_API_KEY })

/**
 * Notion Projects Database에서 모든 프로젝트 조회
 * Status가 'Published'인 항목만 반환하며, DisplayOrder 순서대로 정렬
 * @returns Project 배열
 */
export async function getProjects(): Promise<Project[]> {
  try {
    // @ts-expect-error - databases.query는 타입 정의에 포함되지 않음
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECTS_DB_ID!,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'DisplayOrder',
          direction: 'ascending',
        },
      ],
    })

    // 타입 가드: PageObjectResponse인 항목만 매핑
    return (response.results as unknown[])
      .filter((result): result is PageObjectResponse => {
        return typeof result === 'object' && result !== null && 'properties' in result
      })
      .map(mapNotionProjectToApp)
  } catch (error) {
    console.error('Failed to fetch projects from Notion:', error)
    throw error
  }
}

/**
 * Notion Projects Database에서 특정 slug의 프로젝트 조회
 * @param slug - 프로젝트 slug
 * @returns 해당하는 Project 또는 null
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await getProjects()
    return projects.find((p) => p.slug === slug) || null
  } catch (error) {
    console.error(`Failed to fetch project with slug "${slug}":`, error)
    return null
  }
}

/**
 * Notion Resume Database에서 경력/학력/자격증 정보 조회
 * @returns 경력, 학력, 자격증을 분류한 객체
 */
export async function getResumeData(): Promise<{
  experiences: ExperienceEntry[]
  education: ExperienceEntry[]
  certificates: ExperienceEntry[]
}> {
  try {
    // @ts-expect-error - databases.query는 타입 정의에 포함되지 않음
    const response = await notion.databases.query({
      database_id: process.env.NOTION_RESUME_DB_ID!,
      sorts: [
        {
          property: 'DisplayOrder',
          direction: 'ascending',
        },
      ],
    })

    // 타입 가드: PageObjectResponse인 항목만 매핑
    const entries = (response.results as unknown[])
      .filter((result): result is PageObjectResponse => {
        return typeof result === 'object' && result !== null && 'properties' in result
      })
      .map(mapNotionExperienceToApp)

    // EntryType으로 분류
    const experiences = entries.filter((e) => e.entryType === 'experience')
    const education = entries.filter((e) => e.entryType === 'education')
    const certificates = entries.filter((e) => e.entryType === 'certificate')

    return {
      experiences,
      education,
      certificates,
    }
  } catch (error) {
    console.error('Failed to fetch resume data from Notion:', error)
    return {
      experiences: [],
      education: [],
      certificates: [],
    }
  }
}
