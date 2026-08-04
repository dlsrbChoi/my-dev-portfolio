import { getResumeData, getProjects } from '@/lib/notion'
import { siteConfig } from '@/lib/site-config'
import { Card, CardContent } from '@/components/ui/card'
import { Zap, Lightbulb, MessageSquare } from 'lucide-react'

function calculateYearsOfExperience(startDate: string): number {
  if (!startDate) return 0
  const [year, month] = startDate.split('-').map(Number)
  const start = new Date(year, month - 1)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  if (now.getMonth() < start.getMonth()) years--
  return years
}

export async function AboutSection() {
  let yearsOfExperience: number = 0
  let projectCount: number = 0
  let skillCount: number = 0

  try {
    const { experiences } = await getResumeData()
    if (experiences.length > 0) {
      const oldestExperience = experiences.reduce((oldest, current) => {
        const oldestDate = new Date(oldest.period.start).getTime()
        const currentDate = new Date(current.period.start).getTime()
        return currentDate < oldestDate ? current : oldest
      })
      yearsOfExperience = calculateYearsOfExperience(oldestExperience.period.start)
    }

    const projects = await getProjects()
    projectCount = projects.length
  } catch (error) {
    console.error('Failed to fetch About section data:', error)
  }

  skillCount = siteConfig.skillCategories.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <section id="about" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-12">
        {/* 소개 텍스트 */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">소개</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            프론트엔드에서 풀스택으로 성장한 개발자입니다. UI/UX 구현에서 출발해 백엔드 로직, 데이터베이스, 시스템 통합까지 이해 범위를 넓혀왔습니다.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            인천지갑 앱과 전국 지자체 통합주차포털에서 마이그레이션과 결제 시스템 개발을 주도했으며, 모르는 것을 인정하고 배우려는 자세로 지속적인 성장을 추구합니다.
          </p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-primary">
              {yearsOfExperience}+
            </p>
            <p className="text-sm text-muted-foreground mt-2">연차 경력</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-primary">
              {projectCount}
            </p>
            <p className="text-sm text-muted-foreground mt-2">완료 프로젝트</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-primary">
              {skillCount}+
            </p>
            <p className="text-sm text-muted-foreground mt-2">기술 스택</p>
          </div>
        </div>

        {/* 핵심 강점 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Zap className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">빠른 학습과 적응</h3>
                  <p className="text-sm text-muted-foreground">
                    낯선 도메인과 프레임워크를 빠르게 습득해 프로젝트 요구사항을 기술적으로 구현합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Lightbulb className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">전체 시스템 이해</h3>
                  <p className="text-sm text-muted-foreground">
                    프론트엔드 UI부터 백엔드 API, 데이터베이스까지 전체 흐름을 이해하며 협업합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <MessageSquare className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">팀과의 소통</h3>
                  <p className="text-sm text-muted-foreground">
                    기획자, 디자이너, 백엔드 개발자와 원활하게 소통해 요구사항을 정확히 파악합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Zap className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">성능과 사용성</h3>
                  <p className="text-sm text-muted-foreground">
                    사용자 경험을 최우선으로 성능 최적화와 직관적 인터페이스 설계를 추구합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
