import type { Metadata } from 'next'
import { getResumeData } from '@/lib/notion'
import { siteConfig } from '@/lib/site-config'
import { getSkillIcon } from '@/lib/skill-icons'
import { Container } from '@/components/layout/container'
import { PageHeader } from '@/components/patterns/page-header'
import { PrintButton } from '@/components/patterns/print-button'
import { ResumePrintLayout } from '@/components/resume/resume-print-layout'
import { ExperienceTimeline } from '@/components/resume/experience-timeline'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, GitBranch, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: '이력서',
  description: '최인규의 경력, 학력, 기술 스택을 담은 이력서입니다.',
  openGraph: {
    title: '이력서 | 최인규 포트폴리오',
    description: '최인규의 경력, 학력, 기술 스택을 담은 이력서입니다.',
  },
}

export default async function ResumePage() {
  const { experiences, education, certificates } = await getResumeData()

  return (
    <>
      <Container>
        <PageHeader
          title="이력서"
          description="최인규의 경력, 학력, 기술 스택을 담은 이력서입니다."
        >
          <PrintButton />
        </PageHeader>
      </Container>

      <ResumePrintLayout>
        {/* 프로필 요약 섹션 */}
        <section className="resume-section">
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {siteConfig.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                프론트엔드 개발자 | 기술 리드
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitBranch className="h-4 w-4" />
                GitHub
              </a>
              {siteConfig.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </div>
              )}
              {siteConfig.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {siteConfig.location}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 경력 섹션 */}
        {experiences.length > 0 && (
          <ExperienceTimeline title="경력" items={experiences} />
        )}

        {/* 학력 섹션 */}
        {education.length > 0 && (
          <ExperienceTimeline title="학력" items={education} />
        )}

        {/* 기술 스택 섹션 */}
        <section className="resume-section">
          <h2 className="text-2xl font-bold tracking-tight mb-6">기술 스택</h2>
          <div className="space-y-4">
            {siteConfig.skillCategories.map((skillGroup) => (
              <Card key={skillGroup.category} className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => {
                    const icon = getSkillIcon(skill)
                    return (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="cursor-default flex items-center gap-1.5"
                      >
                        {icon && <span>{icon}</span>}
                        {skill}
                      </Badge>
                    )
                  })}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 자격증 섹션 */}
        {certificates.length > 0 && (
          <ExperienceTimeline title="자격증 & 수상" items={certificates} />
        )}
      </ResumePrintLayout>
    </>
  )
}
