# Notion CMS 프로젝트 개발 규칙 (AI 에이전트 용)

## 1. 프로젝트 개요

**프로젝트명:** Notion CMS 포트폴리오 시스템
**기술 스택:** Next.js 16, React 19, TypeScript 5, TailwindCSS v4, shadcn/ui (base-nova)
**현재 진행:** Phase 2 - Notion CMS 포트폴리오 상세 페이지 구현
**상태:** 진행 중

**핵심 기능:**
- Notion API를 통한 CMS 데이터 관리
- 포트폴리오 프로젝트 목록 및 상세 페이지
- 다크/라이트 모드 지원
- 반응형 디자인

**언어 규칙:**
- 변수명, 함수명, 파일명: **영어**
- 주석, 커밋 메시지, 문서: **한국어**

---

## 2. 프로젝트 아키텍처

### 2.1 디렉토리 구조

```
src/
├── app/                           # Next.js 16 App Router
│   ├── layout.tsx                # 루트 레이아웃 (ThemeProvider, TooltipProvider, 헤더, 푸터)
│   ├── page.tsx                  # 홈페이지
│   ├── globals.css               # TailwindCSS v4 + oklch 색상 변수
│   ├── examples/                 # 예제/데모 페이지
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx        # 동적 라우트 (generateStaticParams 필수)
│   ├── docs/                      # 문서 페이지
│   └── [feature]/page.tsx         # 기타 기능 페이지
│
├── components/
│   ├── ui/                        # shadcn/ui 기본 컴포넌트 (CVA 패턴)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── layout/                    # 레이아웃 전용 컴포넌트
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── theme-toggle.tsx
│   │   └── container.tsx
│   │
│   ├── patterns/                  # 복합 재사용 컴포넌트
│   │   ├── page-header.tsx
│   │   ├── hero-section.tsx
│   │   ├── feature-grid.tsx
│   │   └── ...
│   │
│   ├── examples/                  # 기능 데모 컴포넌트
│   │   ├── ComponentShowcaseDemo.tsx
│   │   ├── FormBasicsDemo.tsx
│   │   ├── LayoutPatternsDemo.tsx
│   │   ├── UseHooksTsDemo.tsx
│   │   ├── ClientFetchDemo.tsx
│   │   └── ThemingDemo.tsx
│   │
│   └── theme-provider.tsx         # next-themes 래퍼
│
└── lib/
    ├── utils.ts                   # cn() 클래스 병합 유틸리티
    ├── nav.ts                     # 헤더/모바일 네비 메뉴 구조
    └── examples.ts                # 예제 메타데이터 (슬러그, 제목, 설명, 코드)
```

### 2.2 주요 파일 역할

