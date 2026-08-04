import { Hero } from '@/components/patterns/hero'

export default function Home() {
  return (
    <Hero
      title="프론트엔드에서 풀스택으로"
      subtitle="UI/UX 구현 능력에서 출발해 공공 프로젝트의 백엔드 로직과 데이터 흐름까지 이해 범위를 넓혀온 성장형 개발자입니다"
      description="인천지갑 앱에서는 서로 다른 언어와 프레임워크를 표준화하며 통합을 리드했고, 전국 지자체 통합주차포털에서는 Vue.js 마이그레이션과 결제 모듈 흐름 제어를 맡았습니다."
      cta={[
        { label: '프로젝트 보기', href: '/projects' },
        { label: '이력서 다운로드', href: '/resume', variant: 'outline' },
      ]}
    />
  )
}
