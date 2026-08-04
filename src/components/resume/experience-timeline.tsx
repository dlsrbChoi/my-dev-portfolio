import { ExperienceEntry } from '@/types/notion'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface ExperienceTimelineProps {
  items: ExperienceEntry[]
  title: string
}

export function ExperienceTimeline({ items, title }: ExperienceTimelineProps) {
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.period.start).getTime()
    const dateB = new Date(b.period.start).getTime()
    return dateB - dateA
  })

  return (
    <section className="resume-section">
      <h2 className="text-2xl font-bold tracking-tight mb-6">{title}</h2>
      <div className="space-y-4">
        {sortedItems.map((item, index) => (
          <div key={item.id}>
            <Card className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.position}</h3>
                  <p className="text-sm text-muted-foreground">{item.organization}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.period.start} ~ {item.period.end}
                </div>
              </div>
              {item.description && (
                <>
                  <Separator className="my-3" />
                  <p className="text-sm leading-relaxed text-foreground">
                    {item.description}
                  </p>
                </>
              )}
            </Card>
            {index < sortedItems.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-0.5 h-4 bg-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
