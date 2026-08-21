import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/i18n/config'

// Next.js 16: middleware 파일 컨벤션이 proxy로 대체됨 (기능은 동일)
export const proxy = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

export const config = {
  // api, _next, 정적 파일 경로는 proxy 제외
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
