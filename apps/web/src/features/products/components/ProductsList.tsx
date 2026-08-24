import { Pagination } from '@/ui'
import { ProductsToolbar } from './ProductsToolbar'
import { ProductsTable } from './tables/ProductsTable'
import { ProductsUpdateCategoryBar } from './ProductsUpdateCategoryBar'
import { ProductContextProvider } from '../context/ProductContext'
import type { PaginatedResponse, SearchParams } from '@/types/pagination'
import type { ProductEntity } from '../types'
import type { DropdownOptions } from '@/types/dropdown'

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
