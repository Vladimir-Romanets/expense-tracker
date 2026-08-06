import { z } from 'zod'

const _createStoreBodySchema = z.object({
  name: z.string().trim().min(1).max(100),
})

export const createStoreSchema = z.object({ body: _createStoreBodySchema })

export type CreateStoreDto = z.infer<typeof _createStoreBodySchema>
