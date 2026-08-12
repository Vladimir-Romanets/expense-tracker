'use client'

import { RHFInput, RHFSelect, Button, RHFFileUpload } from '@/ui'
import { ReceiptItemsGrid } from './ReceiptItemsGrid'
import type { CreateReceiptFormValues } from '../../schemas'
import { useCreateReceiptForm } from '../../hooks/useCreateReceiptForm'

interface CreateReceiptFormProps {
  stores: { value: number; label: string }[]
}

export function CreateReceiptForm({ stores }: CreateReceiptFormProps) {
  const { form, onSubmit, handleReset } = useCreateReceiptForm()
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
          <RHFFileUpload<CreateReceiptFormValues>
            control={control}
            name="receiptFile"
            label="Upload or drag and-drop scan/photo of receipt."
            className="h-96"
            accept="image/*"
          />
        </div>

        <div className="flex flex-col gap-6 p-6">
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
              onClick={handleReset}
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
