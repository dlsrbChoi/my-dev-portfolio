'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { EducationEntry } from '@/lib/education-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Calendar, ChevronDown, BookOpen } from 'lucide-react'

export function EducationCard({ educations }: { educations: EducationEntry[] }) {
  const t = useTranslations('education')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('educationTitle')}</h2>
      </motion.div>

      <div className="space-y-6">
        {educations.map((edu, index) => (
          <EducationItem key={edu.id} education={edu} index={index} t={t} />
        ))}
      </div>
    </motion.div>
  )
}

function EducationItem({
  education,
  index,
  t,
}: {
  education: EducationEntry
  index: number
  t: ReturnType<typeof useTranslations<'education'>>
}) {
  const [isOpen, setIsOpen] = useState(false)
  const hasCourses = education.courses.basic.length > 0 || education.courses.major.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={index === 0 ? 'mt-8' : ''}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-3">{education.school}</CardTitle>
              <p className="text-sm text-muted-foreground">{education.major}</p>
            </div>
            <div className="flex flex-col md:items-end gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {education.period.start} - {education.period.end}
                </span>
              </div>
              <Badge variant="secondary">{education.status}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">GPA</span>
              <span className="font-semibold text-primary">
                {education.gpa}/{education.gpaScale}
              </span>
            </div>

            {hasCourses && (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer w-fit">
                  <BookOpen className="h-4 w-4" />
                  <span>{isOpen ? t('hideCourses') : t('viewCourses')}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </CollapsibleTrigger>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <CollapsibleContent forceMount asChild>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: 'easeInOut' },
                          opacity: { duration: 0.2, delay: 0.1 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 p-4 rounded-md bg-secondary/30 mt-4">
                          {education.courses.basic.length > 0 && (
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                {t('basicCourses')}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {education.courses.basic.map((course) => (
                                  <Badge key={course} variant="outline">
                                    {course}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {education.courses.major.length > 0 && (
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                {t('majorCourses')}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {education.courses.major.map((course) => (
                                  <Badge key={course} variant="outline">
                                    {course}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </Collapsible>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
