# Notion CMS 개발자 포트폴리오 웹사이트 MVP PRD

**문서 버전:** v1.0  
**작성일:** 2026-08-04  
**작성자:** 최인규  
**연락처:** awdzx456@naver.com  
**GitHub:** https://github.com/dlsrbChoi

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
- 메인 페이지 (히어로 + 핵심 소개)
- 프로젝트 목록 및 상세 페이지
- 이력서/경력 페이지
- 소개 (About) 페이지
- PDF 다운로드 (인쇄 기능)
- 다크모드/반응형 지원

**Out of Scope (Phase 2 이후 고려):**
- 블로그/기술 글
- 방문자 통계/조회 추적
- 댓글/상호작용 기능
- 검색 기능
- 다국어 지원

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
| **CMS** | Notion API | @notionhq/client | Notion Database에서 콘텐츠 페칭 (신규 추가) |
| **Notion 렌더링** | notion-to-md 또는 자체 블록 렌더러 | - | Notion 블록 → React 변환 (선택적, MVP에서는 간단한 텍스트/이미지 처리) |
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

#### 신규 추가 파일

```
src/
├── app/
│   ├── about/
│   │   └── page.tsx                      [신규] 소개 및 성장 스토리
│   ├── projects/
│   │   ├── page.tsx                      [신규] 프로젝트 목록
│   │   └── [slug]/
│   │       └── page.tsx                  [신규] 프로젝트 상세 (SSG + ISR)
│   ├── resume/
│   │   └── page.tsx                      [신규] 이력서/경력 (인쇄 대상)
│   └── globals.css                       (기존 + @media print 규칙 추가)
│
├── components/
│   ├── patterns/
│   │   └── print-button.tsx              [신규] 인쇄 버튼
│   ├── projects/                         [신규 디렉토리]
│   │   ├── project-card.tsx              목록용 프로젝트 카드
│   │   ├── project-hero.tsx              상세 페이지 히어로
│   │   ├── impact-metrics.tsx            성과 지표 시각화
│   │   ├── tech-stack-badges.tsx         기술 스택 뱃지 목록
│   │   └── notion-renderer.tsx           Notion 블록 → React 변환
│   └── resume/                           [신규 디렉토리]
│       ├── resume-print-layout.tsx       인쇄 전용 레이아웃 래퍼
│       └── experience-timeline.tsx       경력 타임라인
│
├── lib/
│   ├── notion.ts                         [신규] Notion Client + API 함수
│   ├── notion-mappers.ts                 [신규] Notion 응답 → 앱 타입 변환
│   ├── site-config.ts                    [신규] 개인 정보 상수 (선택적)
│   └── ... (기존 유지)
│
└── types/
    └── notion.ts                         [신규] TypeScript 인터페이스 정의
```

#### 기존 재사용 컴포넌트
- `src/components/patterns/hero.tsx` (props로 커스터마이징 가능)
- `src/components/patterns/page-header.tsx`
- `src/components/patterns/feature-grid.tsx` (스킬/기술 그리드로 변형 가능)
- `src/components/patterns/code-block.tsx`
- `src/components/layout/{header,footer,container}.tsx`

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

### 3.1 메인 페이지 (히어로 섹션)

**목적:** 채용 담당자가 5초 안에 핵심 가치를 파악하도록 시각화

**화면 구성:**
- 히어로 헤드라인: "프론트엔드에서 풀스택으로" 또는 "UI/UX 구현 → 공공 프로젝트 풀스택 개발자"
- 서브헤드라인: 최인규의 핵심 성장 경험 요약 (프론트엔드 UI 구현 능력 + 공공 프로젝트 백엔드/데이터 흐름 경험)
- 설명 본문: 2-3문장으로 두 주요 프로젝트(인천지갑, 통합주차포털)의 핵심 기여 암시
- CTA 버튼 2개: "프로젝트 보기" (→ `/projects`), "이력서 다운로드" (→ `/resume` + 인쇄 모달 또는 직접 트리거)

**기술 요구사항:**
- 기존 `Hero` 컴포넌트 활용 (props: `title`, `subtitle`, `description`, `cta` 버튼 배열)
- 다크모드 대응 (oklch 변수 사용)
- 모바일 반응형 (텍스트 크기, 버튼 레이아웃 조정)

