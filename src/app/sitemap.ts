import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { getProjects } from '@/lib/notion'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // 정적 라우트
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // 동적 프로젝트 라우트
  let dynamicRoutes: MetadataRoute.Sitemap = []
  try {
    const projects = await getProjects()
    dynamicRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('프로젝트 데이터를 조회하는 중 에러 발생:', error)
    // sitemap 생성 자체가 빌드를 막으면 안 되므로, 실패 시 정적 라우트만 반환
  }

  return [...staticRoutes, ...dynamicRoutes]
}
