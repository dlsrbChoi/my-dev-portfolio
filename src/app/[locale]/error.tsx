'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { AlertTriangle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="py-20">
      <div className="flex flex-col items-center justify-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">{t('errorTitle')}</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-sm">
          {t('errorDescription')}
        </p>
        <div className="flex gap-3">
          <Button onClick={() => reset()}>{t('errorRetry')}</Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
            {t('errorHome')}
          </Button>
        </div>
      </div>
    </div>
  )
}
