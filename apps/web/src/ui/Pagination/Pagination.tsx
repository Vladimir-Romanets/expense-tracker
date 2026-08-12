import { cn } from '@/utils/cn'
import { Icon } from '@/ui'
import { PageItem } from './PageItem'
import { createPageUrl } from './createPageUrl'
import type { PaginatedMeta, SearchParams } from '@/types/pagination'

export type PaginationProps = {
  meta: PaginatedMeta
  className?: string
  searchParams: SearchParams
}

const DOTS = '...'

const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, DOTS, totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      DOTS,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    1,
    DOTS,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    DOTS,
    totalPages,
  ]
}

export const Pagination = ({
  meta,
  searchParams,
  className,
}: PaginationProps) => {
  const { page: currentPage, totalPages, hasNextPage, hasPrevPage } = meta

  if (totalPages <= 1) {
    return null
  }

  const pages = generatePagination(currentPage, totalPages)

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center gap-1.5', className)}
    >
      <PageItem
        isDisabled={!hasPrevPage}
        href={createPageUrl(searchParams, currentPage - 1)}
        aria-label="Previous page"
      >
        <Icon
          name="chevron-left"
          size={16}
        />
      </PageItem>

      {pages.map((p, index) => {
        if (p === DOTS) {
          return (
            <span
              key={`dots-${index}`}
              className="text-foreground/50 flex size-9 cursor-default items-center justify-center"
            >
              {DOTS}
            </span>
          )
        }

        const pageNum = p as number
        return (
          <PageItem
            key={pageNum}
            isActive={pageNum === currentPage}
            href={createPageUrl(searchParams, pageNum)}
          >
            {pageNum}
          </PageItem>
        )
      })}

      <PageItem
        isDisabled={!hasNextPage}
        href={createPageUrl(searchParams, currentPage + 1)}
        aria-label="Next page"
      >
        <Icon
          name="chevron-right"
          size={16}
        />
      </PageItem>
    </nav>
  )
}
