import { educationData, certificatesData } from '@/lib/education-data'
import { EducationCard } from './education-card'
import { CertificatesCard } from './certificates-card'

export function EducationSection() {
  if (educationData.length === 0 && certificatesData.length === 0) return null

  return (
    <section id="education" className="py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {educationData.length > 0 && <EducationCard educations={educationData} />}
          {certificatesData.length > 0 && <CertificatesCard certificates={certificatesData} />}
        </div>
      </div>
    </section>
  )
}