**Acceptance Criteria:**
- [ ] 헤드라인과 서브헤드라인이 "성장 스토리" 내러티브를 명확히 전달
- [ ] 데스크톱/태블릿/모바일에서 가독성 확보
- [ ] CTA 버튼 클릭 시 각각의 페이지/인쇄 기능 정상 작동

### 3.2 프로젝트 목록 페이지 (`/projects`)

**목적:** Notion Projects DB의 모든 Published 프로젝트를 카드 그리드로 시각화, 빠른 스캔 가능하게 구성

**화면 구성:**
- 페이지 헤더: "프로젝트" 제목 + "다양한 규모와 기술 스택의 프로젝트 경험"이라는 설명
- 프로젝트 카드 그리드 (3열, 반응형으로 2열/1열로 축소):
  - 카드 요소: 썸네일 이미지, 프로젝트명, 역할 뱃지(다중), 요약 텍스트, 기술 스택 태그 일부(최대 3개), "상세 보기" 링크
  - 필터링 (선택사항): 기술 스택 또는 프로젝트 타입 필터 (MVP에서는 미포함, Phase 2 후보)
- 정렬: `DisplayOrder` 속성으로 수동 순서 지정

**기술 요구사항:**
- `ProjectCard` 컴포넌트 신규 구현
- 기존 `feature-grid.tsx` 레이아웃 패턴 참고
- `src/lib/notion.ts`의 `getProjects()` 함수 호출 (Status=Published 필터링)
- 각 카드는 `/projects/[slug]`로 링크

**Acceptance Criteria:**
- [ ] Notion Projects DB의 모든 Published 항목이 카드로 렌더링
- [ ] 썸네일 이미지가 최적 크기(500x300px 정도)로 로딩되고, alt 텍스트 표시
- [ ] "상세 보기" 클릭 시 `/projects/[slug]` 페이지로 이동
- [ ] 반응형 그리드가 3→2→1열로 자연스럽게 축소
- [ ] DisplayOrder 순서가 정확히 반영

### 3.3 프로젝트 상세 페이지 (`/projects/[slug]`)

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

```tsx
// src/app/projects/[slug]/page.tsx

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects
    .filter((p) => p.status === 'published')
    .map((p) => ({ slug: p.slug }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params  // ⚠️ Next.js 16에서 필수
  const project = await getProjectBySlug(slug)
  
  if (!project) notFound()
  
  return (
    <>
      <ProjectHero project={project} />
      <Container>
        <ImpactMetrics metrics={project.impactMetrics} />
        <TechStackBadges stack={project.techStack} />
        <NotionRenderer blocks={project.body} />
        {/* 관련 링크, 다음 프로젝트 등 */}
      </Container>
    </>
  )
}
```

- `params: Promise<{slug: string}>` 선언 및 `await params` 필수 (Next.js 16 변경사항)
- `generateStaticParams()`: 동기 함수, Projects DB 전체 조회 후 slug 배열 반환
- `getProjectBySlug()` 함수: Notion API에서 특정 프로젝트 조회, Rich Text 블록 반환
- 로딩 상태: `loading.tsx`에서 `Skeleton` 활용
- 에러 처리: 존재하지 않는 slug 시 `notFound()` 호출 (Next.js 자동 404)

**Acceptance Criteria:**
- [ ] `generateStaticParams`가 모든 Published 프로젝트 slug를 정확히 반환
- [ ] `/projects/[slug]` 페이지가 정적 HTML로 미리 생성되어 빠르게 로드
- [ ] 임팩트 지표(33종 연계, 마이그레이션 리드 등)가 명확히 표시
- [ ] Notion 본문(마크다운/리치 텍스트)이 웹 페이지처럼 렌더링
- [ ] 기술 스택 뱃지가 시각적으로 구분 (색상/모양)
- [ ] 존재하지 않는 slug 요청 시 404 페이지 표시
- [ ] 다크모드에서도 가독성 확보

### 3.4 이력서 페이지 (`/resume`)

