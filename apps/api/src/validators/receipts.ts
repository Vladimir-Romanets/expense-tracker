import { z } from 'zod'

const date = z.coerce.date().transform((d) => d.toISOString())

export const createReceiptSchema = z.object({
  storeId: z.number().int().positive(),
  totalAmount: z.number().gte(0),
  purchaseDate: date,
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.number().gte(0).optional(),
        unitPrice: z.number().gte(0).optional(),
        totalPrice: z.number().gte(0),
      }),
    )
    .min(1, 'Receipt should contain at least one item!'),
})

export type CreateReceiptDto = z.infer<typeof createReceiptSchema>
export type CreateReceiptItemsDto = CreateReceiptDto['items']
