import { Badge } from '@/components/ui/badge'

interface TechStackBadgesProps {
  stack: string[]
}

export function TechStackBadges({ stack }: TechStackBadgesProps) {
  if (stack.length === 0) return null

  return (
    <section aria-labelledby="tech-stack-heading">
      <h2 id="tech-stack-heading" className="text-xl font-semibold mb-4">
        기술 스택
      </h2>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>
    </section>
  )
}
