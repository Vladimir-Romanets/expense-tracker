import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { receiptSchema, type ReceiptFormValues } from '../schemas'
import { setFormErrors } from '@/shared/lib/setFormErrors'
import type { ActionResult } from '@/shared/types/actionResult'

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

interface UseReceiptFormOptions {
  initValues?: ReceiptFormValues
  onSubmitAction: (payload: ReceiptFormValues) => Promise<ActionResult>
}

export const useReceiptForm = ({
  initValues,
  onSubmitAction,
}: UseReceiptFormOptions) => {
  const form = useForm<ReceiptFormValues>({
    resolver: zodResolver(receiptSchema as any),
    defaultValues: initValues || {
      ...defaultValues,
      purchaseDate: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (payload: ReceiptFormValues) => {
    const result = await onSubmitAction(payload)

    if (result.success) {
      if (!initValues) {
        // Only reset if we're in create mode, edit mode will redirect
        form.reset()
      }
    } else if ('errors' in result) {
      setFormErrors(form.setError, result)
    }
  }

  const handleReset = () => {
    form.reset(
      initValues || {
        ...defaultValues,
        purchaseDate: new Date().toISOString().slice(0, 16),
      }
    )
  }

  return { form, onSubmit, handleReset }
}
