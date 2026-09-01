# 개발자 포트폴리오 웹사이트

개인 포트폴리오를 효과적으로 전시하기 위해 설계된 모던 웹사이트입니다.
최신 웹 기술 스택(Next.js 16, React 19, TypeScript, TailwindCSS v4)으로 구축되어 채용담당자와 협업 파트너에게 기술 역량을 효과적으로 소개합니다.

## ✨ 주요 특징

### 📋 포트폴리오 콘텐츠
- **히어로 섹션** — 임팩트 있는 첫 인상과 요약 소개
- **자기소개 섹션** — 핵심 가치와 경력 관점 설명
- **기술 스택** — 보유 중인 프로그래밍 언어, 프레임워크, 도구 시각화
- **경력 & 경험** — 타임라인 기반 직무 경력 및 프로젝트 이력
- **프로젝트 갤러리** — 이미지 캐러셀, 기술 스택, 링크가 포함된 프로젝트 카드
- **사이드 프로젝트** — 개인 프로젝트, 오픈소스 컨트리뷰션 등 추가 경험 전시
- **교육 & 자격증** — 학위, 교육과정, 인증서 이력
- **연락처 섹션** — 이메일, SNS, 깃허브 등 연락 수단

### 🛠 기술 스택
- **Next.js 16** — App Router, 서버 컴포넌트, SEO 최적화
- **React 19** — 최신 기능과 성능 개선
- **TypeScript** — 타입 안전성
- **TailwindCSS v4** — 반응형 디자인, oklch 색상 시스템
- **ShadcnUI (base-nova)** — 접근성 좋은 UI 컴포넌트
- **Framer Motion** — 부드러운 애니메이션 효과
- **Three.js** — 3D 시각화 (선택적)
- **다국어 지원(i18n)** — next-intl로 한국어/영어 자동 전환
- **다크모드** — next-themes 기반 테마 전환
- **Google Analytics** — 방문자 추적

### 💪 개발 역량 표현
- 최신 웹 개발 트렌드 활용
- 반응형 디자인 (모바일 우선)
- 성능 최적화 (이미지 최적화, 번들 최적화)
- 접근성 준수 (WCAG)
- 깔끔한 코드 구조 (타입 안전, ESLint)

## 📁 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # i18n 다국어 라우팅
│   │   ├── layout.tsx            # 루트 레이아웃
│   │   ├── page.tsx              # 포트폴리오 홈 페이지
│   │   ├── examples/             # 기술 데모 페이지
│   │   ├── docs/                 # 기술 문서
│   │   └── error.tsx, not-found.tsx, loading.tsx
│   ├── layout.tsx                # 글로벌 레이아웃
│   ├── page.tsx                  # 리다이렉트 페이지
│   └── globals.css               # 전역 스타일 (TailwindCSS v4, oklch 색상)
│
├── components/
│   ├── ui/                       # shadcn UI 기본 컴포넌트
│   │   ├── button.tsx, card.tsx, badge.tsx
│   │   ├── dialog.tsx, sheet.tsx, collapsible.tsx
│   │   └── input.tsx, textarea.tsx, label.tsx (etc.)
│   │
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── header.tsx            # 네비게이션 헤더
│   │   ├── footer.tsx            # 하단 푸터
│   │   ├── mobile-nav.tsx        # 모바일 메뉴
│   │   ├── theme-toggle.tsx      # 다크모드 토글
│   │   ├── language-switcher.tsx # 언어 전환
│   │   ├── section-nav.tsx       # 섹션 네비게이션
│   │   └── container.tsx         # 콘텐츠 래퍼
│   │
│   ├── sections/                 # 포트폴리오 주요 섹션
│   │   ├── hero-section.tsx      # 히어로 소개 (첫 인상)
│   │   ├── about-section.tsx     # 자기소개
│   │   ├── skills-section.tsx    # 기술 스택 시각화
│   │   ├── experience-section.tsx # 경력/직무 이력
│   │   ├── projects-section.tsx  # 프로젝트 갤러리
│   │   ├── side-projects-section.tsx # 사이드 프로젝트
│   │   ├── education-section.tsx # 학력/교육
│   │   ├── certificates-card.tsx # 자격증
│   │   ├── resume-section.tsx    # 이력서
│   │   └── contact-section.tsx   # 연락처
│   │
│   ├── projects/                 # 프로젝트 컴포넌트
│   │   ├── project-card.tsx      # 프로젝트 카드
│   │   ├── side-project-card.tsx # 사이드 프로젝트 카드
│   │   ├── project-modal.tsx     # 프로젝트 상세 모달
│   │   ├── side-project-modal.tsx # 사이드 프로젝트 모달
│   │   └── image-carousel.tsx    # 이미지 캐러셀
│   │
│   ├── resume/                   # 이력서 컴포넌트
│   │   └── experience-timeline.tsx # 경력 타임라인
│   │
│   ├── motion/                   # 애니메이션 컴포넌트
│   │   ├── fade-in-section.tsx   # 스크롤 페이드인
│   │   └── stagger-list.tsx      # 스태거 애니메이션
│   │
│   ├── effects/                  # 특수 효과
│   │   └── liquid-background.tsx # 액체 배경 효과
│   │
│   ├── common/                   # 공용 컴포넌트
│   │   └── spotlight-card.tsx    # 스포트라이트 카드
│   │
│   ├── examples/                 # 기술 데모 컴포넌트
│   │   ├── component-showcase-demo.tsx
│   │   ├── form-basics-demo.tsx
│   │   ├── layout-patterns-demo.tsx
│   │   ├── usehooks-ts-demo.tsx
│   │   ├── data-fetching-demo.tsx
│   │   └── theming-demo.tsx
│   │
│   ├── patterns/                 # 재사용 가능한 UI 패턴
│   │   ├── hero.tsx
│   │   ├── feature-grid.tsx
│   │   ├── page-header.tsx
│   │   ├── section-header.tsx
│   │   ├── doc-section-card.tsx
│   │   ├── code-block.tsx
│   │   └── empty-state.tsx
│   │
│   ├── analytics/                # 분석
│   │   └── google-analytics.tsx  # GA 추적
│   │
│   └── theme-provider.tsx        # next-themes 설정
│
├── lib/
│   ├── utils.ts                  # 유틸리티 (cn() 클래스 병합)
│   ├── skill-icons.tsx           # 기술 스택 아이콘
│   └── [기타 설정 파일]
│
└── public/
    ├── images/                   # 프로젝트 이미지, 스크린샷
    └── [기타 에셋]
