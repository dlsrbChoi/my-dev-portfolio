# Notion CMS 개발자 포트폴리오 개발 로드맵

Notion을 헤드리스 CMS로 활용해, 재배포 없이 콘텐츠를 갱신할 수 있는 개발자 포트폴리오 웹사이트를 만듭니다.

## 개요

Notion CMS 포트폴리오는 **채용 담당자·기술 면접관·협업 파트너**를 위한 **"5초 안에 핵심 역량을 파악할 수 있는 인터랙티브 이력서"**로 다음 기능을 제공합니다:

- **Notion 기반 콘텐츠 관리**: Projects/Resume DB를 SSG + ISR로 페칭해 재배포 없이 콘텐츠 갱신
- **원페이지 + 상세 페이지 구조**: 히어로 → 소개 → 프로젝트 → 이력서 → 연락처 앵커 스크롤, 프로젝트는 `/projects/[slug]` 상세 페이지로 심화
- **웹 이력서 및 PDF 다운로드**: 브라우저 네이티브 인쇄 기반 A4 최적화 출력
- **비주얼 인터랙션**: Framer Motion 스크롤 애니메이션 + Three.js 히어로 WebGL 배경
- **다국어 및 분석**: next-intl 기반 한/영 지원, GA4 방문자 인터랙션 추적

**기술 스택**: Next.js 16.2.12 (App Router) · React 19.2.4 · TypeScript 5 · TailwindCSS v4 · shadcn/ui (base-nova) · @notionhq/client · Vercel

**참고 문서**: [`docs/PRD.md`](./PRD.md) (v2.0)

---

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `docs/ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `009-project-type-filter.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
   - 직전 완료 작업 2개를 예시로 참조 (예: 현재가 `012`라면 `011`, `010` 참조)
   - 신규 작업 문서는 빈 체크박스 상태로 작성하고, 변경 사항 요약은 작성하지 않음

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 후 작업 파일 내 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시

---

## 개발 단계

### Phase 1: 데이터 계층 및 애플리케이션 골격 ✅

- **Task 001: Notion 연동 기반 구축** ✅ - 완료
  - ✅ Notion 워크스페이스에 Projects DB / Resume DB 생성 및 Properties 정의
  - ✅ `@notionhq/client` 설치 및 `.env.local` 환경변수 구성 (`NOTION_API_KEY`, `NOTION_PROJECTS_DB_ID`, `NOTION_RESUME_DB_ID`)
  - ✅ `src/lib/notion.ts` — Notion Client 초기화 및 데이터 페칭 함수 구현
  - ✅ 로컬 환경에서 Projects/Resume 데이터 fetch 성공 검증

- **Task 002: 타입 정의 및 매퍼 계층 설계** ✅ - 완료
  - ✅ `src/types/notion.ts` — `Project`, `ExperienceEntry` 인터페이스 정의
  - ✅ `src/lib/notion-mappers.ts` — Notion 응답 → 앱 타입 변환 로직
  - ✅ `src/lib/site-config.ts` — 개인 정보 및 기술 스택 카테고리 상수화
  - ✅ TypeScript strict mode 타입 에러 0건 확인

### Phase 2: 원페이지 UI 구축 ✅

