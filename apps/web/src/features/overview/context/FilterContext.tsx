'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { DateRangeFilterValues } from '../schemas'

type FilterContextValue = {
  filter: DateRangeFilterValues
  setFilter: (values: DateRangeFilterValues) => void
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined)

export const FilterProvider = ({
  initialFilter,
  children,
}: {
  initialFilter: DateRangeFilterValues
  children: ReactNode
}) => {
  const [filter, setFilter] = useState(initialFilter)

  return <FilterContext value={{ filter, setFilter }}>{children}</FilterContext>
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilterContext must be used within FilterProvider')
  }

  return context
}
