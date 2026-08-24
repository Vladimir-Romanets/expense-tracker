'use client'
import { createContext, useState } from 'react'

type ProductContextProps = {
  selectedIds: Set<number>
  toggleSelected: (id: number) => void
  checkSelected: (id: number) => boolean
  clearSelected: () => void
}

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
)

export const ProductContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [selectedIds, setSelected] = useState(new Set<number>())

  const toggleSelected = (id: number) => {
    setSelected((prevSet) => {
      const newSet = new Set(prevSet)

      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)

      return newSet
    })
  }

  const checkSelected = (id: number) => {
    return selectedIds.has(id)
  }

  const clearSelected = () => {
    setSelected((prevProps) => {
      const newSet = new Set(prevProps)
      newSet.clear()
      return newSet
    })
  }

  return (
    <ProductContext
      value={{
        selectedIds,
        toggleSelected,
        checkSelected,
        clearSelected,
      }}
    >
      {children}
    </ProductContext>
  )
}
