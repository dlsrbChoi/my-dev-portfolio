import { siteConfig } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, GitBranch, Code2 } from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-12">
        {/* 제목 */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">연락처</h2>
          <p className="text-lg text-muted-foreground">
            함께 일할 수 있는 기회를 항상 열어두고 있습니다
          </p>
        </div>

        {/* 연락처 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 이메일 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">이메일</h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-primary hover:underline break-all"
              >
                {siteConfig.email}
              </a>
            </CardContent>
          </Card>

          {/* GitHub */}
          <Card>
            <CardContent className="pt-6 text-center">
              <GitBranch className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">GitHub</h3>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                프로필 방문
              </a>
            </CardContent>
          </Card>

          {/* 포트폴리오 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Code2 className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">이 사이트</h3>
              <p className="text-sm text-muted-foreground">
                Next.js + React + TypeScript
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 큰 CTA 버튼 */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="rounded-full px-8"
            nativeButton={false}
            render={
              <a
                href={`mailto:${siteConfig.email}?subject=프로젝트 협업 제안`}
              />
            }
          >
            이메일로 연락하기
          </Button>
        </div>
      </div>
    </section>
  )
}
