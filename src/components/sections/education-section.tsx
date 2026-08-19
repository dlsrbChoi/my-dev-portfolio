import { getResumeData } from '@/lib/notion'
import { ExperienceEntry } from '@/types/notion'
import { EducationCard } from './education-card'
import { CertificatesCard } from './certificates-card'

async function getEducationData() {
  try {
    const data = await getResumeData()
    return {
      education: data.education || [],
      certificates: data.certificates || [],
    }
  } catch (error) {
    console.error('Failed to fetch education data:', error)
    return { education: [], certificates: [] }
  }
}

export async function EducationSection() {
  const { education, certificates } = await getEducationData()

  if ((!education || education.length === 0) && (!certificates || certificates.length === 0)) {
    return null
  }

  return (
    <section id="education" className="py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {education && education.length > 0 && <EducationCard educations={education} />}
          {certificates && certificates.length > 0 && <CertificatesCard certificates={certificates} />}
        </div>
      </div>
    </section>
  )
}
