import { getTranslations } from 'next-intl/server'
import { getProjects } from '@/lib/notion'
import type { Project } from '@/types/notion'
import { groupProjectsByType } from '@/lib/project-utils'
import { ProjectCard } from '@/components/projects/project-card'
import { EmptyState } from '@/components/patterns/empty-state'
import { SectionHeader } from '@/components/patterns/section-header'
import { StaggerList, StaggerItem } from '@/components/motion/stagger-list'
import { Briefcase } from 'lucide-react'

export async function ProjectsSection() {
  const t = await getTranslations('projects')
  let projects: Project[] = []
  try {
    projects = await getProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }

  const { main, side } = groupProjectsByType(projects)
  const hasAnyProjects = main.length > 0 || side.length > 0

  return (
    <section id="projects" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-8">
        {/* 제목 */}
        <SectionHeader title={t('title')} description={t('description')} />

        {/* 콘텐츠 */}
        {!hasAnyProjects ? (
          <EmptyState
            icon={Briefcase}
            title={t('emptyTitle')}
            description={t('emptyDescription')}
          />
        ) : (
          <div className="space-y-12">
            {/* 주요 프로젝트 그룹 */}
            {main.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">{t('mainTitle')}</h3>
                  <p className="text-base text-muted-foreground">{t('mainDescription')}</p>
                </div>
                <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {main.map((project) => (
                    <StaggerItem key={project.id}>
                      <ProjectCard project={project} />
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>
            )}

            {/* 사이드 프로젝트 그룹 */}
            {side.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">{t('sideTitle')}</h3>
                  <p className="text-base text-muted-foreground">{t('sideDescription')}</p>
                </div>
                <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {side.map((project) => (
                    <StaggerItem key={project.id}>
                      <ProjectCard project={project} />
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
