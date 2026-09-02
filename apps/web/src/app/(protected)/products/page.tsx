import type { Metadata } from 'next'
import { Typography } from '@/shared/ui'
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
    <>
      {productsResponse.data.length ? (
        <ProductsList
          data={productsResponse.data}
          meta={productsResponse.meta}
          searchParams={currentParams}
        />
      ) : (
        <Typography variant="p">No products found.</Typography>
      )}
    </>
  )
}

export default ProductsPage
