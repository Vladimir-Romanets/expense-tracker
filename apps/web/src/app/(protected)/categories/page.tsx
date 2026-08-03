import Typography from '@/ui/Typography/Typography'
import { getCategories } from '@/features/categories/actions/getCategories'

export default async function CategoriesPage() {
  const { data: categories } = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography
          variant="h1"
          weight="bold"
          className="text-dark text-2xl"
        >
          Categories
        </Typography>
      </div>

      <div className="rounded-2xl border border-surface-border bg-surface-card p-8 shadow-xs">
        {categories.length ? (
          <ul className="list-inside list-disc space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Typography
                  variant="p"
                  className="inline-block "
                >
                  {category.name}
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="p">No categories found.</Typography>
        )}
      </div>
    </div>
  )
}
