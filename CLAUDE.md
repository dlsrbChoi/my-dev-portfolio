# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

개인 포트폴리오 웹사이트. Next.js 16 App Router + React 19 + TypeScript + TailwindCSS v4 기반으로, 경력, 프로젝트, 기술 스택을 효과적으로 전시합니다.

### 핵심 아키텍처

**다국어 i18n 라우팅** (`src/app/[locale]/`)
- `next-intl` 기반 한국어(ko)/영어(en) 자동 전환
- 로케일 설정: `src/i18n/config.ts` (지원 언어, 기본값)
- 메타데이터 다국어화: `generateMetadata()` → `getTranslations()` 사용
- 언어 전환 UI: `src/components/layout/language-switcher.tsx`

**포트폴리오 섹션 구조** (`src/components/sections/`)
- 각 섹션은 독립적인 컴포넌트로 분리 (단일 책임 원칙)
- 메인 페이지 (`src/app/[locale]/page.tsx`)에서 순차적으로 조합
  - HeroSection → AboutSection → ExperienceSection → ProjectsSection → SideProjectsSection → EducationSection → ContactSection
- `FadeInSection` 래퍼로 스크롤 애니메이션 자동 적용
- 섹션 내비게이션: `SectionNav` (목차 역할)

**프로젝트 갤러리 시스템**
- **메인 프로젝트** (`src/components/projects/project-card.tsx`, `project-modal.tsx`)
  - 이미지 캐러셀 기능 (`image-carousel.tsx`)
  - 기술 스택 배지, 링크(GitHub, Live), 메타정보 표시
  - 모달 기반 상세 보기
- **사이드 프로젝트** (`src/components/projects/side-project-card.tsx`, `side-project-modal.tsx`)
  - 보조 프로젝트, 오픈소스 기여 등
  - 콤팩트한 카드 레이아웃

**컴포넌트 계층**
- **UI 컴포넌트** (`src/components/ui/`): shadcn/ui 기본 컴포넌트 (@base-ui/react 래핑)
- **레이아웃** (`src/components/layout/`): 헤더, 푸터, 모바일 네비, 언어/테마 전환
- **섹션** (`src/components/sections/`): 포트폴리오 주요 콘텐츠
- **프로젝트** (`src/components/projects/`): 프로젝트 카드, 모달, 캐러셀
- **모션** (`src/components/motion/`): Framer Motion 기반 애니메이션 (fade-in, stagger)
- **패턴** (`src/components/patterns/`): 재사용 가능한 UI 패턴

**스타일링 & 테마**
- `src/app/globals.css`: TailwindCSS v4 + oklch 색상 변수
- `next-themes` 기반 라이트/다크 모드 (로컬 저장소 자동 기억)
- `cn()` 유틸리티 (`src/lib/utils.ts`)로 클래스 병합

### Next.js 16 주요 차이점

⚠️ **중요**: Next.js 16은 이전 버전과 몇 가지 API 변경이 있습니다. 확신이 없으면 코드 작성 전 `node_modules/next/dist/docs/`를 확인하세요.

- **동적 라우트 params는 Promise**: `params: Promise<{locale: string}>` 형태로 선언하고 반드시 `await params`로 처리해야 함
  - 예: `const { locale } = await params` (메인 페이지 참조)
- **shadcn/ui base-nova**: `@base-ui/react` 헤드리스 컴포넌트 기반, `render` prop으로 다른 엘리먼트 래핑 가능
- **next-intl 통합**: 동적 라우트 + 다국어 병합 시 params 처리 순서 중요

## 개발 명령어

```bash
npm run dev       # 개발 서버 (localhost:3000, HMR 활성화)
npm run build     # 프로덕션 빌드
npm run start     # 빌드된 앱 실행 (프로덕션 모드 로컬 테스트)
npm run lint      # ESLint 검사
```

### 개발 팁
- 개발 중 브라우저 언어 설정을 `/ko`, `/en` URL로 명시 변경 가능
- 다크모드는 시스템 설정 또는 토글로 테스트 (로컬 저장소에 저장)
- TypeScript strict mode 활성화 → `npm run dev`만으로 타입 검사 자동 수행

## 주요 의존성

