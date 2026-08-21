import { getTranslations } from 'next-intl/server'
import { getResumeData } from '@/lib/notion'
import type { ExperienceEntry } from '@/types/notion'
import { ExperienceTimeline } from '@/components/resume/experience-timeline'

export async function ExperienceSection() {
  const t = await getTranslations('experience')
  let experiences: ExperienceEntry[] = []

  try {
    const data = await getResumeData()
    experiences = data.experiences
  } catch (error) {
    console.error('Failed to fetch experience data:', error)
  }

  if (experiences.length === 0) return null

  return (
    <ExperienceTimeline
      items={experiences}
      title={t('title')}
      showHeader={true}
      animateOnView={true}
    />
  )
}
