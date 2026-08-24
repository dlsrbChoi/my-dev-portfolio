'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Project } from '@/types/project'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Calendar,
  Briefcase,
  Users,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
} from 'lucide-react'
import { event as gaEvent } from '@/lib/gtag'

interface ProjectModalProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * 프로젝트 카드 클릭 시 뜨는 상세 정보 모달
 * - 이미지 갤러리(images 우선, 없으면 단일 image), 기본 정보, 기술 스택, 주요 기능, 링크를 표시
 * - 상세 페이지(/projects/[slug])가 없으므로 모달이 유일한 상세 뷰 역할을 담당
 */
export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  const t = useTranslations('projects')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = project.images ?? (project.image ? [project.image] : [])

  const periodLabel = project.period
    ? `${project.period.start} ~ ${project.period.end ?? t('inProgress')}`
    : ''

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handleLinkClick = (type: 'github' | 'demo' | 'website') => {
    gaEvent({
      action: 'project_link_click',
      category: 'project',
      label: `${project.slug}_${type}`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {project.role && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                <span>{project.role}</span>
              </div>
            )}
            {periodLabel && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>{periodLabel}</span>
              </div>
            )}
            {project.teamSize !== undefined && project.teamSize > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                <span>{t('personCount', { count: project.teamSize })}</span>
              </div>
            )}
          </div>
        </DialogHeader>

        {/* 이미지 갤러리 */}
        {images.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={images[currentImageIndex]}
                alt={`${project.title} - ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={handlePrevImage}>
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentImageIndex + 1} / {images.length}
                </span>
                <Button variant="outline" size="sm" onClick={handleNextImage}>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* 개요 */}
        <div className="mt-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
            {project.description}
          </h3>
          {project.content && (
            <p className="leading-relaxed whitespace-pre-wrap text-muted-foreground">
              {project.content}
            </p>
          )}
        </div>

        {/* 기술 스택 */}
        {project.technologies.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
                {t('technologies')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 주요 기능 */}
        {project.features && project.features.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
                {t('features')}
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* 링크 */}
        {project.links && (
          <>
            <Separator className="my-4" />
            <div className="flex flex-wrap gap-2">
              {project.links.github && (
                <Button variant="outline" size="sm" nativeButton={false} onClick={() => handleLinkClick('github')} render={
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" />
                }>
                  <GitBranch className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t('github')}
                </Button>
              )}
              {project.links.demo && (
                <Button variant="outline" size="sm" nativeButton={false} onClick={() => handleLinkClick('demo')} render={
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" />
                }>
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t('demo')}
                </Button>
              )}
              {project.links.website && (
                <Button variant="outline" size="sm" nativeButton={false} onClick={() => handleLinkClick('website')} render={
                  <a href={project.links.website} target="_blank" rel="noopener noreferrer" />
                }>
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t('website')}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
