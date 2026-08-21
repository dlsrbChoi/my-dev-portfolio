'use client'

import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** 스포트라이트 배경색 (CSS color 값). 미지정 시 --spotlight-color 변수 또는 기본값 사용 */
  spotlightColor?: string
}

/**
 * 마우스 위치를 추적해 radial-gradient 스포트라이트 효과를 렌더링하는 카드 래퍼
 * - 자식 요소를 그대로 감싸고, 마우스 진입 시에만 오버레이를 표시
 * - 성능을 위해 상태 업데이트는 style 직접 반영(리렌더 최소화)이 아닌 React state로 처리
 */
export function SpotlightCard({ children, className = '', spotlightColor }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: '50%', y: '50%' })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPosition({ x: `${x}px`, y: `${y}px` })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative isolate overflow-hidden rounded-xl ${className}`}
    >
      {/* 실제 콘텐츠 (스포트라이트 오버레이보다 위에 위치) */}
      <div className="relative z-[1] h-full [&>*]:h-full">{children}</div>

      {/* 마우스를 따라다니는 스포트라이트 오버레이 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x} ${position.y}, ${
            spotlightColor || 'var(--spotlight-color, oklch(0.7 0.1 280 / 0.15))'
          }, transparent 40%)`,
        }}
      />
    </div>
  )
}
