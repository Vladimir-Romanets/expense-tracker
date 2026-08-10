import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addCategorySchema, type AddCategoryFormValues } from '../schemas'
import { addCategory } from '../actions/addCategory'
import { setFormErrors } from '@/utils/setFormErrors'

export const useAddCategoryForm = () => {
  const form = useForm<AddCategoryFormValues>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: { name: '', description: '' },
  })

  const onSubmit = async (values: AddCategoryFormValues) => {
    const result = await addCategory(values)

    if (!result.success && 'errors' in result) {
      setFormErrors(form.setError, result)
    } else {
      form.reset()
    }
  }

  return { form, onSubmit }
}
