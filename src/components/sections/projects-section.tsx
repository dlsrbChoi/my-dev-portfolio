import Link from 'next/link'
import { getProjects } from '@/lib/notion'
import type { Project } from '@/types/notion'
import { ProjectCard } from '@/components/projects/project-card'
import { EmptyState } from '@/components/patterns/empty-state'
import { Button } from '@/components/ui/button'
import { Briefcase, ArrowRight } from 'lucide-react'

const PROJECTS_LIMIT = 6

export async function ProjectsSection() {
  let projects: Project[] = []
  try {
    projects = await getProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }

  const displayedProjects = projects.slice(0, PROJECTS_LIMIT)
  const hasMoreProjects = projects.length > PROJECTS_LIMIT

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
        {displayedProjects.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="프로젝트가 없습니다"
            description="곧 프로젝트가 추가될 예정입니다"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* 전체 보기 버튼 */}
            {hasMoreProjects && (
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                  nativeButton={false}
                  render={<Link href="/projects" />}
                >
                  전체 프로젝트 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
