import { z } from 'zod'

const date = z.coerce.date().transform((d) => d.toISOString())

export const createReceiptSchema = z.object({
  receiptFile: z.any().optional(),
  storeId: z.coerce.number().int().positive('Please select a store'),
  totalAmount: z.coerce.number().gte(0, 'Amount must be positive'),
  purchaseDate: date,
  items: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        quantity: z.coerce.number().gte(0).optional(),
        unitPrice: z.coerce.number().gte(0).optional(),
        totalPrice: z.coerce.number().gte(0),
      })
    )
    .min(1, 'Receipt should contain at least one item!'),
})

export type CreateReceiptFormValues = z.infer<typeof createReceiptSchema>
export type CreateReceiptDto = Omit<CreateReceiptFormValues, 'receiptFile'>
