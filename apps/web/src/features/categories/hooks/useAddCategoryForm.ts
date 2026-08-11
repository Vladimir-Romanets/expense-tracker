import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addCategorySchema, type AddCategoryFormValues } from '../schemas'
import { addCategory } from '../actions/addCategory'
import { setFormErrors } from '@/utils/setFormErrors'

interface UseAddCategoryFormOptions {
  onSuccess?: () => void
}

export const useAddCategoryForm = (options?: UseAddCategoryFormOptions) => {
  const form = useForm<AddCategoryFormValues>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: { name: '' },
  })

  const onSubmit = async (values: AddCategoryFormValues) => {
    const result = await addCategory(values)

    if (!result.success) {
      setFormErrors(form.setError, result as any)
    } else {
      form.reset()
      options?.onSuccess?.()
    }
  }

  return { form, onSubmit }
}
