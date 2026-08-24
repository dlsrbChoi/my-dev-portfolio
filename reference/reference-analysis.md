# 참고자료 분석: my-dev-portfolio vs notion-cms-project

**분석일**: 2026-08-19  
**참고자료**: https://github.com/junh0328/my-dev-portfolio.git  
**현재 프로젝트**: notion-cms-project

---

## 📊 핵심 비교 요약

| 항목 | 참고자료 (my-dev-portfolio) | 현재 프로젝트 | 상태 |
|------|---------------------------|-------------|------|
| **다국어** | ✅ next-intl (ko, en) | ❌ | 미구현 |
| **테마** | ✅ next-themes | ✅ next-themes | 있음 |
| **애니메이션** | ✅ Framer Motion | ✅ Framer Motion | 있음 |
| **배경 효과** | ✅ LiquidEther (WebGL) | ✅ Three.js WebGL | 있음 |
| **경력 타임라인** | ✅ 상세 구현 | ❌ | 미구현 |
| **프로젝트 모달** | ✅ 상세 모달 | ❌ | 미구현 |
| **블로그 섹션** | ✅ RSS 연동 | ❌ | 미구현 |
| **Google Analytics** | ✅ GA4 추적 | ❌ | 미구현 |
| **SEO 최적화** | ✅ sitemap, robots.txt | ❌ | 미구현 |
| **데이터 소스** | 📄 JSON 기반 i18n | 📋 Notion API | 다름 |

---

## 🎨 주요 기능/컴포넌트 카탈로그

### 1. **다국어 지원 (i18n)**

#### 참고자료 구현
- **위치**: `src/i18n/`
- **파일**: 
  - `config.ts` - 로케일 설정 (ko, en)
  - `navigation.ts` - 다국어 네비게이션
  - `messages/ko.json`, `messages/en.json` - 번역 메시지

#### 구현 패턴
```typescript
// next-intl 사용
const t = useTranslations('hero');
const locale = useLocale();
```

#### 라우팅 구조
```
src/app/[locale]/layout.tsx
src/app/[locale]/page.tsx
src/app/[locale]/not-found.tsx
```

#### 현재 프로젝트 상태
- ❌ 다국어 미구현
- 제안: `next-intl` 도입 필요 시 참고

---

### 2. **히어로 섹션 (Hero)**

#### 참고자료 구현
- **파일**: `src/components/sections/hero.tsx`
- **특징**:
  - LiquidEther 배경 (WebGL 유체 애니메이션)
  - Framer Motion 스테그 애니메이션 (이름 → 역할 → 설명 → 버튼)
  - 테마별 색상 팔레트 (라이트/다크 모드)
  - 소셜 링크 (GitHub, LinkedIn, Email, Blog)
  - 스크롤 인디케이터
  - Google Analytics 이벤트 추적

#### 주요 코드 요소
```tsx
// 테마별 색상 팔레트
const LIGHT_COLORS = ['#3425A0', '#4231c8', '#7B6AE8'];
const DARK_COLORS = ['#4A90D9', '#7CB5F7', '#A8D4FF'];

// Stagger 애니메이션
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
/>

// 이력서 다운로드 버튼
<Button variant='glass' asChild>
  <a href='/resume/resume-20260205.pdf' download>
    <Download className='mr-2 h-4 w-4' />
    {t('downloadResume')}
  </a>
</Button>
```

#### 현재 프로젝트 상태
- ⚠️ 부분 구현됨 (page.tsx에 기본 레이아웃 있음)
- 개선 가능: 더 정교한 애니메이션, 소셜 링크 통합

---

### 3. **경력 섹션 (Experience)**

#### 참고자료 구현
- **파일**: `src/components/sections/experience.tsx`
- **특징**:
  - 회사별 카드 레이아웃 (SpotlightCard)
  - 타임라인 시각화 (세로 라인 + 점)
  - 직급/팀별 상세 정보 (Collapsible)
  - 동적 경력 기간 계산 (`lib/duration.ts`)
  - 회사 로고, 기간, 팀 규모 표시
  - 실시간 경력 기간 계산

#### 타임라인 스타일
```tsx
<div className='relative pl-6 border-l-2 border-[var(--timeline-line)]'>
  {/* Timeline dot */}
  <div className='absolute left-[-9px] top-0 w-4 h-4 rounded-full 
    bg-[var(--timeline-dot-bg)] border-2 border-[var(--timeline-dot-border)]' />
  {/* Content */}
</div>
```

#### 데이터 구조
```typescript
const companies = [
  {
    key: 'dnsever',
    logo: '/images/logos/dns_ever_logo.png',
    positions: ['dev', 'p2p', 'spot'],
  },
  // ...
];
```

