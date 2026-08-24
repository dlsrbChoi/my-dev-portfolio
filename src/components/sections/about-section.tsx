import { getTranslations } from 'next-intl/server'
import { getProjectCount } from '@/lib/projects-data'
import { getSideProjectCount } from '@/lib/side-projects-data'
import { experienceData } from '@/lib/experience-data'
import { siteConfig } from '@/lib/site-config'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/patterns/section-header'
import { StaggerList, StaggerItem } from '@/components/motion/stagger-list'
import { Zap, Lightbulb, MessageSquare, Users } from 'lucide-react'

function calculateYearsOfExperience(experiences: Array<{ period: { start: string } }>): number {
  if (!experiences || experiences.length === 0) return 0
  const oldestExperience = experiences.reduce((oldest, current) => {
    const oldestDate = new Date(oldest.period.start).getTime()
    const currentDate = new Date(current.period.start).getTime()
    return currentDate < oldestDate ? current : oldest
  })

  const startDate = oldestExperience.period.start
  if (!startDate) return 0
  const [year, month] = startDate.split('.').map(Number)
  const start = new Date(year, month - 1)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  if (now.getMonth() < start.getMonth()) years--
  return years
}

export async function AboutSection() {
  const t = await getTranslations('about')
  let yearsOfExperience: number = 0
  let projectCount: number = 0
  let skillCount: number = 0

  yearsOfExperience = calculateYearsOfExperience(experienceData)
  projectCount = getProjectCount() + getSideProjectCount()

  skillCount = siteConfig.skillCategories.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <section id="about" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-12">
        {/* 섹션 제목 */}
        <SectionHeader title={t('title')} />

        {/* 회사 경험 카드 - 순차 진입 애니메이션 적용 */}
        <StaggerList className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StaggerItem>
            <Card className="group cursor-default transition-all duration-300 hover:border-primary hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    DIS
                  </div>
                  <p className="text-sm font-semibold">{t('company1Name')}</p>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('company1Title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('company1Description')}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="group cursor-default transition-all duration-300 hover:border-primary hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    DIS
                  </div>
                  <p className="text-sm font-semibold">{t('company2Name')}</p>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('company2Title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('company2Description')}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="group cursor-default transition-all duration-300 hover:border-primary hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    아펠
                  </div>
                  <p className="text-sm font-semibold">{t('company3Name')}</p>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('company3Title')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('company3Description')}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerList>

        {/* 통계 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-primary">
              {yearsOfExperience}+
            </p>
            <p className="text-sm text-muted-foreground mt-2">{t('statsExperience')}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-primary">
              {projectCount}
            </p>
            <p className="text-sm text-muted-foreground mt-2">{t('statsProjects')}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-primary">
              {skillCount}+
            </p>
            <p className="text-sm text-muted-foreground mt-2">{t('statsSkills')}</p>
          </div>
        </div>

        {/* 핵심 강점 - 순차 진입 애니메이션 적용 */}
        <StaggerList className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <StaggerItem>
            <Card className="group transition-all duration-300 hover:border-primary hover:shadow-lg">
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <Zap className="h-6 w-6 text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('strength1Title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('strength1Description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="group transition-all duration-300 hover:border-primary hover:shadow-lg">
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <Lightbulb className="h-6 w-6 text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('strength2Title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('strength2Description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="group transition-all duration-300 hover:border-primary hover:shadow-lg">
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <MessageSquare className="h-6 w-6 text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('strength3Title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('strength3Description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="group transition-all duration-300 hover:border-primary hover:shadow-lg">
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <Users className="h-6 w-6 text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('strength4Title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('strength4Description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerList>
      </div>
    </section>
  )
}
