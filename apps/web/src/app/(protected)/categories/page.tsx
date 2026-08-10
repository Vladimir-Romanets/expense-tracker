import { getCategories } from '@/features/categories/actions/getCategories'
import { CategoryList, AddCategoryForm } from '@/features/categories'
import { Typography } from '@/ui'
import { createPageUrl } from '@/lib/createPageUrl'
import { SearchParams } from '@/types/pagination'

type Props = {
  searchParams: Promise<SearchParams>
}

const CategoriesPage = async ({ searchParams }: Props) => {
  const currentParams = await searchParams
  const page = Number(currentParams.page) || 1
  const limit = Number(currentParams.limit) || undefined

  const response = await getCategories({ page, limit })

  const urlBuilder = createPageUrl(currentParams)

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-8 shadow-xs">
      <AddCategoryForm />
      {response.data.length ? (
        <CategoryList
          {...response}
          createPageUrl={urlBuilder}
        />
      ) : (
        <Typography variant="p">No categories found.</Typography>
      )}
    </div>
  )
}

export default CategoriesPage
