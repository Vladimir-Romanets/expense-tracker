'use client'

import { useMemo, useState, useTransition } from 'react'
import { Button, Checkbox, Select, Typography } from '@/shared/ui'
import { useCategoryOptions } from '@/shared/hooks/useCategoryOptions'
import { cn } from '@/shared/lib/cn'
import { useProductTableContext } from '../hooks/useProductTableContext'
import { updateProductCategories } from '../actions/updateProductCategories'

export const ProductsUpdateCategoryBar = () => {
  const categories = useCategoryOptions()
  const [categoryId, setCategoryId] = useState<number | undefined>()
  const [isPending, startTransition] = useTransition()

  const { selectedIds, clearSelected } = useProductTableContext()
  const categoryOptions = useMemo(
    () => [{ label: 'Remove category', value: 0 }, ...categories],
    [categories]
  )
  const count = selectedIds.size

  const handleClearSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked
    if (!isChecked) clearSelected()
  }

  const handleSelectCategory = ({
    currentTarget,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(currentTarget.value))
  }

  const handleUpdate = () => {
    startTransition(async () => {
      if (categoryId === undefined) return
      const result = await updateProductCategories([...selectedIds], categoryId)

      if ('updatedProducts' in result && result.updatedProducts.length) {
        clearSelected()
        setCategoryId(undefined)
      }
      // TODO: Add notification about not succeed category update
    })
  }

  return (
    <div className="relative">
      <div
        inert={!count}
        className={cn(
          'absolute inset-x-0 -top-5 grid transition-[grid-template-rows] duration-200 ease-out',
          count ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex items-center gap-4 rounded-md bg-brand-600 px-3 py-2">
            <Checkbox
              name="clear-selected"
              aria-label="Clear all"
              className="checked:border-white"
              checked={!!count}
              onChange={handleClearSelected}
            />
            <Typography className="flex w-max shrink-0 gap-1.5 text-white">
              <b className="min-w-4.5">{count || ''}</b>
              <span className="max-sm:hidden">Selected products</span>
            </Typography>
            <Select
              options={categoryOptions}
              wrapperClassName="w-49"
              name="category"
              placeholder="Select category"
              value={categoryId}
              onChange={handleSelectCategory}
            />
            <Button
              type="button"
              variant="ghost"
              className="ms-auto border border-surface-border text-white hover:bg-brand-800 hover:text-white focus-visible:bg-brand-800 focus-visible:text-white"
              isLoading={isPending}
              onClick={handleUpdate}
              disabled={categoryId === undefined}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
