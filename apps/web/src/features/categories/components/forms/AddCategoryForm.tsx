'use client'

import { useRouter } from 'next/navigation'
import { RHFInput, Button, RHFTextarea, RHFFileUpload } from '@/shared/ui'
import { useAddCategoryForm } from '../../hooks/useAddCategoryForm'

interface AddCategoryFormProps {
  onSuccessRedirect?: string
}

export const AddCategoryForm = ({
  onSuccessRedirect,
}: AddCategoryFormProps) => {
  const router = useRouter()

  const { form, onSubmit } = useAddCategoryForm({
    onSuccess: () => {
      if (onSuccessRedirect) {
        router.push(onSuccessRedirect)
      }
    },
  })
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-6 lg:max-w-4xl"
      noValidate
    >
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="order-2 flex flex-col lg:order-1 lg:col-span-5 [&>div]:flex-1">
          <RHFFileUpload
            control={control}
            name="image"
            label="Upload category image"
            accept="image/png, image/jpeg, image/webp"
            className="h-full min-h-50"
          />
        </div>
        <div className="order-1 flex flex-col gap-4 lg:order-2 lg:col-span-7">
          <RHFInput
            control={control}
            name="name"
            label="Name"
            autoComplete="off"
            placeholder="New category name"
            disabled={isSubmitting}
          />
          <RHFTextarea
            control={control}
            name="description"
            label="Description"
            placeholder="Category description"
            disabled={isSubmitting}
            className="h-full"
            wrapperClassName="flex-1"
            maxLength={255}
          />
        </div>
      </div>
      {errors.root && (
        <p className="text-end text-sm text-red-500">{errors.root.message}</p>
      )}
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          Add category
        </Button>
      </div>
    </form>
  )
}
