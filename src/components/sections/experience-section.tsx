import { getTranslations } from 'next-intl/server'
import { experienceData } from '@/lib/experience-data'
import { ExperienceTimeline } from '@/components/resume/experience-timeline'

export async function ExperienceSection() {
  const t = await getTranslations('experience')

  if (experienceData.length === 0) return null

  return (
    <ExperienceTimeline
      items={experienceData}
      title={t('title')}
      showHeader={true}
      animateOnView={true}
    />
  )
}
