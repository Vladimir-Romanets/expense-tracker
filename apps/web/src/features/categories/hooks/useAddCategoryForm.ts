import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addCategorySchema, type AddCategoryFormValues } from '../schemas'
import { addCategory } from '../actions/addCategory'
import { setFormErrors } from '@/utils/setFormErrors'
import { fileUploader } from '@/lib/fileUploader'

interface UseAddCategoryFormOptions {
  onSuccess?: () => void
}

export const useAddCategoryForm = (options?: UseAddCategoryFormOptions) => {
  const form = useForm<AddCategoryFormValues>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: { name: '' },
  })

  const onSubmit = async (values: AddCategoryFormValues) => {
    let uploadedImageKey: string | undefined = undefined

    if (values.image) {
      try {
        const result = await fileUploader(values.image, 'categories', true)
        uploadedImageKey = result.imageKey
      } catch (e) {
        form.setError('root', {
          message: 'Failed to upload image. Please try again.',
        })
        return
      }
    }

    const payload = {
      name: values.name,
      description: values.description,
      imageKey: uploadedImageKey,
    }

    const result = await addCategory(payload)
    if (!result.success) {
      setFormErrors(form.setError, result as any)
    } else {
      form.reset()
      options?.onSuccess?.()
    }
  }

  return { form, onSubmit }
}
