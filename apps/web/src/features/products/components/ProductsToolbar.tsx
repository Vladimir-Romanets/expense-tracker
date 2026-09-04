'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input, Select } from '@/shared/ui'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useCategoryOptions } from '@/shared/hooks/useCategoryOptions'
import { useSyncSearchParams } from '@/shared/hooks/useSyncSearchParams'

export const ProductsToolbar = () => {
  const searchParams = useSearchParams()
  const [categoryId, setCategoryId] = useState<string | undefined>(
    searchParams.get('categoryId') || undefined
  )
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const categories = useCategoryOptions()
  const debouncedSearch = useDebounce(search, 600)

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value)
  }

  const handleClear = () => {
    setCategoryId(undefined)
  }

  useSyncSearchParams(
    (params) => {
      if (debouncedSearch) {
        params.set('search', debouncedSearch)
      } else {
        params.delete('search')
      }

      if (categoryId) {
        params.set('categoryId', categoryId)
      } else {
        params.delete('categoryId')
      }

      params.set('page', '1')
    },
    [debouncedSearch, categoryId]
  )

  return (
    <div className="mb-6 flex justify-between gap-4 px-3 max-md:flex-col md:items-center">
      <Input
        placeholder="Search products..."
        wrapperClassName="w-full md:w-64"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        placeholder="Categories"
        wrapperClassName="w-full md:w-64"
        value={categoryId}
        name="categoryId"
        onChange={handleSelectCategory}
        onClear={handleClear}
        options={categories}
      />
    </div>
  )
}
