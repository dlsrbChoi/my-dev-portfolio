'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { buttonVariants } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const GitHubIcon = () => (
  <svg
    className="h-4 w-4 fill-current"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LiquidBackground = dynamic(() => import('@/components/effects/liquid-background').then(mod => ({ default: mod.LiquidBackground })), {
  ssr: false,
})

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="scroll-mt-28 py-20 sm:py-28 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* 좌측: 텍스트 */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-lg text-primary font-semibold">{t('greeting')}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight whitespace-nowrap">
              {t('titleLine1')} {t('titleLine2')}
            </h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.rich('description', {
              highlight: (chunks) => <span className="font-bold text-primary">{chunks}</span>,
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/resume.pdf"
              download="이력서, 경력기술서_최인규.pdf"
              className={cn(buttonVariants({ size: 'lg', variant: 'default' }), 'rounded-full')}
            >
              <Download className="mr-2 h-4 w-4" />
              {t('resumeDownload')}
            </a>
            <a
              href="https://github.com/dlsrbChoi"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'rounded-full')}
            >
              <GitHubIcon />
              {t('githubLink')}
            </a>
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
              alt={t('profileAlt')}
              fill
              priority
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 320px"
              className="rounded-full object-cover border-2 border-primary/50"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
