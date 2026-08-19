'use client'

import { motion } from 'framer-motion'
import { ExperienceEntry } from '@/types/notion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Briefcase } from 'lucide-react'
import { formatDuration, calculateDuration, calculateTotalCareerDuration } from '@/lib/duration'

interface ExperienceTimelineProps {
  items: ExperienceEntry[]
  title?: string
  showHeader?: boolean
  animateOnView?: boolean
}

export function ExperienceTimeline({
  items,
  title = '경력',
  showHeader = true,
  animateOnView = true,
}: ExperienceTimelineProps) {
  // 최신순 정렬 (최근부터 이전으로)
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.period.start).getTime()
    const dateB = new Date(b.period.start).getTime()
    return dateB - dateA
  })

  // 전체 경력 기간 계산
  const totalDuration = calculateTotalCareerDuration(sortedItems)
  const totalDurationText = formatDuration(totalDuration, 'ko')

  const Container = animateOnView ? motion.section : 'section'
  const containerProps = animateOnView
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true },
      }
    : {}

  return (
    <Container id="experience" className="py-20 md:py-32 scroll-mt-28" {...containerProps}>
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-background/50 backdrop-blur-sm">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{totalDurationText}</span>
            </div>
          </motion.div>
        )}

        {/* 타임라인 */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{item.organization}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{item.position}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{item.period.start}</span>
                      <span>~</span>
                      <span>{item.period.end}</span>
                      <Badge variant="secondary" className="ml-2">
                        {formatDuration(
                          calculateDuration(item.period.start, item.period.end),
                          'ko'
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                {/* 타임라인 점 및 라인 */}
                <CardContent className="relative pt-6 pl-6">
                  {/* 좌측 타임라인 라인 */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

                  {/* 타임라인 점 */}
                  <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-primary border-2 border-background" />

                  {/* 내용 */}
                  {item.description && (
                    <p className="text-sm leading-relaxed text-foreground">{item.description}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  )
}
