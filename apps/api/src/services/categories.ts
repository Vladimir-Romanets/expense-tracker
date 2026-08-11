import { CategoryProps, NewCategoryProps } from '@db/schema'
import { categoriesModel } from '@models'
import {
  createPaginatedResponse,
  getPaginationParams,
  PaginationInput,
} from '@helpers/utils/pagination'
import { AppError } from '@helpers/errors/apiError'
import { uploadsService } from '@services'

export const create = async (payload: NewCategoryProps) => {
  const [category] = await categoriesModel.create(payload)

  return category
}

export const getAll = async (payload: PaginationInput) => {
  const pagination = getPaginationParams(payload)

  const { list, total } = await categoriesModel.getAllCategories(pagination)

  const isListContainsCustom = list.some((el) => !el.isSystem && el.imageKey)

  let result = list

  if (isListContainsCustom) {
    result = await Promise.all(
      list.map(async (category) => {
        if (category.isSystem || !category.imageKey) return category
        const imageKey = await uploadsService.getImgLink(category.imageKey)
        return { ...category, imageKey }
      }),
    )
  }
  return createPaginatedResponse<CategoryProps>(result, total, pagination)
}

export const remove = async (id: number) => {
  const [deleted] = await categoriesModel.remove(id)

  if (!deleted) throw new AppError('Category not found', 404)

  if (deleted.imageKey) await uploadsService.deleteFile(deleted.imageKey)
}
