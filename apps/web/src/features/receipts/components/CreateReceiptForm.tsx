'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon, RHFInput, RHFSelect, Button } from '@/ui'
import { ReceiptItemsGrid } from './ReceiptItemsGrid'
import {
  createReceiptSchema,
  type CreateReceiptFormValues,
  type CreateReceiptDto,
} from '../schemas'
import { createReceiptAction } from '../actions/createReceipt'
import { setFormErrors } from '@/utils/setFormErrors'

interface CreateReceiptFormProps {
  stores: { value: number; label: string }[]
}

const defaultValues = {
  storeId: undefined,
  totalAmount: '' as unknown as number,
  purchaseDate: new Date().toISOString().slice(0, 16),
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
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateReceiptFormValues>({
    resolver: zodResolver(createReceiptSchema as any),
    defaultValues,
  })

  const onSubmit = async (data: CreateReceiptFormValues) => {
    const { receiptFile, ...dto } = data

    const payload: CreateReceiptDto = {
      ...dto,
      purchaseDate: new Date(dto.purchaseDate).toISOString(),
    }

    if (receiptFile && receiptFile.length > 0) {
      //  TODO: File will be uploaded separately in the future
    }

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
        {/* Left column: File Upload Stub */}
        <div className="flex flex-col">
          <label
            htmlFor="receiptFile"
            className="flex h-96 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:bg-gray-100"
          >
            <Icon
              name="upload"
              className="mb-4 text-gray-400"
              size={40}
            />
            <span className="text-sm text-gray-500">
              Upload or drag and-drop scan/photo of receipt or QR code for OCR
              recognition.
            </span>
            <input
              id="receiptFile"
              type="file"
              className="hidden"
              {...register('receiptFile')}
            />
          </label>
          {errors.receiptFile && (
            <span className="mt-2 text-sm text-red-500">
              {errors.receiptFile.message as string}
            </span>
          )}
        </div>

        {/* Right column: Form Fields */}
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
              onClick={() => reset()}
            >
              Cancel
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
