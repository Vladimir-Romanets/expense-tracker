'use client'

import { RHFInput, Button } from '@/ui'
import { useAddCategoryForm } from '../../hooks/useAddCategoryForm'

export const AddCategoryForm = () => {
  const { form, onSubmit } = useAddCategoryForm()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex flex-col gap-2 lg:ms-auto lg:w-96"
      noValidate
    >
      <div className="flex items-start gap-4">
        <div className="max-w-sm flex-1">
          <RHFInput
            control={control}
            name="name"
            autoComplete="off"
            placeholder="New category name"
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          + Add category
        </Button>
      </div>
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
    </form>
  )
}
