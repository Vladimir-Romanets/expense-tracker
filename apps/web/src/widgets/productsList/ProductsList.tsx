import { Pagination } from '@/shared/ui'
import {
  ProductsToolbar,
  ProductsUpdateCategoryBar,
  ProductContextProvider,
  type ProductEntity,
} from '@/features/products'
import { ProductsTable } from './ProductsTable'
import type { PaginatedResponse, SearchParams } from '@/shared/types/pagination'

type Props = {
  searchParams: SearchParams
} & PaginatedResponse<ProductEntity>

export const ProductsList = ({ data, meta, searchParams }: Props) => {
  return (
    <ProductContextProvider>
      <ProductsToolbar />
      <ProductsUpdateCategoryBar />

      <ProductsTable products={data} />

      <Pagination
        meta={meta}
        searchParams={searchParams}
        className="mt-8 justify-center"
      />
    </ProductContextProvider>
  )
}
