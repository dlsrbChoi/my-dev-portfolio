import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { locales, defaultLocale } from '@/i18n/config'

// localePrefix: 'as-needed' 정책과 동일하게 기본 로케일(ko)은 프리픽스 없이, 나머지는 /en 등 프리픽스 부여
function localizedPath(path: string, locale: string): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${prefix}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // 정적 라우트 (로케일별)
  // 프로젝트/사이드 프로젝트는 홈페이지 내 앵커 섹션(#projects, #sideProjects)이므로 별도 라우트 없음
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}${localizedPath('', locale)}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: locale === defaultLocale ? 1 : 0.9,
    },
  ])

  return staticRoutes
}
