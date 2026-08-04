import type { Metadata } from 'next'
import { PageHeader } from '@/components/patterns/page-header'

export const metadata: Metadata = {
  title: '소개',
  description: '프론트엔드 UI/UX 구현에서 출발해 공공 프로젝트의 풀스택 개발까지 확장한 성장 과정을 나눕니다.',
  openGraph: {
    title: '소개 | 최인규 포트폴리오',
    description: '프론트엔드 UI/UX 구현에서 출발해 공공 프로젝트의 풀스택 개발까지 확장한 성장 과정을 나눕니다.',
  },
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="소개"
        description="프론트엔드 UI/UX 구현에서 출발해 공공 프로젝트의 풀스택 개발까지 확장한 성장 과정을 나눕니다"
      />

      <div className="space-y-12 py-8">
        {/* 성장 스토리 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">성장 스토리</h2>
          <p className="text-foreground/90 leading-relaxed">
            처음 시작은 React와 Vue.js를 중심으로 한 프론트엔드 개발이었습니다. 컴포넌트 기반 아키텍처, 상태 관리, 번들 최적화 등 UI/UX 구현의 세세한 부분까지 깊이 있게 학습했습니다.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            하지만 실무 프로젝트를 진행하면서 프론트엔드만으로는 해결할 수 없는 문제들을 마주했습니다. 백엔드 API 설계, 데이터베이스 쿼리 최적화, 결제 시스템 흐름 제어 등 서버 사이드 로직의 이해가 필요했습니다. 이러한 경험 속에서 시야를 넓혀 Spring Boot, MySQL, API 연동, 시스템 통합까지 학습하게 되었습니다.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            특히 인천지갑 앱과 전국 지자체 통합주차포털 두 프로젝트를 통해 프론트엔드 기술과 백엔드 로직을 오가며 문제를 해결하는 경험을 쌓았습니다. 이제는 단순히 어느 한쪽의 전문가가 아닌, 전체 시스템을 이해하고 의사결정할 수 있는 개발자가 되고 싶습니다.
          </p>
        </section>

        {/* 핵심 경력 타임라인 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">핵심 경력 타임라인</h2>
          <div className="border-l-2 border-border pl-4 space-y-6">
            <div>
              <h3 className="font-semibold text-lg">2023. 06 ~ 2024. 01 | 인천지갑 앱</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-2">마이그레이션 리드 · 프론트엔드 개발</p>
              <p className="text-foreground/90 text-sm leading-relaxed">
                서로 다른 언어와 프레임워크로 산개되어 있던 앱들의 UI/UX를 통일하는 대규모 마이그레이션을 주도했습니다. 33종의 전자증명서 연계, 공공 API 통합, 모바일 신분증 검증 등 복잡한 요구사항을 기술적으로 풀어냈습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">2024. 02 ~ 진행중 | 전국 지자체 통합주차포털</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-2">마이그레이션 · 결제 시스템 개발</p>
              <p className="text-foreground/90 text-sm leading-relaxed">
                Vue.js 프레임워크 버전 업그레이드 마이그레이션을 진행했으며, Smartro PG를 통한 결제 모듈의 흐름 제어를 구현했습니다. 라우터 지연 로딩으로 초기 렌더링 성능을 개선하는 등 사용자 경험 최적화에도 힘썼습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 기술 선택의 이유 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">왜 이 기술을 선택했는가</h2>
          <p className="text-foreground/90 leading-relaxed">
            프로젝트마다 다른 기술 스택을 접하면서, 기술을 은탄환으로 생각하지 않게 되었습니다. Vue.js와 React의 철학 차이, Spring Boot의 강점과 한계, 관계형 DB와 NoSQL의 트레이드오프 — 이 모든 것이 결국 문제 상황과 팀의 역량에 따라 최적의 선택이 달라집니다는 깨달음입니다.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            인천지갑 프로젝트에서는 기존의 분산된 코드베이스를 빠르게 통일해야 했기에 React의 풍부한 에코시스템을 선택했고, 통합주차포털에서는 기존 Vue.js 자산을 최대한 활용하면서 현대적인 버전으로 업그레이드하는 방향을 택했습니다. 이런 의사결정 경험이 저를 더 좋은 개발자로 만들고 있습니다.
          </p>
        </section>

        {/* 어려움과 해결책 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">어려움과 해결책</h2>
          <p className="text-foreground/90 leading-relaxed">
            가장 큰 도전은 낯선 도메인 학습입니다. 공공 행정 서비스, 전자증명서 연계, 주차 시스템 — 비즈니스 로직이 복잡하고 이전까지 경험하지 못한 영역들이었습니다.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            해결 방법은 단순했습니다. 도메인 전문가(기획자, 비즈니스 담당자)와 긴밀하게 협력하고, 요구사항을 기술 문제로 변환하기 전에 먼저 그 배경을 충분히 이해하는 것입니다. 또한 코드 리뷰와 페어 프로그래밍을 통해 팀의 경험을 공유하고, 작은 단위의 반복적인 배포와 검증으로 위험을 줄였습니다.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            지금도 모르는 것이 많지만, 모른다는 것을 인정하고 배우려는 자세가 가장 큰 자산이라고 믿습니다.
          </p>
        </section>
      </div>
    </>
  )
}
