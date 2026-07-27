import { Executor } from '@db'
import { NewProductProps, ProductProps } from '@db/schema'
import { productsModel } from '@models'
import { AppError } from '@helpers/errors/apiError'
import { UpdateProductDto } from '@validators/products'

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

export const update = async (id: ProductProps['id'], payload: UpdateProductDto['body']) => {
  const existing = await productsModel.getById(id)

  if (!existing) {
    throw new AppError(`Product with id ${id} not found`, 404)
  }

  const [product] = await productsModel.update(id, payload)

  return product
}
