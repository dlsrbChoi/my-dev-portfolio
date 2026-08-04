// Notion 응답 → App 타입 변환 매퍼 함수

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Project, ExperienceEntry } from '@/types/notion'

/**
 * Notion Project Page를 앱 Project 타입으로 변환
 * @param page - Notion PageObjectResponse
 * @returns 변환된 Project 객체
 */
export function mapNotionProjectToApp(page: PageObjectResponse): Project {
  const props = page.properties as Record<string, unknown>

  // Notion에서 공백이 붙을 수 있으므로 양쪽 다 체크하는 헬퍼
  const getField = (key: string) => (props[key] || props[`${key} `]) as Record<string, unknown> | undefined

  // 각 프로퍼티 타입을 명시적으로 캐스팅하여 strict 모드 준수
  const nameField = getField('Name')
  const nameTitle = nameField && 'title' in nameField ? (nameField as any).title : []

  const slugField = getField('Slug')
  const slugText = slugField && 'rich_text' in slugField ? (slugField as any).rich_text : []

  const summaryField = getField('Summary')
  const summaryText = summaryField && 'rich_text' in summaryField ? (summaryField as any).rich_text : []

  const periodField = getField('Period')
  const periodDate = periodField && 'date' in periodField ? (periodField as any).date : null

  const roleField = getField('Role')
  const roleMultiSelect = roleField && 'multi_select' in roleField ? (roleField as any).multi_select : []

  const techStackField = getField('TechStack')
  const techStackMultiSelect = techStackField && 'multi_select' in techStackField ? (techStackField as any).multi_select : []

  const impactMetricsField = getField('ImpactMetrics')
  const impactMetricsText = impactMetricsField && 'rich_text' in impactMetricsField ? (impactMetricsField as any).rich_text : []

  const coverImageField = getField('CoverImage')
  const coverImageFiles = coverImageField && 'files' in coverImageField ? (coverImageField as any).files : []

  const statusField = getField('Status')
  const statusSelect = statusField && 'select' in statusField ? (statusField as any).select : null

  const displayOrderField = getField('DisplayOrder')
  const displayOrderNumber = displayOrderField && 'number' in displayOrderField ? (displayOrderField as any).number : 0

  const projectTypeField = getField('ProjectType')
  const projectTypeSelect = projectTypeField && 'select' in projectTypeField ? (projectTypeField as any).select : null

  const externalLinkField = getField('ExternalLink')
  const externalLinkUrl = externalLinkField && 'url' in externalLinkField ? (externalLinkField as any).url : null

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
    role: roleMultiSelect.map((m: any) => m.name),
    techStack: techStackMultiSelect.map((m: any) => m.name),
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
  const props = page.properties as Record<string, unknown>

  // Notion에서 공백이 붙을 수 있으므로 양쪽 다 체크하는 헬퍼
  const getField = (key: string) => (props[key] || props[`${key} `]) as Record<string, unknown> | undefined

  const nameField = getField('Name')
  const nameTitle = nameField && 'title' in nameField ? (nameField as any).title : []

  const entryTypeField = getField('EntryType')
  const entryTypeSelect = entryTypeField && 'select' in entryTypeField ? (entryTypeField as any).select : null

  const organizationField = getField('Organization')
  const organizationText = organizationField && 'rich_text' in organizationField ? (organizationField as any).rich_text : []

  const positionField = getField('Position')
  const positionText = positionField && 'rich_text' in positionField ? (positionField as any).rich_text : []

  const periodField = getField('Period')
  const periodDate = periodField && 'date' in periodField ? (periodField as any).date : null

  const descriptionField = getField('Description')
  const descriptionText = descriptionField && 'rich_text' in descriptionField ? (descriptionField as any).rich_text : []

  const displayOrderField = getField('DisplayOrder')
  const displayOrderNumber = displayOrderField && 'number' in displayOrderField ? (displayOrderField as any).number : 0

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
