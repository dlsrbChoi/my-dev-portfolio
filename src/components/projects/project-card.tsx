'use client'

import { motion } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types/notion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  // 서버와 클라이언트 첫 렌더 결과를 일치시켜 하이드레이션 불일치를 방지 (initializeWithValue: false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    initializeWithValue: false,
  })

  return (
    <motion.div
      whileHover={!prefersReducedMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card className={cn('flex flex-col overflow-hidden transition-shadow duration-300 hover:ring-foreground/20', className)}>
      {/* 썸네일 이미지 */}
      {project.coverImage && (
        <div className="relative w-full h-48 overflow-hidden bg-muted">
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          {/* 기간 배지 오버레이 (썸네일 좌하단) */}
          {(project.period.start || project.period.end) && (
            <div className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs text-white">
              {project.period.start} ~ {project.period.end}
            </div>
          )}
        </div>
      )}

      <CardHeader>
        {/* 제목 + 우측 화살표 아이콘 */}
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </div>
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
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>

          {/* 주요 성과 지표 불릿 */}
          {project.impactMetrics.length > 0 && (
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
              {project.impactMetrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          )}
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
    </motion.div>
  )
}
