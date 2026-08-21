import { getTranslations } from 'next-intl/server'
import { getResumeData, getProjects } from '@/lib/notion'
import { siteConfig } from '@/lib/site-config'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/patterns/section-header'
import { StaggerList, StaggerItem } from '@/components/motion/stagger-list'
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
  const t = await getTranslations('about')
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
          <SectionHeader title={t('title')} />
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {t('description1')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {t('description2')}
          </p>
        </div>

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
            <Card>
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <Zap className="h-6 w-6 text-primary shrink-0 mt-1" />
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
            <Card>
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <Lightbulb className="h-6 w-6 text-primary shrink-0 mt-1" />
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
            <Card>
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <MessageSquare className="h-6 w-6 text-primary shrink-0 mt-1" />
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
            <Card>
              <CardContent className="py-6">
                <div className="flex gap-4">
                  <Zap className="h-6 w-6 text-primary shrink-0 mt-1" />
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
