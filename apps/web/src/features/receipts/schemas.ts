import { z } from 'zod'

export const receiptSchema = z.object({
  receiptFile: z.instanceof(File).or(z.string()).nullish(),
  storeId: z.coerce.number().int().positive('Please select a store'),
  totalAmount: z.coerce.number().gte(0, 'Amount must be positive'),
  purchaseDate: z
    .string('Date is incorrect or not set')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date is incorrect or not set'),
  items: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, 'Name is required'),
        quantity: z.coerce.number().gte(0).optional(),
        unitPrice: z.coerce.number().gte(0).optional(),
        totalPrice: z.coerce.number().gte(0),
      })
    )
    .min(1, 'Receipt should contain at least one item!'),
})

export type ReceiptFormValues = z.infer<typeof receiptSchema>
