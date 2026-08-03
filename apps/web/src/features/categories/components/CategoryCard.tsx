import clsx from 'clsx'
import { Icon, Button } from '@/ui'

export type CategoryCardProps = {
  name: string
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
  onEdit,
  onDelete,
  className,
}: CategoryCardProps) => {
  return (
    <li
      className={clsx(
        'group relative flex flex-col items-center justify-center rounded-xl border border-surface-border bg-white p-6 transition-all duration-200',
        'focus-within:bg-surface-bg focus-within:shadow-md hover:bg-surface-bg hover:shadow-md',
        'aspect-4/3 w-full',
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
        <span className="text-base font-semibold text-primary">{name}</span>
      </div>
    </li>
  )
}
