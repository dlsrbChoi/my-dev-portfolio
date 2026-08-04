import { ReactNode } from 'react'
import { Container } from '@/components/layout/container'

interface ResumePrintLayoutProps {
  children: ReactNode
}

export function ResumePrintLayout({ children }: ResumePrintLayoutProps) {
  return (
    <Container className="resume-print-layout py-8 space-y-10">
      {children}
    </Container>
  )
}