- **Task 003: 원페이지 섹션 컴포넌트 구현** ✅ - 완료
  - ✅ `src/app/page.tsx` — 5개 섹션 조합 (Hero → About → Projects → Resume → Contact)
  - ✅ `src/components/sections/` — hero / about / projects / resume / contact 섹션 컴포넌트
  - ✅ `ProjectCard` 카드 레이아웃 및 반응형 그리드 (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
  - ✅ Notion 데이터 연동 (`getProjects()`, `getResumeData()`)
  - **참고 포트폴리오 반영**:
    - ✅ ProjectCard에 임팩트 메트릭 미리보기 (상세 페이지로 이동 시 전체 표시)
    - ✅ 기술 스택 뱃지 카드에 배치 (최대 3개 표시, "더보기" 링크)
    - ✅ About 섹션에 통계 카드 (연차, 프로젝트 수, 기술 스택 수)

- **Task 004: 섹션 네비게이션 및 공통 레이아웃** ✅ - 완료
  - ✅ `src/components/layout/section-nav.tsx` — IntersectionObserver 기반 우측 고정 도트 네비
  - ✅ 활성 섹션 감지 (`rootMargin: '0px 0px -60% 0px'`) 및 `scrollIntoView` 부드러운 스크롤
  - ✅ Header / Footer / Container / ThemeToggle / MobileNav 통합
  - ✅ 다크모드(next-themes) 및 반응형 검증

### Phase 3: 프로젝트 상세 페이지 및 이력서 ✅

- **Task 005: 프로젝트 상세 페이지 (SSG + ISR)** ✅ - 완료
  - ✅ `src/app/projects/[slug]/page.tsx` — `generateStaticParams()`로 Published 프로젝트 정적 생성
  - ✅ `params: Promise<{slug: string}>` + `await params` (Next.js 16 필수 패턴) 적용
  - ✅ `ProjectHero` / `ImpactMetrics` / `TechStackBadges` / `NotionRenderer` 컴포넌트 구현
  - ✅ `loading.tsx` (Skeleton) / `not-found.tsx` (404) 처리
  - ✅ ISR `revalidate: 86400` 설정 및 빌드 시 정적 생성 확인
  - **참고 포트폴리오 반영**:
    - ✅ ImpactMetrics: 정량적 성과 강조 (KPI, 기간, 팀 규모 등)
    - 프로젝트 관련 GIF/스크린샷 시연 (Phase 10 고려)
    - 이전/다음 프로젝트 네비게이션 링크 (하단)

- **Task 006: 이력서 섹션 및 PDF 인쇄 최적화** ✅ - 완료
  - ✅ `ResumeSection` — `getResumeData()` 기반 경력/학력/기술/자격증 렌더링
  - ✅ `ExperienceTimeline` 경력 타임라인 시각화
  - ✅ `PrintButton` 클라이언트 컴포넌트 (`window.print()` 트리거)
  - ✅ `globals.css` `@media print` — 화면 전용 UI 숨김, A4/15mm 여백, 라이트 모드 강제, `page-break-inside: avoid`
  - ✅ Chrome / Edge / Safari / Firefox 인쇄 크로스 브라우저 검증

### Phase 4: 배포 및 SEO ✅

- **Task 007: 메타데이터 및 SEO 구성** ✅ - 완료
  - ✅ `layout.tsx` 메타데이터 (title, description, OG 이미지)
  - ✅ `src/app/sitemap.ts` / `src/app/robots.ts` 생성
  - ✅ 시맨틱 HTML 구조 및 이미지 alt 텍스트 적용

- **Task 008: Vercel 배포 및 성능 측정** ✅ - 완료
  - ✅ GitHub 연동 및 Vercel 프로젝트 생성, 환경변수 등록
  - ✅ 프로덕션 URL 정상 동작 검증
  - ✅ Lighthouse 측정 — Performance 95, Accessibility/Best Practices/SEO 100

---

### Phase 5: 프로젝트 섹션 개편 (주요/사이드 분리) 🟡 구현 완료 (커밋 대기)

> **의존성**: 없음 (독립 착수 가능) · **예상 기간**: 1-2일

> ⚠️ **상태 참고**: 아래 두 Task는 워킹 디렉토리에 코드 구현이 완료되어 있으나 아직 커밋되지 않았습니다. 남은 작업은 검증 및 커밋뿐입니다.

- **Task 009: ProjectType 타입 안전화 및 그룹핑 유틸 구현** 🟡 구현 완료 (커밋 대기)
  - ✅ `src/types/notion.ts` — `ProjectType = 'public' | 'personal' | 'collaboration'` 유니온 타입 정의 및 `Project.projectType` 적용
  - ✅ `src/lib/notion-mappers.ts` — `normalizeProjectType()` 함수 추가 (`projectTypeMap`으로 한글 → 영문 정규화, 미지정/알 수 없는 값은 `'personal'` 폴백)
  - ✅ `src/lib/project-utils.ts` (신규) — `groupProjectsByType(projects)` 구현: `{ main: Project[], side: Project[] }` 반환, 각 그룹 `displayOrder` 오름차순 정렬
  - [ ] `notion-mappers.ts`의 `as any` 캐스팅 잔존 여부 재확인 및 타입 가드로 대체
  - [ ] `npm run lint` / TypeScript strict 타입 에러 0건 확인 후 커밋

- **Task 010: 주요/사이드 프로젝트 분리 UI 구현** 🟡 구현 완료 (커밋 대기)
  - ✅ `src/components/sections/projects-section.tsx` — `groupProjectsByType()` 연동, 주요/사이드 그룹 분리 렌더링
  - [ ] 그룹별 서브 헤딩(`<h3>`) 텍스트 및 시각적 구분(배경/패딩/Separator)이 참고 사이트 톤과 일치하는지 리뷰
  - [ ] 그룹이 비어 있을 경우 해당 그룹 전체 미렌더링 여부 확인 (빈 헤딩 방지)
  - [ ] Notion Projects DB의 기존 프로젝트에 `ProjectType` 값 실제 입력/검토 (현재 폴백값 `'personal'`에 몰려있지 않은지 확인)

  **테스트 체크리스트 (Playwright MCP, 커밋 전 실행)**
  - [ ] `/` 접속 → "주요 프로젝트" / "사이드 프로젝트" 두 헤딩 존재 확인
  - [ ] 각 그룹 카드 개수와 순서가 `displayOrder`와 일치하는지 검증
  - [ ] 카드 클릭 → `/projects/[slug]` 이동 및 상세 렌더링 확인
  - [ ] 375px / 768px / 1280px 뷰포트에서 그룹 구분 및 그리드 열 수 확인
  - [ ] ProjectType 미지정 프로젝트가 누락 없이 폴백 그룹에 표시되는지 확인

---

### Phase 6: 비주얼 폴리싱 (Framer Motion + Three.js) ✅

> **의존성**: Task 010 완료 후 카드 호버 애니메이션 적용 권장 (그 외 병렬 가능) · **예상 기간**: 2-3일

> ✅ **완료 참고**: shrimp-task-manager로 코드 검토 → 결함 발견/수정 → Playwright 실측 검증까지 완료했습니다. 검증 과정에서 실제로 동작하지 않던 결함 다수(그림자 호버 죽은 클래스, 하이드레이션 불일치, WebGL 메모리 누수, ErrorBoundary로 히어로 전체가 무너지는 버그, oklch→RGB 변환 실패, lint 에러 등)를 발견해 함께 수정했습니다. 아직 git 커밋은 하지 않은 상태입니다.

- **Task 011: Framer Motion 모션 래퍼 및 섹션 진입 애니메이션** ✅ - 완료
  - ✅ `framer-motion` 설치 (`package.json`)
  - ✅ `src/components/motion/fade-in-section.tsx` — `FadeInSection` 래퍼 컴포넌트. `initial/whileInView/transition/viewport` 명세 일치 확인, 미사용 `cn` import 제거
  - ✅ `src/app/page.tsx` — About/Projects/Resume/Contact에 `FadeInSection` 적용(delay 0/100/200/300ms 계단식), Hero 제외. 서버(async) 섹션과 클라이언트 모션 래퍼의 RSC 합성 경계 정상 확인
  - ✅ `src/components/layout/section-nav.tsx` — 도트 활성 전환 애니메이션(scale/opacity). **버그 수정**: `prefersReducedMotion` 변수가 선언만 되고 실제로 미사용이던 것을 `animate` 조건부 처리로 연결
  - ✅ `src/components/projects/project-card.tsx` — 카드 호버 `y: -4px`. **버그 수정**: `hover:shadow-lg` 클래스 누락으로 그림자 강화가 실제로는 전혀 트리거되지 않던 죽은 코드를 발견해 추가
  - ✅ **버그 수정(하이드레이션 불일치)**: `page.emulateMedia({reducedMotion:'reduce'})`로 실제 접근성 설정을 재현하자 React hydration mismatch 콘솔 에러 발생 확인. `useMediaQuery`가 클라이언트 마운트 시 서버(`false`) 값과 다른 실제값을 즉시 읽어 `FadeInSection`이 `motion.div`/`div`로 분기되는 게 원인. `fade-in-section.tsx`/`section-nav.tsx`/`project-card.tsx` 3곳 모두 `{ initializeWithValue: false }` 옵션으로 수정해 해소
  - ✅ Playwright 실측: 스크롤 시 `opacity:0→1`/`transform:y(20)→none` 전환, 다크모드 무관 동작, `emulateMedia` reduce/no-preference 양쪽에서 정상 동작, 콘솔 에러 0건 확인

- **Task 012: Three.js 히어로 WebGL 배경 구현** ✅ - 완료
  - ✅ `three`, `@react-three/fiber`, `@react-three/drei` 설치
  - ✅ `src/components/effects/liquid-background.tsx` — `LiquidBackground`, `next/dynamic`+`ssr:false`로 동적 임포트
  - ✅ **버그 수정(메모리 누수)**: RAF id 미저장으로 `cancelAnimationFrame` 호출 불가 + `showCanvas`가 `isDesktop→false` 전환 시 되돌아가지 않아 데스크톱→모바일 리사이즈 후에도 RAF 루프가 백그라운드에서 계속 실행되던 실질 누수를 Playwright로 실측(리사이즈 후 300ms당 18회 RAF 발생) 확인 후 `rafIdRef` 도입 및 `setShowCanvas(isDesktop)` 단순화로 완전 해소(수정 후 RAF 호출 0회)
  - ✅ `src/components/effects/liquid-shader.ts` — 유체 시뮬레이션 셰이더(`uColor1`/`uColor2` uniform). **버그 수정**: 기존에 작성돼 있었지만 `liquid-background.tsx`가 import하지 않고 색상 하드코딩된 셰이더를 중복 작성하던 것을 통합
  - ✅ **버그 수정(oklch 색상 연동)**: `getComputedStyle().color`로 CSS 변수를 읽으면 브라우저가 `lab(...)` 형식으로 반환해 `THREE.Color.setStyle()`이 파싱 실패(Unknown color model 경고 후 검은색)하는 것을 Three.js 소스 코드 분석으로 확인. canvas 2D context의 `fillStyle`+`getImageData`로 항상 8비트 sRGB를 얻는 방식으로 교체해 해결. `next-themes`의 `resolvedTheme` 변경 감지로 다크/라이트 전환 시 셰이더 색상 갱신 확인(라이트 `rgb(233,81,66)` / 다크 `rgb(247,95,79)` 실측)
  - ✅ `src/components/sections/hero-section.tsx` — `LiquidBackground` 통합, 부모 컨테이너 고정 크기(`w-64 h-64 sm:w-80 sm:h-80`)로 CLS 방지 확인
  - ✅ **버그 수정(치명적, ErrorBoundary)**: WebGL 미지원 환경을 `getContext` 몽키패치로 재현한 결과, `THREE.WebGLRenderer` 생성 실패 시 예외가 잡히지 않아 React ErrorBoundary가 `LiquidBackground`뿐 아니라 히어로 섹션 전체(프로필 이미지 포함)를 언마운트시켜버리는 심각한 결함을 발견. `WebGLRenderer` 생성을 `try/catch`로 감싸 `webglFailed` 상태로 fallback 전환하도록 수정. 수정 후 동일 시나리오에서 `pageerror` 0건, 프로필 이미지 정상 표시 확인
  - ✅ 모바일(`useMediaQuery('(min-width: 768px)')`) 조건부 렌더링: 이미 구현되어 있었음을 확인(375px에서 canvas 미마운트)
  - ℹ️ **알려진 제약(수용됨)**: WebGL 미지원 시 Three.js 라이브러리 자체가 예외를 던지기 전 내부적으로 `console.error`를 호출(애플리케이션 코드로 억제 불가능한 서드파티 로깅). 실제 기능(fallback 표시, 예외 미전파)은 완전히 정상이라 사용자 확인 후 현재 상태로 수용

  **테스트 체크리스트 (Playwright MCP)** — 전체 실행 완료
  - ✅ 데스크톱(1280px) `<canvas>` 마운트 및 WebGL 컨텍스트 생성 확인
  - ✅ 모바일(375px) canvas 미생성, 정적 그래디언트 표시 확인
  - ✅ `prefers-reduced-motion: reduce` 실제 CDP 에뮬레이션(`page.emulateMedia`)으로 애니메이션 정지 및 콘솔 에러 0건 확인
  - ✅ 콘솔 에러/경고 0건 확인 (`browser_console_messages`, `pageerror` 이벤트 포함)
  - ✅ 스크롤 시 각 섹션 fade-in 트리거 및 최종 opacity 1 도달 확인
  - ✅ 프로젝트 카드 호버 시 transform + shadow 변화 확인 (실제 마우스 hover, 합성 이벤트로는 검증 불가했음)

- **Task 013: 성능 검증 및 크로스 브라우저 테스트** ✅ - 완료
  - ✅ 프로덕션 빌드(`npm run build` + `PORT=3001 npm run start`) 기준 실측
  - ✅ Lighthouse 대체 실측(Performance API) — LCP 468~724ms(목표 < 2.5s), CLS 0(목표 < 0.1), FCP 396ms(목표 < 1.5s) 모두 목표 대비 크게 우수
  - ✅ 번들 분석: Three.js 청크(~460KB)가 network waterfall상 다른 필수 청크(336~363ms)와 분리되어 796ms에 지연 로드됨을 확인, `next/dynamic(ssr:false)` 코드 스플리팅이 LCP/FCP를 블로킹하지 않음을 검증
  - ✅ 뷰포트별(375/768/1280px) E2E 재검증: canvas 마운트 여부, 콘솔 에러 0건, 프로필 이미지/헤딩 정상 표시 확인
  - ⚠️ **크로스 브라우저 한계**: Playwright MCP는 Chromium(151.0.7922.109) 엔진만 구동 가능 — Edge는 Chromium 기반이라 사실상 동일 검증되었으나, **Safari(WebKit)/Firefox(Gecko)는 이 환경에서 직접 검증 불가능**함을 확인. 별도 수동 검증 필요
  - ✅ **lint 정리**: 검증 과정에서 `npm run lint` 최초 실행 시 `liquid-background.tsx`에서 실질 에러 4건 발견 후 수정 — `prefer-const`(재할당 없는 `let` → `const`) 2건, `react-hooks/set-state-in-effect`(불필요한 `showCanvas` state/effect를 `isDesktop` 파생값 직접 사용으로 제거) 1건, WebGL 실패 catch의 정당한 setState는 사유 주석과 함께 명시적 규칙 비활성화 1건. `fade-in-section.tsx`의 미사용 `cn` import 경고도 정리
  - ✅ 리팩터링 후 재검증: 3개 뷰포트 콘솔 에러 0건, WebGL 미지원 시뮬레이션 `pageerror` 0건 재확인, `npx tsc --noEmit` 및 `npm run lint`(대상 파일) 모두 통과

---

### Phase 7: 다국어 지원 (next-intl)

> **의존성**: Phase 5, 6과 병렬 가능하나, 라우팅 구조 변경이 크므로 Phase 6 이후 착수 권장 · **예상 기간**: 2일

- **Task 014: next-intl 라우팅 및 번역 인프라 구축**
  - `npm install next-intl` 설치
  - `src/i18n/config.ts` — `locales = ['ko', 'en']`, `defaultLocale = 'ko'`, `localeNames` 정의
  - `src/middleware.ts` (신규) — `createMiddleware`, `localePrefix: 'as-needed'`, matcher `['/((?!api|_next|.*\\..*).*)']`
  - `src/i18n/messages/ko.json`, `en.json` — nav / hero / about / projects / resume / contact 네임스페이스
  - ⚠️ **주의**: App Router 구조를 `src/app/[locale]/`로 재편해야 하며 `sitemap.ts` / `robots.ts` / `generateStaticParams()`의 경로 처리 동반 수정 필요
  - `/projects/[slug]` 동적 라우트의 로케일별 정적 생성 파라미터 확장

- **Task 015: 컴포넌트 국제화 및 언어 전환 UI**
  - Header / Footer / SectionNav / 5개 섹션의 하드코딩 한국어 문자열을 `useTranslations()`로 치환
  - `src/lib/site-config.ts`의 기술 스택 카테고리명 및 강점 카드 텍스트 번역 키화
  - `src/components/layout/language-switcher.tsx` (신규) — shadcn `DropdownMenu` 기반 언어 전환 UI (헤더 배치)
  - 언어 전환 시 현재 스크롤 위치 및 앵커(`#projects` 등) 유지
  - `<html lang>` 속성 로케일 동기화 및 메타데이터 `alternates.languages` 설정
  - Notion 동적 콘텐츠(프로젝트명/설명)는 한국어 유지 — 다국어 확대는 Phase 9 검토 항목

  **테스트 체크리스트 (Playwright MCP)**
  - `/` (ko) 및 `/en` 경로 접속 → 각각 한국어/영어 UI 렌더링 확인
  - 언어 전환 드롭다운 클릭 → URL 변경 및 텍스트 전환 확인
  - `Accept-Language: en` 헤더로 접속 시 자동 감지 동작 확인
  - `/en/projects/[slug]` 상세 페이지 정상 렌더링 및 404 처리 확인
  - 언어 전환 후에도 다크모드 상태가 유지되는지 확인
  - `<html lang>` 속성이 로케일과 일치하는지 검증

---

### Phase 8: GA4 방문자 분석 연동 🟡 부분 완료

> **의존성**: Task 015 완료 후 `language_change` 이벤트 추가 (그 외 독립) · **예상 기간**: 1일

- **Task 016: GA4 초기화 및 이벤트 트래킹 구현** 🟡 핵심 구현 완료 (일부 항목 대기)
  - [ ] Google Analytics 4 속성 생성 및 Measurement ID 발급 (실제 GA4 속성 발급은 사용자 액션 필요)
  - ✅ `.env.local`에 `NEXT_PUBLIC_GA_ID` 플레이스홀더 등록 (값 비움 — 미설정 시 추적 비활성화)
  - ✅ `src/components/analytics/google-analytics.tsx` (신규) — `next/script`(`afterInteractive`) 기반 gtag.js 로더 + `usePathname`/`useSearchParams`로 SPA pageview 자동 전송. `@next/third-parties`는 experimental 상태라 미설치, 순수 `next/script` 직접 구현으로 대체
  - ✅ `src/lib/gtag.ts` (신규) — `GA_TRACKING_ID`(env 기반), `isGAEnabled()`, `pageview()`, `event({action, category, label, value})` 타입 안전 이벤트 래퍼
  - ✅ `src/types/gtag.d.ts` (신규) — `window.gtag` / `window.dataLayer` 전역 타입 선언 (`any` 미사용)
  - ✅ `src/app/layout.tsx` — `<GoogleAnalytics />`를 `Suspense`로 감싸 루트에 통합 (`useSearchParams` 요구사항 충족)
  - ✅ `NEXT_PUBLIC_GA_ID` 미설정 시 컴포넌트가 `null` 반환 및 `event()`가 no-op 처리 — 로컬 환경 오염 방지 확인 (Playwright로 `googletagmanager.com` 요청 없음 검증)
  - ✅ 이벤트 호출부 1차 연결: 프로젝트 모달 열람(`project_modal_open`), 상세 페이지 이동(`project_detail_view`), 외부 링크 클릭(`project_external_link_click`)
  - [ ] 나머지 이벤트 호출부 연결 대기: `SectionNav`(도트 클릭), `PrintButton`(인쇄), `ThemeToggle`(테마), `LanguageSwitcher`(언어 — Phase 7 완료 후)
  - [ ] Vercel 프로덕션 환경변수(`NEXT_PUBLIC_GA_ID`) 등록 (배포 시점 작업)

  **테스트 체크리스트 (Playwright MCP)**
  - ✅ `NEXT_PUBLIC_GA_ID` 미설정 시 콘솔 에러 없이 정상 동작 및 gtag 스크립트 미로드 확인 (`browser_network_requests`)
  - [ ] 프로덕션 빌드 + 실제 GA_ID 설정 후 gtag 스크립트 로드 확인
  - [ ] 섹션 도트 클릭 → `section_click` 이벤트 페이로드 확인 (`browser_evaluate`로 `dataLayer` 검사)
  - [ ] 인쇄 버튼 클릭 → `resume_download` 이벤트 발생 확인
  - [ ] 테마 토글 / 언어 전환 → 각 이벤트 파라미터 정확성 확인
  - ✅ 프로젝트 모달 열람 → `project_modal_open` 이벤트 호출 확인 (코드 리뷰 기준, `dataLayer` 실측은 GA_ID 미설정으로 보류)
  - [ ] GA4 실시간 보고서에서 5개 이상 이벤트 수집 확인 (수동, 실제 속성 발급 후)

#### 부가 구현: 프로젝트 모달 & SpotlightCard (Phase 2 향상 기능, 참고자료 반영)
- ✅ `src/components/common/spotlight-card.tsx` (신규) — 마우스 위치 추적 radial-gradient 스포트라이트 효과 공통 컴포넌트 (참고: `reference/my-dev-portfolio/src/components/common/spotlight-card.tsx` 이식, oklch 색상 fallback으로 조정)
- ✅ `src/components/projects/project-modal.tsx` (신규) — 프로젝트 카드 클릭 시 여는 빠른 미리보기 `Dialog` 모달. Notion 데이터 구조상 다중 이미지 갤러리가 없어 커버 이미지 1장 + 개요/핵심 성과/기술 스택 표시, "전체 상세 보기"로 `/projects/[slug]` 이동 (참고자료의 Carousel 기반 모달과 달리 역할 분리 설계)
- ✅ `src/components/projects/project-card.tsx` — `SpotlightCard`로 래핑, "미리보기" 버튼 클릭 시 `ProjectModal` 오픈 (기존 "상세 보기" 직접 이동 버튼을 모달 경유 방식으로 변경)
- ✅ `npm run build` / `npm run lint` / TypeScript strict 통과, Playwright로 모달 오픈·개요/성과/기술스택 렌더링·닫기 동작 실측 검증 (콘솔 에러 0건)

---

### Phase 9: 최종 폴리싱 및 배포

> **의존성**: Phase 5~8 완료 후 착수 · **예상 기간**: 1-2일

- **Task 017: 접근성 및 품질 감사**
  - WCAG AA 명도 대비 검증 (라이트/다크 모드 각각, WebGL 배경 위 텍스트 포함)
  - 키보드 네비게이션 전체 플로우 점검 (섹션 네비, 언어 전환, 카드 링크 포커스 링)
  - 시맨틱 HTML 및 헤딩 레벨 계층 검증 (`h1` → `h3` 건너뜀 방지)
  - 스크린 리더 확인 — 장식용 canvas에 `aria-hidden="true"` 적용
  - `npm run lint` 무경고 및 TypeScript strict 타입 에러 0건

- **Task 018: 성능 최적화 및 에러 복원력 강화**
  - Three.js / Framer Motion 번들 코드 스플리팅 최종 점검
  - `next/image` WebP·AVIF 변환 및 프로젝트 커버 이미지 `sizes` 속성 최적화
  - Notion API 실패 시 graceful degradation 검증 (현재 `ProjectsSection`은 catch 후 빈 배열 → EmptyState 동작 확인)
  - ISR 재검증 동작 확인 및 `revalidate` 주기 최종 확정
  - Lighthouse 4개 항목 최종 측정 (Performance 90+, 나머지 100 목표)

  **테스트 체크리스트 (Playwright MCP)**
  - 전체 사용자 플로우 E2E: 랜딩 → 섹션 스크롤 → 프로젝트 상세 → 뒤로가기 → 이력서 인쇄
  - Notion API 실패 시나리오 (네트워크 차단) → 에러 바운더리 및 EmptyState 확인
  - 존재하지 않는 slug 접근 → 404 페이지 확인
  - 다크/라이트 모드 전환 시 레이아웃 시프트 없음 확인
  - 375px / 768px / 1024px / 1440px 뷰포트 시각 회귀 스크린샷 비교

- **Task 019: 프로덕션 배포 및 문서화**
  - Vercel 프로덕션 배포 및 전체 환경변수 재확인 (`NOTION_*`, `NEXT_PUBLIC_GA_ID`)
  - 배포 후 스모크 테스트 (`/`, `/en`, `/projects/[slug]`, `/sitemap.xml`, `/robots.txt`)
  - `README.md` 갱신 — 로컬 셋업, 환경변수, Notion DB 스키마 안내
  - `docs/PRD.md` Phase 5~9 완료 상태 반영
  - ⚠️ **보안 확인**: `.env.local.example`에 실제 Notion 토큰이 하드코딩되지 않았는지 최종 점검 후 토큰 재발급

---

## Phase 요약

| Phase | 주요 활동 | 예상 기간 | 상태 |
|---|---|---|---|
| Phase 1 | 데이터 계층 및 애플리케이션 골격 | 1-2일 | ✅ 완료 |
| Phase 2 | 원페이지 UI 구축 | 2-3일 | ✅ 완료 |
| Phase 3 | 프로젝트 상세 페이지 및 이력서 | 3-5일 | ✅ 완료 |
| Phase 4 | 배포 및 SEO | 1-2일 | ✅ 완료 |
| Phase 5 | 프로젝트 섹션 개편 (주요/사이드) | 1-2일 | 🟡 구현 완료(커밋 대기) |
| Phase 6 | Framer Motion + Three.js | 2-3일 | ✅ 완료 (커밋 대기) |
| Phase 7 | 다국어 지원 (next-intl) | 2일 | 📋 계획 중 |
| Phase 8 | GA4 방문자 분석 | 1일 | 🟡 핵심 구현 완료 (이벤트 확장·실속성 발급 대기) |
| Phase 9 | 최종 폴리싱 및 배포 | 1-2일 | 📋 계획 중 |
| Phase 10 | 포트폴리오 비주얼 확대 (회사 임팩트, 경력 상세화, 기술 스택, 사이드 프로젝트, GIF 시연) | 4-5일 | 📋 선택사항 (Task 023·025 우선순위) |

**남은 예상 기간** (Phase 5, 7~9, 검증·커밋 포함): 4-6일  
**총 예상 기간** (Phase 5~10 전체): 10-13일

---

## 📌 참고 포트폴리오 설계 반영 (junheedot.com)

본 로드맵의 디자인 및 기능 구성은 **이준희 포트폴리오**(junheedot.com)를 참고합니다. 다음 요소들을 단계별로 구현합니다:

### 핵심 디자인 원칙

1. **정량적 임팩트 중심 설계**
   - 프로젝트별 KPI 강조: MAU, 트래픽, 성능 지표 (초기 vs. 개선 후)
   - About 섹션에서 회사별 비즈니스 성과 카드화 (로고 + 정량 지표)
   - ImpactMetrics 컴포넌트가 핵심 역할 (Task 005에서 구현 완료)

2. **카드 기반 계층형 레이아웃**
   - 프로젝트 카드: 썸네일 + 제목 + 기간 + 역할 뱃지 + 기술 스택 + "상세 보기"
   - About 카드: 회사명 + 로고 + 담당 역할 + 주요 성과 (3열 그리드)
   - Experience 타임라인: 회사 로고 + 직급 + 기간 + 설명
   - 각 카드 호버 시 상승 애니메이션 + 그림자 강화 (Task 011에서 구현 완료)

3. **비주얼 스토리텔링**
   - 프로젝트 데모 GIF 애니메이션 (동작 시연) — Task 025
   - 기술 스택 뱃지 컬러코딩 (React=파랑, Node=녹색 등)
   - 능숙도 시각화 (코어/익숙/관심 기술 3단계, Task 021)

### 섹션별 개편 계획 (Phase 10, Task 020~026)

> ⚠️ **번호 체계 참고**: 아래 Task 020~026은 Phase 10 전용 번호입니다 (Phase 5~9의 Task 009~019와 번호 중복 없음). 우선순위는 **Task 023(경력 타임라인 상세화)**, **Task 025(사이드 프로젝트 GIF 시연)** 두 가지를 다른 항목보다 먼저 착수합니다.

#### Task 020: About 섹션 확장 — 회사별 성과 카드화
- **개요**: 현재 "강점 카드" → "회사별 임팩트 카드"로 전환
- **구성**:
  - Notion Resume DB에서 `experiences` 조회
  - 회사별 그룹핑 + 각 회사의 주요 성과 추출
  - 카드 레이아웃: 회사 로고(favicon 또는 이미지) + 회사명 + 임팩트 3줄 (예: "MAU 18만→20만", "SEO 475% 증가")
  - 배치: 시간역순(최근부터) 정렬, 3열 반응형 그리드
- **기술**:
  - `src/components/sections/about-section.tsx` — 카드 레이아웃 변경
  - `src/components/resume/company-impact-card.tsx` (신규) — 회사별 카드 컴포넌트
  - Notion Resume DB에 `Company` 필드 추가 (회사명, 로고 URL)
  - `displayOrder` 필드 활용해 회사별 임팩트 순서 제어

#### Task 021: 기술 스택 카테고리 시각화
- **개요**: 현재 텍스트 나열 → 카테고리별 뱃지 + 능숙도 시각화
- **구성**:
  - Core (React, Next.js, TypeScript): 주요 기술
  - Data & Communication (REST API, GraphQL, Notion): 연동 경험
  - Styling (TailwindCSS, shadcn/ui): UI 구축
  - DevOps (Vercel, GitHub Actions): 배포·자동화
  - 각 기술마다 능숙도 표시 (별점 3/3, 2/3, 1/3 또는 "숙련", "중급", "학습 중")
- **기술**:
  - `src/lib/site-config.ts` — skillCategories에 능숙도 필드 추가
  - `src/components/resume/tech-category-grid.tsx` (신규) — 카테고리별 그리드
  - 호버 시 기술 상세 설명 팝오버 (shadcn Dialog 활용)

#### Task 022: 사이드 프로젝트 섹션 추가
- **개요**: 개인 프로젝트(AI, 데이터 분석 등) 별도 섹션 추가
- **구성**:
  - Notion Projects DB의 `ProjectType = 'personal'` 프로젝트 필터
  - 2x2 또는 3열 그리드 썸네일 + 제목 + 설명 + 기술 스택
  - "GitHub 저장소" 링크, 클릭 시 외부 사이트로 이동
  - Phase 5의 Task 010(주요/사이드 분리)과 연계하되, UI는 더 간결 (카드 정보량 < 메인 프로젝트)
- **기술**:
  - Notion DB에서 프로젝트 타입별 필터링 로직 (Task 009의 `normalizeProjectType()` / `project-utils.ts`의 `groupProjectsByType()` 재활용)
  - 카드 레이아웃 경량화 (임팩트 메트릭 제외)

#### Task 023: 경력(Experience) 타임라인 상세 구조화 — 우선순위
- **개요**: 참고 사이트(junheedot.com)는 경력을 "회사 → 팀(기간별) → 상세 업무 불릿 → 상세 내용 보기 확장"의 계층 구조로 표시합니다. 현재 `ExperienceTimeline`(`src/components/resume/experience-timeline.tsx`)은 `ExperienceEntry` 배열을 시간순으로 나열하는 평면 리스트라 이 계층이 없습니다.
- **현재 구조의 한계**:
  - `ExperienceEntry` 타입(`src/types/notion.ts:21-30`)에 회사 단위 그룹핑 키가 없어, 같은 회사 내 여러 팀/기간이 개별 카드로 흩어짐
  - 팀 구성원 정보(예: "FE 2명, BE 2명, 기획 2명"), 불릿 형태의 상세 업무 목록, "상세 내용 보기" 확장/축소 인터랙션이 없음
- **구성**:
  - 회사(`organization`) 기준 상위 그룹핑 → 그룹 내 팀/기간별 하위 항목을 시간역순 정렬
  - 각 하위 항목: 팀명 + 기간 + 팀 구성(선택) + 설명 불릿 목록 + "상세 내용 보기" 토글(Framer Motion 높이 애니메이션 또는 shadcn `Collapsible`)
  - 회사 상단에 총 재직 기간 요약 표시 (예: "1년 8개월")
- **기술**:
  - `src/types/notion.ts` — `ExperienceEntry`에 `company`(상위 그룹 키) 및 `teamComposition?: string`, `highlights?: string[]` 필드 추가 검토
  - Notion Resume DB 스키마에 팀 구성/상세 불릿 속성 추가
  - `src/components/resume/experience-timeline.tsx` — 회사별 그룹핑 로직 및 중첩 레이아웃으로 재작성
  - `src/components/resume/experience-detail-toggle.tsx` (신규, 선택) — 확장/축소 클라이언트 컴포넌트
  - Task 011의 `FadeInSection`/reduced-motion 패턴 재사용

  **테스트 체크리스트 (Playwright MCP)**
  - `/` 이력서 섹션에서 회사별 상위 그룹과 팀별 하위 항목이 계층적으로 렌더링되는지 확인
  - "상세 내용 보기" 클릭 → 콘텐츠 확장 및 재클릭 시 축소 확인
  - 키보드(Tab/Enter)로 토글 조작 가능한지 접근성 확인
  - 375px / 1280px 뷰포트에서 계층 구조 가독성 확인

#### Task 024: 학력/자격증 섹션 확장
- **개요**: 현재 이력서 하단 → 전용 섹션으로 확대
- **구성**:
  - 학력: 대학명 + 학위 + 전공 + 졸업 연도
  - 자격증: 자격명 + 발급 기관 + 취득 날짜 + 자격 배지 (기술 카테고리와 색상 맞춤)
  - 타임라인 UI (경력과 동일한 스타일) 또는 2열 그리드
  - 시간역순(최근부터) 정렬
- **기술**:
  - `getResumeData()` 활용해 education / certificate 분류 조회
  - `src/components/resume/education-timeline.tsx` 또는 `credential-grid.tsx` (신규)

#### Task 025: 사이드 프로젝트 GIF/데모 시연 — 우선순위
- **개요**: 참고 사이트의 프로젝트 카드는 정적 썸네일 대신 GIF로 실제 동작(화면 전환, 인터랙션)을 시연합니다. 현재 `ProjectCard`(`src/components/projects/project-card.tsx`)와 `Project` 타입은 `coverImage`(정적 이미지) 필드만 지원합니다.
- **구성**:
  - Notion Projects DB에 GIF/영상 URL 필드 추가 (또는 기존 `coverImage`를 GIF 파일로 대체 허용)
  - 카드 호버 시 정적 썸네일 → GIF로 전환 (또는 카드 진입 시 자동 재생) — 성능을 위해 `loading="lazy"` + `IntersectionObserver` 기반 지연 로드
  - 대안: 짧은 `<video muted loop autoplay playsinline>` 사용 시 GIF 대비 파일 용량 절감 가능 (기술 검토 필요)
  - 사이드 프로젝트 카드(Task 022)에 우선 적용, 이후 주요 프로젝트로 확대 검토
- **기술**:
  - `src/types/notion.ts` — `Project`에 `demoMedia?: { url: string; type: 'gif' | 'video' }` 필드 추가
  - `src/lib/notion-mappers.ts` — 신규 필드 매핑 로직 추가
  - `src/components/projects/project-card.tsx` — 호버 시 미디어 전환 로직 (Task 011의 `whileHover` 패턴과 통합)
  - 이미지/영상 최적화: Notion 첨부 파일 URL 만료 이슈 검토 (필요 시 자체 스토리지 이전 고려)

  **테스트 체크리스트 (Playwright MCP)**
  - 카드 호버 시 GIF/영상으로 전환되는지 확인 (`browser_hover`)
  - 모바일(터치 환경)에서 대체 인터랙션(탭 또는 자동 재생) 동작 확인
  - Lighthouse Performance 점수 회귀 여부 확인 (GIF/영상 추가로 인한 LCP 영향)
  - `demoMedia` 미설정 프로젝트는 기존 정적 이미지로 정상 폴백되는지 확인

#### Task 026: 기술 블로그 연동 (선택사항)
- **개요**: 기술 블로그 최신 포스트 4개 자동 임포트
- **방식**:
  - Notion 페이지에 "Blog Posts" DB 생성 또는 RSS 피드 파싱 (tistory RSS)
  - 썸네일 + 제목 + 발행 날짜 + 카테고리 태그 표시
  - 클릭 시 블로그 글로 외부 이동
- **기술**:
  - RSS 파싱 라이브러리 (rss-parser 또는 xml2js)
  - 캐싱 전략: ISR `revalidate: 86400` (1일)
  - 블로그 연동 실패 시 섹션 숨김

### Phase 10 작업 목록 (선택사항, 우선순위 2건 포함)

**Phase 10: 포트폴리오 비주얼 확대 및 심화** (4-5일)
- Task 020: About 섹션 회사별 임팩트 카드화
- Task 021: 기술 스택 능숙도 시각화
- Task 022: 사이드 프로젝트 섹션 추가
- **Task 023: 경력 타임라인 상세 구조화 (우선순위)**
- Task 024: 학력/자격증 섹션 확장
- **Task 025: 사이드 프로젝트 GIF/데모 시연 (우선순위)**
- Task 026: 기술 블로그 연동 (선택사항)

---

## 성능 목표 (Core Web Vitals)

| 지표 | 목표 | 비고 |
|---|---|---|
| LCP | < 2.5s | 히어로 정적 그래디언트 우선 렌더링으로 확보 |
| FCP | < 1.5s | WebGL은 이후 페이드 인 |
| CLS | < 0.1 | 이미지 크기 명시, canvas 절대 배치 |
| TTI | < 3.5s | Three.js 동적 임포트로 초기 번들 분리 |
| Lighthouse Performance | 90+ | Phase 4 기준 95 달성, 회귀 방지 |

---

**마지막 갱신**: 2026-08-19
- v1: PRD v2.0 기준 최초 작성 (Phase 1~9)
- v2: 참고 포트폴리오(junheedot.com) 반영 (Phase 10 추가, 섹션별 UI/UX 개선 사항 반영)
- v3: 참고 사이트(junheedot.com) 및 제작기 재분석 — Task 009~012 실제 구현 상태(커밋 대기) 반영, Phase 10 Task 번호 재정리(020~026) 및 경력 타임라인 상세화(Task 023)·GIF 시연(Task 025) 우선순위 항목으로 승격
- v4: shrimp-task-manager로 Phase 6(Task 011~013) 계획→코드 검토→버그 수정→Playwright 실측 검증 완료. 검증 과정에서 실질 버그 다수 발견(카드 호버 그림자 죽은 클래스, 하이드레이션 불일치, WebGL RAF 메모리 누수, WebGL 미지원 시 ErrorBoundary로 히어로 전체 붕괴, oklch→RGB 변환 실패, lint 에러 4건) 및 수정. Phase 6 ✅ 완료로 갱신(git 커밋은 아직 미완료)
- v5: Phase 8(Task 016) GA4 핵심 인프라 구현 — `next/script` 기반 `GoogleAnalytics` 컴포넌트, `gtag.ts` 이벤트 래퍼, `gtag.d.ts` 타입 선언, env 미설정 시 no-op 동작 Playwright 검증. 이벤트 호출부는 프로젝트 모달 관련 3종만 우선 연결(나머지는 대기). 부가로 참고자료(`reference/my-dev-portfolio`)의 `SpotlightCard` 공통 컴포넌트와 `ProjectModal`(Notion 데이터 구조에 맞춰 단일 커버 이미지 + 개요/성과/기술스택 프리뷰로 재설계)을 `ProjectCard`에 통합. 빌드/lint/타입체크 통과, Playwright로 모달 동작 실측 확인

**다음 착수 작업**: Task 009~012(Phase 5·6) 워킹 디렉토리 변경사항 커밋 → Task 016 잔여 항목(GA4 실제 속성 발급, 나머지 이벤트 호출부 연결) 또는 Phase 7(다국어) 착수 검토. Phase 6의 크로스 브라우저 검증 중 Safari/Firefox는 Playwright MCP로 확인 불가능해 수동 검증 필요

---

## 📝 주요 개선 사항 (참고 포트폴리오 반영)

### 1. 정량적 임팩트 중심 설계
- **About 섹션**: 회사별 비즈니스 성과 카드화 (MAU, 트래픽, 성능 지표)
- **프로젝트 카드**: 초기 KPI vs. 개선 후 KPI 비교 표시
- **ImpactMetrics**: 프로젝트별 핵심 성과 3-5개 항목 강조

### 2. 카드 기반 계층형 레이아웃
- **프로젝트 카드**: 썸네일 + 제목 + 기간 + 역할 뱃지 + 기술 스택 (최대 3개) + CTA 링크
- **About 카드**: 회사 로고 + 회사명 + 담당 역할 + 주요 성과 (3열 반응형)
- **Experience 타임라인**: 회사 로고 + 직급 + 기간 + 설명 (시간역순)
- **각 카드 호버**: 상승 애니메이션 + 그림자 강화 (Framer Motion, Task 011)

### 3. 비주얼 스토리텔링
- **기술 스택 뱃지**: 컬러코딩 (Core/Data/Styling/DevOps 카테고리별)
- **능숙도 시각화**: 각 기술마다 별점 또는 "숙련/중급/학습 중" 표시 (Phase 10, Task 021)
- **프로젝트 데모**: GIF/영상 애니메이션으로 동작 시연 (Phase 10, Task 025 — 우선순위)
- **학력/자격증**: 자격 배지와 함께 타임라인 표시 (Phase 10, Task 024)

### 4. 경력 상세 구조화
- 회사 → 팀(기간별) → 상세 업무 불릿 → "상세 내용 보기" 확장의 계층 구조
- 팀 구성원 정보(FE/BE/기획/디자인 인원수) 표시
- 회사 상단 총 재직 기간 요약 (Phase 10, Task 023 — 우선순위)

### 5. 사이드 프로젝트 섹션
- 개인 프로젝트 (AI, 데이터 분석 등) 별도 섹션
- 메인 프로젝트보다 가벼운 카드 레이아웃 (임팩트 메트릭 제외)
- GitHub 저장소 직접 링크 (Phase 10, Task 022)

### 6. 기술 블로그 연동 (선택사항)
- 티스토리/블로그 최신 4개 포스트 자동 임포트
- 썸네일 + 제목 + 발행 날짜 + 카테고리 태그
- RSS 파싱 또는 Notion DB 연동 (Phase 10, Task 026)
