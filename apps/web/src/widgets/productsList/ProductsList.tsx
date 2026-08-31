import { Pagination } from '@/shared/ui'
import {
  ProductsToolbar,
  ProductsUpdateCategoryBar,
  ProductContextProvider,
  type ProductEntity,
} from '@/features/products'
import { ProductsTable } from './ProductsTable'
import type { PaginatedResponse, SearchParams } from '@/shared/types/pagination'
import type { DropdownOptions } from '@/shared/types/dropdown'

type Props = {
  searchParams: SearchParams
  categories: DropdownOptions
} & PaginatedResponse<ProductEntity>

export const ProductsList = ({
  data,
  meta,
  searchParams,
  categories,
}: Props) => {
  return (
    <ProductContextProvider>
      <ProductsToolbar />
      <ProductsUpdateCategoryBar categories={categories} />

      <ProductsTable products={data} />

      <Pagination
        meta={meta}
        searchParams={searchParams}
        className="mt-8 justify-center"
      />
    </ProductContextProvider>
  )
}
