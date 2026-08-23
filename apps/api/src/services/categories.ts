import { categoriesModel } from '@models'
import { uploadsService } from '@services'
import type { CategoryProps, NewCategoryProps } from '@db/schema'
import {
  createPaginatedResponse,
  getPaginationParams,
  type PaginationInput,
} from '@helpers/utils/pagination'
import { AppError } from '@helpers/errors/apiError'
import { getR2PublicUrl } from '@helpers/utils/r2'

export const create = async (payload: NewCategoryProps) => {
  const [category] = await categoriesModel.create(payload)

  return category
}

export const getAll = async (payload: PaginationInput) => {
  const pagination = getPaginationParams(payload)

  const response = await categoriesModel.getAllCategories(pagination)
  const publicUrl = getR2PublicUrl()

  const list = response.list.map((el) =>
    el.isSystem || !el.imageKey
      ? el
      : {
          ...el,
          imageKey: `${publicUrl}/${el.imageKey}`,
        },
  )
  return createPaginatedResponse<CategoryProps>(list, response.total, pagination)
}

export const remove = async (id: number) => {
  const [deleted] = await categoriesModel.remove(id)

  if (!deleted) {
    const exists = await categoriesModel.getById(id)
    throw exists
      ? new AppError('Cannot delete system category', 403)
      : new AppError('Category not found', 404)
  }

  if (deleted.imageKey) await uploadsService.deleteFile(deleted.imageKey, true)
}
