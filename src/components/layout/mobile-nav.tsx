'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navItems } from '@/lib/nav'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')
  const tMobile = useTranslations('mobileNav')

  const handleClose = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">{tMobile('openMenu')}</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px]">
        <div className="mb-4">
          <Link href="/" className="font-semibold text-lg" onClick={handleClose}>
            최인규
          </Link>
        </div>
        <nav className="space-y-3">
          {navItems.map((item) => (
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-foreground hover:text-primary transition-colors"
                onClick={handleClose}
              >
                {t(item.labelKey)}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-foreground hover:text-primary transition-colors"
                onClick={handleClose}
              >
                {t(item.labelKey)}
              </Link>
            )
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
