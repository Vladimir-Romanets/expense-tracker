import { getCategories } from '@/features/categories/actions/getCategories'
import { CategoryGrid, AddCategoryForm } from '@/features/categories/components'
import { Typography } from '@/ui'

export default async function CategoriesPage() {
  const { data: categories } = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography
          variant="h1"
          weight="bold"
          className="text-dark text-xl md:text-2xl"
        >
          Categories
        </Typography>
      </div>

      <div className="rounded-2xl border border-surface-border bg-surface-card p-8 shadow-xs">
        <AddCategoryForm />
        {categories.length ? (
          <CategoryGrid categories={categories} />
        ) : (
          <Typography variant="p">No categories found.</Typography>
        )}
      </div>
    </div>
  )
}
