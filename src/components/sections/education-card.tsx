'use client'

import { motion } from 'framer-motion'
import { ExperienceEntry } from '@/types/notion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Calendar } from 'lucide-react'

export function EducationCard({ educations }: { educations: ExperienceEntry[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-primary/10">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">학력</h2>
      </div>

      <div className="space-y-4">
        {educations.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{edu.organization}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{edu.position}</p>
                  </div>
                  {edu.period && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {edu.period.start} ~ {edu.period.end}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                {edu.description && (
                  <p className="text-sm leading-relaxed text-foreground">{edu.description}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
