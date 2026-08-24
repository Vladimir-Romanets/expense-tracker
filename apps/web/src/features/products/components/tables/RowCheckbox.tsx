'use client'

import { Checkbox } from '@/ui'
import { useProductTableContext } from '../../hooks/useProductTableContext'

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
