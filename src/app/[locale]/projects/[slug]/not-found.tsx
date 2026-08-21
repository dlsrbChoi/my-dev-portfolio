'use client'

import { EmptyState } from '@/components/patterns/empty-state'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="py-20">
      <EmptyState
        icon={FileQuestion}
        title="프로젝트를 찾을 수 없습니다"
        description="요청하신 프로젝트가 존재하지 않거나 비공개 상태입니다."
        action={{
          label: '프로젝트 목록으로 돌아가기',
          href: '/projects',
        }}
      />
    </div>
  )
}
