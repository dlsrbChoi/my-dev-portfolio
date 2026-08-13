import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ResumeSection } from '@/components/sections/resume-section'
import { ContactSection } from '@/components/sections/contact-section'
import { SectionNav } from '@/components/layout/section-nav'
import { FadeInSection } from '@/components/motion/fade-in-section'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: '홈',
  description: '프론트엔드에서 풀스택으로 성장한 개발자 최인규의 포트폴리오. 프로젝트, 경력, 기술 스택을 한 페이지에서 확인하세요.',
  openGraph: {
    title: `${siteConfig.name} | 개발자 포트폴리오`,
    description: '프론트엔드 UI/UX 구현에서 출발해 공공 프로젝트의 풀스택 개발까지 확장한 성장형 개발자입니다.',
  },
}

export default function Home() {
  return (
    <>
      <SectionNav />
      <HeroSection />
      <FadeInSection>
        <AboutSection />
      </FadeInSection>
      <FadeInSection delay={100}>
        <ProjectsSection />
      </FadeInSection>
      <FadeInSection delay={200}>
        <ResumeSection />
      </FadeInSection>
      <FadeInSection delay={300}>
        <ContactSection />
      </FadeInSection>
    </>
  )
}