**목적:** 웹 기반 이력서 표시 및 PDF 다운로드 기능 제공

**화면 구성:**

#### 3.4.1 상단 액션 바 (화면 전용)
- "PDF로 다운로드" 또는 "인쇄" 버튼 (이 버튼은 인쇄 시 `print:hidden`으로 숨겨짐)
- 버튼 클릭 시 `window.print()` 트리거

#### 3.4.2 이력서 본문 (인쇄 레이아웃)
- 헤더: 이름(최인규), 이메일, GitHub 링크, 연락처 (인쇄 시 텍스트로 노출)
- 핵심 요약: 프로필 요약 (한두 문단)
- 경력 사항 (Experience): 시간순 역순 정렬
  - 기업명/기관명, 직무, 기간, 주요 성과
  - 인천지갑, 통합주차포털 등 두 프로젝트 강조
- 학력 (Education): 대학명, 학위, 전공
- 기술 스택 (Skills): 카테고리별(프론트엔드/백엔드/도구 등)
- 자격증/수상 (Certificate): 있는 경우

**기술 요구사항:**

```tsx
// src/app/resume/page.tsx

export default async function ResumePage() {
  const resumeData = await getResumeData()
  
  return (
    <>
      <PrintButton />  {/* 이 버튼은 print:hidden */}
      <ResumePrintLayout>
        <ResumeHeader {...resumeData.personal} />
        <ExperienceTimeline items={resumeData.experiences} />
        <EducationSection items={resumeData.education} />
        <SkillsSection skills={resumeData.skills} />
        <CertificateSection items={resumeData.certificates} />
      </ResumePrintLayout>
    </>
  )
}
```

### 3.5 PDF 다운로드 메커니즘 (상세)

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

### Phase 0: Notion 기반 설정 및 API 연동 기초

**기간:** 1-2일  
**목표:** Notion Database 설정, Next.js와 Notion API 연동 검증

**작업 항목:**
1. Notion 워크스페이스에 Projects Database, Resume Database 생성
2. 각 DB의 Properties 정의 (섹션 4.3-4.4 스키마 따라 설정)
3. `@notionhq/client` npm 설치: `npm install @notionhq/client`
4. `.env.local` 파일 생성, Notion Integration Token 및 DB ID 저장
5. `src/lib/notion.ts` 작성 — Notion Client 초기화, `getProjects()`, `getProjectBySlug()` 함수 구현
6. `src/types/notion.ts` 작성 — TypeScript 타입 정의
7. `src/lib/notion-mappers.ts` 작성 — Notion 응답 → App 타입 변환
8. 로컬에서 `npm run dev` → 콘솔 테스트로 Notion 데이터 fetch 성공 확인

**완료 기준:**
- [ ] Notion API 인증 성공, DB 조회 가능
- [ ] 콘솔에 Projects 데이터 출력됨
- [ ] TypeScript 타입 에러 없음

---

### Phase 1: 정적 페이지 및 목록 렌더링

**기간:** 2-3일  
**목표:** 메인 페이지, 소개 페이지, 프로젝트 목록 구현 및 Notion 데이터 연동

**작업 항목:**
1. `/` (홈) 페이지 업데이트
   - 기존 Hero 컴포넌트 props로 성장 스토리 카피 작성
   - CTA 버튼 2개 추가 (프로젝트 보기, 이력서 다운로드)
2. `/about` (소개) 페이지 신규 작성
   - PageHeader, 경력 타임라인 텍스트 서술
3. `/projects` (목록) 페이지 신규 작성
   - `getProjects()` 호출, Notion 데이터 렌더링
   - `ProjectCard` 컴포넌트 신규 구현 (카드 그리드 레이아웃)
4. `src/lib/nav.ts` 업데이트 — 새 라우트 메뉴 항목 추가
5. `src/components/layout/header.tsx` 업데이트 — GitHub 링크 실제 URL 반영
6. 다크모드/반응형 테스트

**완료 기준:**
- [ ] 홈 페이지에서 성장 스토리가 명확히 보임
- [ ] 프로젝트 목록 페이지에서 모든 Published 프로젝트가 카드로 렌더링
- [ ] 카드 클릭 시 `/projects/[slug]`로 네비게이트 (아직 404일 수 있음, Phase 2에서 구현)
- [ ] 다크모드/모바일 반응형 확인

