# 프로젝트 구조 가이드

이 문서는 Next.js 16.2.12 프로젝트의 폴더 구조, 파일 조직 및 네이밍 컨벤션을 정의합니다.

## 🏗️ 전체 프로젝트 구조

```
notion-cms-project/
├── docs/                   # 📚 프로젝트 문서
│   └── guides/            # 개발 가이드 모음
│       ├── component-patterns.md
│       ├── nextjs-16.md
│       ├── project-structure.md
│       └── styling-guide.md
├── public/                # 🌍 정적 파일 (이미지, 아이콘)
├── src/                   # 📦 소스 코드 루트
│   ├── app/              # 🚀 Next.js App Router
│   ├── components/       # 🧩 React 컴포넌트
│   └── lib/              # 🛠️ 유틸리티 및 설정
├── components.json       # shadcn/ui 설정 (style: base-nova)
├── next.config.ts        # Next.js 설정
├── package.json          # 의존성 및 스크립트
├── tsconfig.json         # TypeScript 설정
└── CLAUDE.md            # 개발 지침 메인 문서
```

## 📁 세부 폴더 구조

### src/app/ - App Router 페이지

```
src/app/
├── layout.tsx           # 🎨 루트 레이아웃 (전역 설정)
├── page.tsx            # 🏠 홈페이지 (/)
├── error.tsx           # ⚠️ 에러 경계
├── loading.tsx         # ⏳ 로딩 UI
├── not-found.tsx       # 404 페이지
├── globals.css         # 🎨 전역 CSS 스타일 (Tailwind v4 + oklch)
├── favicon.ico         # 🔖 파비콘
├── robots.ts           # 🤖 SEO robots.txt 생성
├── sitemap.ts          # 🗺️ Sitemap 생성
├── docs/               # 📖 문서 페이지
│   └── page.tsx
├── examples/           # 📚 기능 데모 페이지
│   ├── page.tsx       # 데모 목록
│   └── [slug]/
│       └── page.tsx   # 동적 데모 상세 (params: Promise)
└── projects/           # 🎯 포트폴리오 프로젝트 페이지
    ├── page.tsx       # 프로젝트 목록
    └── [slug]/
        ├── page.tsx   # 동적 프로젝트 상세
        ├── loading.tsx
        └── not-found.tsx
```

**🚀 App Router 규칙:**

- `page.tsx`: 해당 경로의 메인 페이지
- `layout.tsx`: 레이아웃 컴포넌트 (자식 페이지 감쌈)
- `loading.tsx`: 로딩 UI (필요시)
- `error.tsx`: 에러 UI (필요시)
- `not-found.tsx`: 404 페이지 (필요시)

### src/components/ - 컴포넌트 조직

```
src/components/
├── ui/                 # 🎛️ shadcn/ui 기본 컴포넌트 (base-nova 스타일)
│   ├── button.tsx
│   ├── card.tsx
│   ├── alert.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── separator.tsx
│   ├── sheet.tsx
│   ├── skeleton.tsx
│   ├── sonner.tsx
│   ├── textarea.tsx
│   ├── tooltip.tsx
│   └── ...            # 기타 UI 컴포넌트
├── layout/            # 🏗️ 레이아웃 컴포넌트
│   ├── container.tsx  # 컨테이너 래퍼
│   ├── footer.tsx     # 푸터
│   ├── header.tsx     # 헤더
│   ├── mobile-nav.tsx # 모바일 네비게이션
│   ├── section-nav.tsx # 섹션 네비게이션
│   └── theme-toggle.tsx # 테마 토글
├── patterns/          # 📐 재사용 가능한 복합 컴포넌트
│   ├── code-block.tsx    # 코드 블록 표시
│   ├── doc-section-card.tsx # 문서 섹션 카드
│   ├── empty-state.tsx      # 빈 상태
│   ├── feature-grid.tsx     # 기능 그리드
│   ├── hero.tsx             # 히어로 섹션
│   └── page-header.tsx      # 페이지 헤더
├── examples/          # 📚 기능 데모 컴포넌트 (6개)
│   ├── component-showcase-demo.tsx
│   ├── data-fetching-demo.tsx
│   ├── form-basics-demo.tsx
│   ├── layout-patterns-demo.tsx
│   ├── theming-demo.tsx
│   └── usehooks-ts-demo.tsx
├── projects/          # 🎯 포트폴리오 프로젝트 관련
│   ├── impact-metrics.tsx
│   ├── notion-renderer.tsx
│   ├── project-card.tsx
│   ├── project-hero.tsx
│   └── tech-stack-badges.tsx
├── resume/            # 📄 이력서 관련
│   └── experience-timeline.tsx
├── sections/          # 🌐 페이지 섹션 컴포넌트
│   ├── about-section.tsx
│   ├── contact-section.tsx
│   ├── hero-section.tsx
│   ├── projects-section.tsx
│   └── resume-section.tsx
└── theme-provider.tsx # 🎨 Theme Provider (next-themes)
```

