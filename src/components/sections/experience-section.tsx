import { getResumeData } from '@/lib/notion'
import type { ExperienceEntry } from '@/types/notion'
import { ExperienceTimeline } from '@/components/resume/experience-timeline'

export async function ExperienceSection() {
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
      title="경력"
      showHeader={true}
      animateOnView={true}
    />
  )
}
