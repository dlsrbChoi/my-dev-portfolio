import { useTranslations } from 'next-intl'
import { Container } from './container'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-8">
        <div className="flex items-start">
          <p className="text-sm text-muted-foreground">
            {t('copyright')}
          </p>
        </div>
      </Container>
    </footer>
  )
}
