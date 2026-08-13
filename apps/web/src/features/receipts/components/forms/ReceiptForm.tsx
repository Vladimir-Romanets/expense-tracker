'use client'

import { RHFInput, RHFSelect, Button, RHFFileUpload } from '@/ui'
import { ReceiptItemsGrid } from './ReceiptItemsGrid'
import { useReceiptForm } from '../../hooks/useReceiptForm'
import type { ReceiptFormValues } from '../../schemas'

interface ReceiptFormProps {
  stores: { value: number; label: string }[]
  initValues?: ReceiptFormValues
  onSubmitAction: (payload: ReceiptFormValues) => Promise<any>
  submitLabel?: string
}

export function ReceiptForm({
  stores,
  initValues,
  onSubmitAction,
  submitLabel = 'Save Receipt',
}: ReceiptFormProps) {
  const { form, onSubmit, handleReset } = useReceiptForm({
    initValues,
    onSubmitAction,
  })
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = form

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col">
          <RHFFileUpload<ReceiptFormValues>
            control={control}
            name="receiptFile"
            label="Upload or drag and-drop scan/photo of receipt."
            className="h-96"
            accept="image/*"
          />
        </div>

        <div className="flex flex-col gap-6 p-6 pt-0">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <RHFSelect<ReceiptFormValues>
              control={control}
              name="storeId"
              label="Store Name"
              options={stores}
              placeholder="Select store..."
            />

            <div className="grid grid-cols-2 gap-4">
              <RHFInput<ReceiptFormValues>
                control={control}
                name="purchaseDate"
                label="Date & Time"
                type="datetime-local"
              />

              <RHFInput<ReceiptFormValues>
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

          <div className="mt-4 flex justify-end gap-4 border-t border-gray-200 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!isDirty}
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
