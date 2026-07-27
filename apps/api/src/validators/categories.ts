import { z } from 'zod'

const _createCategoriesBodySchema = z.object({
  name: z.string().min(1).max(100),
})

export const createCategoriesSchema = z.object({ body: _createCategoriesBodySchema })

export type CreateCategoryDto = z.infer<typeof _createCategoriesBodySchema>
