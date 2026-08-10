import { Pagination } from '@/ui'
import type { PaginatedResponse } from '@/types/pagination'
import { CategoryGrid } from './ui/CategoryGrid'
import type { CategoryEntity } from '../types'

type Props = {
  createPageUrl: (page: number) => string
} & PaginatedResponse<CategoryEntity>

export const CategoryList = ({ data, meta, createPageUrl }: Props) => {
  return (
    <>
      <CategoryGrid categories={data} />
      <Pagination
        meta={meta}
        createPageUrl={createPageUrl}
        className="mt-10 justify-center"
      />
    </>
  )
}
