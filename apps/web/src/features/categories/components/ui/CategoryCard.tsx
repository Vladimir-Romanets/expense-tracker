import { Icon, Button, Typography } from '@/ui'
import { cn } from '@/utils/cn'

export type CategoryCardProps = {
  name: string
  description?: string
  id: number
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  iconName?: string
  className?: string
}

export const CategoryCard = ({
  id,
  name,
  iconName,
  description,
  onEdit,
  onDelete,
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
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
        {onEdit && (
          <Button
            variant="primary"
            size="icon"
            shape="pill"
            onClick={() => onEdit(id)}
            aria-label="Edit category"
            className="shadow-sm transition-transform hover:scale-110"
          >
            <Icon
              name="edit"
              size={16}
            />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="destructive"
            size="icon"
            shape="pill"
            onClick={() => onDelete(id)}
            aria-label="Delete category"
            className="shadow-sm transition-transform hover:scale-110"
          >
            <Icon
              name="trash"
              size={16}
            />
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-brand-50 text-brand-500">
          {iconName ? (
            <Icon
              name={iconName}
              size={40}
            />
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
