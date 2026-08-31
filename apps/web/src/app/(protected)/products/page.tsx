import type { Metadata } from 'next'
import { Typography } from '@/shared/ui'
import { getProducts } from '@/features/products'
import { ProductsList } from '@/widgets/productsList'
import type { SearchParams } from '@/shared/types/pagination'
import { getCategories } from '@/features/categories'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Products | Expense Tracker',
  description: 'View and Manage products',
}

const ProductsPage = async ({ searchParams }: Props) => {
  const currentParams = await searchParams
  const [productsResponse, categories] = await Promise.all([
    getProducts(currentParams),
    // limit of 100 - is safe to keep it hardcoded
    getCategories({ page: 1, limit: 100 }),
  ])

  const options = categories.data.map((el) => ({
    value: el.id,
    label: el.name,
  }))
  options.unshift({ label: 'Remove category', value: 0 })

  return (
    <>
      {productsResponse.data.length ? (
        <ProductsList
          data={productsResponse.data}
          meta={productsResponse.meta}
          searchParams={currentParams}
          categories={options}
        />
      ) : (
        <Typography variant="p">No products found.</Typography>
      )}
    </>
  )
}

export default ProductsPage
