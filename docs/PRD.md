# Notion CMS 개발자 포트폴리오 웹사이트 MVP PRD

**문서 버전:** v2.0  
**작성일:** 2026-08-11  
**작성자:** 최인규  
**연락처:** awdzx456@naver.com  
**GitHub:** https://github.com/dlsrbChoi

---

## v1.0 → v2.0 변경 사항 요약

v1.0(2026-08-04)는 **다중 페이지 구조** (`/about`, `/projects`, `/resume` 등 별도 라우트)를 설계했으나, 실제 구현은 **원페이지(One-Page) 구조**로 전환되었습니다. 본 v2.0에서는:

1. **구조 전환**: 다중 페이지 → 원페이지 + 좌측/우측 고정 섹션 네비게이션 반영
2. **범위 확대 (In Scope)**: 
   - 다국어 지원 (한/영, next-intl) — 이전 Out of Scope에서 전환
   - 스크롤 애니메이션 (Framer Motion)
   - 히어로 WebGL 배경 이펙트 (Three.js LiquidEther)
   - GA4 방문자 분석 — 이전 Out of Scope에서 전환
3. **프로젝트 분류**: ProjectType 기반 "주요 프로젝트" / "사이드 프로젝트" 구분
4. **참고 레퍼런스**: [junheedot.com](https://junheedot.com/) 포트폴리오 및 [블로그 글](https://junheedot.tistory.com/entry/하루만에-포트폴리오-사이트-만들기-with-Claude-Code) 참고해 디자인·기능 동기화

---

## 1. 문서 개요 (Document Overview)

### 1.1 프로젝트 목적

이 문서는 Notion을 헤드리스 CMS로 활용한 개발자 포트폴리오 웹사이트의 MVP(최소 기능 제품) 요구사항을 정의합니다.

**핵심 목표:**
- Notion Database에서 관리하는 프로젝트·경력·기술 정보를 재배포 없이 실시간으로 웹사이트에 반영
- 채용 담당자가 5초 안에 핵심 역량을 파악할 수 있도록 시각화
- "프론트엔드 UI/UX 구현 능력에서 출발해 공공 프로젝트의 Spring Boot 백엔드 로직과 데이터 흐름까지 이해 범위를 확장한 성장형 개발자"라는 내러티브를 증명

**이 포트폴리오가 존재하는 이유:**  
단순 이력서 나열이 아니라, 실제 프로젝트 경험에서 어떤 기술적 선택을 했고, 어떤 임팩트를 만들었으며, 어떻게 성장했는지를 인터랙티브하게 보여줌으로써 채용 담당자의 신뢰도와 관심도를 높이는 것입니다.

### 1.2 타겟 오디언스 및 기대 행동

| 오디언스 | 방문 목적 | 기대 행동 | 핵심 확인 정보 |
|---|---|---|---|
| **리크루터/채용담당자** | 빠른 검증 및 서류 제출 가능성 판단 | 5초 내 요약 파악 → 2분 내 주요 프로젝트 확인 → 이력서 PDF 다운로드 | 기술 스택, 최근 경험, 이메일/GitHub |
| **기술 면접관/동료 개발자** | 기술적 깊이와 문제 해결 능력 검증 | 프로젝트 상세 페이지 정독 → 기술 스택 확인 → 트러블슈팅/성과 지표 검토 | 마이그레이션 리드, API 연동, 성능 최적화 사례 |
| **협업 파트너/컨설팅 대상** | 협력 가능성 및 전문성 확인 | 프로젝트 영역/기술 검색 → GitHub 프로필 이동 | 공공 프로젝트 경험, 통합 시스템 구축 사례 |

### 1.3 MVP 범위

**In Scope:**
- **원페이지(One-Page) 구조**: 히어로 → 소개 → 프로젝트 → 이력서 → 연락처를 하나의 페이지에서 앵커 스크롤로 네비게이션
- **우측 고정 섹션 네비게이션**: IntersectionObserver 기반 활성 섹션 감지, 도트 UI (데스크톱 lg 이상)
- **프로젝트 상세 페이지**: 프로젝트 카드 → 클릭 시 `/projects/[slug]` 상세 페이지로 이동 (SSG/ISR)
- **다국어 지원** (한/영, next-intl) — v1.0에서 Out of Scope → v2.0 전환
- **PDF 다운로드** (인쇄 기능) 및 웹 기반 이력서 섹션
- **다크모드/반응형 지원**
- **스크롤 애니메이션** (Framer Motion): 섹션 진입 시 fade-in/slide-up 등 마이크로 인터랙션
- **히어로 배경 이펙트** (Three.js): 유체 시뮬레이션 (LiquidEther 스타일, 모바일 fallback 포함)
- **GA4 방문자 분석** — v1.0에서 Out of Scope → v2.0 전환 (섹션 네비 클릭, 이력서 다운로드, 테마/언어 전환 등 이벤트 트래킹)

**Out of Scope (Phase 3 이후 고려):**
- **블로그/기술 글 자체 시스템** (기술 블로그 링크 섹션은 가능, 자체 블로그 구현은 미제)
- 댓글/상호작용 기능
- 검색 기능
- 정교한 분석 대시보드 (GA4 기본 분석만)

---

## 2. 제품 아키텍처 및 기술 스택 (Tech Stack & Architecture)

### 2.1 기술 스택

| 카테고리 | 기술 | 버전 | 용도 |
|---|---|---|---|
| **프레임워크** | Next.js App Router | 16.2.12 | 서버/클라이언트 통합, SSG/ISR, 동적 라우팅 |
| **언어** | TypeScript | 5 | 타입 안전성 |
| **렌더링** | React | 19.2.4 | UI 컴포넌트, 인터랙션 |
| **스타일링** | TailwindCSS | v4 | 유틸리티 기반 디자인, oklch 색상 시스템 |
| **UI 라이브러리** | shadcn/ui (base-nova) | 최신 | 접근성 높은 컴포넌트, `@base-ui/react` 기반 |
| **헤드리스 컴포넌트** | @base-ui/react | 1.6.0 | shadcn/ui 래핑 기반 |
| **테마** | next-themes | 0.4.6 | 라이트/다크/시스템 모드 관리 |
| **클래스 병합** | clsx + tailwind-merge | 2.1.1, 3.6.0 | 동적 CSS 클래스 충돌 방지 (`cn()` 유틸) |
| **컴포넌트 변형** | class-variance-authority | 0.7.1 | CVA 패턴 기반 컴포넌트 props 정의 |
| **아이콘** | lucide-react | 1.28.0 | SVG 아이콘 라이브러리 |
| **토스트 알림** | sonner | 2.0.7 | 에러/성공 메시지 표시 |
| **커스텀 훅** | usehooks-ts | 3.1.1 | useMediaQuery, useLocalStorage 등 |
| **CMS** | Notion API | @notionhq/client | Notion Database에서 콘텐츠 페칭 |
| **Notion 렌더링** | 자체 블록 렌더러 | - | Notion BlockObjectResponse → React 변환 |
| **애니메이션** | framer-motion | 11.0+ | 스크롤 기반 섹션 진입 애니메이션, fade-in/slide-up 등 |
| **WebGL 배경** | three.js | r127+ | 히어로 섹션 유체 시뮬레이션 배경, 모바일 조건부 렌더링 |
| **React Three** | @react-three/fiber | 9.0+ | Three.js와 React 통합, 선언형 3D 컴포넌트 |
| **다국어** | next-intl | 3.0+ | 한/영 라우팅, 번역 파일 관리, 언어 전환 UI |
| **분석** | GA4 (Google Analytics 4) | (신규) | 방문자 인터랙션 추적 (섹션 네비 클릭, 이력서 다운로드, 테마/언어 전환 등) |
| **PDF 생성** | 브라우저 네이티브 인쇄 | - | 추가 의존성 없음, 최고 유지보수성 |
| **배포** | Vercel | - | Next.js 최적화 배포, ISR 지원, 서버리스 함수 |

### 2.2 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                      Notion Workspace                           │
│  ┌─────────────────┐         ┌──────────────────┐              │
│  │  Projects DB    │         │  Resume/Exp DB   │              │
│  │  (프로젝트)     │         │  (경력/학력)     │              │
│  └────────┬────────┘         └────────┬─────────┘              │
└───────────┼──────────────────────────┼─────────────────────────┘
            │                          │
            │ Notion API (Integration Token)
            │ 빌드 타임 fetch
            └──────────────┬───────────┘
                           │
┌──────────────────────────┴──────────────────────────┐
│         Next.js 16 App Router (SSG + ISR)          │
│  ┌─────────────────────────────────────────┐      │
│  │ build: generateStaticParams()           │      │
│  │  └─ Projects DB 전체 조회               │      │
│  │  └─ slug 목록 추출 및 정적 페이지 생성 │      │
│  └────────────┬────────────────────────────┘      │
│               │                                    │
│  ┌────────────┴──────────────────────────────┐   │
│  │ Runtime: fetch() with revalidate option  │   │
│  │  └─ next: { revalidate: 3600 }          │   │
│  │  └─ 주기적 ISR로 콘텐츠 갱신            │   │
│  └─────────────┬──────────────────────────┘    │
└────────────────┼──────────────────────────────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
   ┌──▼──┐          ┌─────┴─────┐
   │CDN  │          │ Edge Cache│
   └─────┘          └───────────┘
      │                    │
      └────────┬───────────┘
               │
           ┌───▼────┐
           │Browser │ (클라이언트)
           │- React │
           │- 다크  │
           └────────┘
```

**데이터 흐름:**
1. **빌드 타임** (`npm run build`): Next.js가 `generateStaticParams()`에서 Notion API 호출 → Projects DB 전체 조회 → slug 목록 추출 → 각 프로젝트별로 정적 HTML 사전 생성
2. **런타임** (페이지 요청 시): 캐시된 정적 HTML 반환, 만료 시간(`revalidate: 3600`)이 되면 백그라운드에서 재검증
3. **클라이언트**: React 하이드레이션, 다크모드 토글, 인쇄 기능 처리

### 2.3 Notion 연동 전략

#### 2.3.1 인증
- **방식:** Integration Token (Notion Internal Integration)
- **설정 단계:**
  1. Notion 워크스페이스에서 [Settings → My integrations → Create new integration]에서 새 Internal Integration 생성
  2. Integration Token 복사, `.env.local`의 `NOTION_API_KEY`에 저장
  3. Projects DB와 Resume DB에 각각 Integration 연결 (Share 버튼 → Integration 선택)
- **보안:** `.gitignore`에 `.env*`가 이미 포함되어 있어 키 노출 방지

#### 2.3.2 데이터 페칭 전략
- **빌드 타임 정적 생성 (SSG + ISR)**
  - `generateStaticParams()`: 빌드 시 Notion API로 Projects DB 조회 → slug 배열 반환 → Next.js가 각 `[slug]` 페이지를 정적 HTML로 미리 생성
  - 장점: 응답 속도 최고(캐시된 정적 HTML), SEO 최적, Vercel 에지 캐시 활용 가능
  - 단점: 새 프로젝트 추가 시 재빌드 필요
- **ISR (Incremental Static Regeneration)**
  - `fetch` 옵션: `next: { revalidate: 3600 }` 설정
  - 효과: 매 요청마다 Notion 호출 대신, 3600초(1시간)마다 한 번씩만 재검증
  - 인천지갑/통합주차포털처럼 자주 갱신되지 않는 콘텐츠에 최적
- **재검증 주기 권장값**
  - 프로젝트/이력 데이터: `revalidate: 3600` (1시간) 또는 `86400` (1일)
  - 근거: 포트폴리오는 채용용 스냅숏이므로 자주 갱신할 필요 없고, 빌드 타임 Notion API 요청 과다를 피하기 위함
- **On-demand Revalidation (미지원)**
  - Notion이 네이티브 웹훅을 제공하지 않아, MVP에서는 미구현
  - Phase 2 이후 Vercel Deploy Hook 수동 트리거 또는 외부 서비스(Zapier 등) 고려

#### 2.3.3 에러 처리 정책
- **빌드 타임 실패:** 프로젝트 조회 실패 시 빌드 실패 처리
  - 근거: 콘텐츠 누락된 사이트 배포보다 빌드 실패로 즉시 발견하는 것이 안전
  - 예외 처리: `generateStaticParams`에서 catch → 에러 로그 기록 → `throw` (빌드 실패 유도)
- **런타임 실패:** ISR 재검증 실패 시 기존 캐시 유지
  - Next.js 기본 동작: Notion API 실패하면 여전히 이전 캐시된 페이지 반환 (graceful degradation)

### 2.4 디렉토리 구조

#### 현재 구조 (v2.0 기준 — 이미 구현됨)

```
src/
├── app/
│   ├── page.tsx                          [완료] 원페이지 — 모든 섹션 통합
│   ├── projects/
│   │   ├── page.tsx                      [완료] 프로젝트 목록 (SSG)
│   │   └── [slug]/
│   │       └── page.tsx                  [완료] 프로젝트 상세 페이지 (SSG + ISR)
│   ├── sitemap.ts, robots.ts            [완료] SEO
│   └── globals.css                       [완료] + @media print 규칙
│
├── components/
│   ├── sections/                         [완료] 원페이지 섹션 컴포넌트
│   │   ├── hero-section.tsx              히어로 (프로필 사진 + 텍스트, v2.0에서 WebGL 배경 추가 예정)
│   │   ├── about-section.tsx             소개 (통계 + 강점 카드)
│   │   ├── projects-section.tsx          프로젝트 (카드 그리드, v2.0에서 주요/사이드 분리 예정)
│   │   ├── resume-section.tsx            이력서 (경력/학력/기술/자격증, 인쇄 기능)
│   │   └── contact-section.tsx           [완료] 연락처 (이메일/GitHub/링크)
│   ├── layout/
│   │   ├── section-nav.tsx               [완료] 우측 고정 도트 네비 (IntersectionObserver 기반)
│   │   ├── header.tsx, footer.tsx, container.tsx, theme-toggle.tsx, mobile-nav.tsx [완료]
│   ├── projects/                         [완료] 프로젝트 상세 관련
│   │   ├── project-card.tsx              목록용 카드
│   │   ├── project-hero.tsx              상세 페이지 히어로
│   │   ├── impact-metrics.tsx            성과 지표 시각화
│   │   ├── tech-stack-badges.tsx         기술 스택 뱃지
│   │   └── notion-renderer.tsx           Notion 블록 → React 변환
│   ├── resume/                           [완료]
│   │   └── experience-timeline.tsx       경력 타임라인
│   ├── ui/                               [완료] shadcn/ui 컴포넌트
│   ├── examples/                         [기존] 데모 컴포넌트 (포트폴리오 외 스타터킷 부분)
│   └── theme-provider.tsx                [완료] next-themes 통합
│
├── lib/
│   ├── notion.ts                         [완료] Notion API 클라이언트 + 데이터 페칭
│   ├── notion-mappers.ts                 [완료] Notion 응답 → 앱 타입 변환
│   ├── site-config.ts                    [완료] 개인 정보 + 기술 스택 카테고리
│   ├── skill-icons.tsx                   [완료] 기술 스택 아이콘 맵핑
│   └── utils.ts, nav.ts, examples.ts     [완료] 유틸리티
│
├── types/
│   └── notion.ts                         [완료] TypeScript 타입 정의
│
└── [신규 추가 예정 - Phase 5~7]
    ├── components/effects/
    │   └── liquid-background.tsx         Three.js 히어로 배경
    ├── components/motion/                Framer Motion 래퍼 컴포넌트
    ├── i18n/ 또는 messages/
    │   ├── ko.json, en.json              next-intl 번역 파일
    │   └── config.ts                     다국어 설정
    └── lib/gtag.ts                       GA4 이벤트 트래킹
```

#### 주요 기존 컴포넌트
- `components/ui/` — shadcn/ui 컴포넌트 (Button, Card, Badge, Separator, Skeleton 등)
- `components/layout/` — 헤더, 푸터, 컨테이너, 테마 토글, 섹션 네비게이션
- `lib/site-config` — 개인 정보, 기술 스택 카테고리

### 2.5 환경 변수

`.env.local` 파일에 다음 변수 설정:

```
NOTION_API_KEY=ntn_xxx...            # Notion Integration Token
NOTION_PROJECTS_DB_ID=abc123...      # Projects Database ID
NOTION_RESUME_DB_ID=def456...        # Resume/Experience Database ID
```

Notion 데이터베이스 URL에서 ID 추출 방법:  
`https://notion.so/{WORKSPACE_ID}/{DATABASE_ID}?v=...` → DATABASE_ID 부분

### 2.6 배포 전략

- **호스팅:** Vercel (Next.js 최적화)
- **ISR 지원:** Vercel의 On-Demand ISR 기능 지원 (필요 시 Phase 2에서 Vercel Deploy Hook 활용)
- **PDF 생성:** 브라우저 네이티브 인쇄이므로 서버 자원(Puppeteer 등) 불필요 → 빌드 시간 단축, 서버리스 함수 실행 시간 초과 위험 없음

---

## 3. 핵심 기능 명세 (Core Features - MVP)

v2.0에서는 원페이지 구조로 모든 기능이 `src/app/page.tsx`에 통합되며, 각 섹션은 앵커(`#about`, `#projects`, `#resume`, `#contact`)로 네비게이션됩니다.

### 3.1 히어로 섹션 (`#hero`)

**목적:** 채용 담당자가 5초 안에 핵심 가치를 파악하도록 시각화

**화면 구성:**
- **배경**: Three.js 유체 시뮬레이션 (LiquidEther 스타일, 모바일/저사양 기기는 정적 그래디언트로 fallback)
  - 초기 로드: 정적 그래디언트 먼저 표시 (빠른 LCP)
  - WebGL 로드 시: 동적 유체 효과 페이드 인
  - 모바일 (< 768px): WebGL 비활성화, 정적 그래디언트 유지
- **좌측 텍스트**: 
  - 헤드라인: "프론트엔드에서 풀스택으로"
  - 설명: "UI/UX 구현에서 출발해 공공 프로젝트의 백엔드 로직까지 이해 범위를 넓혀온 성장형 개발자입니다."
- **우측 프로필**: 원형 프로필 사진 + 글로우 배경
- **CTA 버튼**: "프로젝트 보기" (→ `#projects`), "이력서 보기" (→ `#resume`)

**기술 요구사항:**
- `HeroSection` 컴포넌트 (이미 구현, v2.0에서 WebGL 배경 추가)
- Three.js LiquidEther 구현 또는 대체 유체 시뮬레이션 라이브러리 (`three`, `@react-three/fiber` 또는 Babylon.js)
- `prefers-reduced-motion` 감지 시 애니메이션 비활성화
- 모바일 기기(< 768px)는 WebGL 비활성화, 정적 그래디언트 사용
- 다크모드 대응 (oklch 변수), 라이트 모드에서도 시각적 균형 유지

**Acceptance Criteria:**
- [x] (완료) 헤드라인·설명·프로필 사진이 명확히 표시됨
- [ ] (v2.0) Three.js 배경 렌더링, 성능 측정 (Lighthouse LCP < 3s)
- [ ] (v2.0) 모바일에서 정적 그래디언트로 graceful degrade
- [ ] CTA 버튼 클릭 시 해당 섹션으로 스크롤 이동

### 3.2 소개 섹션 (`#about`)

**목적:** 개발자의 경력, 역량, 핵심 강점을 한눈에 파악

**화면 구성:**
- **텍스트 소개**: 프로필 요약 (2-3문단)
- **핵심 통계** (카드): 연차 경력, 완료 프로젝트, 기술 스택 수 (Notion 데이터 기반 동적 계산)
- **강점 카드** (2x2 그리드): 빠른 학습, 전체 시스템 이해, 팀 소통, 성능 우선 (각 아이콘 + 제목 + 설명)

**기술 요구사항:**
- `AboutSection` 컴포넌트 (이미 구현)
- Notion Resume DB에서 `experiences` 조회해 가장 오래된 입사일 기준으로 연차 자동 계산
- Notion Projects DB 조회해 프로젝트 수 자동 계산
- `siteConfig.skillCategories` 기반 기술 스택 수 계산

**Acceptance Criteria:**
- [x] (완료) 텍스트·통계·강점 카드 렌더링
- [x] (완료) 연차·프로젝트수·기술수 동적 계산 및 표시
- [ ] Framer Motion으로 섹션 진입 시 fade-in 애니메이션

### 3.3 프로젝트 섹션 (`#projects`)

**목적:** 주요 프로젝트와 사이드 프로젝트를 분리해 경력 깊이 및 개인 활동을 시각화

**화면 구성:**
- **섹션 헤더**: "프로젝트" 제목
- **주요 프로젝트** (카드 그리드, 3열 반응형):
  - ProjectType이 "공공기관" 또는 "협업"인 프로젝트
  - 카드: 썸네일 + 제목 + 역할 뱃지 + 요약 + 기술 스택(최대 3개) + "상세 보기" 링크 → `/projects/[slug]`
- **사이드 프로젝트** (카드 그리드, 3열 반응형):
  - ProjectType이 "개인"인 프로젝트
  - 동일 카드 레이아웃, 별도 그룹으로 구분

**기술 요구사항:**
- `ProjectsSection` + `ProjectCard` 컴포넌트 (이미 구현, v2.0에서 ProjectType 기반 필터링 추가)
- `getProjects()` 호출 후 ProjectType으로 그룹핑: `filter(p => p.projectType === 'public' || p.projectType === 'collaboration')` vs. `filter(p => p.projectType === 'personal')`
- 이미지는 `next/image` 사용, WebP/AVIF 자동 변환
- DisplayOrder 오름차순 정렬
- 반응형: lg:3열, md:2열, sm:1열

**Acceptance Criteria:**
- [x] (완료) 프로젝트 카드 렌더링
- [ ] (v2.0) 주요/사이드 프로젝트 구분 UI + 필터링
- [x] (완료) 카드 클릭 → `/projects/[slug]` 상세 페이지
- [ ] (v2.0) 카드 호버 시 Framer Motion 상승 애니메이션

### 3.3.1 프로젝트 상세 페이지 (`/projects/[slug]`)

**목적:** 프로젝트의 기술적 깊이, 담당 역할, 성과 지표를 상세히 전달하여 면접관의 기술 검증 지원

**화면 구성:**

#### 3.3.1 프로젝트 히어로 (상단)
- 프로젝트 제목
- 기간 (예: "2023. 06 ~ 2024. 01")
- 담당 역할 (뱃지 형태, 예: "마이그레이션 리드", "프론트엔드 개발", "API 연동")
- 커버 이미지 (풀 너비)

#### 3.3.2 임팩트 지표 (히어로 바로 아래)
강조 섹션으로 프로젝트의 핵심 성과를 수치/결과로 표시:

**인천지갑 앱 강조:**
- "서로 다른 언어·프레임워크 표준화 통합 리드"
- "전자증명서 33종 연계"
- "모바일 신분증 검증 API 연동"
- "X명 팀에서 주도적 역할"

**통합주차포털 강조:**
- "Vue.js 프레임워크 버전 업그레이드 마이그레이션"
- "Smartro PG 결제 모듈 흐름 제어 구현"
- "라우터 지연 로딩으로 초기 렌더링 성능 XX% 개선"

구현: `ImpactMetrics` 컴포넌트, 각 항목을 아이콘 + 텍스트로 시각화

#### 3.3.3 기술 스택
- 사용 기술 뱃지 나열 (예: Vue.js, Spring Boot, TypeScript, Smartro API 등)
- `TechStackBadges` 컴포넌트 활용, shadcn `Badge` 재사용

#### 3.3.4 프로젝트 본문
- Notion 페이지의 리치 텍스트 콘텐츠 렌더링
- 섹션 구성 (권장):
  - "문제 상황": 프로젝트가 시작된 배경
  - "해결 방안": 기술적 접근, 선택 근거
  - "트러블슈팅": 마주친 문제와 해결 과정 (면접관이 가장 궁금해하는 부분)
  - "결과 및 배운 점": 성과와 개인 성장
- `notion-renderer.tsx` 또는 간단한 Rich Text 파서 활용

#### 3.3.5 관련 링크 (하단)
- "GitHub 저장소" (있는 경우)
- "프로젝트 페이지/서비스" (ExternalLink)
- "더 보기" (이전/다음 프로젝트 네비게이션)

**기술 요구사항:**
- `generateStaticParams()`: 빌드 시 Projects DB 조회, Published 프로젝트 slug 배열 반환
- `params: Promise<{slug: string}>` 선언 및 `await params` (Next.js 16 필수)
- `getProjectBySlug()`: 특정 프로젝트 + 본문 블록 조회
- ISR: `next: { revalidate: 86400 }` (1일마다 재검증)
- 로딩 상태: `loading.tsx`에서 Skeleton 표시
- 존재하지 않는 slug: `notFound()` → `not-found.tsx` 자동 404

**화면 구성:**
- **프로젝트 히어로**: 제목 + 기간 + 역할 뱃지 + 커버 이미지
- **임팩트 지표**: 아이콘 + 텍스트로 주요 성과 강조 (예: "전자증명서 33종 연계")
- **기술 스택**: 뱃지 형태로 사용 기술 나열
- **프로젝트 본문**: Notion 블록 렌더링 (제목/텍스트/이미지, 2단계 중첩만)
- **하단 링크**: GitHub/외부 링크, 이전/다음 프로젝트 네비게이션

**Acceptance Criteria:**
- [x] (완료) `generateStaticParams` 동작
- [x] (완료) 정적 HTML 생성 및 빠른 로드
- [x] (완료) 임팩트 지표·기술 스택·본문 렌더링
- [x] (완료) 404 페이지 표시
- [ ] (v2.0) 다음/이전 프로젝트 네비게이션

### 3.4 이력서 섹션 (`#resume`)

**목적:** 웹 기반 이력서 표시 및 PDF 다운로드(인쇄) 기능 제공

**화면 구성:**

#### 3.4.1 상단 액션 바 (인쇄 버튼)
- "인쇄/PDF 다운로드" 버튼 (인쇄 시 `print:hidden`으로 숨김)
- 클릭 시 `window.print()` 트리거

#### 3.4.2 이력서 본문
- **헤더**: 이름(최인규), 이메일, GitHub 링크 (인쇄 시 텍스트로 노출)
- **핵심 요약**: 프로필 한두 문단
- **경력 사항**: Notion Resume DB에서 `entryType: 'experience'` 조회, 시간역순(최근부터) 정렬
  - 회사명, 직무, 기간, 설명 (인천지갑, 통합주차포털 등 주요 프로젝트 강조)
- **학력**: `entryType: 'education'` — 대학명, 학위, 전공, 기간
- **기술 스택**: `siteConfig.skillCategories` 기반 카테고리별 나열
- **자격증/교육**: `entryType: 'certificate'` — 자격명, 발급처, 취득 날짜

**기술 요구사항:**
- `ResumeSection` 컴포넌트 (이미 구현)
- `getResumeData()`: experiences, education, certificates 분류 조회
- `ExperienceTimeline` + UI 컴포넌트로 타임라인 시각화
- `PrintButton`: `'use client'` 클라이언트 컴포넌트, `window.print()` 호출

#### 3.4.3 인쇄 스타일 (`@media print`)
- 헤더/푸터/네비/테마토글 숨김
- 용지: A4, 여백 15mm
- 라이트 모드 강제 (`color-scheme: light`)
- 페이지 나누기 방지 (`.resume-section { page-break-inside: avoid; }`)

### 3.5 연락처 섹션 (`#contact`)

**목적:** 채용 담당자·협업 파트너가 쉽게 연락할 수 있는 채널 제공

**화면 구성:**
- **섹션 헤더**: "연락처" 제목
- **연락처 카드** (4개 채널, 반응형 그리드):
  1. **이메일**: awdzx456@naver.com (클릭 시 `mailto:` 링크)
  2. **GitHub**: https://github.com/dlsrbChoi (새 탭 열기)
  3. **LinkedIn** (선택사항): 프로필 링크 (새 탭 열기)
  4. **기타 링크** (선택사항): 블로그, 포트폴리오 등

**기술 요구사항:**
- `ContactSection` 컴포넌트 (이미 구현)
- `siteConfig`에서 이메일/링크 참조
- 아이콘 + 텍스트 카드 레이아웃
- 호버 시 언더라인/색상 변화 (Tailwind transition)

**Acceptance Criteria:**
- [x] (완료) 연락처 카드 렌더링
- [x] (완료) 이메일/GitHub 링크 동작

### 3.6 섹션 네비게이션 (우측 고정 도트)

**목적:** 현재 위치를 시각적으로 표시하고 섹션 간 빠른 네비게이션 제공

**화면 구성:**
- **위치**: 화면 우측, 중앙(top: 50%) 고정 (lg 이상만 표시)
- **도트 목록**: about, projects, resume, contact (4개)
  - 활성 섹션: 큰 도트 + 주요 색상 (--primary)
  - 비활성: 작은 도트 + 중간 색상
  - 호버 시 라벨 표시 (fade-in)

**기술 요구사항:**
- `SectionNav` 클라이언트 컴포넌트 (이미 구현)
- IntersectionObserver API로 각 섹션 가시성 감지 (`rootMargin: '0px 0px -60% 0px'`)
- 도트 클릭 시 `element.scrollIntoView({ behavior: 'smooth' })` 스크롤 이동
- CSS: `fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex` (데스크톱만)

**Acceptance Criteria:**
- [x] (완료) IntersectionObserver 기반 활성 섹션 감지
- [x] (완료) 부드러운 스크롤 이동
- [ ] (v2.0) Framer Motion으로 도트 애니메이션 추가

### 3.7 스크롤 애니메이션 (Framer Motion)

**목적:** 페이지 스크롤 시 섹션이 우아하게 등장, 사용자 경험 향상

**구현 사양:**
- **진입 애니메이션**: 각 섹션이 뷰포트에 진입할 때 fade-in + slide-up (y: 20px → 0)
- **duration**: 0.6s, **easing**: `easeOut`
- **트리거**: `useInView` (react-intersection-observer) 또는 Framer Motion 네이티브 scroll animation
- **성능**: `prefers-reduced-motion: reduce` 시 애니메이션 비활성화

**적용 대상**:
- HeroSection (즉시 보임, 애니메이션 불필요)
- AboutSection, ProjectsSection, ResumeSection, ContactSection (각각 fade-in/slide-up)
- 프로젝트 카드 호버: y: 0 → -4px, shadow 강화

**기술 요구사항:**
- `framer-motion` 라이브러리 신규 추가
- `motion.div` 래퍼로 감싸기
- `initial`, `whileInView`, `transition` props 설정
- viewport 감지: `viewport={{ once: true, amount: 0.3 }}` (한 번만 애니메이션)

### 3.8 다국어 지원 (next-intl)

**목적:** 한국어/영어 사용자에게 자신의 언어로 포트폴리오 제공

**라우팅 전략:**
- 경로 기반: `/ko/*`, `/en/*` (next-intl 기본)
- 또는 쿠키 기반: `next-intl` 미들웨어에서 언어 감지, 리다이렉트
- 기본 언어: 사용자 브라우저 언어 감지, 없으면 한국어

**구현 범위:**
- 번역 파일: `messages/ko.json`, `messages/en.json`
- 번역 항목: 
  - 헤더/푸터 메뉴
  - 섹션 제목 및 설명
  - 버튼 레이블 ("프로젝트 보기", "이력서 보기" 등)
  - 기술 스택 카테고리 이름
- 언어 전환 UI: 헤더의 언어 선택 드롭다운 또는 토글

**기술 요구사항:**
- `next-intl` 라이브러리 신규 추가
- `middleware.ts`: 언어 감지 및 라우팅
- `i18n.config.ts`: 지원 언어, 기본 언어 설정
- 컴포넌트: `useTranslations()` hook으로 번역 문자열 조회
- 동적 콘텐츠 (Notion): slug, 프로젝트명, 설명은 일단 한국어만 (다국어 확대는 Phase 3)

**Acceptance Criteria:**
- [ ] `/ko`와 `/en` 경로 분리 작동
- [ ] 언어별 메뉴/라벨 번역 표시
- [ ] 언어 전환 UI 동작

### 3.9 Google Analytics 4 (GA4) 연동

**목적:** 방문자 인터랙션(섹션 네비, 이력서 다운로드, 테마/언어 전환) 추적, 사용 패턴 분석

**추적 이벤트:**
1. **page_view**: 자동 (next-intl 경로 변화)
2. **section_click**: 사이드 네비 도트 클릭 (event_label: "about", "projects" 등)
3. **resume_download**: "인쇄/PDF 다운로드" 버튼 클릭
4. **theme_toggle**: 다크/라이트 모드 전환
5. **language_change**: 언어 전환 (ko ↔ en)
6. **project_view**: 프로젝트 상세 페이지 방문 (project_title 포함)

**구현 방식:**
- GA4 Measurement ID: 환경변수 `NEXT_PUBLIC_GA_ID`에서 읽기
- gtag 스니펫 또는 `next/third-parties` (`GoogleAnalytics` 컴포넌트) 사용
- 이벤트 전송: `gtag('event', 'event_name', { param1: value1, ... })`
- 커스텀 이벤트 래퍼 함수: `lib/ga-events.ts` (재사용 가능)

**기술 요구사항:**
- GA4 계정 설정, Measurement ID 발급
- `lib/gtag.ts` 또는 `lib/ga-events.ts`: 이벤트 함수 정의
- 컴포넌트에서 클릭/상태 변화 시 이벤트 호출
- `next/third-parties` 또는 HTML `<script>` 태그로 gtag 초기화

**Acceptance Criteria:**
- [ ] GA4 Measurement ID 등록
- [ ] 섹션 네비/이력서 버튼 클릭 이벤트 추적
- [ ] Google Analytics에서 이벤트 확인 가능

### 3.10 성능 목표 (Core Web Vitals)

**기준** (Google Lighthouse):
- **Largest Contentful Paint (LCP)**: < 2.5s (히어로 섹션 + Three.js WebGL)
- **First Contentful Paint (FCP)**: < 1.5s (초기 정적 콘텐츠)
- **Cumulative Layout Shift (CLS)**: < 0.1 (레이아웃 안정성)
- **Time to Interactive (TTI)**: < 3.5s (상호작용 가능 시간)

**최적화 전략**:
- Three.js WebGL: 초기 로드 시 정적 그래디언트 먼저 표시 (빠른 LCP)
- next-intl: 라우팅 시 번들 분할, 선택된 언어의 번역 파일만 로드
- Framer Motion: `prefers-reduced-motion` 감지, 필요시 애니메이션 비활성화
- 이미지: next/image 최적화, WebP/AVIF 자동 변환

### 3.11 다크모드 및 반응형

**원칙** (기존 유지):
- `next-themes`로 라이트/다크/시스템 모드 관리
- oklch CSS 변수로 테마 색상 동적 설정
- 모든 신규 컴포넌트는 `dark:` prefix로 다크 대응
- 반응형: `sm:` (640px), `md:` (768px), `lg:` (1024px) 브레이크포인트
- 인쇄 시 라이트 모드 강제

### 3.5 PDF 다운로드 메커니즘 (상세, 기존 내용 유지)

**선택한 방식: 브라우저 네이티브 인쇄 최적화**

#### 3.5.1 구현 전략

**CSS 규칙 (`@media print` in `globals.css`):**

```css
/* 인쇄 시 화면 전용 UI 숨김 */
@media print {
  header,
  footer,
  nav,
  .theme-toggle,
  .print-button,
  aside,
  [data-print-hidden="true"] {
    display: none !important;
  }

  /* 인쇄 용지 설정 */
  @page {
    size: A4;
    margin: 15mm;
  }

  /* 라이트 모드 강제 */
  :root {
    color-scheme: light;
  }

  /* 페이지 나누기 방지 */
  .resume-section {
    page-break-inside: avoid;
  }

  /* 링크 URL 표시 (선택사항) */
  /* a[href]:after { content: " (" attr(href) ")"; } */
}
```

**클라이언트 컴포넌트 (`PrintButton`):**

```tsx
'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden"
    >
      📄 인쇄 / PDF 다운로드
    </button>
  )
}
```

**사용자 인쇄 플로우:**
1. 웹 브라우저에서 `PrintButton` 클릭
2. `window.print()` 호출 → 브라우저 인쇄 다이얼로그 열림
3. "대상: PDF로 저장" 선택 (Chrome/Edge/Safari 기본 지원)
4. 다운로드 진행

#### 3.5.2 PDF 방식 비교 및 미채택 근거

| 방식 | 구현 복잡도 | 한글 지원 | 서버 비용 | 유지보수 | 선택 |
|---|---|---|---|---|---|
| **브라우저 네이티브 인쇄** | ⭐ | ✅ 우수 | 무료 | 쉬움 | ✅ **채택** |
| **html2pdf.js** (클라이언트) | ⭐⭐ | ⚠️ 중간 | 무료 | 중간 | ❌ |
| **Puppeteer** (서버 렌더링) | ⭐⭐⭐ | ✅ 우수 | 높음 | 어려움 | ❌ |

**네이티브 인쇄 채택 근거:**
- 의존성 추가 없음 (html2pdf.js, Puppeteer 미설치 필요)
- Vercel 서버리스 함수 실행 시간 초과 위험 없음 (Puppeteer는 웹팩/스냅샷으로 인해 번들 크기 증가)
- 사용자의 시스템 설정 존중 (기본 프린터/PDF 저장소 활용)
- 대부분의 최신 브라우저에서 "PDF로 저장" 기능 기본 지원
- 링크, 폰트, 이미지 렌더링이 웹페이지와 동일

**html2pdf.js 미채택 이유:**
- 클라이언트 사이드 캔버스 렌더링으로 복잡한 레이아웃 재현 어려움
- 한글 폰트 임베딩 시 번들 크기 증가

**Puppeteer 미채택 이유:**
- Vercel 함수 콜드 스타트 시간 증가 (스냅샷 준비)
- 환경 설정 복잡도 (브라우저 설치, 권한 문제)
- 비용 증가 (함수 실행 시간 × 함수 개수)

#### 3.5.3 크로스 브라우저 검증

- Chrome/Chromium Edge: "PDF로 저장" 기본 지원 ✅
- Safari: "PDF로 저장" 기본 지원 ✅
- Firefox: "PDF로 저장" 기본 지원 ✅
- 모바일 Safari: AirPrint 또는 "메일로 보내기" 대체 가능
- 테스트 항목: A4 용지 크기, 여백, 페이지 나누기, 색상 표현

### 3.6 소개 페이지 (`/about`)

**목적:** 성장 스토리를 텍스트와 타임라인으로 상세히 전달

**화면 구성:**
- 페이지 헤더
- 핵심 경력 타임라인 (연도별 마일스톤)
- "왜 이 기술을 선택했는가" — 의사 결정 과정 공유
- "어려움과 해결책" — 트러블슈팅 사례

**기술 요구사항:**
- 기존 `PageHeader`, `Container` 컴포넌트 활용
- `ExperienceTimeline` 컴포넌트를 about 페이지에도 재사용 (시각적 스토리텔링)

### 3.7 네비게이션 및 공통 레이아웃

**업데이트 항목:**
- `src/lib/nav.ts`: 네비게이션 메뉴 항목 추가
  ```ts
  export const navItems = [
    { label: "홈", href: "/" },
    { label: "프로젝트", href: "/projects" },
    { label: "이력서", href: "/resume" },
    { label: "소개", href: "/about" },
  ]
  ```
- `src/components/layout/header.tsx`: GitHub 링크를 `https://github.com/dlsrbChoi`로 교체
- `src/components/layout/footer.tsx`: 현재 placeholder 링크(`#`)를 실제 페이지 링크로 업데이트 (필요시)

### 3.8 다크모드 및 반응형

**원칙:**
- 기존 `next-themes` + oklch 색상 체계 그대로 사용
- 모든 신규 컴포넌트는 `dark:` prefix로 다크모드 대응
- 반응형: `md:` (768px), `lg:` (1024px) 브레이크포인트 기준
- 인쇄 시에는 라이트 모드 강제 (위 3.5.1 CSS 참조)

---

## 4. 정보 구조 및 Notion DB 스키마 (Information Architecture & Notion DB)

### 4.1 사이트맵

```
/
├── /about                      소개 페이지
├── /projects                   프로젝트 목록
│   └── /projects/[slug]        프로젝트 상세
└── /resume                     이력서 페이지
```

### 4.2 Notion Database 구성

**필요한 Notion Database 2개:**
1. **Projects Database** — 프로젝트 정보 관리
2. **Resume Database** — 경력/학력/기술/자격증 정보 관리

(선택사항) **Skills Database** — 기술 스택을 별도로 관리하려는 경우 Phase 2 이후 분리 고려

### 4.3 Projects Database Properties

Notion에서 새 Database를 생성하고 다음 Properties를 추가합니다:

| Property명 | 타입 | 설명 | 예시 |
|---|---|---|---|
| **Name** | Title | 프로젝트명 | "인천지갑 앱", "전국 지자체 통합주차포털" |
| **Slug** | Text | URL 경로용 유니크 키 | "incheon-wallet", "parking-portal" |
| **Summary** | Text | 한 줄 요약 (목록 페이지에 표시) | "공공 서비스 통합 모바일 앱" |
| **Period** | Date (range) | 프로젝트 수행 기간 | 2023.06 ~ 2024.01 |
| **Role** | Multi-select | 담당 역할 (복수 선택) | "마이그레이션 리드", "프론트엔드 개발", "API 연동" |
| **TechStack** | Multi-select | 사용 기술 (복수 선택) | "Vue.js", "TypeScript", "Spring Boot", "MySQL" |
| **ImpactMetrics** | Rich text | 핵심 성과 지표 (줄바꿈으로 구분) | "전자증명서 33종 연계\nモ바イル신분증 검증 API 연동" |
| **CoverImage** | Files & media | 프로젝트 썸네일 이미지 | (이미지 업로드) |
| **Status** | Select | 공개 여부 | Draft / Published |
| **DisplayOrder** | Number | 목록 정렬 순서 (작은 순서대로) | 1, 2, 3... |
| **ProjectType** | Select | 프로젝트 분류 | "공공기관", "개인", "협업" |
| **ExternalLink** | URL | 실제 서비스/포트폴리오 링크 (있는 경우) | https://example.com |
| **Body** | Page content (본문) | 상세 설명 (문제→해결→결과) | (Notion 페이지 콘텐츠로 작성) |

**필드 매핑 예시:**

**인천지갑 앱:**
- Name: "인천지갑 앱"
- Slug: "incheon-wallet"
- Role: ["마이그레이션 리드", "프론트엔드 개발"]
- TechStack: ["JavaScript", "Vue.js", "Spring Boot", "공공 API"]
- ImpactMetrics:
  ```
  • 서로 다른 앱 언어/프레임워크 표준화 통합 리드
  • 전자증명서 33종 연계
  • 모바일 신분증 검증 API 연동
  ```
- ProjectType: "공공기관"

**통합주차포털:**
- Name: "전국 지자체 통합주차포털"
- Slug: "parking-portal"
- Role: ["프론트엔드 마이그레이션", "결제 시스템 구축"]
- TechStack: ["Vue.js", "TypeScript", "Spring Boot", "Smartro API"]
- ImpactMetrics:
  ```
  • Vue.js 프레임워크 버전 업그레이드 마이그레이션
  • Smartro PG 결제 모듈 흐름 제어 구현
  • 라우터 지연 로딩을 통한 초기 렌더링 성능 XX% 개선
  ```
- ProjectType: "공공기관"

### 4.4 Resume Database Properties

| Property명 | 타입 | 설명 | 예시 |
|---|---|---|---|
| **Name** | Title | 항목명 | "OOO 회사", "서울대학교", "정보처리기사" |
| **EntryType** | Select | 항목 분류 | Experience / Education / Certificate |
| **Organization** | Text | 회사/학교명 | "OOO 회사", "서울대학교" |
| **Position** | Text | 직무/학위/자격명 | "개발자", "컴퓨터공학 학사", "정보처리기사" |
| **Period** | Date (range) | 근무/학력 기간 | 2020.01 ~ 2023.12 |
| **Description** | Rich text | 상세 설명 (주요 성과/학습) | "프론트엔드 개발, X 프로젝트 리드" |
| **DisplayOrder** | Number | 시간순 역순 정렬 | 1, 2, 3... |

### 4.5 개인 정보 관리 전략

**선택지 1 (권장): 코드 상수로 관리**
```ts
// src/lib/site-config.ts
export const siteConfig = {
  name: "최인규",
  email: "awdzx456@naver.com",
  github: "https://github.com/dlsrbChoi",
  phone: "(필요시)",
  location: "(필요시)",
}
```

**선택지 2: Notion 단일 페이지로 관리**
- 별도 "Profile" 페이지 생성, `getProfileData()` 함수로 페칭
- 변경이 잦은 경우 유용하나, MVP에서는 overkill

**권장사항:** 선택지 1 (코드 상수) — 자주 변경되지 않고, 배포 불필요, 타입 안전성 확보

### 4.6 TypeScript 타입 정의

**`src/types/notion.ts`:**

```ts
export interface Project {
  id: string
  name: string
  slug: string
  summary: string
  period: { start: string; end: string }
  role: string[]
  techStack: string[]
  impactMetrics: string[]
  coverImage?: { url: string; alt: string }
  status: 'draft' | 'published'
  displayOrder: number
  projectType: string
  externalLink?: string
  body: NotionBlock[]  // 또는 간단히 string (markdown/html)
}

export interface ExperienceEntry {
  id: string
  name: string
  entryType: 'experience' | 'education' | 'certificate'
  organization: string
  position: string
  period: { start: string; end: string }
  description: string
  displayOrder: number
}

export interface NotionBlock {
  type: string  // 'paragraph', 'heading_1', 'image' 등
  content: string | any
}
```

### 4.7 Notion → App 타입 변환

**`src/lib/notion-mappers.ts`:**

```ts
export function mapNotionProjectToApp(notionPage: any): Project {
  const props = notionPage.properties
  return {
    id: notionPage.id,
    name: props.Name.title[0]?.plain_text || '',
    slug: props.Slug.rich_text[0]?.plain_text || '',
    summary: props.Summary.rich_text[0]?.plain_text || '',
    period: {
      start: props.Period.date?.start || '',
      end: props.Period.date?.end || '',
    },
    role: props.Role.multi_select.map((m: any) => m.name),
    techStack: props.TechStack.multi_select.map((m: any) => m.name),
    impactMetrics: props.ImpactMetrics.rich_text[0]?.plain_text
      ?.split('\n')
      .filter(Boolean) || [],
    // ... 기타 필드
  }
}
```

### 4.8 API 함수 설계

**`src/lib/notion.ts`:**

```ts
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function getProjects(): Promise<Project[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DB_ID!,
    filter: {
      property: 'Status',
      select: { equals: 'Published' },
    },
    sorts: [{ property: 'DisplayOrder', direction: 'ascending' }],
  })
  
  return response.results.map(mapNotionProjectToApp)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug) || null
}

export async function getResumeData(): Promise<{
  experiences: ExperienceEntry[]
  education: ExperienceEntry[]
  certificates: ExperienceEntry[]
}> {
  // Resume DB 조회 로직
}
```

### 4.9 콘텐츠 거버넌스

- **공개 여부:** Status = "Published"인 항목만 렌더링
  - `generateStaticParams`에서 Published 필터링
  - `getProjects` 함수에서 Status 조건 적용
- **정렬 순서:** DisplayOrder 필드로 수동 관리 (오름차순)
- **Draft 프로젝트:** 로컬 개발 환경에서만 표시하도록 설정 가능 (선택사항)

---

## 5. UI/UX 디자인 원칙 (Design Principles)

### 5.1 기존 컴포넌트 재사용 원칙

포트폴리오 사이트의 일관성을 위해 기존 스타터킷 컴포넌트를 최대한 재사용합니다.

**재사용 컴포넌트:**
- `Hero` (src/components/patterns/hero.tsx): 메인 페이지 히어로
- `PageHeader` (src/components/patterns/page-header.tsx): 페이지 상단 제목/설명
- `FeatureGrid` (src/components/patterns/feature-grid.tsx): 스킬/기술 그리드로 변형
- `CodeBlock` (src/components/patterns/code-block.tsx): 프로젝트 상세 내 코드 스니펫
- `Container` (src/components/layout/container.tsx): 중앙 정렬 래퍼 (max-w-6xl)
- `Header` / `Footer` (src/components/layout/): 상단/하단 공통 레이아웃

**원칙:**
- `cn()` 유틸리티로 클래스 병합 (동적 스타일 충돌 방지)
- CVA (class-variance-authority) 패턴 준수
- oklch 색상 변수만 사용 (새 색상 추가 금지)

### 5.2 신규 컴포넌트 설계

| 컴포넌트명 | 파일 경로 | 책임 | Props |
|---|---|---|---|
| **ProjectCard** | `src/components/projects/project-card.tsx` | 목록 페이지용 카드 | `project: Project`, `className?: string` |
| **ProjectHero** | `src/components/projects/project-hero.tsx` | 상세 페이지 상단 | `project: Project` |
| **ImpactMetrics** | `src/components/projects/impact-metrics.tsx` | 성과 지표 시각화 | `metrics: string[]` |
| **TechStackBadges** | `src/components/projects/tech-stack-badges.tsx` | 기술 스택 뱃지 | `stack: string[]` |
| **NotionRenderer** | `src/components/projects/notion-renderer.tsx` | Notion 블록 → React | `blocks: NotionBlock[]` 또는 `html: string` |
| **PrintButton** | `src/components/patterns/print-button.tsx` | 인쇄 트리거 버튼 | `className?: string` |
| **ResumePrintLayout** | `src/components/resume/resume-print-layout.tsx` | 인쇄 전용 레이아웃 래퍼 | `children: ReactNode` |
| **ExperienceTimeline** | `src/components/resume/experience-timeline.tsx` | 경력 타임라인 | `items: ExperienceEntry[]` |

### 5.3 shadcn/ui 컴포넌트 활용

**기존 설치 컴포넌트 재사용:**
- `Badge`: 역할/기술 스택 뱃지
- `Card`: 프로젝트 카드, 섹션 박스
- `Separator`: 섹션 구분선
- `Skeleton`: 로딩 플레이스홀더
- `Button`: CTA 버튼, 인쇄 버튼

**신규 설치 후보 (필요시):**
- `Tabs`: 프로젝트 필터링 (Phase 2)
- `Select`: 정렬/필터 드롭다운 (Phase 2)
- `Dialog`: 이미지 모달 (Phase 2)

**설치 명령어:**
```bash
npx shadcn@latest add <component-name>
# components.json 설정 유지: style: base-nova, baseColor: neutral, iconLibrary: lucide
```

### 5.4 색상 및 타이포그래피

**색상 시스템:**
- oklch 변수 그대로 사용 (src/app/globals.css)
- 기존 변수: `--primary`, `--secondary`, `--accent`, `--destructive`, `--muted`, `--card`, `--border` 등
- 현재 팔레트는 흑백 기반 무채색 그레이스케일이므로, 임팩트 강조가 필요한 부분(`ImpactMetrics`, 중요 링크 등)에는 `--primary`/`--accent` 활용

**타이포그래피:**
- 폰트 파밀리: `Geist` (폰트 재사용 from layout.tsx)
- 헤드라인: h1-h3로 시맨틱 구조 (SEO)
- 본문: body 기본 텍스트 크기

### 5.5 인쇄 전용 스타일

**`@media print` 규칙 위치:**
- `src/app/globals.css` 최하단에 새 섹션으로 추가
- 기존 import (`tw-animate-css`, `shadcn/tailwind.css`) 이후에 배치하여 오버라이드 가능하도록 함

**주요 규칙:**
```css
@media print {
  /* 화면 전용 UI 숨김 */
  header, footer, nav, .print-button,
  .theme-toggle, [data-no-print] {
    display: none !important;
  }

  /* 용지 설정 */
  @page {
    size: A4;
    margin: 15mm;
  }

  /* 라이트 모드 강제 */
  :root {
    color-scheme: light;
  }

  /* 섹션 페이지 나누기 방지 */
  .resume-section {
    page-break-inside: avoid;
  }

  /* 링크 스타일 */
  a {
    color: #0000ee;  /* 웹 기본 파란색 */
    text-decoration: underline;
  }
}
```

### 5.6 반응형 설계

**브레이크포인트 (TailwindCSS 기본):**
- `sm`: 640px (생략 가능, 기본값)
- `md`: 768px (태블릿)
- `lg`: 1024px (데스크톱)
- `xl`: 1280px (큰 화면)

**적용 예시:**
- 프로젝트 그리드: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- 프로젝트 히어로 이미지: 풀 너비, 모바일에서 높이 제한
- 텍스트 크기: `text-base md:text-lg lg:text-xl`

### 5.7 접근성 원칙

- **이미지 alt 텍스트:** 모든 프로젝트 썸네일/아이콘에 의미 있는 alt 텍스트
- **색상만으로 정보 전달 금지:** 뱃지/상태는 텍스트 + 색상으로 구분
- **시맨틱 HTML:** `<h1>`, `<h2>`, `<h3>`, `<article>`, `<section>` 올바르게 사용
- **포커스 스타일:** 키보드 네비게이션 시 포커스 링 표시
- **명도 대비:** WCAG AA 기준 이상 (특히 인쇄 시 흑백 대비 확보)

### 5.8 로딩/에러 상태

**패턴:**
- `src/app/projects/loading.tsx`: Skeleton 카드 그리드
- `src/app/projects/[slug]/loading.tsx`: Skeleton 페이지 레이아웃
- `src/app/projects/[slug]/not-found.tsx`: 404 페이지 (존재하지 않는 slug)
- `src/app/projects/error.tsx`: 에러 바운더리

**구현:** 기존 스타터킷 패턴 그대로 확장 (loading.tsx, error.tsx, not-found.tsx)

---

## 6. 단계별 개발 계획 (Phased Implementation Plan)

### ✅ Phase 0: Notion 기반 설정 및 API 연동 기초 — 완료

**기간:** 1-2일  
**목표:** Notion Database 설정, Next.js와 Notion API 연동 검증

**작업 항목:**
1. ✅ Notion 워크스페이스에 Projects Database, Resume Database 생성
2. ✅ 각 DB의 Properties 정의 (섹션 4.3-4.4 스키마 따라 설정)
3. ✅ `@notionhq/client` npm 설치
4. ✅ `.env.local` 파일 생성, Notion Integration Token 및 DB ID 저장
5. ✅ `src/lib/notion.ts` 작성 — Notion Client 초기화, 데이터 페칭 함수 구현
6. ✅ `src/types/notion.ts` 작성 — TypeScript 타입 정의
7. ✅ `src/lib/notion-mappers.ts` 작성 — Notion 응답 → App 타입 변환
8. ✅ 로컬에서 데이터 fetch 성공 확인

**완료 기준:**
- [x] Notion API 인증 성공, DB 조회 가능
- [x] 콘솔에 Projects/Resume 데이터 출력됨
- [x] TypeScript 타입 에러 없음

---

### ✅ Phase 1: 원페이지 구조 + 섹션 렌더링 — 완료

**기간:** 2-3일  
**목표:** 원페이지 구조로 메인/소개/프로젝트/이력서/연락처 섹션 구현

**작업 항목:**
1. ✅ `src/app/page.tsx` 수정 — 섹션 컴포넌트 조합 (HeroSection + AboutSection + ProjectsSection + ResumeSection + ContactSection)
2. ✅ 각 섹션 컴포넌트 신규 구현:
   - `HeroSection`: 프로필 사진 + 성장 스토리 + CTA 버튼
   - `AboutSection`: 통계 + 강점 카드
   - `ProjectsSection`: 프로젝트 카드 그리드
   - `ResumeSection`: 경력/학력/기술/자격증
   - `ContactSection`: 연락처 링크
3. ✅ `SectionNav`: 우측 고정 도트 네비 (IntersectionObserver)
4. ✅ `ProjectCard`: 카드 레이아웃 구현
5. ✅ Notion 데이터 연동 (`getProjects()`, `getResumeData()` 호출)
6. ✅ 다크모드/반응형 테스트

**완료 기준:**
- [x] 원페이지 구조 동작
- [x] 모든 섹션이 앵커 스크롤로 네비게이션
- [x] Notion 데이터가 섹션에 렌더링됨
- [x] 다크모드/모바일 반응형 확인

---

### ✅ Phase 2: 프로젝트 상세 페이지 — 완료

**기간:** 2-3일  
**목표:** 동적 라우트 구현, SSG/ISR 검증, 상세 페이지 렌더링

**작업 항목:**
1. ✅ `src/app/projects/[slug]/page.tsx` 신규 작성
   - `generateStaticParams()`: Projects DB에서 slug 배열 추출
   - `params: Promise<{slug:string}>` + `await params` (Next.js 16)
   - `getProjectBySlug()`, Notion 블록 페칭
   - `notFound()` 처리
2. ✅ 컴포넌트 구현:
   - `ProjectHero`, `ImpactMetrics`, `TechStackBadges`, `NotionRenderer`
3. ✅ `loading.tsx` / `not-found.tsx` — 로딩 및 404 UI
4. ✅ Notion 데이터 입력 — 프로젝트 상세 정보
5. ✅ 빌드 & 테스트 — SSG 정적 생성 확인

**완료 기준:**
- [x] 빌드 시 모든 Published 프로젝트 정적 페이지 생성
- [x] `/projects/[slug]` 상세 페이지 렌더링
- [x] 임팩트 지표·기술 스택 표시
- [x] Notion 본문 렌더링
- [x] 404 페이지 동작

---

### ✅ Phase 3: 이력서 섹션 및 PDF 다운로드 — 완료

**기간:** 1-2일  
**목표:** 이력서 섹션 구현, 인쇄 최적화 및 크로스 브라우저 검증

**작업 항목:**
1. ✅ `ResumeSection` 컴포넌트 구현
   - `getResumeData()` 호출 (경력/학력/기술 조회)
   - 타임라인 시각화
2. ✅ `PrintButton` 클라이언트 컴포넌트
   - `window.print()` 트리거
3. ✅ `src/app/globals.css` 업데이트
   - `@media print` 블록 추가
   - 헤더/푸터/네비 숨김, A4 용지 설정, 라이트 모드 강제
4. ✅ 인쇄 테스트 — Chrome/Edge/Safari 검증

**완료 기준:**
- [x] `#resume` 섹션 표시
- [x] 인쇄 버튼 동작
- [x] A4 용지, 15mm 여백 인쇄물 생성
- [x] 크로스 브라우저 검증 완료

---

### ✅ Phase 4: 폴리싱 및 배포 준비 — 완료

**기간:** 1-2일  
**목표:** 전체 검증, 성능 최적화, Vercel 배포

**작업 항목:**
1. ✅ 다크모드/반응형 최종 검증
2. ✅ 메타데이터 설정 (title, description, OG 이미지, robots.txt, sitemap)
3. ✅ ISR `revalidate: 86400` (1일) 설정
4. ✅ Vercel 배포 — GitHub 연동, 환경변수 설정
5. ✅ 배포 후 검증 — 프로덕션 URL 확인
6. ✅ Lighthouse 성능 측정 (Performance 95, 나머지 100)

**완료 기준:**
- [x] Vercel 배포 완료
- [x] 프로덕션 URL 정상 작동
- [x] Lighthouse 성능 점수 90+ (실제 95+)

---

### Phase 5: 프로젝트 섹션 개편 (주요/사이드 분리)

**기간:** 1-2일  
**목표:** ProjectType 기반으로 주요 프로젝트/사이드 프로젝트 분리 표시

**작업 항목:**
1. `ProjectsSection` 컴포넌트 수정
   - `getProjects()` 호출 후 ProjectType으로 필터링
   - 주요 프로젝트: `projectType === 'public' || 'collaboration'`
   - 사이드 프로젝트: `projectType === 'personal'`
   - 각 그룹을 별도 제목 + 카드 그리드로 표시
2. Notion Projects DB의 ProjectType 값 검토/갱신
   - 기존 프로젝트에 ProjectType 설정 (없으면 추가)
3. UI 폴리싱
   - 두 섹션 간 시각적 구분 (배경색, 패딩 등)
4. 테스트 — 프로젝트 그룹핑 정확성 확인

**완료 기준:**
- [ ] 주요/사이드 프로젝트 분리 UI 렌더링
- [ ] 각 그룹 내 DisplayOrder 순서 유지
- [ ] 모바일에서도 두 섹션 구분 명확

---

### Phase 6: 비주얼 폴리싱 (Framer Motion + Three.js)

**기간:** 2-3일  
**목표:** 스크롤 애니메이션 및 히어로 WebGL 배경 구현

**작업 항목:**

#### 6.1 Framer Motion 설치 및 섹션 애니메이션
```bash
npm install framer-motion
```

1. 섹션 애니메이션 구현
   - AboutSection, ProjectsSection, ResumeSection, ContactSection을 `motion.div`로 래핑
   - 설정:
     ```tsx
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, ease: "easeOut" }}
       viewport={{ once: true, amount: 0.3 }}
     >
       {/* 콘텐츠 */}
     </motion.div>
     ```
   - 모션 감소 대응: `useMediaQuery("(prefers-reduced-motion: reduce)")`로 감지, 애니메이션 비활성화

2. 프로젝트 카드 호버 애니메이션
   - 호버 시 y: 0 → -4px, shadow 강화
   - 클릭 시 `/projects/[slug]`로 이동

#### 6.2 Three.js WebGL 히어로 배경 구현

**라이브러리 설치:**
```bash
npm install three @react-three/fiber @react-three/drei
```

**아키텍처:**
```
src/components/effects/
├── liquid-background.tsx      # Three.js 메인 컴포넌트
├── liquid-shader.ts           # Shader 코드 (유체 시뮬레이션)
└── use-liquid-simulation.ts   # Custom hook (성능 최적화)
```

**구현 전략:**
1. **초기 로드 성능**: 정적 그래디언트 먼저 표시
   ```tsx
   // HeroSection에서:
   {!webglReady && <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />}
   {isDesktop && <LiquidBackground onReady={() => setWebglReady(true)} />}
   ```

2. **모바일 감지**: 768px 이하는 WebGL 비활성화
   ```tsx
   const isDesktop = useMediaQuery('(min-width: 768px)')
   ```

3. **조건부 렌더링**: 
   - 데스크톱 (lg): WebGL 활성화
   - 모바일: 정적 그래디언트 (LCP 1.5s 이내)
   - 저사양 기기: GPU 미지원 감지, fallback 적용

4. **Shader 최적화**:
   - Fragment shader: 기본적인 노이즈 기반 유체 시뮬레이션 (LiquidEther 유사)
   - Vertex shader: 단순화 (메시 해상도 256x256 이하)
   - Update frequency: 60fps (requestAnimationFrame)

5. **성능 모니터링**:
   ```tsx
   // 성능 측정 (DevTools 또는 web-vitals)
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
   ```

#### 6.3 성능 목표 검증

- **LCP**: < 2.5s (정적 콘텐츠 + WebGL 페이드 인)
- **FCP**: < 1.5s (정적 그래디언트 표시)
- **Lighthouse**: 90+ 유지

#### 6.4 크로스 브라우저 테스트
- Chrome/Edge: WebGL 지원 ✓
- Safari: WebGL 지원 ✓ (iOS 8.1+)
- Firefox: WebGL 지원 ✓
- 모바일: 정적 그래디언트로 graceful degrade ✓

**완료 기준:**
- [ ] 섹션 fade-in/slide-up 애니메이션 동작
- [ ] Three.js 히어로 배경 렌더링 (데스크톱)
- [ ] 성능 기준 충족 (LCP < 2.5s, Lighthouse 90+)
- [ ] 모바일 정적 그래디언트 fallback 정상 작동
- [ ] `prefers-reduced-motion` 준수

---

### Phase 7: 다국어 및 분석 연동

**기간:** 2-3일  
**목표:** next-intl 다국어 지원 + GA4 분석 연동

#### 7.1 next-intl 다국어 설정

**라이브러리 설치:**
```bash
npm install next-intl
```

**파일 구조:**
```
src/
├── i18n/
│   ├── config.ts              # next-intl 설정 (지원 언어, 기본값)
│   └── messages/
│       ├── ko.json            # 한국어 번역
│       └── en.json            # 영어 번역
└── middleware.ts              # 언어 감지 및 라우팅 (기존 수정)
```

**설정 예시** (`src/i18n/config.ts`):
```ts
export const defaultLocale = 'ko'
export const locales = ['ko', 'en'] as const
export const localeNames: Record<string, string> = {
  ko: '한국어',
  en: 'English',
}
```

**미들웨어** (`src/middleware.ts`):
```ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'as-needed', // /ko는 생략, /en은 /en으로 표시
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
```

**번역 파일** (`src/i18n/messages/ko.json`):
```json
{
  "nav": {
    "about": "소개",
    "projects": "프로젝트",
    "resume": "이력서",
    "contact": "연락처"
  },
  "hero": {
    "headline": "프론트엔드에서 풀스택으로",
    "description": "UI/UX 구현에서 출발해 공공 프로젝트의 백엔드 로직까지 이해 범위를 넓혀온 성장형 개발자입니다."
  },
  "actions": {
    "viewProjects": "프로젝트 보기",
    "viewResume": "이력서 보기",
    "downloadPDF": "PDF 다운로드"
  }
}
```

#### 7.2 컴포넌트 국제화

**예시 (Header 컴포넌트):**
```tsx
'use client'
import { useTranslations } from 'next-intl'

export function Header() {
  const t = useTranslations()
  
  return (
    <nav>
      <a href="#about">{t('nav.about')}</a>
      <a href="#projects">{t('nav.projects')}</a>
      <a href="#resume">{t('nav.resume')}</a>
      <a href="#contact">{t('nav.contact')}</a>
    </nav>
  )
}
```

#### 7.3 언어 전환 UI

**구현 위치**: 헤더 우측 또는 푸터
```tsx
'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  
  const toggleLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }
  
  return (
    <select value={locale} onChange={(e) => toggleLanguage(e.target.value)}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  )
}
```

#### 7.4 GA4 연동

**GA4 계정 설정:**
1. Google Analytics 콘솔 → Measurement ID (G-XXXXXXXXXX) 발급
2. `.env.local`에 저장: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

**라이브러리 설치:**
```bash
npm install @react-google-analytics/core
# 또는 HTML 스니펫 직접 사용
```

**Google Analytics 컴포넌트 (`src/components/ga-tracker.tsx`):**
```tsx
'use client'
import { useEffect } from 'react'

export function GATracker() {
  useEffect(() => {
    // gtag 초기화
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', process.env.NEXT_PUBLIC_GA_ID)
  }, [])
  
  return (
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
    />
  )
}
```

**루트 레이아웃에 추가:**
```tsx
import { GATracker } from '@/components/ga-tracker'

export default function RootLayout() {
  return (
    <html>
      <body>
        <GATracker />
        {/* ... */}
      </body>
    </html>
  )
}
```

#### 7.5 이벤트 추적 구현

**이벤트 헬퍼** (`src/lib/ga-events.ts`):
```ts
export function trackSectionClick(section: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'section_click', {
      section: section,
    })
  }
}

export function trackResumeDownload() {
  window.gtag?.('event', 'resume_download')
}

export function trackThemeToggle(theme: 'light' | 'dark') {
  window.gtag?.('event', 'theme_toggle', {
    theme: theme,
  })
}

export function trackLanguageChange(language: string) {
  window.gtag?.('event', 'language_change', {
    language: language,
  })
}

export function trackProjectView(projectId: string, projectTitle: string) {
  window.gtag?.('event', 'project_view', {
    project_id: projectId,
    project_title: projectTitle,
  })
}
```

**컴포넌트에서 사용:**
```tsx
// SectionNav에서
const handleClick = (section: string) => {
  trackSectionClick(section)
  // ... 스크롤 로직
}

// PrintButton에서
const handlePrint = () => {
  trackResumeDownload()
  window.print()
}

// ThemeToggle에서
const handleThemeChange = (theme: 'light' | 'dark') => {
  trackThemeToggle(theme)
  // ... 테마 변경
}
```

#### 7.6 Notion 콘텐츠 다국어 확대 (Phase 8 고려사항)

**현황**: 프로젝트/이력 설명은 한국어만 지원
**향후 확대 옵션**:
1. **Notion DB 이중 기록**: ko_*, en_* 필드로 분리
2. **번역 API 연동**: Google Translate API (자동 번역)
3. **별도 번역 DB**: 다국어 콘텐츠를 별도 Notion DB에서 관리

**완료 기준:**
- [ ] `/ko`와 `/en` 경로 분리 작동 (라우팅 정상)
- [ ] 언어별 메뉴/라벨 번역 표시 (`useTranslations()` 동작)
- [ ] 언어 전환 UI 동작 (헤더 또는 푸터)
- [ ] GA4 Measurement ID 설정 완료
- [ ] 추적 이벤트 GA4 대시보드에 수집 확인 (최소 5개 이벤트)

---

### Phase별 소요 기간 요약

| Phase | 주요 활동 | 예상 기간 | 상태 |
|---|---|---|---|
| Phase 0 | Notion 셋업, API 연동 기초 | 1-2일 | ✅ 완료 |
| Phase 1 | 원페이지 구조, 섹션 렌더링 | 2-3일 | ✅ 완료 |
| Phase 2 | 프로젝트 상세, SSG/ISR | 2-3일 | ✅ 완료 |
| Phase 3 | 이력서, PDF 다운로드 | 1-2일 | ✅ 완료 |
| Phase 4 | 폴리싱, Vercel 배포 | 1-2일 | ✅ 완료 |
| Phase 5 | 프로젝트 섹션 개편 | 1-2일 | 📋 계획 중 |
| Phase 6 | Framer Motion + Three.js | 2-3일 | 📋 계획 중 |
| Phase 7 | 다국어 + GA4 | 2-3일 | 📋 계획 중 |
| **합계** | 전체 구현 및 배포 | **14-21일** | 진행 중 |

*Phase 0~4는 이미 완료되었습니다. Phase 5~7은 v2.0 신규 기능입니다.*

---

## 부록: 기술 문서 및 참고 자료

### 트러블슈팅 가이드 (개발 중 참고)

**Q: Notion API 인증 실패**
- A: Integration Token이 올바르게 설정되었는지 확인, Notion 워크스페이스의 각 DB에 Integration이 연결되었는지 확인

**Q: `generateStaticParams`가 빈 배열 반환**
- A: Notion API 응답 구조 확인, Status 필터링이 정확한지 확인, 콘솔 로그로 디버깅

**Q: 인쇄 시 헤더/푸터가 여전히 보임**
- A: `@media print` CSS 규칙이 `globals.css` 끝에 있는지 확인, 브라우저 개발자 도구 → 인쇄 미리보기에서 "배경 그래픽" 옵션 체크 해제 여부 확인

**Q: 한글이 PDF에서 깨짐**
- A: 시스템에 한글 폰트가 설치되어 있는지 확인, CSS에서 폰트-family 우선순위 확인 (Geist → 한글 폰트 폴백)

### 참고 링크

**공식 문서:**
- [Notion API 공식 문서](https://developers.notion.com)
- [Next.js 16 App Router](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com)
- [TailwindCSS v4](https://tailwindcss.com/docs)
- [Framer Motion 공식 문서](https://www.framer.com/motion)
- [Three.js 공식 문서](https://threejs.org/docs)
- [next-intl 공식 문서](https://next-intl-docs.vercel.app)

**디자인/기능 참고 레퍼런스:**
- [junheedot.com 포트폴리오](https://junheedot.com/) — 원페이지 구조, 섹션 네비, 다국어, 애니메이션 참고
- [junheedot 제작기 블로그](https://junheedot.tistory.com/entry/하루만에-포트폴리오-사이트-만들기-with-Claude-Code) — Next.js 16 기반 포트폴리오 구현 경험 공유, Framer Motion/Three.js/GA4 활용 사례

---

---

**문서 버전:** v2.0  
**작성 완료:** 2026-08-11  
**마지막 갱신:** Phase 0~4 완료 마킹, Phase 5~7 신규 계획 추가, junheedot 참고 자료 반영  
**다음 단계:** Phase 5 (프로젝트 섹션 개편) 착수
