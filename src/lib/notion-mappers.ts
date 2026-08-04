// Notion 응답 → App 타입 변환 매퍼 함수

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Project, ExperienceEntry } from '@/types/notion'

/**
 * Notion Project Page를 앱 Project 타입으로 변환
 * @param page - Notion PageObjectResponse
 * @returns 변환된 Project 객체
 */
export function mapNotionProjectToApp(page: PageObjectResponse): Project {
  const props = page.properties

  // 각 프로퍼티 타입을 명시적으로 캐스팅하여 strict 모드 준수
  const nameTitle = 'title' in props.Name ? props.Name.title : []
  const slugText = 'rich_text' in props.Slug ? props.Slug.rich_text : []
  const summaryText = 'rich_text' in props.Summary ? props.Summary.rich_text : []
  const periodDate = 'date' in props.Period ? props.Period.date : null
  const roleMultiSelect = 'multi_select' in props.Role ? props.Role.multi_select : []
  const techStackMultiSelect = 'multi_select' in props.TechStack ? props.TechStack.multi_select : []
  const impactMetricsText = 'rich_text' in props.ImpactMetrics ? props.ImpactMetrics.rich_text : []
  const coverImageFiles = 'files' in props.CoverImage ? props.CoverImage.files : []
  const statusSelect = 'select' in props.Status ? props.Status.select : null
  const displayOrderNumber = 'number' in props.DisplayOrder ? props.DisplayOrder.number : 0
  const projectTypeSelect = 'select' in props.ProjectType ? props.ProjectType.select : null
  const externalLinkUrl = 'url' in props.ExternalLink ? props.ExternalLink.url : null

  // 프로젝트 상태 (status)
  const status = statusSelect?.name?.toLowerCase() === 'published' ? 'published' : 'draft'

  // CoverImage 처리
  let coverImage: Project['coverImage'] | undefined
  if (coverImageFiles && coverImageFiles.length > 0) {
    const file = coverImageFiles[0]
    const altText = nameTitle[0]?.plain_text || 'project image'
    if ('file' in file && file.file?.url) {
      coverImage = {
        url: file.file.url,
        alt: altText,
      }
    } else if ('external' in file && file.external?.url) {
      coverImage = {
        url: file.external.url,
        alt: altText,
      }
    }
  }

  return {
    id: page.id,
    name: nameTitle[0]?.plain_text || '',
    slug: slugText[0]?.plain_text || '',
    summary: summaryText[0]?.plain_text || '',
    period: {
      start: periodDate?.start || '',
      end: periodDate?.end || '',
    },
    role: roleMultiSelect.map((m) => m.name),
    techStack: techStackMultiSelect.map((m) => m.name),
    impactMetrics:
      impactMetricsText[0]?.plain_text?.split('\n').filter(Boolean) || [],
    coverImage,
    status,
    displayOrder: displayOrderNumber || 0,
    projectType: projectTypeSelect?.name || '',
    externalLink: externalLinkUrl || undefined,
  }
}

/**
 * Notion Experience Page를 앱 ExperienceEntry 타입으로 변환
 * @param page - Notion PageObjectResponse
 * @returns 변환된 ExperienceEntry 객체
 */
export function mapNotionExperienceToApp(page: PageObjectResponse): ExperienceEntry {
  const props = page.properties

  const nameTitle = 'title' in props.Name ? props.Name.title : []
  const entryTypeSelect = 'select' in props.EntryType ? props.EntryType.select : null
  const organizationText = 'rich_text' in props.Organization ? props.Organization.rich_text : []
  const positionText = 'rich_text' in props.Position ? props.Position.rich_text : []
  const periodDate = 'date' in props.Period ? props.Period.date : null
  const descriptionText = 'rich_text' in props.Description ? props.Description.rich_text : []
  const displayOrderNumber = 'number' in props.DisplayOrder ? props.DisplayOrder.number : 0

  const entryType = entryTypeSelect?.name?.toLowerCase() as
    | 'experience'
    | 'education'
    | 'certificate' || 'experience'

  return {
    id: page.id,
    name: nameTitle[0]?.plain_text || '',
    entryType,
    organization: organizationText[0]?.plain_text || '',
    position: positionText[0]?.plain_text || '',
    period: {
      start: periodDate?.start || '',
      end: periodDate?.end || '',
    },
    description: descriptionText[0]?.plain_text || '',
    displayOrder: displayOrderNumber || 0,
  }
}
