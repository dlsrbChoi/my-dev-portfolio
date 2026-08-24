import { experienceData } from '@/lib/experience-data'
import { siteConfig } from '@/lib/site-config'
import { getSkillIcon } from '@/lib/skill-icons'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExperienceTimeline } from '@/components/resume/experience-timeline'
import { SectionHeader } from '@/components/patterns/section-header'
import { StaggerList, StaggerItem } from '@/components/motion/stagger-list'
import { Mail, GitBranch, Phone, MapPin, Code2, Server, Wrench, type LucideIcon } from 'lucide-react'

// 기술스택 카테고리명 -> lucide 아이콘 매핑 (site-config.ts 데이터 구조는 변경하지 않음)
const skillCategoryIconMap: Record<string, LucideIcon> = {
  '프론트엔드': Code2,
  '백엔드': Server,
  '도구 & 플랫폼': Wrench,
}

export async function ResumeSection() {

  return (
    <section id="resume" className="-scroll-mt-5 py-20 sm:py-28">
      <div className="space-y-12">
        {/* 제목 */}
        <SectionHeader title="이력서" description="경력, 학력, 기술 스택" />

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
        {experienceData.length > 0 && (
          <ExperienceTimeline title="경력" items={experienceData.slice(0, 3)} />
        )}

        {/* 기술 스택 - 카테고리별 가로 바 형태 */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">기술 스택</h3>
          <StaggerList className="space-y-4">
            {siteConfig.skillCategories.map((skillGroup) => {
              const CategoryIcon = skillCategoryIconMap[skillGroup.category]
              return (
                <StaggerItem key={skillGroup.category}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border p-4">
                    {/* 좌측: 아이콘박스 + 카테고리명 */}
                    <div className="flex items-center gap-3 sm:w-40 shrink-0">
                      {CategoryIcon && (
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-card"
                          aria-hidden="true"
                        >
                          <CategoryIcon className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <h4 className="font-semibold">{skillGroup.category}</h4>
                    </div>

                    {/* 우측: 스킬 배지 목록 */}
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => {
                        const icon = getSkillIcon(skill)
                        return (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="cursor-default flex items-center gap-1.5"
                          >
                            {icon && <span>{icon}</span>}
                            {skill}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerList>
        </div>
      </div>
    </section>
  )
}
