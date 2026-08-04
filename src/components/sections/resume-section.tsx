import { getResumeData } from '@/lib/notion'
import type { ExperienceEntry } from '@/types/notion'
import { siteConfig } from '@/lib/site-config'
import { getSkillIcon } from '@/lib/skill-icons'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExperienceTimeline } from '@/components/resume/experience-timeline'
import { Mail, GitBranch, Phone, MapPin } from 'lucide-react'

export async function ResumeSection() {
  let experiences: ExperienceEntry[] = []

  try {
    const data = await getResumeData()
    experiences = data.experiences
  } catch (error) {
    console.error('Failed to fetch resume data:', error)
  }

  return (
    <section id="resume" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-12">
        {/* 제목 */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">이력서</h2>
          <p className="text-lg text-muted-foreground">
            경력, 학력, 기술 스택
          </p>
        </div>

        {/* 프로필 요약 */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{siteConfig.name}</h3>
                <p className="text-muted-foreground">프론트엔드 개발자 | 풀스택 개발자</p>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                {siteConfig.email && (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                )}
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
          </CardContent>
        </Card>

        {/* 경력 */}
        {experiences.length > 0 && (
          <ExperienceTimeline title="경력" items={experiences} limit={3} />
        )}

        {/* 기술 스택 */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">기술 스택</h3>
          <div className="space-y-4">
            {siteConfig.skillCategories.map((skillGroup) => (
              <Card key={skillGroup.category}>
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-lg mb-3">{skillGroup.category}</h4>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
