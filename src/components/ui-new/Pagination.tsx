import { cn } from '@/lib/utils'
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

const PaginationComponente: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl
    return `${baseUrl}${page}`
  }

  return (
    <div className="join mx-auto">
      <a
        className={cn('btn join-item', {
          ['pointer-events-none cursor-default']: currentPage === 1,
        })}
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : undefined}
      >
        <LucideChevronLeft />
      </a>
      {pages.map((page) => (
        <a
          href={getPageUrl(page)}
          className={cn('btn join-item min-w-12', {
            ['shadow-xl shadow-primary']: page === currentPage,
          })}
          key={page}
        >
          {page}
        </a>
      ))}
      {totalPages > 5 && <div>...</div>}
      <a
        className={cn('btn join-item', {
          ['pointer-events-none cursor-default']: currentPage === totalPages,
        })}
        href={
          currentPage < totalPages ? getPageUrl(currentPage + 1) : undefined
        }
      >
        <LucideChevronRight />
      </a>
    </div>
  )
}

export default PaginationComponente
