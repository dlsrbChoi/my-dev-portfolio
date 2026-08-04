import type { Project } from '@/types/notion'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/layout/container'

interface ProjectHeroProps {
  project: Project
}

function formatPeriod(period: Project['period']): string {
  const fmt = (d: string) => {
    if (!d) return ''
    const [y, m] = d.split('-')
    return `${y}. ${m}`
  }
  const start = fmt(period.start)
  const end = period.end ? fmt(period.end) : '진행중'
  return start ? `${start} ~ ${end}` : ''
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const periodLabel = formatPeriod(project.period)

  return (
    <section className="border-b border-border">
      {project.coverImage && (
        <div className="w-full h-56 sm:h-72 lg:h-80 overflow-hidden bg-muted">
          <img
            src={project.coverImage.url}
            alt={project.coverImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <Container className="py-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {project.name}
        </h1>
        {periodLabel && (
          <p className="mt-2 text-sm text-muted-foreground">{periodLabel}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.role.map((r) => (
            <Badge key={r} variant="outline">
              {r}
            </Badge>
          ))}
        </div>
      </Container>
    </section>
  )
}
