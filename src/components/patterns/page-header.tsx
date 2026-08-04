import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="pt-8 md:pt-12 mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-muted-foreground">{description}</p>
      )}
      {children && <div className="mt-4 flex justify-center">{children}</div>}
    </div>
  )
}
