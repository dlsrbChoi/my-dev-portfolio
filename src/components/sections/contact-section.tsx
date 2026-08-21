'use client'

import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/patterns/section-header'
import { StaggerList, StaggerItem } from '@/components/motion/stagger-list'
import { Mail, GitBranch, Code2, ExternalLink } from 'lucide-react'

export function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-12">
        {/* 제목 */}
        <SectionHeader
          title={t('title')}
          description={t('description')}
        />

        {/* 연락처 카드 - 2열 그리드, 좌측정렬 아이콘박스 구조 */}
        <StaggerList className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 이메일 */}
          <StaggerItem>
            <a href={`mailto:${siteConfig.email}`} className="block">
              <Card className="transition-colors hover:ring-foreground/20">
                <CardContent className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border"
                    aria-hidden="true"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm">{t('emailLabel')}</h3>
                    <p className="text-sm text-muted-foreground truncate">{siteConfig.email}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </CardContent>
              </Card>
            </a>
          </StaggerItem>

          {/* GitHub */}
          <StaggerItem>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="transition-colors hover:ring-foreground/20">
                <CardContent className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border"
                    aria-hidden="true"
                  >
                    <GitBranch className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm">{t('githubLabel')}</h3>
                    <p className="text-sm text-muted-foreground truncate">{t('githubVisit')}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </CardContent>
              </Card>
            </a>
          </StaggerItem>

          {/* 포트폴리오 */}
          <StaggerItem>
            <Card>
              <CardContent className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border"
                  aria-hidden="true"
                >
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm">{t('siteLabel')}</h3>
                  <p className="text-sm text-muted-foreground truncate">{t('siteDescription')}</p>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerList>

        {/* 큰 CTA 버튼 */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="rounded-full px-8"
            nativeButton={false}
            render={
              <a
                href={`mailto:${siteConfig.email}?subject=${t('ctaSubject')}`}
              />
            }
          >
            {t('ctaButton')}
          </Button>
        </div>
      </div>
    </section>
  )
}
