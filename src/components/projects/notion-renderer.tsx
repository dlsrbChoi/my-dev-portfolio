'use client'

import Image from 'next/image'
import type { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client'
import { cn } from '@/lib/utils'

interface NotionRendererProps {
  blocks: BlockObjectResponse[]
}

function RichText({ items }: { items: RichTextItemResponse[] }) {
  return (
    <>
      {items.map((item, i) => {
        const { bold, italic, strikethrough, underline, code } = item.annotations
        let node: React.ReactNode = item.plain_text
        if (code)
          node = (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">
              {node}
            </code>
          )
        if (bold) node = <strong>{node}</strong>
        if (italic) node = <em>{node}</em>
        if (strikethrough) node = <s>{node}</s>
        if (underline) node = <span className="underline">{node}</span>
        if (item.href) {
          node = (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              {node}
            </a>
          )
        }
        return <span key={i}>{node}</span>
      })}
    </>
  )
}

function renderBlock(block: BlockObjectResponse): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      if (block.paragraph.rich_text.length === 0) return null
      return (
        <p className="leading-relaxed">
          <RichText items={block.paragraph.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h2 className="text-2xl font-bold mt-8 mb-3">
          <RichText items={block.heading_1.rich_text} />
        </h2>
      )
    case 'heading_2':
      return (
        <h3 className="text-xl font-bold mt-6 mb-2">
          <RichText items={block.heading_2.rich_text} />
        </h3>
      )
    case 'heading_3':
      return (
        <h4 className="text-lg font-semibold mt-4 mb-2">
          <RichText items={block.heading_3.rich_text} />
        </h4>
      )
    case 'bulleted_list_item':
      return (
        <li className="ml-5 list-disc">
          <RichText items={block.bulleted_list_item.rich_text} />
        </li>
      )
    case 'numbered_list_item':
      return (
        <li className="ml-5 list-decimal">
          <RichText items={block.numbered_list_item.rich_text} />
        </li>
      )
    case 'quote':
      return (
        <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
          <RichText items={block.quote.rich_text} />
        </blockquote>
      )
    case 'code': {
      const text = block.code.rich_text.map((t) => t.plain_text).join('')
      return (
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm">
          <code className="font-mono whitespace-pre-wrap break-words">
            {text}
          </code>
        </pre>
      )
    }
    case 'image': {
      const img = block.image
      const url =
        img.type === 'external' ? img.external.url : img.file.url
      const alt =
        img.caption.map((c) => c.plain_text).join('') || 'project image'
      return (
        <figure className="my-4">
          <div className="relative w-full aspect-video">
            <Image
              src={url}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover rounded-lg"
            />
          </div>
          {img.caption.length > 0 && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              <RichText items={img.caption} />
            </figcaption>
          )}
        </figure>
      )
    }
    case 'divider':
      return <hr className="my-6 border-border" />
    default:
      return null
  }
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  // 연속된 list item들을 <ul>/<ol>로 그룹화
  // Notion API는 list item들을 평평한 형제 블록으로 반환하므로, 렌더러가 직접 묶어야 함
  const groups: {
    type: 'list' | 'other'
    listType?: 'bulleted' | 'numbered'
    items: BlockObjectResponse[]
  }[] = []

  for (const block of blocks) {
    const isBulleted = block.type === 'bulleted_list_item'
    const isNumbered = block.type === 'numbered_list_item'
    const last = groups[groups.length - 1]

    if (isBulleted || isNumbered) {
      const listType = isBulleted ? 'bulleted' : 'numbered'
      if (last?.type === 'list' && last.listType === listType) {
        last.items.push(block)
      } else {
        groups.push({ type: 'list', listType, items: [block] })
      }
    } else {
      groups.push({ type: 'other', items: [block] })
    }
  }

  return (
    <div className={cn('prose-neutral max-w-none space-y-4')}>
      {groups.map((group, i) => {
        if (group.type === 'list') {
          const Tag = group.listType === 'bulleted' ? 'ul' : 'ol'
          return (
            <Tag key={i} className="space-y-1">
              {group.items.map((b) => (
                <div key={b.id}>{renderBlock(b)}</div>
              ))}
            </Tag>
          )
        }
        const block = group.items[0]
        return <div key={block.id}>{renderBlock(block)}</div>
      })}
    </div>
  )
}
