import { CategoryProps, NewCategoryProps } from '@db/schema'
import { categoriesModel } from '@models'
import {
  createPaginatedResponse,
  getPaginationParams,
  PaginationInput,
} from '@helpers/utils/pagination'

export const create = async (payload: NewCategoryProps) => {
  const [category] = await categoriesModel.create(payload)

  return category
}

export const getAll = async (payload: PaginationInput) => {
  const pagination = getPaginationParams(payload)

  const { list, total } = await categoriesModel.getAllCategories(pagination)

  return createPaginatedResponse<CategoryProps>(list, total, pagination)
}
