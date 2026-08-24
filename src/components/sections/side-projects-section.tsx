import { getTranslations } from 'next-intl/server'
import { sideProjects } from '@/lib/side-projects-data'
import { SideProjectCard } from '@/components/projects/side-project-card'
import { EmptyState } from '@/components/patterns/empty-state'
import { SectionHeader } from '@/components/patterns/section-header'
import { StaggerList, StaggerItem } from '@/components/motion/stagger-list'
import { Code2 } from 'lucide-react'

export async function SideProjectsSection() {
  const t = await getTranslations('projects')

  return (
    <section id="sideProjects" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-8">
        {/* 제목 */}
        <SectionHeader title={t('sideTitle')} description={t('sideDescription')} />

        {/* 콘텐츠 */}
        {sideProjects.length === 0 ? (
          <EmptyState
            icon={Code2}
            title={t('emptyTitle')}
            description={t('emptyDescription')}
          />
        ) : (
          <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sideProjects.map((project) => (
              <StaggerItem key={project.id}>
                <SideProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerList>
        )}
      </div>
    </section>
  )
}
