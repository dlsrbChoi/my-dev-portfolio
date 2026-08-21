'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="py-20">
      <div className="flex flex-col items-center justify-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">문제가 발생했습니다</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-sm">
          데이터를 불러오는 중 예상치 못한 오류가 발생했습니다. 다시 시도해주세요.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => reset()}>다시 시도</Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
            홈으로
          </Button>
        </div>
      </div>
    </div>
  )
}
