'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'
import Image from 'next/image'
import type { SideProject } from '@/types/project'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SpotlightCard } from '@/components/common/spotlight-card'
import { SideProjectModal } from '@/components/projects/side-project-modal'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'
import { event as gaEvent } from '@/lib/gtag'

interface SideProjectCardProps {
  project: SideProject
  className?: string
}

export function SideProjectCard({ project, className }: SideProjectCardProps) {
  // 서버와 클라이언트 첫 렌더 결과를 일치시켜 하이드레이션 불일치를 방지 (initializeWithValue: false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    initializeWithValue: false,
  })
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
    gaEvent({ action: 'side_project_modal_open', category: 'project', label: project.slug })
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
            {project.images.length > 0 && (
              <div className="relative h-40 w-full shrink-0 overflow-hidden bg-muted">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                {project.year && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                    <GitBranch className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                    <span className="text-sm font-semibold text-white">{project.year}</span>
                  </div>
                )}
              </div>
            )}

            <CardHeader className="flex-shrink-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-secondary/40">
                    <GitBranch className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base line-clamp-2">{project.title}</CardTitle>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between px-6 pb-6">
              <div className="flex flex-col gap-3">
                {/* 요약 */}
                <p className="text-sm text-foreground/90 line-clamp-2">
                  {project.description}
                </p>

                {/* 기술 스택 태그 */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, idx) => {
                    const isCore = idx === 0
                    const isSub = idx === 1 || idx === 2

                    if (isCore) {
                      return (
                        <Badge
                          key={tech}
                          className="text-xs bg-primary text-primary-foreground border border-primary"
                        >
                          {tech}
                        </Badge>
                      )
                    }

                    if (isSub) {
                      return (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs bg-primary/10 text-primary border-border"
                        >
                          {tech}
                        </Badge>
                      )
                    }

                    return (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    )
                  })}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              {/* 핵심 기능 */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="flex flex-col gap-2 pt-3 border-t border-border">
                  {project.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-primary text-lg leading-none">•</span>
                      <p className="text-xs text-foreground/80 leading-relaxed flex-1">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </SpotlightCard>
      </motion.div>

      <SideProjectModal project={project} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
