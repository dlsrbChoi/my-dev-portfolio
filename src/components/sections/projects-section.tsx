import { getProjects } from '@/lib/notion'
import type { Project } from '@/types/notion'
import { groupProjectsByType } from '@/lib/project-utils'
import { ProjectCard } from '@/components/projects/project-card'
import { EmptyState } from '@/components/patterns/empty-state'
import { Briefcase } from 'lucide-react'

export async function ProjectsSection() {
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
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">프로젝트</h2>
          <p className="text-lg text-muted-foreground">
            다양한 규모와 기술 스택의 프로젝트 경험
          </p>
        </div>

        {/* 콘텐츠 */}
        {!hasAnyProjects ? (
          <EmptyState
            icon={Briefcase}
            title="프로젝트가 없습니다"
            description="곧 프로젝트가 추가될 예정입니다"
          />
        ) : (
          <div className="space-y-12">
            {/* 주요 프로젝트 그룹 */}
            {main.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">주요 프로젝트</h3>
                  <p className="text-base text-muted-foreground">핵심 프로젝트 경험</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {main.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* 사이드 프로젝트 그룹 */}
            {side.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">사이드 프로젝트</h3>
                  <p className="text-base text-muted-foreground">개인 프로젝트 및 실험</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {side.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
