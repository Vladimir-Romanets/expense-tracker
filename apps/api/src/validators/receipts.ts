import { z } from 'zod'
import { basicQuerySchema, optionalCoerceNumber, optionalCoerceSortOrder } from './basicFilter'

const R2_KEY_REGEX =
  /^receipts\/\d+\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp|heic|avif)$/

const date = z.coerce.date().transform((d) => d.toISOString())

const _createReceiptItemSchema = z.object({
  name: z.string().trim().min(1),
  quantity: z.number().gte(0).optional(),
  unitPrice: z.number().gte(0).optional(),
  totalPrice: z.number().gte(0),
})

const _updateReceiptItemSchema = _createReceiptItemSchema.extend({
  id: z.number().int().gte(0).optional(),
})

const _createReceiptSchema = z.object({
  storeId: z.number().int().positive(),
  totalAmount: z.number().gte(0),
  purchaseDate: date,
  imageKey: z.string().regex(R2_KEY_REGEX).nullish(),
  items: z.array(_createReceiptItemSchema).min(1, 'Receipt should contain at least one item!'),
})

const _updateReceiptSchema = _createReceiptSchema.extend({
  items: z.array(_updateReceiptItemSchema).min(1, 'Receipt should contain at least one item!'),
})

const _paramsIdSchema = z.object({
  id: z.coerce.number().int().positive(),
})

const _receiptsQuerySchema = basicQuerySchema.extend({
  storeId: optionalCoerceNumber,
  sortBy: z.enum(['purchaseDate', 'totalAmount', 'storeId']).default('purchaseDate'),
  sortOrder: optionalCoerceSortOrder('desc'),
})

export const getReceiptsFilterSchema = z.object({
  query: _receiptsQuerySchema,
})

export const createReceiptSchema = z.object({ body: _createReceiptSchema })
export const updateReceiptSchema = z.object({ body: _updateReceiptSchema, params: _paramsIdSchema })
export const paramsIdReceiptSchema = z.object({ params: _paramsIdSchema })

export type ReceiptsQuery = z.infer<typeof _receiptsQuerySchema>
export type ReceiptsFilter = z.infer<typeof getReceiptsFilterSchema>
export type CreateReceiptDto = z.infer<typeof _createReceiptSchema>
export type UpdateReceiptDto = z.infer<typeof _updateReceiptSchema>
export type ParamsIdReceiptDto = z.infer<typeof paramsIdReceiptSchema>
export type UpdateIdReceiptDto = z.infer<typeof updateReceiptSchema>
