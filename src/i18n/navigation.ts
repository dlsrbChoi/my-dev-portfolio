import { createNavigation } from 'next-intl/navigation'
import { locales, defaultLocale } from './config'

// 로케일 인식 Link / redirect / usePathname / useRouter 헬퍼
// localePrefix: 'as-needed' → 기본 로케일(ko)은 URL에 접두사 없음, en만 /en 접두사
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})