#### 현재 프로젝트 상태
- ❌ 완전히 미구현
- Notion API로 경력 데이터를 동적으로 가져오도록 설계 가능

---

### 4. **프로젝트 섹션 (Projects)**

#### 참고자료 구현
- **파일**: `src/components/sections/projects.tsx`
- **특징**:
  - Bento 그리드 레이아웃 (2개 열)
  - 프로젝트 카드 (SpotlightCard)
  - 이미지 프리뷰 + Hover 스케일 효과
  - 모달 상세 정보 (ProjectModal)
  - 기술 스택 배지 (다양한 variant)
  - 성과 항목 (achievements)
  - Google Analytics 추적

#### 카드 Variant 시스템
```tsx
const cardVariant = 'editorial' | 'glass' | 'solid' | 'outline'
```

#### 프로젝트 모달
- **파일**: `src/components/sections/project-modal.tsx`
- 전체 프로젝트 설명, 이미지 갤러리, 기술 스택, 성과 상세

#### 현재 프로젝트 상태
- ⚠️ 부분 구현됨 (프로젝트 카드 기본 구조 있음)
- 개선 가능: 모달 상세 보기, 이미지 갤러리, 성과 명시

---

### 5. **기술 스택 섹션 (Skills)**

#### 참고자료 구현
- **파일**: `src/components/sections/skills.tsx`
- **특징**:
  - 5개 카테고리 (Core, Data, Styling, DevOps, Productivity)
  - 카테고리별 아이콘 (lucide-react)
  - 배지 기반 기술 표시
  - 반응형 레이아웃 (flex-row on desktop)

#### 구조
```tsx
const categories = [
  { key: 'core', icon: Code2 },
  { key: 'data', icon: Database },
  { key: 'styling', icon: Palette },
  { key: 'devops', icon: Settings },
  { key: 'productivity', icon: Wrench },
];
```

#### 현재 프로젝트 상태
- ❌ 미구현
- Notion 또는 siteConfig로 데이터 관리 가능

---

### 6. **학력/자격증 섹션 (Education)**

#### 참고자료 구현
- **파일**: `src/components/sections/education.tsx`
- **특징**:
  - 학력 정보 (대학, 전공, 기간, GPA)
  - 과목 목록 Collapsible (기초과목, 전공과목)
  - Framer Motion 애니메이션 (height, opacity)
  - 자격증 타임라인
  - 아이콘 (GraduationCap, Award)

#### 학력 카드 구조
```tsx
<Card className='liquid-glass'>
  <CardHeader>
    {/* 대학명, 전공, 기간, 상태 배지 */}
  </CardHeader>
  <CardContent>
    {/* GPA, 과목 토글 */}
  </CardContent>
</Card>
```

#### 현재 프로젝트 상태
- ❌ 미구현
- ROADMAP에 "education-section" 있음 (Phase 5)

---

### 7. **블로그 섹션 (Blog)**

#### 참고자료 구현
- **파일**: `src/components/sections/blog.tsx`, `blog-cards.tsx`
- **특징**:
  - RSS 피드에서 동적 블로그 포스트 가져오기
  - 카드 레이아웃 + 이미지 썸네일
  - "더 보기" 링크

#### 데이터 소스
- `lib/blog.ts` - RSS 파싱 및 캐싱

#### 현재 프로젝트 상태
- ❌ 미구현

---

### 8. **공통 컴포넌트 & 유틸리티**

#### LiquidEther (액체 효과 배경)
- **파일**: `src/components/common/liquid-ether.tsx`, `liquid-ether-engine.tsx`
- **기술**: Three.js + WebGL
- **특징**: 마우스 인터랙션, 테마별 색상 변경, 자동 데모 모드

#### SpotlightCard
- **파일**: `src/components/common/spotlight-card.tsx`
- **특징**: Spotlight 효과 (마우스 추적), 커스텀 색상

#### Duration 유틸리티
- **파일**: `lib/duration.ts`
- **기능**: 경력 기간 동적 계산, 로케일별 포맷팅

#### Google Analytics
- **파일**: `lib/gtag.ts`, `types/gtag.d.ts`
- **추적 이벤트**: resume 다운로드, 링크 클릭, 모달 열기 등

#### 현재 프로젝트 상태
- ✅ Three.js WebGL 있음 (다름)
- ❌ SpotlightCard 없음
- ❌ Google Analytics 없음

---

### 9. **UI 컴포넌트**

#### shadcn/ui 기반 컴포넌트
- **Button** - glass, outline, solid variant
- **Card** - editorial, glass, solid, outline variant
- **Badge** - glass, flat, accent, outline variant
- **Collapsible** - 상세 정보 토글
- **Dialog** - 모달 (ProjectModal, BusinessImpactModal)
- **Tooltip** - 호버 정보
- **Carousel** - 이미지 갤러리

