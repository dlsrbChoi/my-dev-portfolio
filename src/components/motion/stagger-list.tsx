'use client'

import { motion, type Variants } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'

interface StaggerListProps {
  children: React.ReactNode
  className?: string
  /** 자식 요소 사이의 순차 진입 간격(초) */
  staggerDelay?: number
}

/**
 * 자식 요소(StaggerItem)를 순차적으로 페이드인시키는 컨테이너 컴포넌트
 * 카드 그리드, 타임라인 아이템 등 반복되는 요소 목록에 사용
 */
export function StaggerList({ children, className, staggerDelay = 0.1 }: StaggerListProps) {
  // 서버와 클라이언트 첫 렌더 결과를 일치시켜 하이드레이션 불일치를 방지 (initializeWithValue: false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    initializeWithValue: false,
  })

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

// 개별 아이템의 진입 변형(부모의 staggerChildren에 의해 순차 트리거됨)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/**
 * StaggerList의 자식으로 사용하는 개별 아이템 래퍼
 * StaggerList가 reduced-motion일 때 순수 div로 대체되지만, 방어적으로 자체 감지도 수행
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  // 서버와 클라이언트 첫 렌더 결과를 일치시켜 하이드레이션 불일치를 방지 (initializeWithValue: false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    initializeWithValue: false,
  })

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

// 외부에서 커스텀 motion 조합이 필요할 때를 위해 variants도 export
export { itemVariants }
