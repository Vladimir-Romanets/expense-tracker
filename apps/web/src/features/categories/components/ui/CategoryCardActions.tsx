'use client'

import { useTransition } from 'react'
import { Button, Icon, LinkAsButton } from '@/ui'
import { deleteCategory } from '../../actions/deleteCategory'

type Props = {
  categoryId: number
}

export const CategoryCardActions = ({ categoryId }: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteCategory(categoryId)
    })
  }

  return (
    <div className="absolute top-3 right-3 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
      <LinkAsButton
        href={`/categories/${categoryId}/edit`}
        variant="primary"
        size="icon"
        shape="pill"
        className="shadow-sm transition-transform hover:scale-110"
        aria-label="Edit category"
      >
        <Icon
          name="edit"
          size={16}
        />
      </LinkAsButton>

      <Button
        variant="destructive"
        size="icon"
        shape="pill"
        onClick={handleDelete}
        disabled={isPending}
        aria-label="Delete category"
        className="shadow-sm transition-transform hover:scale-110"
      >
        <Icon
          name="trash"
          size={16}
        />
      </Button>
    </div>
  )
}