#### 현재 프로젝트 상태
- ✅ 기본 UI 컴포넌트 있음
- ⚠️ Variant 시스템은 다를 수 있음

---

### 10. **레이아웃 & 네비게이션**

#### Header
- **파일**: `src/components/layout/header.tsx`
- **특징**: 네비게이션 메뉴, 테마 토글, 언어 선택기

#### Footer
- **파일**: `src/components/layout/footer.tsx`

#### 현재 프로젝트 상태
- ✅ 기본 헤더 있음
- ⚠️ 언어 선택기 없음

---

## 📁 디렉토리 구조 비교

### 참고자료 구조
```
src/
├── app/
│   ├── [locale]/              # 다국어 라우팅
│   ├── layout.tsx             # 루트 레이아웃 (폰트, 메타데이터, GA)
│   ├── globals.css
│   ├── robots.ts              # robots.txt 생성
│   └── sitemap.ts             # sitemap.xml 생성
├── components/
│   ├── ui/                    # shadcn/ui 컴포넌트
│   ├── common/                # LiquidEther, SpotlightCard, ASCII 텍스트 등
│   ├── layout/                # Header, Footer
│   ├── sections/              # Hero, About, Experience, Projects, Skills, Education, Blog, Contact
│   └── providers/             # Theme Provider
├── i18n/                      # next-intl 설정
│   ├── messages/              # ko.json, en.json
│   ├── config.ts
│   └── navigation.ts
├── lib/
│   ├── utils.ts               # cn() 유틸리티
│   ├── duration.ts            # 경력 기간 계산
│   ├── fonts.ts               # 폰트 설정
│   ├── gtag.ts                # Google Analytics
│   └── blog.ts                # RSS 피드 파싱
└── types/
    └── gtag.d.ts              # gtag 타입
```

### 현재 프로젝트 구조
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                    # shadcn/ui 컴포넌트
│   ├── layout/                # Header, Footer
│   ├── motion/                # StaggerList
│   ├── patterns/              # SectionHeader
│   ├── projects/              # ProjectCard
│   ├── sections/              # AboutSection, ContactSection, etc.
│   └── resume/                # ExperienceTimeline
└── lib/
    ├── utils.ts               # cn()
    ├── site-config.ts         # 사이트 설정
    └── notion.ts              # Notion API
