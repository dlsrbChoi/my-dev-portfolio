'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from 'usehooks-ts'
import Image from 'next/image'
import type { Project } from '@/types/project'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SpotlightCard } from '@/components/common/spotlight-card'
import { ProjectModal } from '@/components/projects/project-modal'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { event as gaEvent } from '@/lib/gtag'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const t = useTranslations('projects')
  // 서버와 클라이언트 첫 렌더 결과를 일치시켜 하이드레이션 불일치를 방지 (initializeWithValue: false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    initializeWithValue: false,
  })
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
    gaEvent({ action: 'project_modal_open', category: 'project', label: project.slug })
  }

  return (
    <>
      <motion.div
        whileHover={!prefersReducedMotion ? { y: -4 } : undefined}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <SpotlightCard className="h-full">
          <Card
            className={cn(
              'flex h-full cursor-pointer flex-col overflow-hidden transition-shadow duration-300 hover:ring-foreground/20',
              'min-h-96',
              className
            )}
            onClick={handleOpenModal}
          >
            {/* 썸네일 이미지 */}
            {project.image && (
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                {/* 기간 배지 오버레이 (썸네일 좌하단) */}
                {project.period && (
                  <div className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs text-white">
                    {project.period.start} ~ {project.period.end ?? t('inProgress')}
                  </div>
                )}
              </div>
            )}

            <CardHeader>
              {/* 제목 + 우측 화살표 아이콘 */}
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              </div>
              {/* 역할 뱃지 */}
              {project.role && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {project.role}
                  </Badge>
                </div>
              )}
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between">
              <div className="mb-4 space-y-4">
                {/* 요약 */}
                <p className="text-sm text-foreground/90">
                  {project.summary ?? project.description}
                </p>

                {/* 기술 스택 태그 (최대 3개) */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                {/* 주요 기능 불릿 */}
                {project.features && project.features.length > 0 && (
                  <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                    {project.features.slice(0, 2).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </SpotlightCard>
      </motion.div>

      <ProjectModal project={project} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
