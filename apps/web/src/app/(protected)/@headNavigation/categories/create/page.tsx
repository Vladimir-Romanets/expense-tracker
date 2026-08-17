import Link from 'next/link'

const HeadNavigationCategoriesCreate = () => {
  return (
    <Link
      href="/categories"
      className="text-sm font-semibold text-primary transition-all hover:text-sky-700 focus-visible:text-sky-700"
    >
      ← Back to categories
    </Link>
  )
}

export default HeadNavigationCategoriesCreate
