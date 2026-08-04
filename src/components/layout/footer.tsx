import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-8">
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-foreground">사이트</h3>
            <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                홈
              </Link>
              <Link href="/#about" className="block hover:text-foreground transition-colors">
                소개
              </Link>
              <Link href="/#projects" className="block hover:text-foreground transition-colors">
                프로젝트
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">연락처</h3>
            <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a href="mailto:awdzx456@naver.com" className="hover:text-foreground transition-colors">
                이메일
              </a>
              <a href="https://github.com/dlsrbChoi" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">
                GitHub
              </a>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">이력서</h3>
            <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
              <Link href="/#resume" className="hover:text-foreground transition-colors">
                보기
              </Link>
            </nav>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2026 최인규. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
