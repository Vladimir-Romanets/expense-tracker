import { cn } from '@/utils/cn'

interface Props {
  name: string
  className?: string
}

export const CategoryBadge = ({ name, className }: Props) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700',
        className
      )}
    >
      {/* Icon placeholder */}
      <span
        className="size-4 rounded-sm bg-slate-200"
        aria-hidden="true"
      />
      {name}
    </span>
  )
}
