import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createReceiptSchema, type CreateReceiptFormValues } from '../schemas'
import { createReceiptAction } from '../actions/createReceipt'
import { setFormErrors } from '@/utils/setFormErrors'

export const defaultValues = {
  storeId: undefined,
  totalAmount: '' as unknown as number,
  items: [
    {
      name: '',
      totalPrice: '' as unknown as number,
      quantity: '' as unknown as number,
      unitPrice: '' as unknown as number,
    },
  ],
}

export const useCreateReceiptForm = () => {
  const form = useForm<CreateReceiptFormValues>({
    resolver: zodResolver(createReceiptSchema as any),
    defaultValues: {
      ...defaultValues,
      purchaseDate: new Date().toISOString().slice(0, 16),
    },
  })

  const onSubmit = async (payload: CreateReceiptFormValues) => {
    const result = await createReceiptAction(payload)

    if (result.success) {
      form.reset()
    } else if ('errors' in result) {
      setFormErrors(form.setError, result)
    }
  }

  const handleReset = () => {
    form.reset({
      ...defaultValues,
      purchaseDate: new Date().toISOString().slice(0, 16),
    })
  }

  return { form, onSubmit, handleReset }
}
