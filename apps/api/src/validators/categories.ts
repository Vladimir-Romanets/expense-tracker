import { z } from 'zod'

const _createCategoriesBodySchema = z.object({
  name: z.string().trim().min(1).max(100),
})

const _deleteCategoryParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const deleteCategorySchema = z.object({ params: _deleteCategoryParamsSchema })

export const createCategoriesSchema = z.object({ body: _createCategoriesBodySchema })

export type CreateCategoryDto = z.infer<typeof _createCategoriesBodySchema>
export type DeleteCategoryDto = z.infer<typeof deleteCategorySchema>
