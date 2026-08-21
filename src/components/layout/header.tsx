'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { navItems } from '@/lib/nav'

export function Header() {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="mx-auto max-w-7xl px-6">
        {/* 피약 형태의 네비게이션 바: 둥근 배경, 반투명, 블러 효과 */}
        <div className="rounded-full border border-white/10 bg-white/5 dark:bg-white/8 backdrop-blur-xl px-6 py-3">
          <div className="flex items-center justify-between">
            {/* 좌측: 로고 */}
            <Link href="/" className="font-bold text-sm md:text-base whitespace-nowrap">
              최인규
            </Link>

            {/* 중앙: 네비게이션 메뉴 - 데스크톱만 표시 */}
            <nav className="hidden items-center gap-8 md:flex flex-1 justify-center px-8">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {t(item.labelKey)}
                    {/* 호버 시 밑줄 애니메이션 */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {t(item.labelKey)}
                    {/* 호버 시 밑줄 애니메이션 */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              ))}
            </nav>

            {/* 우측: 액션 (언어전환, 테마토글, 모바일메뉴) */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
