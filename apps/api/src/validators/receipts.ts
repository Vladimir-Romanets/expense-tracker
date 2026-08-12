import { z } from 'zod'

const R2_KEY_REGEX =
  /^receipts\/\d+\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp|heic|avif)$/

const date = z.coerce.date().transform((d) => d.toISOString())

const _createReceiptBodySchema = z.object({
  storeId: z.number().int().positive(),
  totalAmount: z.number().gte(0),
  purchaseDate: date,
  imageKey: z.string().regex(R2_KEY_REGEX).optional(),
  items: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        quantity: z.number().gte(0).optional(),
        unitPrice: z.number().gte(0).optional(),
        totalPrice: z.number().gte(0),
      }),
    )
    .min(1, 'Receipt should contain at least one item!'),
})

const _paramsIdSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const createReceiptSchema = z.object({ body: _createReceiptBodySchema })
export const paramsIdReceiptSchema = z.object({ params: _paramsIdSchema })

export type CreateReceiptDto = z.infer<typeof _createReceiptBodySchema>
export type CreateReceiptItemsDto = CreateReceiptDto['items']
export type ParamsIdReceiptDto = z.infer<typeof paramsIdReceiptSchema>
