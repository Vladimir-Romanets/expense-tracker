import { z } from 'zod'

const date = z.coerce.date().transform((d) => d.toISOString())

const _createReceiptBodySchema = z.object({
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

export const createReceiptSchema = z.object({ body: _createReceiptBodySchema })

export type CreateReceiptDto = z.infer<typeof _createReceiptBodySchema>
export type CreateReceiptItemsDto = CreateReceiptDto['items']