---

### Phase 2: 프로젝트 상세 페이지

**기간:** 2-3일  
**목표:** 동적 라우트 구현, SSG/ISR 검증, 상세 페이지 렌더링

**작업 항목:**
1. `src/app/projects/[slug]/page.tsx` 신규 작성
   - `generateStaticParams()` 구현 — Projects DB에서 slug 배열 추출
   - `params: Promise<{slug:string}>` + `await params` 패턴 (Next.js 16 필수)
   - `getProjectBySlug()` 호출, 프로젝트 데이터 페칭
   - `notFound()` 처리 (존재하지 않는 slug)
2. 신규 컴포넌트 구현:
   - `ProjectHero` — 프로젝트 히어로 (제목, 기간, 역할 뱃지)
   - `ImpactMetrics` — 성과 지표 (불릿 리스트 또는 아이콘 + 텍스트)
   - `TechStackBadges` — 기술 스택 뱃지 그리드
   - `NotionRenderer` — Notion 블록 콘텐츠 렌더링 (간단한 텍스트/이미지 변환)
3. `src/app/projects/[slug]/loading.tsx` — 로딩 UI (Skeleton)
4. `src/app/projects/[slug]/not-found.tsx` — 404 페이지
5. Notion 데이터 입력
   - 인천지갑 앱: Name, Slug, Role, TechStack, ImpactMetrics, Body 입력
   - 통합주차포털: 동일하게 입력
   - 강조 포인트 명확히 작성 (마이그레이션 리드, 33종 연계, 성능 개선 %는 실제 수치로)
6. 빌드 & 테스트
   - `npm run build` → 정적 HTML 생성 확인
   - 개발 서버에서 `/projects/incheon-wallet` 등 접속 → 콘텐츠 렌더링 확인
   - ISR 재검증 테스트 (선택사항)

**완료 기준:**
- [ ] 빌드 시 Projects DB에서 모든 Published 프로젝트 slug 추출됨
- [ ] `/projects/[slug]` 정적 페이지 생성됨
- [ ] 인천지갑, 통합주차포털 상세 페이지에서 강조 포인트(마이그레이션 리드, 33종 연계 등) 모두 노출
- [ ] Notion 본문 콘텐츠(문제→해결→결과)가 웹 페이지처럼 렌더링
- [ ] 존재하지 않는 slug(`/projects/invalid-slug`) 요청 시 404 페이지 표시

---

### Phase 3: 이력서 페이지 및 PDF 다운로드

**기간:** 1-2일  
**목표:** 이력서 페이지 구현, 인쇄 최적화 및 크로스 브라우저 검증

**작업 항목:**
1. `src/app/resume/page.tsx` 신규 작성
   - `getResumeData()` 호출 (Resume DB에서 경력/학력/기술 조회)
   - Resume 레이아웃 구성 (헤더 → 경력 → 학력 → 기술 → 자격증)
2. 신규 컴포넌트:
   - `ResumePrintLayout` — 인쇄용 전체 래퍼 (공통 스타일)
   - `ExperienceTimeline` — 타임라인 시각화
   - `PrintButton` — `window.print()` 트리거 버튼
3. `src/app/globals.css` 업데이트
   - `@media print` 블록 추가
   - 헤더/푸터/네비/테마토글 숨김
   - `@page { size: A4; margin: 15mm; }` 설정
   - 라이트 모드 강제 (`color-scheme: light`)
   - 페이지 나누기 규칙 (`page-break-inside: avoid`)
4. 크로스 브라우저 인쇄 테스트
   - Chrome/Chromium Edge: "PDF로 저장" 시 레이아웃/색상 확인
   - Safari: 동일하게 테스트
   - Firefox: 동일하게 테스트
   - 모바일 Safari: 가능하면 테스트 (대체 방법 문서화)
5. PDF 파일명 설정 (선택사항)
   - JavaScript에서 `document.title = "최인규-이력서.pdf"` 설정 → 브라우저 인쇄 다이얼로그에 반영 (브라우저마다 다를 수 있음)

