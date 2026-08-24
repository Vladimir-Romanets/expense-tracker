'use client'
import { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

export const useProductTableContext = () => {
  const productValues = useContext(ProductContext)

  if (!productValues) {
    throw new Error(
      'useProductTable must be used within ProductContextProvider'
    )
  }

  return productValues
}
