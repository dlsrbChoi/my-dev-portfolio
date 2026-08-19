import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  /** 좌측 아이콘박스에 표시할 lucide 아이콘 (align='left'일 때 주로 사용) */
  icon?: LucideIcon
  title: string
  description?: string
  /** 'center'(기본): 섹션 대제목 스타일 / 'left': 아이콘박스+타이틀+부제 가로 배치 (서브섹션용) */
  align?: 'left' | 'center'
  className?: string
}

/**
 * 섹션/서브섹션 공용 헤더 패턴
 * - align='center'(기본): About/Projects/Resume/Contact 등 섹션 대제목
 * - align='left'+icon: 경력/학력/기술스택 등 서브섹션 헤더 (아이콘박스 포함)
 */
export function SectionHeader({
  icon: Icon,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  if (align === 'left') {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        {Icon && (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-card"
            aria-hidden="true"
          >
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-2 text-center', className)}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
