// 정적 프로젝트(회사 프로젝트) 데이터 정의
// TODO: 아래 플레이스홀더 데이터를 실제 프로젝트 정보로 교체하세요.
import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'project-1',
    slug: 'project-1',
    title: '블록체인 시민체감 서비스 구축 및 운영 용역 (인천e지갑 서비스 고도화)',
    description: '분산된 지자체 서비스를 단일 앱으로 통합하고 정부 대국민 API를 연동하여 블록체인 기반 시민 체감형 서비스를 고도화 및 운영',
    summary: '이기종 서비스 통합, 대국민 API 연동, PIA/보안 총괄 및 운영 트러블슈팅',
    technologies: ['JavaSctipt', 'jQuery', 'Thymleaf', 'JAVA', 'Spring Boot', 'PostgreSQL'],
    period: {
      start: '2025-07',
      end: '2025-04',
    },
    teamSize: 4,
    role: '웹 개발',
    image: '/images/projects/project-1.png',
    features: [
      { title: '서비스 통합을 위한 기술 스택 마이그레이션', description: 'jQuery에서 React 기반으로 전환하여 코드 유지보수성 향상 및 개발 효율성 증대' },
      { title: '대국민 서비스 연동 및 운영 전환', description: '정부 API 통합 및 블록체인 기반 서비스 연동으로 사용자 편의성 개선' },
      { title: '공공사업 리스크 관리 및 품질 보증(QA) 총괄', description: '보안 감리, PIA 진행으로 공공 데이터 보호 기준 충족' },
      { title: '앱 출시 및 배포 관리', description: 'App Store, Google Play Store 심사 및 배포 프로세스 관리' },
      { title: '운영 유지보수 및 CS 기반 서비스 고도화', description: '사용자 피드백 기반 기능 개선 및 버그 수정으로 안정성 확보' },
    ],
  },
  {
    id: 'project-2',
    slug: 'project-2',
    title: '블록체인 메인넷 구축 및 확산서비스 개발 용역 (인천e지갑 초기 환경 구축)',
    description: '인천시 블록체인 메인넷 확산을 위한 웹뷰(WebView) 기반의 초기 모바일 앱 환경 및 기반 시스템 구축',
    summary: '웹뷰 아키텍처 설계, 블록체인 API 연계, 인증 연동 및 DBA 파트 감리 대응',
    technologies: ['JavaSctipt', 'jQuery', 'Thymleaf', 'JAVA', 'Spring Boot', 'PostgreSQL'],
    period: {
      start: '2025-02',
      end: '2025-04',
    },
    teamSize: 4,
    role: '웹 개발',
    image: '/images/projects/project-2.png',
    features: [
      { title: '핵심 인증 및 보안 모듈 연동', description: 'OAuth 2.0 및 블록체인 기반 인증 시스템 통합' },
      { title: '블록체인 메인넷 연동 및 아키텍처 설계', description: 'WebView 기반 모바일 앱 아키텍처 설계 및 블록체인 네트워크 연동' },
      { title: '모바일 렌더링 최적화 및 디버깅', description: '다양한 모바일 기기 환경에서의 성능 최적화 및 크로스 플랫폼 호환성 확보' },
      { title: '공공사업 기술 감리 대응 (DBA 파트)', description: '데이터베이스 설계 및 성능 검수로 공공 사업 감리 기준 충족' },
    ],
  },
  {
    id: 'project-3',
    slug: 'project-3',
    title: '서울사회복지공익법센터 홈페이지 개편 및 모바일 반응형 웹사이트 전환',
    description: '레거시 홈페이지 디자인 개편 및 모바일 반응형 전환',
    summary: '디자인 개편, 모바일 반응형, 메뉴 재귀 탐색 기반의 동적 렌더링 설계',
    technologies: ['JSP', 'HTML', 'CSS', 'JavaScript', 'jQuery'],
    period: {
      start: '2025-06',
      end: '2025-09',
    },
    teamSize: 3,
    role: '프론트엔드 개발',
    image: '/images/projects/project-3.png',
    features: [
      { title: '하드코딩된 다단계 메뉴 구조 재설계', description: '계층형 트리 데이터로 추상화하고 재귀(DFS) 탐색 기반의 동적 렌더링으로 유지보수성 향상 및 개발 생산성 증대' },
      { title: '모바일 반응형 인터페이스 재구축', description: '디자인 가이드를 기반으로 기존 정적 웹페이지를 모바일·웹 표준에 최적화된 반응형 인터페이스로 전면 재구축' },
      { title: '접근성 및 크로스 브라우징 개선', description: '레거시 화면 구조 및 마크업 최적화를 통해 모바일 접근성 및 크로스 브라우징 문제 해결' },
    ],
  },
  {
    id: 'project-4',
    slug: 'project-4',
    title: '전국 8개 지자체 통합주차포털 솔루션 구축 및 고도화',
    description: '지자체별 공영주차장 이용 편의성을 극대화하기 위해 실시간 주차 정보 조회, 요금 감면 연계, 신청·결제 기능 등을 제공하는 대시민 통합주차포털의 웹 프론트엔드 구축',
    summary: '주차 및 결제 관련 모든 서비스를 제공하는 웹/모바일 반응형 포털 화면 설계 및 개발',
    technologies: ['Vue.js', 'JavaScript', 'Vuex', 'HTML', 'SCSS'],
    period: {
      start: '2023-01',
      end: '2025-01',
    },
    teamSize: 4,
    role: '프론트엔드 개발',
    image: '/images/projects/project-4.png',
    features: [
      { title: '통합 주차 포털 플랫폼 개발', description: '8개 지자체의 공영주차장 정보를 단일 플랫폼으로 통합하여 사용자 편의성 극대화' },
      { title: '실시간 주차 정보 조회 및 예약', description: '실시간 주차장 현황 제공 및 선점예약 기능으로 사용자 만족도 향상' },
      { title: '요금 감면 연계 및 결제 기능', description: '지자체별 요금 감면 정책 자동 적용 및 다양한 결제 수단 지원' },
      { title: '웹/모바일 반응형 설계', description: 'Vue.js 기반 반응형 웹 설계로 다양한 기기에서의 최적 사용 경험 제공' },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectCount(): number {
  return projects.length
}
