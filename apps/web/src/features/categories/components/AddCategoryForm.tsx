'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { RHFInput, Button } from '@/ui'
import { addCategory } from '../actions'

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
})

type FormValues = z.infer<typeof schema>

export const AddCategoryForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  })

  const onSubmit = async (values: FormValues) => {
    const result = await addCategory(values)

    if (!result.success) {
      if ('errors' in result && result.errors?.name) {
        setError('name', { message: result.errors.name })
      } else if ('formError' in result) {
        setError('root', {
          message: result.formError || 'Failed to add category',
        })
      } else {
        setError('root', { message: 'Failed to add category' })
      }
    } else {
      reset()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 flex flex-col gap-2"
      noValidate
    >
      <div className="flex items-start gap-4">
        <div className="max-w-sm flex-1">
          <RHFInput
            control={control}
            name="name"
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
