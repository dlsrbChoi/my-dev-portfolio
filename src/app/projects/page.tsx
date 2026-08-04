import { getProjects } from '@/lib/notion'
import { PageHeader } from '@/components/patterns/page-header'
import { ProjectCard } from '@/components/projects/project-card'
import { EmptyState } from '@/components/patterns/empty-state'
import { Briefcase } from 'lucide-react'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <PageHeader
        title="프로젝트"
        description="다양한 규모와 기술 스택의 프로젝트 경험을 소개합니다"
      />

      <div className="py-8">
        {projects.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="프로젝트가 없습니다"
            description="곧 프로젝트가 추가될 예정입니다"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
