import Link from 'next/link'
import type { Project } from '@/types/notion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card className={cn('flex flex-col overflow-hidden', className)}>
      {/* 썸네일 이미지 */}
      {project.coverImage && (
        <div className="w-full h-48 overflow-hidden bg-muted">
          <img
            src={project.coverImage.url}
            alt={project.coverImage.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-lg">{project.name}</CardTitle>
        {/* 역할 뱃지 */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.role.map((r) => (
            <Badge key={r} variant="outline" className="text-xs">
              {r}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 justify-between">
        {/* 요약 */}
        <div className="space-y-4 mb-4">
          <p className="text-sm text-foreground/90">{project.summary}</p>

          {/* 기술 스택 태그 (최대 3개) */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* 상세 보기 버튼 */}
        <Button
          size="sm"
          className="w-full"
          nativeButton={false}
          render={<Link href={`/projects/${project.slug}`} />}
        >
          상세 보기
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
