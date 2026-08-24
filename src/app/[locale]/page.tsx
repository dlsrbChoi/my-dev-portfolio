import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { EducationSection } from '@/components/sections/education-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { SideProjectsSection } from '@/components/sections/side-projects-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { ContactSection } from '@/components/sections/contact-section'
import { SectionNav } from '@/components/layout/section-nav'
import { FadeInSection } from '@/components/motion/fade-in-section'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: {
      title: t('homeOgTitle'),
      description: t('homeOgDescription'),
    },
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <SectionNav />
      <HeroSection />
      <FadeInSection>
        <AboutSection />
      </FadeInSection>
      <FadeInSection delay={0}>
        <ExperienceSection />
      </FadeInSection>
      <FadeInSection delay={0}>
        <ProjectsSection />
      </FadeInSection>
      <FadeInSection delay={0}>
        <SideProjectsSection />
      </FadeInSection>
      <FadeInSection delay={0}>
        <SkillsSection />
      </FadeInSection>
      <FadeInSection delay={0}>
        <EducationSection />
      </FadeInSection>
      <FadeInSection delay={0}>
        <ContactSection />
      </FadeInSection>
    </>
  )
}
