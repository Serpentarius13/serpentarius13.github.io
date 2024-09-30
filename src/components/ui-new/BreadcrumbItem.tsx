import { cn } from '@/lib/utils'
import { type FC, type ReactNode } from 'react'

export interface BreadcrumbItem {
  href?: string
  label: string
  icon?: string
  active?: boolean
}

interface Props {
  item: BreadcrumbItem
  children?: ReactNode
}

export const BreadcrumbItemContent: FC<Props> = ({ children, item }) => {
  if (item.active || !item.href) {
    return (
      <span>
        <Inner label={item.label}>{children}</Inner>
      </span>
    )
  }

  return (
    <a
      href={item.href}
      className="text-gray-500 transition-all hover:text-gray-800"
    >
      <Inner label={item.label}>{children}</Inner>
    </a>
  )
}

const Inner = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <span className={cn('flex items-center gap-x-2')}>
      {children}
      {label}
    </span>
  )
}
