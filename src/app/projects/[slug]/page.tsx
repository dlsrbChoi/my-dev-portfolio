import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjects, getProjectBySlug, getProjectBlocks } from '@/lib/notion'
import { Container } from '@/components/layout/container'
import { ProjectHero } from '@/components/projects/project-hero'
import { ImpactMetrics } from '@/components/projects/impact-metrics'
import { TechStackBadges } from '@/components/projects/tech-stack-badges'
import { NotionRenderer } from '@/components/projects/notion-renderer'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects.map((p) => ({ slug: p.slug }))
  } catch (error) {
    console.error('Failed to generate static params for projects:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: '프로젝트를 찾을 수 없습니다',
      description: '요청하신 프로젝트 페이지가 없습니다.',
    }
  }

  return {
    title: project.name,
    description: project.summary || project.name,
    openGraph: {
      title: `${project.name} | ${siteConfig.name} 포트폴리오`,
      description: project.summary || project.name,
      images: project.coverImage
        ? [
            {
              url: project.coverImage.url,
              width: 1200,
              height: 630,
              alt: project.coverImage.alt,
            },
          ]
        : [],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const blocks = await getProjectBlocks(project.id)

  return (
    <>
      <ProjectHero project={project} />
      <Container className="py-8 space-y-10">
        <ImpactMetrics metrics={project.impactMetrics} />
        <TechStackBadges stack={project.techStack} />
        {blocks.length > 0 && (
          <>
            <Separator />
            <NotionRenderer blocks={blocks} />
          </>
        )}
        {project.externalLink && (
          <>
            <Separator />
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <Link
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              프로젝트 링크 바로가기
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </Container>
    </>
  )
}
