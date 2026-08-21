import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Separator } from '@/components/ui/separator'
import { Container } from './container'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-8">
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-foreground">{t('siteHeading')}</h3>
            <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                {t('home')}
              </Link>
              <Link href="/#about" className="block hover:text-foreground transition-colors">
                {t('about')}
              </Link>
              <Link href="/#projects" className="block hover:text-foreground transition-colors">
                {t('projects')}
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t('contactHeading')}</h3>
            <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a href="mailto:awdzx456@naver.com" className="hover:text-foreground transition-colors">
                {t('email')}
              </a>
              <a href="https://github.com/dlsrbChoi" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">
                {t('github')}
              </a>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t('resumeHeading')}</h3>
            <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
              <Link href="/#resume" className="hover:text-foreground transition-colors">
                {t('resumeView')}
              </Link>
            </nav>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t('copyright')}
          </p>
        </div>
      </Container>
    </footer>
  )
}