**🧩 컴포넌트 분류 규칙:**

1. **ui/**: shadcn/ui 기반 기본 컴포넌트 (base-nova 스타일)
   - 순수 UI 컴포넌트만 포함
   - 비즈니스 로직 없음
   - props로 모든 동작 제어
   - CVA 기반 variant 패턴 사용

2. **layout/**: 페이지 레이아웃 및 공통 컴포넌트
   - 헤더, 푸터, 네비게이션
   - 테마 토글
   - 컨테이너 래퍼

3. **patterns/**: 재사용 가능한 복합 컴포넌트
   - 페이지 구조 패턴
   - 콘텐츠 표시 패턴
   - 프로젝트 전체에서 재사용

4. **examples/**: 데모/튜토리얼용 컴포넌트
   - 기능 시연 컴포넌트
   - `/examples` 페이지에서 사용
   - 독립 실행 가능한 데모

5. **projects/**: 포트폴리오 프로젝트 관련 컴포넌트
   - 프로젝트 카드, 렌더러
   - Notion 데이터 표시
   - 기술 스택 배지

6. **resume/**: 이력서/경력 관련 컴포넌트
   - 경험 타임라인
   - 경력 정보 표시

7. **sections/**: 페이지 섹션 컴포넌트
   - 특정 페이지의 주요 섹션
   - 홈/소개/프로젝트 섹션 등

### src/lib/ - 유틸리티 및 설정

```
src/lib/
├── utils.ts              # 🛠️ 공통 유틸리티 (cn() 등)
├── nav.ts                # 🧭 네비게이션 메뉴 구조
├── examples.ts           # 📚 예제 메타데이터
├── notion.ts             # 🗂️ Notion API 클라이언트
├── notion-mappers.ts     # 🔄 Notion 데이터 변환 로직
├── site-config.ts        # ⚙️ 사이트 설정 상수
└── skill-icons.tsx       # 🎨 기술 스택 아이콘
```

**lib/ 파일 설명:**

- `utils.ts`: `cn()` 클래스 병합 유틸, 공통 헬퍼 함수
- `nav.ts`: 헤더/네비게이션 메뉴 구조 정의
- `examples.ts`: 6개 예제 메타데이터 및 `getExampleBySlug()` 함수
- `notion.ts`: Notion API 클라이언트 (토큰, 쿼리 로직)
- `notion-mappers.ts`: Notion BlockObjectResponse를 프로젝트 타입으로 변환
- `site-config.ts`: 사이트 이름, URL, 메타데이터 등 상수
- `skill-icons.tsx`: 기술 스택 아이콘 매핑

## 🏷️ 파일 네이밍 컨벤션

### 파일명 규칙

```bash
# ✅ 올바른 파일명
user-profile.tsx        # kebab-case (권장)
UserProfile.tsx         # PascalCase (컴포넌트)
userProfile.tsx         # camelCase (허용)

# ❌ 잘못된 파일명
user_profile.tsx        # snake_case (금지)
userprofile.tsx         # 소문자만 (금지)
```

### 컴포넌트 네이밍

```typescript
// ✅ 올바른 컴포넌트 네이밍
export function UserProfile() {} // PascalCase
export function LoginForm() {} // PascalCase
export function APIEndpoint() {} // 약어도 PascalCase

// ❌ 잘못된 컴포넌트 네이밍
export function userProfile() {} // camelCase (금지)
export function login_form() {} // snake_case (금지)
```

### 폴더 네이밍

```bash
# ✅ 올바른 폴더명
components/             # 소문자
user-settings/          # kebab-case
api-routes/            # kebab-case

# ❌ 잘못된 폴더명
Components/            # PascalCase (금지)
user_settings/         # snake_case (금지)
```

## 🔗 경로 별칭 (Path Aliases)

**⚠️ tsconfig.json 실제 설정:**

```typescript
// ✅ 유일한 실제 별칭
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { examples } from '@/lib/examples'

// ❌ 상대 경로 사용 (금지)
import { Button } from '../../../components/ui/button'
import { cn } from '../../lib/utils'
```

**📍 tsconfig.json의 실제 정의:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**⚠️ 주의:**
- `@/*` 별칭 **하나만** `tsconfig.json`에 정의됨 (→ `./src/*`)
- `components.json`의 `aliases` (`@/hooks`, `@/ui` 등)는 shadcn CLI 전용이며, **tsconfig와는 별개** (CLI가 컴포넌트를 추가할 때 편의용)
- **`src/hooks/` 폴더는 실제로 존재하지 않음** (CLI 설정일 뿐)

## 📝 새 파일/폴더 추가 규칙

### 1. 새 UI 컴포넌트 추가

```bash
# shadcn/ui 컴포넌트 추가
npx shadcn@latest add [component-name]

# 커스텀 UI 컴포넌트 추가
src/components/ui/custom-component.tsx
```

### 2. 새 페이지 추가

```bash
# 정적 페이지
src/app/about/page.tsx

# 동적 페이지 (params: Promise 필수)
src/app/users/[id]/page.tsx

# 그룹 라우트 (선택)
src/app/(auth)/login/page.tsx
```

**⚠️ Next.js 16 동적 라우트 규칙:**
```tsx
// ✅ params는 반드시 Promise 타입
export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <div>{id}</div>
}

// ✅ generateStaticParams 필수
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}
```

### 3. 새 비즈니스 컴포넌트 추가

```bash
# 위치 결정 기준:
1. 특정 페이지에서만 사용 → 해당 페이지 폴더 내
2. 여러 페이지에서 사용 → components/ 적절한 카테고리
3. 레이아웃 관련 → components/layout/
4. 네비게이션 관련 → components/navigation/
```

### 4. 새 유틸리티 추가

```bash
# 공통 유틸리티
src/lib/utils.ts            # 기존 파일에 추가

# 특화된 유틸리티
src/lib/date-utils.ts       # 새 파일 생성
src/lib/api-utils.ts        # 새 파일 생성
```

## 🎯 코드 조직 베스트 프랙티스

### 1. 단일 책임 원칙

- 하나의 파일은 하나의 주요 기능만 담당
- 관련된 타입과 유틸리티는 같은 파일에 포함 가능

### 2. 의존성 순서

```typescript
// 1. 외부 라이브러리
import React from 'react';
import { NextPage } from 'next';

// 2. 내부 라이브러리 (@/ 경로)
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 3. 상대 경로
import './component.css';
```

### 3. Export 규칙

```typescript
// ✅ Named export 사용 (권장)
export function LoginForm() {}

// ✅ Default export (페이지 컴포넌트)
export default function LoginPage() {}

// ❌ 혼재 사용 지양
export function LoginForm() {}
export default LoginForm; // 같은 컴포넌트를 두 방식으로 export
```

### 4. 파일 크기 관리

- 단일 파일: 300줄 이하 권장
- 300줄 초과 시 분할 고려
- 관련 기능별로 분리

## 🚫 금지사항

### ❌ 피해야 할 구조

```bash
# 깊은 중첩 구조 (4단계 이상)
src/components/pages/auth/forms/login/LoginForm.tsx

# 의미 없는 폴더명
src/components/misc/
src/components/common/
src/components/shared/

# 혼재된 케이스
src/Components/userProfile/LoginForm.tsx
```

### ❌ 피해야 할 패턴

```typescript
// 거대한 파일
export function SuperMegaComponent() {
  // 500줄 이상의 코드
}

// 혼재된 import
import Button from '@/components/ui/button'; // default
import { Card } from '@/components/ui/card'; // named

// 깊은 상대 경로
import { utils } from '../../../../../lib/utils';
```

## ✅ 체크리스트

새 파일/폴더 추가 시 확인사항:

- [ ] 적절한 카테고리 폴더에 배치
- [ ] kebab-case 파일명 사용
- [ ] PascalCase 컴포넌트명 사용
- [ ] 경로 별칭 사용
- [ ] 단일 책임 원칙 준수
- [ ] 적절한 export 방식 선택
- [ ] 의존성 import 순서 준수
- [ ] 파일 크기 300줄 이하 유지

이 가이드를 따라 일관성 있고 유지보수하기 쉬운 프로젝트 구조를 만들어보세요!
