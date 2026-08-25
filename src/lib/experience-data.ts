// 정적 경력 데이터 정의
import type { ExperienceEntry } from '@/types/resume'

export const experienceData: ExperienceEntry[] = [
  // LPS - WEB3 서비스팀
  {
    id: 'lps-service',
    name: 'WEB3 서비스팀',
    entryType: 'experience',
    organization: '(주)리드포인트시스템',
    position: 'WEB3 서비스팀',
    period: { start: '2025-05-01', end: '2026-04-30' },
    description:
      '인천시 공공 프로젝트 인천e지갑 구축 개발자로 참여. 블록체인 메인넷 구축, 시민체감 서비스 개발, 기술 감리 및 개인정보영향평가 대응, 서비스 통합 마이그레이션',
    displayOrder: 1,
  },
  // LPS - WEB3 디자인팀
  {
    id: 'lps-design',
    name: 'WEB3 디자인팀',
    entryType: 'experience',
    organization: '(주)리드포인트시스템',
    position: 'WEB3 디자인팀',
    period: { start: '2025-02-01', end: '2025-04-30' },
    description:
      '인천e지갑 프로젝트 초기 디자인 기반 프론트엔드 개발 리드. 정적 HTML/CSS를 Spring MVC Thymeleaf, jQuery 기반 아키텍처로 전환. WebApp FE 개발 전담 및 Flutter와 동기화',
    displayOrder: 2,
  },
  // DHICC - 여수시 주차포털 TF팀
  {
    id: 'dhicc-yeosu',
    name: '여수시 주차포털 TF팀',
    entryType: 'experience',
    organization: '(주)대흥정보',
    position: '여수시 주차포털 TF팀',
    period: { start: '2024-12-01', end: '2025-01-31' },
    description:
      '통합주차포털 마더십 프로젝트 기반 개발기간 단축. FE MotherShip 프로젝트 완료 후 Jira work management 131% 달성. 디자인/퍼블리싱 외주 관리 및 성능 최적화',
    displayOrder: 3,
  },
  // DHICC - 춘천시 주차포털 TF팀
  {
    id: 'dhicc-chuncheon',
    name: '춘천시 주차포털 TF팀',
    entryType: 'experience',
    organization: '(주)대흥정보',
    position: '춘천시 주차포털 TF팀',
    period: { start: '2024-12-01', end: '2025-01-31' },
    description:
      '플랫폼 확장 및 UI/UX 고도화. Apache Cordova 기반 하이브리드 App 패키징, 재귀함수 기반 계층형 동적 메뉴 생성, 미납요금 계산 프로세스 개선',
    displayOrder: 4,
  },
  // DHICC - 아산시 주차포털 TF팀
  {
    id: 'dhicc-asan',
    name: '아산시 주차포털 TF팀',
    entryType: 'experience',
    organization: '(주)대흥정보',
    position: '아산시 주차포털 TF팀',
    period: { start: '2024-07-01', end: '2024-11-30' },
    description:
      'Vue3 Composable 함수로 상태 관리 최적화, 로컬스토리지 기반 로그인 유지. 기기/해상도별 팝업 노출 기능 개선 및 퍼블리싱 전담',
    displayOrder: 5,
  },
  // DHICC - 양천구 주차포털 TF팀
  {
    id: 'dhicc-yangchun',
    name: '양천구 주차포털 TF팀',
    entryType: 'experience',
    organization: '(주)대흥정보',
    position: '양천구 주차포털 TF팀',
    period: { start: '2024-04-01', end: '2024-07-31' },
    description:
      'PG 결제 모듈(스마트로) 연동 및 결제 라이프사이클 제어. AI 챗봇 연계, SortableJS 기반 게시판 Drag and Drop 정렬 기능 추가, 퍼블리싱 전담',
    displayOrder: 6,
  },
  // DHICC - 인천시 주차포털 TF팀
  {
    id: 'dhicc-incheon',
    name: '인천시 주차포털 TF팀',
    entryType: 'experience',
    organization: '(주)대흥정보',
    position: '인천시 주차포털 TF팀',
    period: { start: '2023-11-01', end: '2024-02-29' },
    description:
      'Atomic 디자인 패턴 도입으로 UI 컴포넌트 재상용성 극대화. 파트 내 개발 스터디 주도, Modern JavaScript Deep Dive 학습',
    displayOrder: 7,
  },
  // DHICC - 파주시 주차포털 TF팀
  {
    id: 'dhicc-paju',
    name: '파주시 주차포털 TF팀',
    entryType: 'experience',
    organization: '(주)대흥정보',
    position: '파주시 주차포털 TF팀',
    period: { start: '2023-08-01', end: '2023-10-31' },
    description:
      '플랫폼 확장 및 로딩 성능 최적화. 번들 사이즈 감소 및 초기 로딩 시간 개선',
    displayOrder: 8,
  },
  // DHICC - 안양시 주차포털 TF팀
  {
    id: 'dhicc-anyang',
    name: '안양시 주차포털 TF팀',
    entryType: 'experience',
    organization: '(주)대흥정보',
    position: '안양시 주차포털 TF팀',
    period: { start: '2023-02-01', end: '2023-07-31' },
    description:
      'SSO 통합 로그인 구현 및 관리자 페이지 고도화. 사용자 가이드 문서 작성',
    displayOrder: 9,
  },
  // DHICC - 부산시 주차포털 TF팀
  {
    id: 'dhicc-busan',
    name: '부산시 주차포털 TF팀',
    entryType: 'experience',
    organization: '(주)대흥정보',
    position: '부산시 주차포털 TF팀',
    period: { start: '2023-05-01', end: '2023-12-31' },
    description:
      'Vue.js v2 → v3 마이그레이션 주도로 성능 및 개발 생산성 향상. 카카오 지도 커스텀 마커(Custom Overlay) 및 인포윈도우(InfoWindow) 구현',
    displayOrder: 10,
  },
]
