'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Project, ProjectFeature } from '@/types/project'
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
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const images = project.images ?? (project.image ? [project.image] : [])

  const periodLabel = project.period
    ? `${project.period.start} ~ ${project.period.end ?? t('inProgress')}`
    : ''

  // 자동 슬라이드 (5초 간격)
  useEffect(() => {
    if (!isAutoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length, isAutoPlay])

  const handlePrevImage = () => {
    setIsAutoPlay(false)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const handleNextImage = () => {
    setIsAutoPlay(false)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsAutoPlay(true), 5000)
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto sm:max-w-4xl">
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
          <div className="mt-4">
            <div className="relative w-full overflow-hidden rounded-lg bg-muted" style={{ aspectRatio: '16 / 10' }}>
              <Image
                src={images[currentImageIndex]}
                alt={`${project.title} - ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
              />

              {/* 이미지 네비게이션 버튼 - 중앙 좌우에 위치 */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition-all hover:bg-black/70"
                    aria-label="이전 이미지"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition-all hover:bg-black/70"
                    aria-label="다음 이미지"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* 슬라이드 표시기 */}
            {images.length > 1 && (
              <div className="mt-3 flex items-center justify-center">
                <div className="flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlay(false)
                        setCurrentImageIndex(index)
                        setTimeout(() => setIsAutoPlay(true), 5000)
                      }}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-primary w-6' : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                      }`}
                      aria-label={`${index + 1}번 이미지로 이동`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 개요 */}
        <div className="mt-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
            {t('overview')}
          </h3>
          <p className="leading-relaxed text-foreground font-medium mb-2 text-base">
            {project.description}
          </p>
          {project.content && (
            <p className="leading-relaxed whitespace-pre-wrap text-muted-foreground text-base">
              {project.content}
            </p>
          )}
        </div>

        {/* 주요 작업 */}
        {project.features && project.features.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
                {t('mainTasks')}
              </h3>
              <ul className="space-y-4">
                {project.features.map((feature, index) => {
                  // feature는 string 또는 ProjectFeature 객체
                  const isStringFeature = typeof feature === 'string'
                  const title: string = isStringFeature ? feature : feature.title
                  const descriptions: string[] = !isStringFeature && feature.descriptions ? feature.descriptions : []

                  return (
                    <li key={`${title}-${index}`} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-base">{title}</p>
                        {descriptions.length > 0 && (
                          <ul className="mt-2 space-y-2">
                            {descriptions.map((desc, descIndex) => (
                              <li key={`${title}-${descIndex}`} className="text-base text-muted-foreground list-inside list-disc">
                                {desc}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}

        {/* 기술 스택 */}
        {project.technologies.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
                {t('technologies')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-base px-3 py-1.5">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 성과 */}
        {project.achievements && project.achievements.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
                {t('achievements')}
              </h3>
              <ul className="space-y-2">
                {project.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-white text-base">{achievement}</span>
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