| 파일 | 역할 | 수정 규칙 |
|------|------|---------|
| `src/app/layout.tsx` | 루트 레이아웃, ThemeProvider/TooltipProvider 설정 | 공통 레이아웃 변경 시 수정 |
| `src/app/globals.css` | TailwindCSS v4 + oklch 색상 변수, tw-animate-css import | **색상 변수만 수정 가능** |
| `src/lib/nav.ts` | 네비게이션 메뉴 구조 | 헤더/모바일 네비 추가 시 동시 수정 |
| `src/lib/examples.ts` | 예제 메타데이터 + getExampleBySlug() | 예제 추가/수정 시 동시 수정 |
| `src/components/layout/header.tsx` | 헤더 렌더링 (src/lib/nav.ts 참조) | nav.ts 수정 시 확인 |
| `components.json` | shadcn/ui 설정 | **수정 금지** |
| `tsconfig.json` | 경로 별칭 (@/* → ./src/*) | **수정 금지** |

---

## 3. 코드 작성 규칙

### 3.1 TypeScript 및 타입 안전성

- **모든 컴포넌트 props에 명시적 타입 선언 필수**
  ```tsx
  interface ButtonProps {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
  }
  
  export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
    // ...
  }
  ```

- **API 응답/서버 데이터는 인터페이스 정의 필수**
  ```tsx
  interface NotionPage {
    id: string;
    properties: Record<string, unknown>;
  }
  
  const response: NotionPage = await fetchFromNotion();
  ```

- **TypeScript strict mode 준수** (compilerOptions.strict: true)

### 3.2 경로 별칭 사용

**반드시 @/* 별칭 사용 (상대 경로 금지):**
```tsx
// ✅ 올바름
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/nav'

// ❌ 틀림
import { Button } from '../../../components/ui/button'
import { cn } from '../lib/utils'
```

### 3.3 언어 규칙

```tsx
// ✅ 올바름
function getUserProfile(userId: string) {
  // 한국어 주석 사용
  // 사용자 프로필을 Notion API에서 조회합니다
  return fetchUserData(userId);
}

// ❌ 틀림
function getUserProfile(userId: string) {
  // Fetch user data from Notion API
  return fetchUserData(userId);
}
```

---

## 4. 컴포넌트 구현 규칙

### 4.1 컴포넌트 분류 및 생성 위치

**의사결정 트리:**

```
새로운 컴포넌트 필요?
│
├─ 재사용 불가능한 단일 페이지 전용 레이아웃
│  └─ src/app/[route]/page.tsx 에서 직접 작성
│
├─ UI 기본 요소 (Button, Card, Input, Dialog 등)
│  ├─ shadcn/ui에 있는가? → 그것을 사용
│  └─ 없으면 src/components/ui/ 에 CVA 패턴으로 생성
│
├─ 헤더, 푸터, 네비게이션, 테마 토글 등 레이아웃 전용
│  └─ src/components/layout/ 에 생성
│
├─ 2개 이상의 컴포넌트를 조합한 복합 패턴
│  ├─ 예: hero-section, feature-grid, page-header, code-block
│  └─ src/components/patterns/ 에 생성
│
└─ 기능 데모 (예제 페이지 전용)
   ├─ src/components/examples/ 에 생성
   └─ src/lib/examples.ts 의 demosMap에 등록 필수
```

### 4.2 UI 컴포넌트 (src/components/ui/)

**규칙:**
- shadcn/ui base-nova 스타일 준수
- CVA (class-variance-authority) 패턴으로 변형/크기 구현
- @base-ui/react의 render prop 지원

**예시:**
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
```

### 4.3 레이아웃 컴포넌트 (src/components/layout/)

**규칙:**
- 헤더/모바일 네비에서 `src/lib/nav.ts`의 navItems 참조
- nav.ts 수정 시 반드시 헤더/모바일 네비 컴포넌트도 함께 검증
- ThemeProvider 래퍼는 src/components/theme-provider.tsx 에서만 관리

**예시:**
```tsx
'use client'

import Link from 'next/link'
import { navItems } from '@/lib/nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <nav className="flex items-center justify-between px-4 py-3">
        <Link href="/">로고</Link>
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

### 4.4 패턴 컴포넌트 (src/components/patterns/)

**규칙:**
- 2개 이상의 UI 컴포넌트 조합
- 재사용 가능한 복합 컴포넌트
- props로 커스터마이징 가능

**기존 패턴 (반드시 준수):**
- PageHeader: 제목 + 설명
- HeroSection: 배너 섹션
- FeatureGrid: 기능 카드 그리드
- CodeBlock: 코드 표시
- DocumentSectionCard: 문서 섹션

---

## 5. 라우팅 및 페이지 규칙 (Next.js 16 특수)

### 5.1 동적 라우트 (Params는 Promise)

**⚠️ Next.js 16 변경사항: params는 Promise<{key: string}> 로 선언**

**반드시 준수:**
```tsx
// src/app/examples/[slug]/page.tsx

// ✅ 올바른 패턴
export async function generateStaticParams() {
  return [
    { slug: 'component-showcase' },
    { slug: 'form-basics' },
    // ... 모든 슬러그 나열
  ]
}

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>  // Promise 타입 필수
}) {
  const { slug } = await params  // 반드시 await 처리
  
  const example = getExampleBySlug(slug)
  if (!example) return notFound()
  
  return (
    // 페이지 렌더링
  )
}

// ❌ 틀린 패턴 (Next.js 16에서 작동 안 함)
export default function ExamplePage({ params }: { params: { slug: string } }) {
  // await 없이 직접 접근 → 에러
}
```

### 5.2 정적 라우트

```tsx
// src/app/about/page.tsx
export default function About() {
  return (
    <>
      <PageHeader title="About" description="..." />
      <Container>
        {/* 콘텐츠 */}
      </Container>
    </>
  )
}
```

### 5.3 레이아웃 계층

```tsx
// src/app/[feature]/layout.tsx
export default function FeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
```

---

## 6. 파일 상호작용 규칙 (동시 수정 필수)

### 6.1 네비게이션 수정

**수정 대상:** src/lib/nav.ts
**반드시 함께 수정할 파일:**
- `src/components/layout/header.tsx` (메뉴 렌더링 확인)
- `src/components/layout/mobile-nav.tsx` (모바일 메뉴 렌더링 확인)

**규칙:**
```tsx
// src/lib/nav.ts
export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/docs', label: 'Docs' },
]
```

### 6.2 예제/데모 추가

**수정 대상:** src/lib/examples.ts
**반드시 함께 수정할 파일:**
- `src/components/examples/[DemoComponent].tsx` (데모 컴포넌트 생성)

**규칙:**
```tsx
// src/lib/examples.ts
export const examples = [
  {
    slug: 'component-showcase',
    title: 'Component Showcase',
    description: '...',
    // ... 메타데이터
  },
  // 새 예제 추가 시 반드시 이곳에 등록
]

