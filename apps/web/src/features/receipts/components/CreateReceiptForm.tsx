'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFInput, RHFSelect, Button, RHFFileUpload } from '@/ui'
import { ReceiptItemsGrid } from './ReceiptItemsGrid'
import { createReceiptSchema, type CreateReceiptFormValues } from '../schemas'
import { createReceiptAction } from '../actions/createReceipt'
import { setFormErrors } from '@/utils/setFormErrors'

interface CreateReceiptFormProps {
  stores: { value: number; label: string }[]
}

const defaultValues = {
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

export function CreateReceiptForm({ stores }: CreateReceiptFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateReceiptFormValues>({
    resolver: zodResolver(createReceiptSchema as any),
    defaultValues: {
      ...defaultValues,
      purchaseDate: new Date().toISOString().slice(0, 16),
    },
  })

  const onSubmit = async (payload: CreateReceiptFormValues) => {
    const result = await createReceiptAction(payload)

    if (result.success) reset()
    else if ('errors' in result) {
      setFormErrors(setError, { ...result })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col">
          <RHFFileUpload<CreateReceiptFormValues>
            control={control}
            name="receiptFile"
            label="Upload or drag and-drop scan/photo of receipt."
            className="h-96"
            accept="image/*"
          />
        </div>

        <div className="flex flex-col gap-6 rounded-xl border border-surface-border bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <RHFSelect<CreateReceiptFormValues>
              control={control}
              name="storeId"
              label="Store Name"
              options={stores}
              placeholder="Select store..."
            />

            <div className="grid grid-cols-2 gap-4">
              <RHFInput<CreateReceiptFormValues>
                control={control}
                name="purchaseDate"
                label="Date & Time"
                type="datetime-local"
              />

              <RHFInput<CreateReceiptFormValues>
                control={control}
                name="totalAmount"
                label="Total Amount"
                type="number"
                hideNativeControl
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          <ReceiptItemsGrid
            control={control}
            errors={errors}
          />

          <div className="mt-4 flex justify-end gap-4 border-t border-gray-200 pt-6 ">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                reset({
                  ...defaultValues,
                  purchaseDate: new Date().toISOString().slice(0, 16),
                })
              }
            >
              Reset
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!isDirty}
            >
              Save Receipt
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