```

## 🚀 빠른 시작

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기 (또는 언어 선택: `/en`, `/ko`)

### 개발 명령어

```bash
npm run dev       # 개발 서버 시작
npm run build     # 프로덕션 빌드
npm run start     # 빌드된 앱 실행
npm run lint      # ESLint 검사
```

## 🎨 포트폴리오 커스터마이징

### 개인 정보 수정

포트폴리오 내용은 **프로젝트 루트의 데이터 파일**들을 수정하여 자동으로 반영됩니다:
- `src/data/` (또는 구성 파일) 디렉토리의 JSON/TS 파일 수정
- 페이지를 새로고침하면 자동 업데이트

### 색상 테마 커스터마이징

`src/app/globals.css`의 oklch 색상 변수 수정:

```css
:root {
  --primary: oklch(0.205 0 0);           /* 라이트 모드 주색 */
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --primary: oklch(0.922 0 0);           /* 다크 모드 주색 */
  --primary-foreground: oklch(0.205 0 0);
}
```

다크모드는 자동 전환되며, 방문자 선택값은 로컬 저장소에 저장됩니다.

### 다국어 지원

`next-intl` 기반 한국어/영어 자동 전환:
- URL 경로: `/ko`, `/en` (또는 시스템 언어 자동 인식)
- 번역 파일: `src/i18n/` 디렉토리 수정

## 📦 기술 스택 (Dependencies)

| 분류 | 라이브러리 | 용도 |
|------|----------|------|
| **프레임워크** | Next.js 16, React 19, TypeScript 5 | 최신 웹 프레임워크 & 타입 안전성 |
| **스타일링** | TailwindCSS v4, oklch | 유틸리티 기반 모던 스타일링 |
| **UI 컴포넌트** | ShadcnUI (base-nova), @base-ui/react | 접근성 높은 헤드리스 컴포넌트 |
| **애니메이션** | Framer Motion, Three.js | 부드러운 모션 & 3D 시각화 |
| **다국어** | next-intl | 한국어/영어 자동 전환 |
| **테마** | next-themes | 라이트/다크/시스템 모드 전환 |
| **아이콘** | lucide-react, react-icons | 일관된 SVG 아이콘 라이브러리 |
| **알림** | sonner | 스타일된 토스트 알림 |
| **클래스 병합** | clsx, tailwind-merge, CVA | 동적 클래스 충돌 해결 |
| **유틸리티 훅** | usehooks-ts | useMediaQuery, useLocalStorage 등 |
| **분석** | Google Analytics | 방문자 추적 (옵션) |

### 개발 의존성
- ESLint 9 (코드 품질 검사)
- Tailwind CSS PostCSS (스타일 처리)
- shadcn CLI (UI 컴포넌트 추가)

## 🔧 개발 가이드

### 포트폴리오 섹션 추가/수정

각 섹션은 `src/components/sections/`에 독립적으로 구현되어 있습니다:

```tsx
// src/components/sections/my-new-section.tsx
'use client'

import { FadeInSection } from '@/components/motion/fade-in-section'

