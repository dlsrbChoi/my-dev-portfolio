'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Code2, Database, Palette, Settings, Wrench, type LucideIcon } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const categoryIcons: Record<string, LucideIcon> = {
  '프론트엔드': Code2,
  '백엔드': Database,
  '도구 & 플랫폼': Wrench,
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">기술 스택</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            현재 사용 중인 주요 기술과 도구들입니다.
          </p>
        </motion.div>

        {/* 기술 스택 그리드 */}
        <div className="max-w-4xl mx-auto space-y-6">
          {siteConfig.skillCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.category] || Code2

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:border-border/60 transition-colors"
              >
                {/* 카테고리 라벨 */}
                <div className="flex items-center gap-3 md:w-48 shrink-0">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{category.category}</span>
                </div>

                {/* 기술 배지 */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
