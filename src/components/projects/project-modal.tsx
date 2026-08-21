'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Project } from '@/types/notion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Briefcase, TrendingUp, ArrowRight, ExternalLink } from 'lucide-react'
import { event as gaEvent } from '@/lib/gtag'

interface ProjectModalProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatPeriod(period: Project['period']): string {
  if (!period.start) return ''
  const end = period.end ? period.end : '진행중'
  return `${period.start} ~ ${end}`
}

/**
 * 프로젝트 카드 클릭 시 뜨는 빠른 미리보기 모달
 * - Notion 데이터 구조상 다중 이미지 갤러리가 없어 커버 이미지 1장만 표시
 * - 전체 노션 블록 콘텐츠(본문, 이미지 등)는 /projects/[slug] 상세 페이지가 담당 (역할 분리)
 */
export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  const periodLabel = formatPeriod(project.period)

  const handleDetailClick = () => {
    gaEvent({ action: 'project_detail_view', category: 'project', label: project.slug })
  }

  const handleExternalLinkClick = () => {
    gaEvent({ action: 'project_external_link_click', category: 'project', label: project.slug })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
            {project.role.length > 0 && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                <span>{project.role.join(', ')}</span>
              </div>
            )}
            {periodLabel && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>{periodLabel}</span>
              </div>
            )}
          </div>
        </DialogHeader>

        {/* 커버 이미지 */}
        {project.coverImage && (
          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={project.coverImage.url}
              alt={project.coverImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        )}

        {/* 요약 */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full" aria-hidden="true" />
            프로젝트 개요
          </h3>
          <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
        </div>

        {/* 핵심 성과 */}
        {project.impactMetrics.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" aria-hidden="true" />
                핵심 성과
              </h3>
              <ul className="space-y-2">
                {project.impactMetrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-3 text-muted-foreground">
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* 기술 스택 */}
        {project.techStack.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" aria-hidden="true" />
                기술 스택
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator className="my-4" />

        {/* 액션 버튼 */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {project.externalLink && (
            <Button
              variant="outline"
              nativeButton={false}
              onClick={handleExternalLinkClick}
              render={
                <Link href={project.externalLink} target="_blank" rel="noopener noreferrer" />
              }
            >
              프로젝트 링크
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button
            nativeButton={false}
            onClick={handleDetailClick}
            render={<Link href={`/projects/${project.slug}`} />}
          >
            전체 상세 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
