import Image from 'next/image'
import { Typography } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'
import { CategoryEntity } from '../../types'
import { CategoryCardActions } from './CategoryCardActions'

export type CategoryCardProps = {
  className?: string
} & CategoryEntity

export const CategoryCard = ({
  id,
  name,
  imageKey,
  description,
  isSystem,
  className,
}: CategoryCardProps) => {
  return (
    <li
      className={cn(
        'group relative rounded-xl border border-surface-border bg-white p-3 transition-all duration-200 md:p-6',
        'w-full focus-within:bg-surface-bg focus-within:shadow-md hover:bg-surface-bg hover:shadow-md',
        className
      )}
    >
      {!isSystem && <CategoryCardActions categoryId={id} />}

      <div className="flex flex-col items-center gap-4">
        <div className="flex size-24 overflow-hidden rounded-2xl border border-surface-border bg-brand-50 p-4 text-brand-500">
          {imageKey ? (
            <span className="relative flex-1">
              <Image
                src={imageKey}
                alt={`Icon ${name}`}
                fill
                className="size-full object-scale-down"
                sizes="64px"
              />
            </span>
          ) : (
            <div className="size-full bg-gray-200" />
          )}
        </div>
        <Typography
          as="p"
          variant="p"
          weight="semibold"
          className="w-full truncate text-center text-primary"
        >
          {name}
        </Typography>
        <Typography
          as="p"
          variant="small"
          className="line-clamp-3 w-full text-gray-500"
        >
          {description || 'No description provided'}
        </Typography>
      </div>
    </li>
  )
}
