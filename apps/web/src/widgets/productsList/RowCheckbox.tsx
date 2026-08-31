'use client'

import { Checkbox } from '@/shared/ui'
// Deep import, not the `@/features/products` barrel: the barrel also re-exports
// the `getProducts` server action, which would pull `next/headers` into this client bundle.
import { useProductTableContext } from '@/features/products/hooks/useProductTableContext'

type Props = {
  productId: number
}

export const RowCheckbox = ({ productId }: Props) => {
  const { checkSelected, toggleSelected } = useProductTableContext()

  const handleChange = () => {
    toggleSelected(productId)
  }

  return (
    <Checkbox
      name={`Product-${productId}`}
      aria-label={`Product-${productId}`}
      onChange={handleChange}
      checked={checkSelected(productId)}
    />
  )
}
