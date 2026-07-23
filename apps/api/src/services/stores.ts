import { storesModel } from '@models'
import {
  createPaginatedResponse,
  getPaginationParams,
  PaginationInput,
} from '@helpers/utils/pagination'
import { NewStoreProps, StoreProps } from '@db/schema'

export const create = async (payload: NewStoreProps) => {
  const [store] = await storesModel.create(payload)

  return store
}

export const getAllStores = async (payload: PaginationInput) => {
  const pagination = getPaginationParams(payload)
  const { list, total } = await storesModel.getAllStores(pagination)

  return createPaginatedResponse<StoreProps>(list, total, pagination)
}
