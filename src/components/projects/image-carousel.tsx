'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageCarouselProps {
  images: string[]
  alt: string
  autoPlayInterval?: number
  className?: string
}

export function ImageCarousel({
  images,
  alt,
  autoPlayInterval = 3000,
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // 자동 슬라이드
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [images.length, autoPlayInterval, isAutoPlay])

  const goToPrevious = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    // 5초 후 자동 재생 재개
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const goToNext = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    // 5초 후 자동 재생 재개
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false)
    setCurrentIndex(index)
    // 5초 후 자동 재생 재개
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  if (images.length === 0) return null

  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-muted', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* 네비게이션 버튼 - 이미지가 2개 이상일 때만 표시 */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white transition-all hover:bg-black/70"
            aria-label="이전 이미지"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white transition-all hover:bg-black/70"
            aria-label="다음 이미지"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* 슬라이드 표시기 (하단 점) */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all',
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                )}
                aria-label={`${index + 1}번 슬라이드로 이동`}
              />
            ))}
          </div>

          {/* 이미지 카운터 */}
          <div className="absolute top-2 right-2 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}
