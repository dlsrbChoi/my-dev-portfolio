'use client'

import { useTranslations } from 'next-intl'
import { EmptyState } from '@/components/patterns/empty-state'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  const t = useTranslations('common')

  return (
    <div className="py-20">
      <EmptyState
        icon={AlertCircle}
        title={t('notFoundTitle')}
        description={t('notFoundDescription')}
        action={{
          label: t('notFoundAction'),
          href: '/',
        }}
      />
    </div>
  )
}
