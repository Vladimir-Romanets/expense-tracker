'use client'

import { useTransition } from 'react'
import { RHFInput, RHFSelect, Button, RHFFileUpload, Icon } from '@/ui'
import { ReceiptItemsGrid } from './ReceiptItemsGrid'
import { useReceiptForm } from '../../hooks/useReceiptForm'
import type { ReceiptFormValues } from '../../schemas'
import { parseReceipt } from '../../actions/parseReceipt'

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
  const [isPending, startTransition] = useTransition()
  const { form, onSubmit, handleReset } = useReceiptForm({
    initValues,
    onSubmitAction,
  })
  const {
    control,
    watch,
    reset,
    getValues,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = form

  const receiptFile = watch('receiptFile')
  const isFile = receiptFile instanceof File

  const handleParseReceipt = () => {
    startTransition(async () => {
      const file = getValues('receiptFile')

      if (!(file instanceof File)) return

      const response = await parseReceipt(file)

      if (response.success) {
        reset(response.data, { keepDirty: true })
      } else {
        setError('receiptFile', { type: 'custom', message: response.message })
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-9">
          <RHFFileUpload<ReceiptFormValues>
            control={control}
            name="receiptFile"
            label="Upload or drag and-drop scan/photo of receipt."
            className="h-96"
            accept="image/*"
            disabled={isPending}
          />
          <Button
            variant="outline"
            type="button"
            aria-label="Parse receipt data"
            disabled={!isFile}
            isLoading={isPending}
            onClick={handleParseReceipt}
          >
            <Icon name="ai-update" />
          </Button>
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
              disabled={isPending}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!isDirty || isPending}
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
