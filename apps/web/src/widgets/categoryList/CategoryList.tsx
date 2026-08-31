import { Pagination } from '@/shared/ui'
import type { PaginatedResponse, SearchParams } from '@/shared/types/pagination'
import { CategoryGrid } from './CategoryGrid'
import type { CategoryEntity } from '@/features/categories'

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
