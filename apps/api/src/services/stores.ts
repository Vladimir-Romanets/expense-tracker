import { stores } from '@db/schema'
import { storesModel } from '@models'

type StoreBasic = typeof stores.$inferInsert

export const create = async (payload: Pick<StoreBasic, 'name'>) => {
  const result = await storesModel.create(payload)

  return result[0]
}
