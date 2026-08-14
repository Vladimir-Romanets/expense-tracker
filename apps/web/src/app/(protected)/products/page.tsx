import type { Metadata } from 'next'
import { Typography } from '@/ui'
import { getProducts } from '@/features/products/actions/getProducts'
import { ProductsList } from '@/features/products'
import type { SearchParams } from '@/types/pagination'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Products | Expense Tracker',
  description: 'View and Manage products',
}

export default async function ProductsPage({ searchParams }: Props) {
  const currentParams = await searchParams
  const page = Number(currentParams.page) || 1
  const limit = Number(currentParams.limit) || undefined

  const response = await getProducts({ page, limit })

  return (
    <>
      {response.data.length ? (
        <ProductsList
          data={response.data}
          meta={response.meta}
          searchParams={currentParams}
        />
      ) : (
        <Typography variant="p">No products found.</Typography>
      )}
    </>
  )
}