- **프레임워크**: Next.js 16, React 19, TypeScript 5
- **스타일**: TailwindCSS v4, oklch 색상 시스템
- **UI**: shadcn/ui (base-nova), @base-ui/react
- **i18n**: next-intl (한국어/영어 자동 전환)
- **테마**: next-themes (라이트/다크/시스템 모드 + 로컬 저장소)
- **애니메이션**: Framer Motion (페이드인, 스태거 효과)
- **3D**: Three.js + @react-three/fiber (선택적)
- **아이콘**: lucide-react, react-icons
- **알림**: sonner (토스트)
- **유틸리티**:
  - CVA (컴포넌트 변형 정의)
  - clsx + tailwind-merge (클래스 병합)
  - usehooks-ts (useMediaQuery, useLocalStorage 등)

## 파일 경로 별칭

`tsconfig.json`에서 `@/*` → `./src/*` 설정:
```tsx
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/sections/hero-section'
import { cn } from '@/lib/utils'
```

## 포트폴리오 섹션 추가 패턴

새 섹션을 추가할 때:

```tsx
// src/components/sections/my-section.tsx
'use client'

import { FadeInSection } from '@/components/motion/fade-in-section'

export function MySection() {
  return (
    <FadeInSection>
      <section className="py-16 md:py-24">
        {/* 섹션 콘텐츠 */}
      </section>
    </FadeInSection>
  )
}
```

메인 페이지에 추가:
```tsx
// src/app/[locale]/page.tsx
import { MySection } from '@/components/sections/my-section'

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MySection /> {/* 추가 */}
      {/* ... */}
    </>
  )
}
```

## 다국어 콘텐츠 작성

다국어 지원이 필요한 컴포넌트:

```tsx
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('myComponent')
  
  return <h2>{t('title')}</h2>
}
```

번역 파일: `src/i18n/messages/ko.json`, `en.json`
- 계층 구조: `{ "myComponent": { "title": "..." } }`
- 메타데이터 다국어화: `getTranslations({ locale, namespace: 'metadata' })`

## 스타일링 & 애니메이션 규칙

### 클래스 병합
```tsx
import { cn } from '@/lib/utils'

className={cn("px-4 py-2", variant === 'primary' && "bg-primary", className)}
```

### 색상 변수
`src/app/globals.css`의 oklch 색상 참조:
- `bg-primary`, `text-foreground`, `border-border` 등
- 다크모드는 `dark:` 접두사 자동 처리

### 애니메이션
- **스크롤 페이드인**: `FadeInSection` 래퍼 (컴포넌트 자동 감싼 후 관찰)
- **스태거 애니메이션**: `StaggerList` (리스트 항목 순차 나타남)
- **커스텀 모션**: Framer Motion의 `motion.div`, `whileInView` 등 사용 가능

예제:
```tsx
import { FadeInSection } from '@/components/motion/fade-in-section'

<FadeInSection>
  <div>콘텐츠</div>
</FadeInSection>
```

## 포트폴리오 콘텐츠 관리

### 프로젝트 데이터
프로젝트는 컴포넌트와 분리하여 관리됩니다. 데이터 파일 위치를 확인한 후:
- 프로젝트 메타데이터 (제목, 설명, 태그, 이미지) 추가/수정
- 포트폴리오 섹션 컴포넌트에서 자동으로 렌더링

### 이력서 & 경력 데이터
- `src/components/sections/experience-section.tsx`: 경력 타임라인
- `src/components/resume/experience-timeline.tsx`: 타임라인 컴포넌트
- 데이터 소스 파악 후 업데이트

### 다국어 콘텐츠
- 정적 텍스트: `src/i18n/messages/ko.json`, `en.json`
- 동적 콘텐츠: 각 섹션 컴포넌트에서 `useTranslations()` 사용

## 검증 및 테스트 규칙

- **TypeScript**: strict mode 자동 검사 (타입 에러 시 빌드 실패)
- **ESLint**: `npm run lint`로 검사
- **시각적 검증**: `npm run dev` 후 브라우저에서 확인
  - 반응형: 모바일(375px), 태블릿(768px), 데스크톱(1280px) 테스트
  - 다국어: `/ko`, `/en` 모두 테스트
  - 테마: 라이트/다크 모드 확인
- **주의**: 자동화된 단위/통합 테스트 없음 (jest/vitest 미설정). 모든 검증은 수동 브라우저 테스트와 타입 체크로 진행합니다.
