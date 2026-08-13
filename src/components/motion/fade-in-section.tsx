'use client'

import { motion } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeInSection({ children, delay = 0, className }: FadeInSectionProps) {
  // 서버와 클라이언트 첫 렌더 결과를 일치시켜 하이드레이션 불일치를 방지 (initializeWithValue: false)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    initializeWithValue: false,
  })

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay: delay ? delay / 1000 : 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
