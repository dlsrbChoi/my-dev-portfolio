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

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
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
