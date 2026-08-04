import { TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ImpactMetricsProps {
  metrics: string[]
}

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
  if (metrics.length === 0) return null

  return (
    <section aria-labelledby="impact-metrics-heading">
      <h2 id="impact-metrics-heading" className="text-xl font-semibold mb-4">
        핵심 성과
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics.map((metric, i) => (
          <Card key={i} size="sm" className="bg-muted/30">
            <CardContent className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">{metric}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
