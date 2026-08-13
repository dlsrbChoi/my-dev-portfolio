'use client'

import { motion } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'
import { useEffect, useState } from 'react'

interface SectionItem {
  id: string
  label: string
}

const sections: SectionItem[] = [
  { id: 'about', label: '소개' },
  { id: 'projects', label: '프로젝트' },
  { id: 'resume', label: '이력서' },
  { id: 'contact', label: '연락처' },
]

export function SectionNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  // 서버와 클라이언트 첫 렌더 결과를 일치시켜 하이드레이션 불일치를 방지 (initializeWithValue: false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    initializeWithValue: false,
  })

  useEffect(() => {
    // 각 섹션 활성화 상태 추적
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        // 현재 뷰포트에 보이는 섹션들 중 가장 상단에 있는 것을 선택
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // boundingClientRect.top이 가장 작은(뷰포트 최상단에 가장 가까운) 것을 선택
          // 음수인 경우(위로 지나간 경우)도 포함: 0에 가장 가까운 값
          const topEntry = visibleEntries.reduce((top, current) => {
            const topDist = Math.abs(top.boundingClientRect.top)
            const currentDist = Math.abs(current.boundingClientRect.top)
            return currentDist < topDist ? current : top
          })
          setActiveSection(topEntry.target.id)
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -60% 0px',
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        sectionObserver.observe(element)
      }
    })

    return () => {
      sectionObserver.disconnect()
    }
  }, [])

  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((section) => (
        <div key={section.id} className="group relative flex items-center justify-end gap-3">
          {/* 라벨 텍스트 (hover 시에만 표시) */}
          <span className="text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pr-2">
            {section.label}
          </span>

          {/* 도트 버튼 */}
          <motion.button
            onClick={() => handleSectionClick(section.id)}
            aria-label={section.label}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scale: activeSection === section.id ? 1.2 : 1,
                    opacity: activeSection === section.id ? 1 : 0.6,
                  }
            }
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'w-3.5 h-3.5 bg-primary border-2 border-primary'
                : 'w-2.5 h-2.5 border-2 border-muted-foreground/60 hover:border-foreground/60'
            }`}
          />
        </div>
      ))}
    </div>
  )
}