**완료 기준:**
- [ ] `/resume` 페이지 접속 시 웹 레이아웃 표시 (헤더, 경력, 학력, 기술 등)
- [ ] "인쇄/PDF 다운로드" 버튼 클릭 시 브라우저 인쇄 다이얼로그 열림
- [ ] Chrome/Edge에서 "PDF로 저장" 선택 후 다운로드 → A4 용지 크기, 15mm 여백, 불필요한 UI 제외된 인쇄물 생성 확인
- [ ] Safari, Firefox에서도 동일 검증
- [ ] 모바일 기기에서 인쇄 경로 문서화 (AirPrint 또는 "메일로 보내기" 등)
- [ ] PDF 파일명이 의미 있게 설정되었는지 확인

---

### Phase 4: 폴리싱 및 배포 준비

**기간:** 1-2일  
**목표:** 전체 검증, 성능 최적화, Vercel 배포

**작업 항목:**
1. 전체 페이지 다크모드/반응형 최종 검증
   - 모든 페이지(홈, 소개, 프로젝트 목록/상세, 이력서)를 스마트폰(모바일)/태블릿/데스크톱에서 테스트
   - 다크모드 토글 시 색상 일관성 확인
2. 메타데이터 설정
   - 각 페이지의 `<title>`, `<meta name="description">` 설정
   - 프로젝트 상세 페이지별로 OG 이미지 설정 (CoverImage 활용)
   - robots.txt, sitemap.xml 설정 (SEO)
3. ISR `revalidate` 값 최종 결정
   - 프로젝트/이력 데이터: `revalidate: 86400` (1일) 또는 `revalidate: 3600` (1시간) 선택
   - 근거 문서화
4. Vercel 배포
   - GitHub 저장소 연결 (선택사항, 또는 Vercel CLI로 직접 배포)
   - 환경변수 설정 (`NOTION_API_KEY`, `NOTION_PROJECTS_DB_ID`, `NOTION_RESUME_DB_ID`)
   - 빌드 & 배포 실행
5. 배포 후 검증
   - 프로덕션 URL에서 모든 페이지 접속 확인
   - Notion 데이터 변경 → ISR 재검증 동작 확인 (변경 후 시간 경과 또는 수동 웹훅)
6. 성능 측정
   - Google Lighthouse 실행 (Performance, Accessibility, Best Practices, SEO 각각 90 이상 목표)
   - Core Web Vitals 확인

**완료 기준:**
- [ ] Vercel에 성공적으로 배포됨
- [ ] 프로덕션 URL에서 모든 페이지 정상 작동
- [ ] 프로젝트 상세 페이지 Lighthouse 성능 점수 90 이상
- [ ] 접근성 점수 90 이상
- [ ] SEO 점수 90 이상

---

### Phase별 소요 기간 요약

| Phase | 주요 활동 | 예상 기간 | 산출물 |
|---|---|---|---|
| Phase 0 | Notion 셋업, API 연동 기초 | 1-2일 | notion.ts, types/notion.ts |
| Phase 1 | 정적 페이지, 프로젝트 목록 | 2-3일 | /, /about, /projects 페이지 + ProjectCard |
| Phase 2 | 프로젝트 상세, SSG/ISR | 2-3일 | /projects/[slug] 페이지 + 신규 컴포넌트 |
| Phase 3 | 이력서, PDF 다운로드 | 1-2일 | /resume 페이지 + @media print CSS |
| Phase 4 | 폴리싱, Vercel 배포 | 1-2일 | 프로덕션 배포, Lighthouse 90+ |
| **합계** | 전체 구현 및 배포 | **7-12일** | 포트폴리오 웹사이트 MVP |

*주의: 위 일정은 1인 개발 기준 러프 추정치이며, 실제 프로젝트 진행에 따라 조정될 수 있습니다.*

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

- [Notion API 공식 문서](https://developers.notion.com)
- [Next.js 16 App Router](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com)
- [TailwindCSS oklch](https://tailwindcss.com/docs/customizing-colors)

---

**문서 작성 완료: 2026-08-04**  
**다음 단계:** Phase 0 (Notion 워크스페이스 설정) 착수
