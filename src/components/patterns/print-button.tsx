'use client'

import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

interface PrintButtonProps {
  className?: string
}

export function PrintButton({ className }: PrintButtonProps) {
  return (
    <Button
      onClick={() => window.print()}
      className={`print-button print:hidden ${className || ''}`}
    >
      <Printer className="h-4 w-4 mr-2" />
      인쇄 / PDF 다운로드
    </Button>
  )
}
