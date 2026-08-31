// 정적 프로젝트(회사 프로젝트) 데이터 정의
// TODO: 아래 플레이스홀더 데이터를 실제 프로젝트 정보로 교체하세요.
import type { Project } from '@/types/project'

export const projects: Array<Project> = [
  {
    id: 'project-1' as const,
    slug: 'project-1',
    title: '블록체인 시민체감 서비스 구축 및 운영 용역 (서비스 고도화)',
    description: '분산된 4개 서비스를 단일 앱으로 통합 및 정부 대국민 API 33종을 연동한 블록체인 기반 시민서비스 고도화',
    summary: '이기종 기술 스택 통합, 33종 정부 API 연동, 보안/감리 총괄',
    technologies: ['JAVA', 'jQuery', 'Spring Boot', 'JavaSctipt', 'Thymleaf', 'PostgreSQL'],
    period: {
      start: '2025-07',
      end: '2025-04',
    },
    teamSize: 4,
    role: '웹 개발',
    image: '/images/projects/project-1.png',
    images: [
      '/images/projects/project-1-main.jpg',
      '/images/projects/project-1-detail-1.png',
      '/images/projects/project-1-detail-2.png',
      '/images/projects/project-1-detail-3.png',
      '/images/projects/project-1-detail-4.png',
    ],
    achievements: [
      '4개 이기종 서비스(React Native, Nest.js, React.js) 단일 앱으로 통합',
      '33종 전자증명서 발급/열람 기능 구현 및 정부 연계 승인 획득',
      '비대면 자격확인, 모바일 주민등록증 서비스 구현 완료',
      '공공 SW 기술 감리 단독 대응 및 모든 필수 산출물 직접 작성',
      '개인정보영향평가 "적합" 판정 획득',
      'Google Play, App Store 정식 출시',
      '동시성 이슈 해결로 데이터 무결성 확보'
    ],
    features: [
      {
        title: '이기종 기술 스택 통합 마이그레이션',
        descriptions: [
          'React Native, Nest.js, React.js, JPA 등 4개 프레임워크로 구축된 서비스를 HTML/JS + Spring Boot 표준 환경으로 마이그레이션',
          '섬패스(Smart Pass): 위치 기반 스탬프 인증 프로세스 구현',
          '걸음 수 동기화: 디바이스 센서 → 웹 → 서버 통신 흐름 설계로 Race Condition 방어'
        ],
      },
      {
        title: '대국민 서비스 연동 (33종 API)',
        descriptions: [
          '전자증명서 33종 + 비대면 자격확인 + 모바일 주민등록증 정부 API 연계',
          '위변조 방지, 통신 구간 암호화 등 보안 요구사항 모두 충족'
        ],
      },
      {
        title: '공공사업 품질 관리 및 보안 대응',
        descriptions: [
          '기술 감리(Audit): 요구사항 추적표, 아키텍처 정의서, 시험 결과서 등 산출물 단독 작성',
          '개인정보영향평가(PIA): DB 암호화, UI 마스킹 등 보안 조치 주도로 "적합" 판정 획득'
        ],
      },
      {
        title: '운영 안정성 및 성능 개선',
        descriptions: [
          '대규모 트래픽 환경에서 동시성 이슈로 인한 데이터 집계 오류 해결',
          'Google Play, App Store 정식 출시 및 배포 관리'
        ],
      },
    ],
  },
  {
    id: 'project-2',
    slug: 'project-2',
    title: '블록체인 메인넷 구축 및 확산서비스 개발 용역 (초기 환경 구축)',
    description: '인천시 블록체인 메인넷을 위한 웹뷰 기반 초기 모바일 앱과 관리자 웹사이트 구축',
    summary: '인증/보안 모듈 연동, 블록체인 API 설계, 크로스 브라우징 검증',
    technologies: ['JAVA', 'jQuery', 'Spring Boot', 'JavaSctipt', 'Thymleaf', 'PostgreSQL'],
    period: {
      start: '2025-02',
      end: '2025-04',
    },
    teamSize: 4,
    role: '웹 개발',
    image: '/images/projects/project-2.png',
    images: [
      '/images/projects/project-2-main.jpg',
      '/images/projects/project-2-detail-1.png',
      '/images/projects/project-2-detail-2.png',
    ],
    achievements: [
      '3개 인증 모듈(KG이니시스, KG모빌리언스, 라온시큐어) 안정적 연동',
      '블록체인 메인넷 API 규격 분석 및 서버 간 연동 로직 구현',
      '웹뷰 기반 표준 아키텍처 환경 구축 (Spring Boot + HTML/JS)',
      'adb를 활용한 다양한 모바일 디바이스 크로스 브라우징 검증',
      'DB 암호화 적용',
      '공공 SW 1차 기술 감리 완벽 대응'
    ],
    features: [
      {
        title: '인증/보안 모듈 통합 (3개 솔루션)',
        descriptions: [
          'KG이니시스/모빌리언스(휴대폰 본인인증), 라온시큐어(전자서명) 등 3개 인증 모듈을 서버/클라이언트 양단에 안정적으로 연동',
          '블록체인 기반 사용자별 보안 강화'
        ],
      },
      {
        title: '블록체인 메인넷 연동 아키텍처 설계',
        descriptions: [
          '인천시 블록체인 메인넷 API 규격 분석 및 데이터 무결성이 보장되는 연동 로직 구현',
          'Spring Boot + HTML/JS(Thymeleaf) 기반 표준 웹뷰 아키텍처 구축'
        ],
      },
      {
        title: '모바일 환경 최적화 및 검증',
        descriptions: [
          'adb(Android Debug Bridge)를 활용한 다양한 디바이스 크로스 브라우징 검증',
          '초기 앱 안정성 확보'
        ],
      },
      {
        title: '공공사업 감리 대응 (DBA 파트)',
        descriptions: [
          'DB 암호화 적용 및 기술 감리 산출물(테이블 정의서, ERD) 단독 작성'
        ],
      },
    ],
  },
  {
    id: 'project-3',
    slug: 'project-3',
    title: '서울사회복지공익법센터 홈페이지 개편 및 모바일 반응형 전환',
    description: '레거시 홈페이지를 모바일 반응형으로 전환 및 동적 메뉴 구조로 재설계',
    summary: '다단계 메뉴 동적 렌더링, 반응형 UI 재구축, 레거시 마크업 최적화',
    technologies: ['JSP', 'HTML', 'CSS', 'JavaScript', 'jQuery'],
    period: {
      start: '2025-06',
      end: '2025-09',
    },
    teamSize: 3,
    role: '프론트엔드 개발',
    image: '/images/projects/project-3.png',
    images: [
      '/images/projects/project-3-main.png',
      '/images/projects/project-3-detail-1.png',
      '/images/projects/project-3-detail-2.png',
      '/images/projects/project-3-detail-3.png',
    ],
    achievements: [
      '하드코딩된 다단계 메뉴를 재귀(DFS) 기반 동적 렌더링으로 전환',
      '유지보수성 향상 및 개발 생산성 증대',
      '반응형 인터페이스 전면 재구축',
      '모바일 접근성 및 크로스 브라우징 호환성 확보'
    ],
    features: [
      {
        title: '다단계 메뉴 동적 렌더링 구현',
        descriptions: [
          '계층형 트리 데이터로 추상화하여 재귀 탐색(DFS) 기반의 동적 렌더링 구현',
          '메뉴 구조 변경 시 하드코딩 불필요로 유지보수성 대폭 향상'
        ],
      },
      {
        title: '모바일 반응형 인터페이스 재구축',
        descriptions: [
          '기존 정적 웹페이지를 모바일·웹 표준에 최적화된 반응형으로 전면 개편',
          '다양한 해상도에서 일관된 UX 제공'
        ],
      },
      {
        title: '레거시 마크업 최적화',
        descriptions: [
          '레거시 화면 구조 및 마크업 최적화로 접근성, 크로스 브라우징 호환성 확보'
        ],
      },
    ],
  },
  {
    id: 'project-4',
    slug: 'project-4',
    title: '전국 8개 지자체 통합주차포털 솔루션 구축 및 고도화',
    description: '8개 지자체를 위한 주차 및 결제 통합포털 프론트엔드 개발 (Vue v2→v3 마이그레이션, 성능 70% 단축)',
    summary: 'Vue 마이그레이션, 성능 최적화(10초→3초), 결제/SSO 시스템 구축',
    technologies: ['Vue.js', 'JavaScript', 'Vuex', 'HTML', 'SCSS' , 'Axios'],
    period: {
      start: '2023-01',
      end: '2025-01',
    },
    teamSize: 4,
    role: '프론트엔드 개발',
    image: '/images/projects/project-4.png',
    images: [
      '/images/projects/project-4-main.png',
      '/images/projects/project-4-detail-1.png',
      '/images/projects/project-4-detail-2.png',
      '/images/projects/project-4-detail-3.png',
      '/images/projects/project-4-detail-4.png',
      '/images/projects/project-4-detail-5.png',
      '/images/projects/project-4-detail-6.png',
    ],
    achievements: [
      'Vue.js v2 → v3 마이그레이션 성공 (부산시 주도)',
      'Vue Mixin → Composable 함수 전환으로 재사용성 극대화',
      'Vuex 모듈화 및 로컬스토리지 기반 안정성 확보',
      'Atomic Design 패턴으로 컴포넌트 재사용성 극대화',
      '초기 로딩 속도 70% 단축 (10초 → 3초)',
      'Lighthouse FCP 2.3초 이내 달성',
      'Jest 유닛 테스트 환경 구축',
      '개발 기간 50% 단축 (1달 → 2주, Jira Performance 131%)',
      'PG 결제(스마트로) E2E 흐름 안정성 확보',
      '중복 결제 방지 (디바운싱 + 상태 중앙화)',
      'SSO 연계 구현',
      'Apache Cordova 하이브리드 앱 패키징'
    ],
    features: [
      {
        title: '프레임워크 마이그레이션 & 상태 관리 최적화',
        descriptions: [
          'Vue.js v2 → v3 마이그레이션 주도 (부산시): Composition API 기반 재구조화로 개발 생산성 및 성능 40% 향상',
          'Vue Mixin → Composable 함수 전환 (아산시): 재사용 가능한 로직 모듈화로 코드 중복 제거, 유지보수성 극대화',
          'Vuex 모듈화 및 로컬스토리지 기반 세션 관리: 사용자 로그인 상태 지속 유지, 새로고침 후에도 세션 복구로 UX 향상',
          '카카오 지도 커스텀 마커(Custom Overlay) 및 인포윈도우(InfoWindow) 구현으로 지도 기반 주차장 검색 최적화'
        ],
      },
      {
        title: '성능 최적화 (70% 단축)',
        descriptions: [
          'Lazy-loading + Font-preload 전략으로 초기 로딩 시간 10초 → 3초 단축 (파주시): 번들 사이즈 감소 및 네트워크 요청 최소화',
          'Lighthouse FCP 2.3초 이내 달성 (여수시): 코드 스플리팅 및 동적 임포트로 초기 페이지 로딩 성능 극대화',
          'Jest 기반 유닛 테스트 환경 구축: 회귀 버그 방지 및 안정적인 리팩토링 기반 마련',
          'Jira Performance 131% 달성: 마더십(MotherShip) 프로젝트 기반 개발기간 50% 단축 (1달 → 2주)'
        ],
      },
      {
        title: '안정적인 결제 & SSO 시스템',
        descriptions: [
          'PG 결제 모듈(스마트로) 연동 및 라이프사이클 제어 (양천구): 승인/취소/실패 모든 경로에서 안정적인 E2E 흐름 구현',
          '중복 결제 방지 메커니즘: Vuex 중앙화 상태 관리 + 디바운싱으로 동시 다중 결제 요청 차단',
          'SSO(Single Sign-On) 통합 로그인 구현 (안양시): 여러 지자체 간 단일 인증 체계 구축으로 사용자 편의성 향상',
          '관리자 페이지 고도화 및 사용자 가이드 문서 작성'
        ],
      },
      {
        title: '플랫폼 확장 & UI 표준화',
        descriptions: [
          'Apache Cordova 기반 하이브리드 앱 패키징 (춘천시): 웹 포털을 iOS/Android 네이티브 앱으로 확장, 모바일 플랫폼 지원',
          'Atomic Design 패턴 도입 (인천시): Atom(버튼, 입력창) → Molecule(폼 필드) → Organism(카드, 리스트) 계층화로 UI 컴포넌트 재사용성 극대화',
          '재귀함수 기반 계층형 동적 메뉴 생성 (춘천시): 하드코딩된 다단계 메뉴를 DFS 기반 동적 렌더링으로 전환, 유지보수성 향상',
          'SCSS 컴포넌트화 및 스타일 가이드 정립: 8개 지자체 간 일관된 UI/UX 표준화, 개발 생산성 증대',
          'Drag and Drop 정렬 기능 (양천구): SortableJS 라이브러리 연동으로 게시판 항목 드래그 정렬 기능 추가'
        ],
      },
      {
        title: '고급 기능 및 경험 최적화',
        descriptions: [
          '기기/해상도별 팝업 노출 기능 개선 (아산시): 반응형 디자인으로 모바일/태블릿/데스크톱 전 기기에 최적화된 팝업 렌더링',
          'AI 챗봇 연계 (양천구): 사용자 문의에 대한 자동 응답 시스템 구현으로 고객 지원 효율화',
          '미납요금 계산 프로세스 개선 (춘천시): 복잡한 계산 로직 최적화로 조회 성능 향상 및 정확성 확보',
          '파트 내 개발 스터디 주도 (인천시): Modern JavaScript Deep Dive 학습 주관으로 팀 역량 강화 및 기술 표준화'
        ],
      },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectCount(): number {
  return projects.length
}
