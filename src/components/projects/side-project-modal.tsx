'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { SideProject } from '@/types/project'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, ChevronRight, GitBranch, ExternalLink } from 'lucide-react'
import { event as gaEvent } from '@/lib/gtag'

interface SideProjectModalProps {
  project: SideProject
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * 사이드 프로젝트 카드 클릭 시 뜨는 상세 정보 모달
 * - 회사 프로젝트 모달과 달리 기간/팀/역할이 없고, "구현한 기능" + "학습한 내용" 섹션을 포함
 */
export function SideProjectModal({ project, open, onOpenChange }: SideProjectModalProps) {
  const t = useTranslations('projects')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = project.images

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handleLinkClick = (type: 'github' | 'demo') => {
    gaEvent({
      action: 'side_project_link_click',
      category: 'project',
      label: `${project.slug}_${type}`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
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
                      onClick={() => setCurrentImageIndex(index)}
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
        </div>

        {/* 주요 기능 */}
        {project.features.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <span className="h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
                {t('features')}
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-base text-muted-foreground">{feature}</span>
                  </li>
                ))}
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
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
