'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { GA_TRACKING_ID, pageview } from '@/lib/gtag'

/**
 * Google Analytics 4 스크립트 로더 + SPA 라우트 변경 시 pageview 자동 전송
 * - NEXT_PUBLIC_GA_ID가 설정되지 않으면 아무것도 렌더링하지 않음 (로컬/프리뷰 환경에서 추적 방지)
 * - next/script의 afterInteractive 전략: 하이드레이션 이후 로드되어 초기 렌더링을 막지 않음
 */
export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_TRACKING_ID) return
    const url = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname
    pageview(url)
  }, [pathname, searchParams])

  if (!GA_TRACKING_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
          window.gtag = gtag;
        `}
      </Script>
    </>
  )
}