export const demosMap = {
  'component-showcase': ComponentShowcaseDemo,
  // 새 데모 추가 시 반드시 이곳에 매핑
}
```

### 6.3 색상 변수 추가

**수정 대상:** src/app/globals.css
**규칙:**
- oklch() 색상 변수만 추가 (RGB 금지)
- :root 와 .dark 선택자 모두에 정의
- 다른 파일에서 색상 직접 정의 금지

```css
/* src/app/globals.css */
:root {
  --color-primary: oklch(45% 0.3 280);  /* 라이트 모드 */
  --color-primary-foreground: oklch(98% 0 0);
}

.dark {
  --color-primary: oklch(65% 0.35 280);  /* 다크 모드 */
  --color-primary-foreground: oklch(10% 0 0);
}
```

---

## 7. 스타일링 규칙

### 7.1 클래스 병합 (cn() 함수)

**반드시 cn() 사용 (clsx + tailwind-merge 조합):**
```tsx
import { cn } from '@/lib/utils'

export function Card({ variant, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-4',
        variant === 'elevated' && 'shadow-lg',
        className  // 외부 className으로 덮어쓰기 가능
      )}
      {...props}
    />
  )
}
```

### 7.2 색상 변수 사용

**반드시 Tailwind CSS 색상 사용 (globals.css에서 정의된 변수):**
```tsx
// ✅ 올바름
<div className="bg-primary text-primary-foreground border-border">
  {/* 콘텐츠 */}
</div>

// ❌ 틀림 (하드코딩)
<div className="bg-blue-500 text-white border-gray-300">
  {/* 콘텐츠 */}
</div>
```

**사용 가능한 색상:**
- primary, primary-foreground
- secondary, secondary-foreground
- background, foreground
- muted, muted-foreground
- border, input, ring
- destructive, etc.

### 7.3 다크 모드

**다크 모드는 next-themes가 자동 처리 (명시적 처리 금지):**
```tsx
// ✅ 올바름 (Tailwind 자동 처리)
<div className="bg-background text-foreground dark:bg-[oklch(var(--color-background-dark))]">
  {/* dark: 접두사는 next-themes가 처리 */}
</div>

// ❌ 틀림 (수동 다크 모드 토글)
const [isDark, setIsDark] = useState(false)
<div className={isDark ? 'dark' : 'light'}>
```

### 7.4 반응형 디자인

**TailwindCSS 브레이크포인트 사용:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿(md): 2열, 데스크톱(lg): 3열 */}
</div>
```

---

## 8. 의사결정 트리

### 8.1 컴포넌트 선택 플로우

```
기능 구현 필요?
│
├─ 기존 shadcn/ui 컴포넌트로 충분한가?
│  ├─ Yes → 그대로 사용
│  └─ No → 새 UI 컴포넌트 생성 (src/components/ui/)
│
├─ 다른 페이지에서도 재사용되는가?
│  ├─ No → 페이지 파일에서 직접 작성
│  ├─ Yes (레이아웃 관련) → src/components/layout/
│  └─ Yes (복합 컴포넌트) → src/components/patterns/
│
└─ 이 컴포넌트를 /examples 에 보여줄 건가?
   ├─ Yes → src/components/examples/ + src/lib/examples.ts 등록
   └─ No → 위의 규칙에 따라 배치
```

### 8.2 라우트 설계 플로우

```
새로운 페이지/라우트 필요?
│
├─ 동적 ID/slug 필요한가?
│  ├─ Yes → src/app/[dynamic]/page.tsx
│  │        generateStaticParams 필수
│  │        params: Promise<{id: string}> 필수
│  │        await params 필수
│  └─ No → src/app/[feature]/page.tsx (정적)
│
├─ 하위 중첩 라우트가 있는가?
│  ├─ Yes → src/app/[feature]/layout.tsx 생성
│  └─ No → 그대로 진행
│
└─ loading.tsx, error.tsx, not-found.tsx 필요한가?
   └─ 필요 시 해당 라우트 폴더에 생성
```

### 8.3 스타일 선택 플로우

```
스타일 적용 필요?
│
├─ 기본 색상 필요한가?
│  └─ src/app/globals.css의 oklch 변수 사용
│
├─ 조건부 클래스 필요한가?
│  └─ cn() 함수 사용 (clsx + tailwind-merge)
│
├─ 컴포넌트 변형 (variant/size) 필요한가?
│  └─ CVA (class-variance-authority) 패턴 사용
│
└─ 다크 모드 대응 필요한가?
   └─ dark: 접두사 사용 (next-themes가 자동 처리)
```

