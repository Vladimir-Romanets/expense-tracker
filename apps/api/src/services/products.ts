import { Executor } from '@db'
import { NewProductProps } from '@db/schema'
import { productsModel } from '@models'

export const createIfNotExists = async (payload: NewProductProps, tx?: Executor) => {
  const [product] = await productsModel.createIfNotExists(payload, tx)

  return product
}

export const getByName = async (name: NewProductProps['name'], tx?: Executor) =>
  await productsModel.getByName(name, tx)

export const checkAndInsert = async (name: NewProductProps['name'], tx?: Executor) => {
  const existedProduct = await getByName(name, tx)

  if (existedProduct) {
    return existedProduct
  }

  const product = await createIfNotExists({ name }, tx)

  return product
}
