'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { ExperienceEntry } from '@/types/resume'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Calendar, Briefcase, ChevronDown, Users } from 'lucide-react'
import { formatDuration, calculateDuration, calculateTotalCareerDuration } from '@/lib/duration'

interface ExperienceTimelineProps {
  items: ExperienceEntry[]
  title?: string
  showHeader?: boolean
  animateOnView?: boolean
}

// 회사별 직책 매핑 및 상세 정보 키
const detailsConfig: Record<string, Record<string, string[]>> = {
  lps: {
    service: ['dev', 'audit_pia', 'migration', 'maintenance', 'swlcRenewal'],
    design: ['fe', 'build'],
  },
  dhicc: {
    yeosu: ['mothership', 'outsourcing', 'performance'],
    chuncheon: ['paltform', 'menu', 'calc'],
    asan: ['state', 'popup', 'publishing'],
    yangchun: ['PG', 'chatbot', 'board', 'publishing'],
    incheon: ['atomic', 'study'],
    busan: ['migration', 'map'],
    paju: ['loading'],
    anyang: ['sso', 'admin', 'guide'],
  },
}

function DetailsCollapsible({
  companyKey,
  positionKey,
  t,
}: {
  companyKey: string
  positionKey: string
  t: ReturnType<typeof useTranslations<'experience'>>
}) {
  const [isOpen, setIsOpen] = useState(false)

  const detailKeys = detailsConfig[companyKey]?.[positionKey]
  if (!detailKeys || detailKeys.length === 0) return null

  // 상세 정보 존재 여부 확인
  let hasDetails = false
  try {
    const details = t.raw(`companies.${companyKey}.positions.${positionKey}.details`)
    hasDetails = details && Object.keys(details).length > 0
  } catch {
    return null
  }

  if (!hasDetails) return null

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-3">
      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer">
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
        <span>{isOpen ? t('hideDetails') : t('showDetails')}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 p-3 bg-secondary/30 rounded-md space-y-3">
        {detailKeys.map((detailKey) => {
          let items: string[] = []
          try {
            items = t.raw(
              `companies.${companyKey}.positions.${positionKey}.details.${detailKey}`
            ) as string[]
          } catch {
            return null
          }

          if (!items || !Array.isArray(items) || items.length === 0) return null

          return (
            <div key={detailKey} className="pl-3 border-l border-primary/30 space-y-1">
              {items.map((item: string, i: number) => {
                // 주요 키워드 추출 및 색상 강조
                const highlightKeywords = (text: string) => {
                  const patterns = [
                    { regex: /\[핵심\]/g, color: 'text-red-500' },
                    { regex: /\[성과\]/g, color: 'text-green-500' },
                    { regex: /\[기술\]/g, color: 'text-blue-500' },
                    { regex: /\[개선\]/g, color: 'text-purple-500' },
                    { regex: /\[리드\]/g, color: 'text-orange-500' },
                    { regex: /\[관리\]/g, color: 'text-cyan-500' },
                    { regex: /\[솔루션\]/g, color: 'text-indigo-500' },
                    { regex: /\[최적화\]/g, color: 'text-emerald-500' },
                    { regex: /\[설계\]/g, color: 'text-fuchsia-500' },
                    { regex: /\[알고리즘\]/g, color: 'text-rose-500' },
                    { regex: /\[안정성\]/g, color: 'text-teal-500' },
                    { regex: /\[플랫폼\]/g, color: 'text-sky-500' },
                    { regex: /\[효율화\]/g, color: 'text-lime-500' },
                    { regex: /\[표준화\]/g, color: 'text-violet-500' },
                    { regex: /\[결제\]/g, color: 'text-amber-500' },
                    { regex: /\[마이그레이션\]/g, color: 'text-pink-500' },
                    { regex: /\[검증\]/g, color: 'text-cyan-600' },
                    { regex: /\[출시\]/g, color: 'text-green-600' },
                  ]

                  let parts: (string | React.ReactNode)[] = [text]
                  patterns.forEach(({ regex, color }) => {
                    parts = parts.flatMap(part => {
                      if (typeof part !== 'string') return part
                      const split = part.split(regex)
                      return split.flatMap((segment, idx) => {
                        if (idx === split.length - 1) return segment
                        const match = text.match(regex)?.[0]
                        return [segment, <span key={`${i}-${idx}`} className={`font-semibold ${color}`}>{match}</span>]
                      })
                    })
                  })
                  return parts
                }

                return (
                  <p key={i} className="text-sm text-muted-foreground">
                    • {highlightKeywords(item)}
                  </p>
                )
              })}
            </div>
          )
        })}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function ExperienceTimeline({
  items,
  title = '경력',
  showHeader = true,
  animateOnView = true,
}: ExperienceTimelineProps) {
  const t = useTranslations('experience')
  const locale = useLocale()

  // 회사별로 그룹화
  const groupedByCompany = items.reduce(
    (acc, item) => {
      const existing = acc.find((g) => g.organization === item.organization)
      if (existing) {
        existing.positions.push(item)
      } else {
        acc.push({ organization: item.organization, positions: [item] })
      }
      return acc
    },
    [] as Array<{ organization: string; positions: ExperienceEntry[] }>
  )

  // 회사별 총 재직 기간 계산 (첫 시작 ~ 마지막 종료)
  const getCompanyDurationText = (positions: ExperienceEntry[]) => {
    const firstPosition = positions.reduce((earliest, pos) => {
      const posDate = new Date(pos.period.start).getTime()
      const earliestDate = new Date(earliest.period.start).getTime()
      return posDate < earliestDate ? pos : earliest
    })

    const lastPosition = positions.reduce((latest, pos) => {
      const posDate = new Date(pos.period.end).getTime()
      const latestDate = new Date(latest.period.end).getTime()
      return posDate > latestDate ? pos : latest
    })

    const duration = calculateDuration(firstPosition.period.start, lastPosition.period.end)
    return formatDuration(duration, locale)
  }

  // 회사 키 추출
  const getCompanyKey = (organization: string): string => {
    if (organization.includes('리드포인트시스템')) return 'lps'
    if (organization.includes('대흥정보')) return 'dhicc'
    return ''
  }

  // 직책 한글 이름 -> 위치 키 매핑
  const getPositionKey = (companyKey: string, positionName: string): string => {
    const positionMap: Record<string, Record<string, string>> = {
      lps: {
        'WEB3 서비스팀': 'service',
        'WEB3 디자인팀': 'design',
      },
      dhicc: {
        '여수시 주차포털 TF팀': 'yeosu',
        '춘천시 주차포털 TF팀': 'chuncheon',
        '아산시 주차포털 TF팀': 'asan',
        '양천구 주차포털 TF팀': 'yangchun',
        '인천시 주차포털 TF팀': 'incheon',
        '부산시 주차포털 TF팀': 'busan',
        '파주시 주차포털 TF팀': 'paju',
        '안양시 주차포털 TF팀': 'anyang',
      },
    }
    return positionMap[companyKey]?.[positionName] || ''
  }

  // 전체 경력 기간 계산 (각 회사별 근무 기간 합산)
  const totalDuration = (() => {
    let totalYears = 0
    let totalMonths = 0

    groupedByCompany.forEach((company) => {
      const firstPosition = company.positions.reduce((earliest, pos) => {
        const posDate = new Date(pos.period.start).getTime()
        const earliestDate = new Date(earliest.period.start).getTime()
        return posDate < earliestDate ? pos : earliest
      })

      const lastPosition = company.positions.reduce((latest, pos) => {
        const posDate = new Date(pos.period.end).getTime()
        const latestDate = new Date(latest.period.end).getTime()
        return posDate > latestDate ? pos : latest
      })

      const duration = calculateDuration(firstPosition.period.start, lastPosition.period.end)
      totalYears += duration.years
      totalMonths += duration.months
    })

    // 월을 년으로 변환
    totalYears += Math.floor(totalMonths / 12)
    totalMonths = totalMonths % 12

    return { years: totalYears, months: totalMonths, days: 0 }
  })()

  const totalDurationText = formatDuration(totalDuration, locale)

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
          {groupedByCompany.map((company, companyIndex) => {
            const companyKey = getCompanyKey(company.organization)
            return (
              <motion.div
                key={company.organization}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: companyIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* 회사 헤더 */}
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{company.organization}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(() => {
                            try {
                              return t.raw(`companies.${companyKey}.type`)
                            } catch {
                              return '정규직'
                            }
                          })()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {(() => {
                            const earliest = company.positions.reduce((earliest, pos) => {
                              const posDate = new Date(pos.period.start).getTime()
                              const earliestDate = new Date(earliest.period.start).getTime()
                              return posDate < earliestDate ? pos : earliest
                            })
                            const parts = earliest.period.start.split('-')
                            return `${parts[0]}.${parts[1]}`
                          })()}
                        </span>
                        <span>~</span>
                        <span>
                          {(() => {
                            const latest = company.positions.reduce((latest, pos) => {
                              const posDate = new Date(pos.period.end).getTime()
                              const latestDate = new Date(latest.period.end).getTime()
                              return posDate > latestDate ? pos : latest
                            })
                            const parts = latest.period.end.split('-')
                            return `${parts[0]}.${parts[1]}`
                          })()}
                        </span>
                        <Badge variant="secondary" className="ml-2">
                          {getCompanyDurationText(company.positions)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  {/* 직책 목록 */}
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {company.positions.map((position) => {
                        const positionKey = getPositionKey(companyKey, position.position)

                        return (
                          <div
                            key={position.id}
                            className="relative pl-6 border-l-2 border-primary/30"
                          >
                            {/* 타임라인 점 */}
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-sm" />

                            {/* 직책 정보 */}
                            <div className="mb-2">
                              <h3 className="font-semibold text-base">{position.position}</h3>
                              <p className="text-base text-muted-foreground">
                                {position.period.start.split('-').slice(0, 2).join('.')} - {position.period.end.split('-').slice(0, 2).join('.')}
                              </p>

                              {/* 팀 구성 */}
                              {(() => {
                                try {
                                  const teamSize = t.raw(
                                    `companies.${companyKey}.positions.${positionKey}.teamSize`
                                  )
                                  if (typeof teamSize === 'string') {
                                    return (
                                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                        <Users className="h-3 w-3" />
                                        <span>{teamSize}</span>
                                      </div>
                                    )
                                  }
                                  return null
                                } catch {
                                  return null
                                }
                              })()}
                            </div>

                            {/* 프로젝트/업무 목록 */}
                            {(() => {
                              try {
                                const projects = t.raw(
                                  `companies.${companyKey}.positions.${positionKey}.projects`
                                ) as string[]
                                if (Array.isArray(projects) && projects.length > 0) {
                                  return (
                                    <ul className="space-y-2 mb-3">
                                      {projects.map((project: string, i: number) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-sm text-muted-foreground"
                                        >
                                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                                          <span>{project}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )
                                }
                                return null
                              } catch {
                                return null
                              }
                            })()}

                            {/* 상세 내용 Collapsible */}
                            {companyKey && positionKey && (
                              <DetailsCollapsible
                                companyKey={companyKey}
                                positionKey={positionKey}
                                t={t}
                              />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
