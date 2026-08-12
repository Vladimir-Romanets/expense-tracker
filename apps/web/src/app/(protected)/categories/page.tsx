import type { Metadata } from 'next'
import { getCategories } from '@/features/categories/actions/getCategories'
import { CategoryList } from '@/features/categories'
import { Typography } from '@/ui'
import type { SearchParams } from '@/types/pagination'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Category | Expense Tracker',
}

const CategoriesPage = async ({ searchParams }: Props) => {
  const currentParams = await searchParams
  const page = Number(currentParams.page) || 1
  const limit = Number(currentParams.limit) || undefined

  const response = await getCategories({ page, limit })

  return (
    <>
      {response.data.length ? (
        <CategoryList
          {...response}
          searchParams={currentParams}
        />
      ) : (
        <Typography variant="p">No categories found.</Typography>
      )}
    </>
  )
}

export default CategoriesPage
