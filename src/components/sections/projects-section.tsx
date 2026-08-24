import { getTranslations } from 'next-intl/server'
import { projects } from '@/lib/projects-data'
import { ProjectCard } from '@/components/projects/project-card'
import { EmptyState } from '@/components/patterns/empty-state'
import { SectionHeader } from '@/components/patterns/section-header'
import { StaggerList, StaggerItem } from '@/components/motion/stagger-list'
import { Briefcase } from 'lucide-react'

export async function ProjectsSection() {
  const t = await getTranslations('projects')

  return (
    <section id="projects" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-8">
        {/* 제목 */}
        <SectionHeader title={t('mainTitle')} description={t('mainDescription')} />

        {/* 콘텐츠 */}
        {projects.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title={t('emptyTitle')}
            description={t('emptyDescription')}
          />
        ) : (
          <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerList>
        )}
      </div>
    </section>
  )
}