```

---

## 🛠️ 기술 스택 비교

### 참고자료
```json
{
  "next": "16.2.9",
  "react": "19.2.4",
  "typescript": "^5",
  "framer-motion": "^12.40.0",
  "next-intl": "^4.8.3",      // 다국어
  "next-themes": "^0.4.6",
  "tailwindcss": "^4",
  "three": "^0.183.2",
  "dayjs": "^1.11.19",         // 날짜 포맷팅
  "embla-carousel": "^8.6.0"   // 캐러셀
}
```

### 현재 프로젝트
```json
{
  "next": "16.2.12",
  "react": "19.2.4",
  "typescript": "^5",
  "framer-motion": "^11.0.0",
  "@notionhq/client": "^5.23.3", // Notion API
  "next-themes": "^0.4.6",
  "tailwindcss": "^4",
  "@react-three/fiber": "^8.15.0", // Three.js (R3F)
  "@react-three/drei": "^9.96.0"
}
```

### 주요 차이
- **다국어**: 참고자료는 `next-intl`, 현재는 미구현
- **데이터 소스**: 참고자료는 JSON 메시지, 현재는 Notion API
- **캐러셀**: 참고자료는 `embla-carousel`, 현재는 없음
- **날짜 처리**: 참고자료는 `dayjs`, 현재는 없음

---

## 📊 기능 반영 우선순위

### Phase 1: 필수 기능 (2~3주)
- [ ] **경력 타임라인** - Experience 섹션 완성
  - 회사별 카드, 포지션별 타임라인, 동적 기간 계산
  - 참고: `src/components/sections/experience.tsx`
- [ ] **기술 스택 섹션** - Skills 섹션 완성
  - 카테고리별 배지 표시
  - 참고: `src/components/sections/skills.tsx`
- [ ] **학력/자격증** - Education 섹션 완성
  - Collapsible 과목 목록, 자격증 타임라인
  - 참고: `src/components/sections/education.tsx`

### Phase 2: 향상된 기능 (3~4주)
- [ ] **프로젝트 모달** - Projects 섹션 상세 보기
  - 모달 오버레이, 이미지 갤러리
  - 참고: `src/components/sections/project-modal.tsx`
- [ ] **SpotlightCard** - 공통 컴포넌트
  - 마우스 추적 효과
  - 참고: `src/components/common/spotlight-card.tsx`
- [ ] **Google Analytics** - 사용자 추적
  - 이벤트 로깅
  - 참고: `lib/gtag.ts`

### Phase 3: 고급 기능 (4~6주)
- [ ] **다국어 지원** - next-intl 도입
  - ko/en 메시지 파일, 라우팅
  - 참고: `src/i18n/`
- [ ] **블로그 섹션** - RSS 연동
  - 동적 포스트 가져오기
  - 참고: `src/components/sections/blog.tsx`
- [ ] **SEO 최적화** - sitemap, robots.txt
  - 참고: `src/app/robots.ts`, `sitemap.ts`

---

## 🎯 구현 가이드

### 경력 섹션 (Experience) 반영 방안
1. **Notion 데이터 구조**:
   ```typescript
   interface Experience {
     company: string;
     logo: string;
     period: string;
     positions: Array<{
       team: string;
       period: string;
       teamSize?: string;
       projects: string[];
       details?: Record<string, string[]>;
     }>;
   }
   ```

2. **컴포넌트 개선**:
   - `src/components/resume/experience-timeline.tsx` 확장
   - Notion API로 데이터 동적 로드
   - SpotlightCard + 타임라인 시각화 추가

3. **참고 코드**:
   - Duration 계산: `lib/duration.ts` 구현 패턴
   - Collapsible 상세 정보: `experience.tsx` L36-104

### 기술 스택 섹션 (Skills) 반영 방안
1. **siteConfig 확장**:
   ```typescript
   skillCategories: [
     {
       key: 'core',
       icon: 'Code2',
       items: ['React', 'Next.js', 'TypeScript', ...]
     },
     // ...
   ]
   ```

2. **컴포넌트**: 새로 생성 `src/components/sections/skills-section.tsx`

3. **참고 코드**: `skills.tsx` L8-89

### 프로젝트 모달 (ProjectModal) 반영 방안
1. **프로젝트 카드 확장**:
   - 클릭 이벤트 → 모달 열기
   - 이미지 갤러리 (Carousel)

2. **모달 컴포넌트**: `src/components/projects/project-modal.tsx` 신규 생성

3. **Notion 데이터 활용**:
   - 프로젝트 이미지, 상세 설명, 성과 항목

---

## 💡 아키텍처 설계 이슈 해결

### 데이터 소스 차이
| 항목 | 참고자료 | 현재 프로젝트 |
|------|---------|-------------|
| 데이터 저장 | JSON (i18n 파일) | Notion DB |
| 다국어 | 별도 메시지 파일 | 미구현 |
| 실시간 업데이트 | 배포 필요 | API 호출로 즉시 |

**해결책**: Notion API로 i18n 메시지도 관리 가능 → 다국어 메시지 테이블 추가

### 컴포넌트 재사용
- 참고자료의 `SpotlightCard`, `LiquidEther` 등은 현재 프로젝트에 직접 이식 가능
- 다만 데이터 소스 (JSON → Notion) 변경 필요

---

## 📝 체크리스트

### 빠른 반영 (1주)
- [ ] Experience 섹션 구현 (타임라인 + 회사별 카드)
- [ ] Skills 섹션 구현 (카테고리별 배지)
- [ ] Duration 계산 유틸 추가

### 표준 반영 (2~3주)
- [ ] Education 섹션 구현 (Collapsible 과목)
- [ ] SpotlightCard 컴포넌트 추가
- [ ] ProjectCard 모달 기능 추가

### 선택 반영 (4주+)
- [ ] next-intl 도입 (다국어)
- [ ] Google Analytics 통합
- [ ] Blog 섹션 (RSS 또는 Notion)
- [ ] SEO 최적화 (sitemap, robots.txt)

---

## 🔗 참고 자료 링크

- **전체 구현**: `reference/my-dev-portfolio/src/components/sections/`
- **타임라인 구현**: `experience.tsx` (L152-269)
- **스킬 카테고리**: `skills.tsx` (L11-32)
- **프로젝트 카드**: `projects.tsx` (L64-196)
- **모달 패턴**: `project-modal.tsx`
- **공통 컴포넌트**: `common/` 디렉토리 (SpotlightCard, LiquidEther 등)

---

## 📌 다음 단계

1. **우선순위 선택**: 위 Phase 1-3 중 먼저 진행할 항목 선택
2. **데이터 설계**: Notion 스키마 확정 (Experience, Skills, Education 등)
3. **컴포넌트 개발**: 참고자료 패턴을 Notion 데이터 연동 방식으로 변환
4. **테스트**: 브라우저에서 레이아웃 + 애니메이션 검증
5. **ROADMAP 업데이트**: 완료된 항목 반영