---

## 9. 검증 프로세스

### 9.1 타입 검증

**필수:** TypeScript strict mode 준수
```bash
# npm run dev 실행 시 자동 타입 체크
# 타입 에러가 있으면 dev 서버 실행 불가
```

**확인 사항:**
- 모든 함수 props에 타입 선언 있는가?
- API 응답에 인터페이스 있는가?
- any 타입 사용하지 않았는가?

### 9.2 린트 검증

**필수:**
```bash
npm run lint
# ESLint 통과 필수
```

### 9.3 시각적 검증 (수동 브라우저 테스트)

**필수:** 개발 서버에서 직접 테스트
```bash
npm run dev
# http://localhost:3000 에서 기능 확인
```

**확인 대상:**
- 라이트 모드 및 다크 모드 모두 확인
- 모바일(sm), 태블릿(md), 데스크톱(lg) 반응형 확인
- /examples 페이지에서 기능/UI 확인
- 네비게이션 메뉴 작동 확인
- 폼 입력/제출 작동 확인

**주의:** 이 프로젝트에는 jest/vitest 등 자동화 테스트 없음 (수동 테스트만 가능)

---

## 10. 금지 사항 (절대 하면 안 됨)

### 10.1 구성 파일 수정 금지

| 파일 | 이유 | 후보 |
|------|------|------|
| `components.json` | shadcn/ui 설정, 변경 시 컴포넌트 생성 오류 | 변경 필요 시 재검토 |
| `tsconfig.json` | 경로 별칭 설정, 변경 시 import 모두 깨짐 | 변경 필요 시 재검토 |
| `next.config.js` | Next.js 설정, 변경 시 빌드 실패 가능 | 변경 필요 시 재검토 |
| `.env.local.example` | 공개 파일, 실제 시크릿 절대 기록 금지 | 더미 값만 기록 |

### 10.2 코드 구조 변경 금지

- `src/app/globals.css`에서 `tw-animate-css`, `shadcn/tailwind.css` import 수정 금지
- oklch 변수는 `src/app/globals.css`에서만 정의 (다른 파일에서 색상 정의 금지)
- 자동화 테스트 파일 생성 금지 (jest/vitest 설정 금지)

### 10.3 보안 규칙 위반 금지

- .env.local.example 에 실제 Notion 토큰/API 키 기록 금지
- .env.local 은 .gitignore 됨 (공유하지 않음)
- 로컬 개발 시만 .env.local 에 실제 토큰 기록

### 10.4 패턴 위반 금지

- 동적 라우트에서 params 의 await 처리 생략 금지
- generateStaticParams 없는 동적 라우트 금지
- 컴포넌트 타입 선언 생략 금지 (명시적 인터페이스 필수)

---

## 11. 주의 사항

### 11.1 진행 중인 Phase 2

**현재 목표:** Notion CMS 포트폴리오 상세 페이지 구현
**설계 결정:**
- NotionBlock 타입 제거 (BlockObjectResponse 직사용)
- Notion API 응답을 그대로 사용하는 구조

**영향:**
- 새 컴포넌트 추가 시 NotionBlock 타입 사용 금지
- BlockObjectResponse 인터페이스만 사용

### 11.2 shadcn/ui base-nova 특수성

**@base-ui/react 기반:**
- render prop 지원 (다른 엘리먼트 렌더링 가능)
- Dialog, Sheet 등에서 Link 컴포넌트를 render prop으로 사용 가능

**예시:**
```tsx
// Dialog를 Link로 렌더링
<Dialog
  render={(ownerState) =>
    <Link href="/path">{children}</Link>
  }
/>
```

### 11.3 네비게이션 일관성

**src/lib/nav.ts 수정 시:**
- src/components/layout/header.tsx 에서 메뉴 렌더링 확인
- src/components/layout/mobile-nav.tsx 에서 모바일 메뉴 렌더링 확인
- 추가된 메뉴 항목이 실제 라우트와 일치하는지 확인

### 11.4 데모/예제 등록

**새 예제 추가 시:**
1. src/components/examples/NewDemo.tsx 컴포넌트 생성
2. src/lib/examples.ts 에 메타데이터 추가
3. demosMap 에 컴포넌트 매핑
4. src/app/examples/[slug]/page.tsx 의 demosMap 에서 로드되는지 확인

---

## 12. 명령어

```bash
# 개발 서버 실행 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 실행 (프로덕션 모드 테스트)
npm run start

# ESLint 실행
npm run lint
```

---

**마지막 업데이트:** 2026-08-13
**규칙 버전:** 1.0.0 (AI Agent 용 초판)
