import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/components/layout/container'

export default function Loading() {
  return (
    <>
      <div className="border-b border-border">
        <Skeleton className="w-full h-56 sm:h-72 lg:h-80 rounded-none" />
        <Container className="py-8 sm:py-10">
          <Skeleton className="h-10 w-2/3 mb-3" />
          <Skeleton className="h-4 w-1/3 mb-4" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
        </Container>
      </div>
      <Container className="py-8 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-5 w-16" />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </Container>
    </>
  )
}