export function MyNewSection() {
  return (
    <FadeInSection>
      <section className="py-16 md:py-24">
        {/* 섹션 콘텐츠 */}
      </section>
    </FadeInSection>
  )
}
```

그 다음 홈 페이지에서 임포트하여 추가:

```tsx
// src/app/[locale]/page.tsx
import { MyNewSection } from '@/components/sections/my-new-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MyNewSection /> {/* 추가 */}
      {/* ... */}
    </>
  )
}
```

### 프로젝트 데이터 추가

프로젝트는 별도 데이터 파일에서 관리되어 컴포넌트와 분리됩니다:

```tsx
// src/data/projects.ts (또는 JSON)
export const projects = [
  {
    id: 'my-project',
    title: '프로젝트명',
    description: '설명',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    images: ['/images/project-1.png'],
    links: {
      github: 'https://github.com/...',
      live: 'https://...'
    }
  }
]
```

### 반응형 컴포넌트 예제

```tsx
'use client'

import { useMediaQuery } from 'usehooks-ts'

export function ResponsiveShowcase() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  
  return isDesktop ? <DesktopLayout /> : <MobileLayout />
}
```

### 애니메이션 추가 (Framer Motion)

```tsx
import { motion } from 'framer-motion'

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      카드 콘텐츠
    </motion.div>
  )
}
```

### 새 UI 컴포넌트 설치

shadcn UI에서 추가 컴포넌트 설치:

```bash
npx shadcn@latest add tabs
npx shadcn@latest add table
npx shadcn@latest add carousel
```

## 🚢 배포

### 프로덕션 빌드

```bash
# 빌드 생성
npm run build

# 로컬에서 프로덕션 실행 (테스트)
npm run start
```

### 추천 배포 플랫폼

- **Vercel** (Next.js 공식 호스팅, 무료 플랜 사용 가능)
  - Git 연동으로 자동 배포
  - 글로벌 CDN, 자동 최적화
  
- **Netlify**
  - 심플한 배포 절차
  - 폼 핸들링 내장
  
- **AWS Amplify, Railway, Render** 등

## 📊 성능 최적화

이 포트폴리오는 다음과 같은 최적화가 적용됩니다:

- **이미지 최적화** — Next.js `Image` 컴포넌트 자동 최적화
- **번들 최적화** — Tree-shaking, 동적 임포트
- **렌더링** — 서버 컴포넌트로 클라이언트 JS 최소화
- **SEO** — 메타데이터, Open Graph, 구조화된 데이터
- **접근성** — WCAG 준수, 시맨틱 HTML

## 🔒 보안

- TypeScript strict mode 활성화
- Content Security Policy 권장
- 환경 변수로 민감 정보 관리 (`.env.local`)
- 정기적 의존성 업데이트 (`npm audit`)

## 📞 연락 및 지원

포트폴리오 개선, 버그 리포트, 기능 요청은 GitHub Issues를 통해 진행할 수 있습니다.

## 📄 라이선스

MIT License — 자유롭게 사용, 수정, 배포 가능합니다.

---

## 🎓 학습 리소스

이 프로젝트는 다음 기술들을 실무적으로 배울 수 있는 완벽한 사례입니다:

- **Next.js 16** App Router 패턴 및 서버 컴포넌트
- **React 19** 최신 기능 활용
- **TypeScript** 타입 시스템 활용
- **TailwindCSS v4** 유틸리티 기반 스타일링
- **Framer Motion** 고급 애니메이션
- **다국어 지원** (i18n) 구현
- **성능 최적화** 실전 기법

### 추천 학습 순서

1. **기본 구조 이해** — `src/app/[locale]/page.tsx` 메인 페이지 코드 분석
2. **컴포넌트 시스템** — `src/components/sections/` 섹션 컴포넌트 학습
3. **스타일링** — TailwindCSS + oklch 색상 시스템
4. **애니메이션** — Framer Motion 예제 (`fade-in-section.tsx`)
5. **데이터 관리** — 프로젝트 데이터 파일 구조 파악
6. **배포** — 로컬 빌드 후 Vercel 배포

### 실습 과제

- [ ] 자신의 정보로 포트폴리오 커스터마이징
- [ ] 새로운 섹션 추가 (기술 블로그, 오픈소스 기여 등)
- [ ] 색상 테마 변경 및 브랜딩 개선
- [ ] 새로운 애니메이션 효과 추가
- [ ] Lighthouse 성능 점수 최적화
- [ ] Vercel에 배포하고 공유

---

💡 **팁**: 이 포트폴리오를 GitHub에 공개하면 채용담당자가 코드 품질, 설계 능력, 최신 기술 활용 능력을 한눈에 평가할 수 있습니다. 최종 완성 후 GitHub 링크를 이력서에 추가하세요!
