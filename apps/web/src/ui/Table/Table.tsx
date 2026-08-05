import * as React from 'react'
import { cn } from '@/utils/cn'

const TableBase = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-auto">
    <table
      className={cn(
        'w-full caption-bottom text-left text-sm text-slate-700',
        className
      )}
      {...props}
    />
  </div>
)
TableBase.displayName = 'Table'

const TableHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={cn('border-surface-border [&_tr]:border-b', className)}
    {...props}
  />
)
TableHeader.displayName = 'TableHeader'

const TableBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody
    className={cn(
      '[&_tr:last-child]:border-0 [&>tr]:hover:bg-slate-50',
      className
    )}
    {...props}
  />
)
TableBody.displayName = 'TableBody'

const TableRow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      'border-b border-surface-border transition-colors',
      className
    )}
    {...props}
  />
)
TableRow.displayName = 'TableRow'

const TableHead = ({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      'h-12 px-4 text-left align-middle font-semibold text-slate-700',
      className
    )}
    {...props}
  />
)
TableHead.displayName = 'TableHead'

const TableCell = ({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn('p-4 align-middle', className)}
    {...props}
  />
)
TableCell.displayName = 'TableCell'

export const Table = Object.assign(TableBase, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
})
