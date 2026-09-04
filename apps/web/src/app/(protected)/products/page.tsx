import type { Metadata } from 'next'
import { getProducts } from '@/features/products'
import { ProductsList } from '@/widgets/productsList'
import type { SearchParams } from '@/shared/types/pagination'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Products | Expense Tracker',
  description: 'View and Manage products',
}

const ProductsPage = async ({ searchParams }: Props) => {
  const currentParams = await searchParams
  const productsResponse = await getProducts(currentParams)

  return (
    <ProductsList
      data={productsResponse.data}
      meta={productsResponse.meta}
      searchParams={currentParams}
    />
  )
}

export default ProductsPage
