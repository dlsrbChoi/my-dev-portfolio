'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { Code2, Database, Palette, Server, Users, Zap, Wrench, type LucideIcon } from 'lucide-react'
import { siteConfig, skillIcons } from '@/lib/site-config'

// site-config의 카테고리명 → 메시지 번역 키 매핑
const categoryTranslationKey: Record<string, string> = {
  'Front-end': 'categoryFrontend',
  'Back-end': 'categoryBackend',
  'Styling': 'categoryStyling',
  'Build Tools': 'categoryBuildTools',
  'Database & Infra': 'categoryInfra',
  'Collaboration': 'categoryCollaboration',
  'Productivity': 'categoryProductivity',
}

const categoryIcons: Record<string, LucideIcon> = {
  'Front-end': Code2,
  'Back-end': Database,
  'Styling': Palette,
  'Build Tools': Wrench,
  'Database & Infra': Server,
  'Collaboration': Users,
  'Productivity': Zap,
}

function CategoryLabel({ category }: { category: string }) {
  const t = useTranslations('skills')
  const translationKey = categoryTranslationKey[category]
  return <span className="font-medium">{translationKey ? t(translationKey) : category}</span>
}

export function SkillsSection() {
  const t = useTranslations('skills')

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* 기술 스택 그리드 */}
        <div className="max-w-5xl mx-auto space-y-4">
          {siteConfig.skillCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.category] || Code2

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-center gap-4 px-6 py-4 rounded-xl border border-border/60 bg-background/20 hover:border-primary/60 hover:bg-background/25 transition-all duration-300 dark:bg-white/5 dark:hover:bg-white/8"
              >
                {/* 카테고리 라벨 */}
                <div className="flex items-center gap-2.5 md:w-44 shrink-0">
                  <div className="p-1 rounded-lg bg-primary/20 backdrop-blur-sm">
                    <IconComponent className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">
                    <CategoryLabel category={category.category} />
                  </span>
                </div>

                {/* 기술 배지 */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => {
                    const iconName = skillIcons[skill]
                    return (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="hover:bg-primary/50 hover:border-primary/80 hover:text-primary-foreground transition-all duration-200 cursor-default text-xs py-1.5 px-3 bg-foreground/10 border border-foreground/20 font-medium dark:bg-white/10 dark:border-white/25 dark:hover:bg-primary/60 dark:hover:border-primary/80 flex items-center gap-1.5"
                      >
                        {iconName && iconName !== 'none' && (
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`}
                            alt={skill}
                            className="w-3 h-3"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        {skill}
                      </Badge>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
