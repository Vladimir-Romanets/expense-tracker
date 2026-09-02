'use client'
import { useContext } from 'react'
import { CategoryOptionsContext } from '@/shared/context/CategoryOptionsContext'

export const useCategoryOptions = () => {
  const options = useContext(CategoryOptionsContext)

  if (!options) {
    throw new Error(
      'useCategoryOptions must be used within CategoryOptionsProvider'
    )
  }

  return options
}
