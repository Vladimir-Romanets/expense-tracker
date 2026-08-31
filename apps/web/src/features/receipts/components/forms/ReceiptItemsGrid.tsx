'use client'

import { useFieldArray, type Control, type FieldErrors } from 'react-hook-form'
import { RHFInput, Button, Icon } from '@/shared/ui/'
import type { ReceiptFormValues } from '../../schemas'

interface ReceiptItemsGridProps {
  control: Control<ReceiptFormValues>
  errors: FieldErrors<ReceiptFormValues>
}

export function ReceiptItemsGrid({ control, errors }: ReceiptItemsGridProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const handleAddPosition = () => {
    append({
      name: '',
      quantity: '' as unknown as number,
      unitPrice: '' as unknown as number,
      totalPrice: '' as unknown as number,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr_auto] items-center gap-4 text-sm font-medium text-gray-700">
        <div>Product Name</div>
        <div>Quantity</div>
        <div>Unit Price</div>
        <div>Line Total</div>
        <div className="w-10" /> {/* Spacer for delete button */}
      </div>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[3fr_1fr_1fr_1fr_auto] items-start gap-4"
          >
            <RHFInput<ReceiptFormValues>
              control={control}
              name={`items.${index}.name`}
              placeholder="Autocomplete..."
            />

            <RHFInput<ReceiptFormValues>
              control={control}
              name={`items.${index}.quantity`}
              type="number"
              hideNativeControl
            />

            <RHFInput<ReceiptFormValues>
              control={control}
              name={`items.${index}.unitPrice`}
              type="number"
              hideNativeControl
            />

            <RHFInput<ReceiptFormValues>
              control={control}
              name={`items.${index}.totalPrice`}
              type="number"
              hideNativeControl
            />

            <Button
              type="button"
              variant="social"
              onClick={() => remove(index)}
              className="px-2 text-slate-500 focus-within:text-red-500 hover:text-red-500 "
              aria-label="Remove item"
            >
              <Icon
                name="trash"
                size={20}
              />
            </Button>
          </div>
        ))}
      </div>

      {errors.items?.message && (
        <span className="text-sm text-red-500">{errors.items.message}</span>
      )}

      <div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddPosition}
          className="flex items-center gap-2"
        >
          + Add Position
        </Button>
      </div>
    </div>
  )
}
