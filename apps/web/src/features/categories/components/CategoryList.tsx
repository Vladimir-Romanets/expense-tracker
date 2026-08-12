import { Pagination } from '@/ui'
import type { PaginatedResponse, SearchParams } from '@/types/pagination'
import { CategoryGrid } from './ui/CategoryGrid'
import type { CategoryEntity } from '../types'

type Props = {
  searchParams: SearchParams
} & PaginatedResponse<CategoryEntity>

export const CategoryList = ({ data, meta, searchParams }: Props) => {
  return (
    <>
      <CategoryGrid categories={data} />
      <Pagination
        meta={meta}
        searchParams={searchParams}
        className="mt-10 justify-center"
      />
    </>
  )
}
