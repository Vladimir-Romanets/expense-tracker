import { productsModel } from '@models'
import { AppError } from '@helpers/errors/apiError'
import { createPaginatedResponse, getPaginationParams } from '@helpers/utils/pagination'
import type { Executor } from '@db'
import type { NewProductProps, ProductProps } from '@db/schema'
import type {
  UpdateProductDto,
  ProductQuery,
  BulkUpdateCategoryForProductDto,
} from '@validators/products'

type ProductList = {
  id: number
  name: string
  categoryId: number | null
  categoryName: string | null
}

export const getAll = async (payload: ProductQuery) => {
  const pagination = getPaginationParams(payload)

  const { list, total } = await productsModel.getAll(payload, pagination)

  return createPaginatedResponse<ProductList>(list, total, pagination)
}

export const getByName = async (name: NewProductProps['name'], tx?: Executor) =>
  await productsModel.getByName(name, tx)

export const createIfNotExists = async (payload: NewProductProps, tx?: Executor) => {
  const [product] = await productsModel.createIfNotExists(payload, tx)

  return product
}

export const checkAndInsert = async (name: NewProductProps['name'], tx?: Executor) => {
  const formattedName = name.trim().toLowerCase()
  const existedProduct = await getByName(formattedName, tx)

  if (existedProduct) {
    return existedProduct
  }

  const product = await createIfNotExists({ name: formattedName }, tx)

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

export const updateBulkCategoryForProducts = async (payload: BulkUpdateCategoryForProductDto) => {
  const products = await productsModel.updateBulkCategoryForProducts(payload)

  const updatedSet = new Set(products.map((p) => p.id))
  const notFoundProducts = payload.productIds.filter((id) => !updatedSet.has(id))

  return {
    updatedProducts: products,
    notFoundProducts,
  }
}
