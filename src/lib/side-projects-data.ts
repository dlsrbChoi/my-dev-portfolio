// 정적 사이드 프로젝트(개인 프로젝트) 데이터 정의
import type { SideProject } from '@/types/project'

export const sideProjects: SideProject[] = [
  {
    id: 'portfolio-website',
    slug: 'portfolio-website',
    title: '개발자 포트폴리오 웹사이트',
    description:
      'Next.js 16 App Router 기반 개인 포트폴리오로, 다국어(한/영) 및 다크모드를 지원하며 GA 이벤트 기반 사용자 행동 분석을 구현했습니다.',
    technologies: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Playwright MCP', 'shadcn/ui', 'Framer Motion', 'next-intl', 'Vercel'],
    images: ['/images/side_projects/sideProject-1-main.png'],
    year: 2026,
    highlights: [
      'App Router 기반 라우팅/레이아웃 설계 및 SSR/ISR 최적화',
      'shadcn/ui(base-nova) 컴포넌트 시스템 구축 및 CVA 활용',
    ],
    features: [
      'App Router 기반 라우팅/레이아웃 설계 및 SSR/ISR 최적화',
      'shadcn/ui(base-nova) 컴포넌트 시스템 구축 및 CVA 활용',
      'next-intl로 한/영 다국어 라우팅 및 middleware 처리',
      'next-themes를 통한 다크모드/라이트모드 지원',
      'Framer Motion으로 페이지 전환 애니메이션 구현',
      'GA4 커스텀 이벤트(프로젝트 카드 클릭, 링크 클릭 등) 트래킹',
    ],
    learnings: [
      'Next.js 16의 params Promise 패턴 및 generateStaticParams 활용',
      '다국어 라우팅 미들웨어 설계 및 구현 경험',
      '컴포넌트 재사용성을 고려한 shadcn 기반 디자인 시스템 구축',
      '클라이언트 컴포넌트 최소화로 성능 최적화',
    ],
    period: { start: '2026-08', end: null },
    role: '개인 프로젝트 (기획, 설계, 개발 전담)',
    links: { github: 'https://github.com/dlsrbChoi/my-dev-portfolio' },
  },
  {
    id: 'rewardit',
    slug: 'rewardit',
    title: '리워딧 (Rewardit)',
    description:
      '참여형 광고로 포인트를 적립하고 가맹점에서 현금처럼 사용하는 리워드 플랫폼입니다. 회원/가맹점/관리자 3개 영역으로 구성된 반응형 웹앱이며, Vue.js 기반으로 모바일 환경에 최적화되어 있습니다.',
    technologies: ['Vue.js', 'Vite', 'Vuex', 'Vuetify', 'SCSS', 'JavaScript'],
    images: [
      '/images/side_projects/sideProject-2-main.png',
      '/images/side_projects/sideProject-2-detail-1.png',
      '/images/side_projects/sideProject-2-detail-2.png',
      '/images/side_projects/sideProject-2-detail-3.png',
      '/images/side_projects/sideProject-2-detail-4.png',
      '/images/side_projects/sideProject-2-detail-5.png',
      '/images/side_projects/sideProject-2-detail-6.png',
      '/images/side_projects/sideProject-2-detail-7.png',
      '/images/side_projects/sideProject-2-detail-8.png',
      '/images/side_projects/sideProject-2-detail-9.png',
    ],
    year: 2024,
    highlights: [
      '3개 권한(회원/가맹점/관리자) 분기 라우팅 및 JWT 인증 구현',
      'AWS EC2 + Nginx를 통한 배포 및 운영',
    ],
    features: [
      '광고 클릭/영상시청/SNS구독형 3종 리워드 적립 로직 구현',
      'QR 기반 포인트 사용 및 가맹점 승인 플로우 설계',
      'JWT 인증 및 3개 권한(회원/가맹점/관리자) 분기 라우팅',
      'AWS EC2 + Nginx를 통한 배포 및 운영',
      '반응형 모바일 UI 퍼블리싱',
    ],
    learnings: [
      '실제 외주 클라이언트 요구사항을 반영한 다중 사용자 권한 설계 경험',
      'AWS EC2/Nginx 배포 파이프라인 구축 경험',
      '상태(포인트) 정합성을 고려한 Vuex 상태 관리 설계',
    ],
    period: { start: '2024-12', end: '2025-02' },
    role: '외주 프로젝트 참여 (프론트엔드 전담)',
    links: { github: 'https://github.com/dlsrbChoi/rewardfe' },
  },
  {
    id: 'market-trip',
    slug: 'market-trip',
    title: '마켓트립',
    description:
      '현지인이 추천하는 여행 일정표를 마트처럼 판매/구매할 수 있는 여행 콘텐츠 마켓플레이스입니다.',
    technologies: ['Vue.js', 'Bootstrap', 'Axios', 'JavaScript', 'HTML'],
    images: [
      '/images/side_projects/sideProject-3-main.png',
      '/images/side_projects/sideProject-3-detail-1.png',
      '/images/side_projects/sideProject-3-detail-2.png',
      '/images/side_projects/sideProject-3-detail-3.png',
      '/images/side_projects/sideProject-3-detail-4.png',
      '/images/side_projects/sideProject-3-detail-5.png',
      '/images/side_projects/sideProject-3-detail-6.png',
    ],
    year: 2022,
    highlights: [
      '프로젝트 리더로서 팀 기획·설계·개발 전담',
      'SW프로젝트 경진대회 우수상 수상 및 SW페스티벌 시연',
    ],
    features: [
      '일정표 등록/거래(구매·판매) 플로우 설계',
      '썸네일·해시태그 기반 일정표 상세 페이지',
      '구매 후 추천 일정 요약 및 예산 계산 UI',
      '화면설계서 기반 팀 협업 및 페어 프로그래밍',
    ],
    learnings: [
      '프로젝트 리더로서 일정 관리 및 팀 커뮤니케이션 경험',
      '화면설계서 작성을 통한 기획-개발 간 소통 능력',
      '삼육대학교 SW프로젝트 경진대회 우수상 수상 및 SW페스티벌 시연',
    ],
    period: { start: '2022-09', end: '2022-09' },
    role: '팀 프로젝트 리더 (기획, 화면설계, 프론트엔드 개발)',
    links: { github: 'https://github.com/dlsrbChoi/followtrip-vue' },
  },
  {
    id: 'diet-management',
    slug: 'diet-management',
    title: '식단관리 서비스',
    description: '수술/시술 후 환자 및 일반인을 위한 AI 기반 식단 촬영·분석·기록 앱입니다.',
    technologies: ['React Native', 'React.js', 'JavaScript', 'SCSS'],
    images: [
      '/images/side_projects/sideProject-4-main.png',
      '/images/side_projects/sideProject-4-detail-1.png',
      '/images/side_projects/sideProject-4-detail-2.png',
      '/images/side_projects/sideProject-4-detail-3.png',
      '/images/side_projects/sideProject-4-detail-4.png',
      '/images/side_projects/sideProject-4-detail-5.png',
    ],
    year: 2022,
    highlights: [
      'AI 분석 결과를 사용자 친화적으로 노출하는 UI/UX 설계',
      'React Native 기반 WebApp 크로스플랫폼 개발',
    ],
    features: [
      '음식 촬영 → AI 인식 → 영양 분석 파이프라인 UI 구현',
      '식사 기록 태그 시스템 설계',
      'CN_AI사 기획 협업 기반 프로토타입 개발',
      'React Native 기반 WebApp 크로스플랫폼 개발',
    ],
    learnings: [
      '외부 기업(CN_AI)과의 협업 기반 요구사항 반영 경험',
      'AI 분석 결과를 사용자 친화적으로 노출하는 UI/UX 설계 경험',
      'React Native 첫 실무형 프로젝트 경험',
    ],
    period: { start: '2022-03', end: '2022-06' },
    role: '팀원 (프론트엔드/WebApp 개발)',
    links: { github: 'https://github.com/dlsrbChoi/reactnaproject-2022-1' },
  },
]

export function getSideProjectBySlug(slug: string): SideProject | undefined {
  return sideProjects.find((p) => p.slug === slug)
}

export function getSideProjectCount(): number {
  return sideProjects.length
}
