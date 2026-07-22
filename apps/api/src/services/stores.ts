import { stores } from '@db/schema'
import { PaginationResult } from '@helpers/utils/pagination'
import { storesModel } from '@models'

type StoreBasic = typeof stores.$inferInsert

export const create = async (payload: Pick<StoreBasic, 'name'>) => {
  const [store] = await storesModel.create(payload)

  return store
}

export const getAllStores = async (pagination: PaginationResult) =>
  storesModel.getAllStores(pagination)
