'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Languages } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales, localeNames, type Locale } from '@/i18n/config'

export function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  // 현재 스크롤 위치의 앵커(#projects 등)를 유지한 채 로케일만 전환
  const handleChangeLocale = (nextLocale: Locale) => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    router.replace(`${pathname}${hash}`, { locale: nextLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
        <Languages className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">{t('srLabel')}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleChangeLocale(loc)}
            className={loc === locale ? 'font-semibold' : undefined}
          >
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
