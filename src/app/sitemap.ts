import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { getProjects } from '@/lib/notion'
import { locales, defaultLocale } from '@/i18n/config'

// localePrefix: 'as-needed' 정책과 동일하게 기본 로케일(ko)은 프리픽스 없이, 나머지는 /en 등 프리픽스 부여
function localizedPath(path: string, locale: string): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${prefix}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // 정적 라우트 (로케일별)
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}${localizedPath('', locale)}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: locale === defaultLocale ? 1 : 0.9,
    },
    {
      url: `${baseUrl}${localizedPath('/projects', locale)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ])

  // 동적 프로젝트 라우트 (로케일별)
  let dynamicRoutes: MetadataRoute.Sitemap = []
  try {
    const projects = await getProjects()
    dynamicRoutes = locales.flatMap((locale) =>
      projects.map((project) => ({
        url: `${baseUrl}${localizedPath(`/projects/${project.slug}`, locale)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    )
  } catch (error) {
    console.error('프로젝트 데이터를 조회하는 중 에러 발생:', error)
    // sitemap 생성 자체가 빌드를 막으면 안 되므로, 실패 시 정적 라우트만 반환
  }

  return [...staticRoutes, ...dynamicRoutes]
}
