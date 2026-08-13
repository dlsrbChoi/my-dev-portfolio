'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const LiquidBackground = dynamic(() => import('@/components/effects/liquid-background').then(mod => ({ default: mod.LiquidBackground })), {
  ssr: false,
})

export function HeroSection() {
  return (
    <section className="scroll-mt-28 py-20 sm:py-28 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* 좌측: 텍스트 */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-lg text-primary font-semibold">안녕하세요,</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              프론트엔드에서<br />풀스택으로
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            UI/UX 구현에서 출발해 공공 프로젝트의 백엔드 로직까지 이해 범위를 넓혀온 성장형 개발자입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="rounded-full"
              nativeButton={false}
              render={<Link href="/#projects" />}
            >
              프로젝트 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              nativeButton={false}
              render={<Link href="/#resume" />}
            >
              이력서 보기
            </Button>
          </div>
        </div>

        {/* 우측: 프로필 사진 */}
        <div className="flex items-center justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            {/* 배경 글로우 (LiquidBackground WebGL) */}
            <LiquidBackground className="absolute inset-0 rounded-full blur-3xl" />

            {/* 원형 프레임 + 이미지 */}
            <Image
              src="/igchoi-selfie.jpg"
              alt="이그쵸이 프로필 사진"
              fill
              priority
              className="rounded-full object-cover border-2 border-primary/50"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
