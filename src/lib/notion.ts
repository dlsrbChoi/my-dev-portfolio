// Notion API 클라이언트 및 데이터 페칭 함수

import { Client } from '@notionhq/client'
import type { PageObjectResponse, BlockObjectResponse } from '@notionhq/client'
import type { Project, ExperienceEntry } from '@/types/notion'
import { mapNotionProjectToApp, mapNotionExperienceToApp } from './notion-mappers'

// Notion API 버전 (https://developers.notion.com/reference/versioning)
const NOTION_VERSION = '2026-03-11'

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  baseUrl: 'https://api.notion.com/v1',
})

/**
 * Notion Projects Database에서 모든 프로젝트 조회
 * Status가 'Published'인 항목만 반환하며, DisplayOrder 순서대로 정렬
 * @returns Project 배열
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch('https://api.notion.com/v1/databases/' + process.env.NOTION_PROJECTS_DB_ID + '/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    })

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`)
    }

    const data = (await response.json()) as any

    // 타입 가드: PageObjectResponse인 항목만 매핑
    return (data.results as unknown[])
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
    const response = await fetch('https://api.notion.com/v1/databases/' + process.env.NOTION_RESUME_DB_ID + '/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sorts: [
          {
            property: 'DisplayOrder',
            direction: 'ascending',
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`)
    }

    const data = (await response.json()) as any

    // 타입 가드: PageObjectResponse인 항목만 매핑
    const entries = (data.results as unknown[])
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

/**
 * Notion 페이지의 본문 블록을 조회합니다 (1단계, 자식 블록의 자식은 재귀 조회하지 않음)
 * @param pageId - Notion 페이지(프로젝트) ID
 * @returns BlockObjectResponse 배열 (실패 시 빈 배열 — graceful degrade)
 */
export async function getProjectBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  try {
    const blocks: BlockObjectResponse[] = []
    let cursor: string | undefined

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      })

      blocks.push(
        ...response.results.filter(
          (b): b is BlockObjectResponse => 'type' in b
        )
      )

      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)

    return blocks
  } catch (error) {
    console.error(`Failed to fetch blocks for page "${pageId}":`, error)
    // 런타임 본문 조회 실패는 빌드 전체를 막지 않음 (graceful degrade)
    // 해당 프로젝트는 히어로/지표/뱃지만 표시되고 본문 섹션만 빈 상태가 됨
    return []
  }
}
