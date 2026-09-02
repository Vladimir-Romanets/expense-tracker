import type { ReactNode } from 'react'
import { getCategoryOptions } from '@/features/categories'
import { CategoryOptionsProvider } from '@/shared/context/CategoryOptionsContext'

const ProductsLayout = async ({ children }: { children: ReactNode }) => {
  const options = await getCategoryOptions()

  return (
    <CategoryOptionsProvider options={options}>
      {children}
    </CategoryOptionsProvider>
  )
}

export default ProductsLayout
