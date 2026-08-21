// Google Analytics 4 (GA4) 이벤트 추적 유틸리티
// 측정 ID는 환경변수(NEXT_PUBLIC_GA_ID)로 주입되며, 미설정 시 추적 스크립트가 로드되지 않음
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

/** 현재 GA 추적이 활성화되어 있는지 여부 (측정 ID 존재 + 브라우저 환경) */
export const isGAEnabled = (): boolean =>
  typeof window !== 'undefined' && Boolean(GA_TRACKING_ID)

/** SPA 라우트 변경 시 페이지뷰를 수동으로 전송 */
export const pageview = (url: string) => {
  if (!isGAEnabled() || !GA_TRACKING_ID) return
  window.gtag('config', GA_TRACKING_ID, { page_path: url })
}

interface GtagEvent {
  action: string
  category: string
  label?: string
  value?: number
}

/** 커스텀 이벤트 전송 (예: 프로젝트 모달 열람, 외부 링크 클릭 등) */
export const event = ({ action, category, label, value }: GtagEvent) => {
  if (!isGAEnabled()) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
