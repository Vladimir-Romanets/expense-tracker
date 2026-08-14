import { Pagination } from '@/ui'
import { ProductsToolbar } from './ProductsToolbar'
import { ProductsTable } from './tables/ProductsTable'
import type { PaginatedResponse, SearchParams } from '@/types/pagination'
import type { ProductEntity } from '../types'

type Props = {
  searchParams: SearchParams
} & PaginatedResponse<ProductEntity>

export const ProductsList = ({ data, meta, searchParams }: Props) => {
  return (
    <>
      <ProductsToolbar />

      <ProductsTable products={data} />

      <Pagination
        meta={meta}
        searchParams={searchParams}
        className="mt-8 justify-center"
      />
    </>
  )
}
