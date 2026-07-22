import { stores } from '@db/schema'
import { storesModel } from '@models'

type StoreBasic = typeof stores.$inferInsert

export const create = async (payload: Pick<StoreBasic, 'name'>) => {
  const [store] = await storesModel.create(payload)

  return store
}

export const getAllStores = async () => storesModel.getAllStores()
