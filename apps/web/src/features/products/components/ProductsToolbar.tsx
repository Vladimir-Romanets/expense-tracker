'use client'

import { useState, useEffect, useRef, useEffectEvent } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Input, Select } from '@/ui'
import { useDebounce } from '@/hooks/useDebounce'

export const ProductsToolbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isMounted = useRef(false)

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || ''
  )

  const debouncedSearch = useDebounce(search, 600)

  const handleUpdate = useEffectEvent(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }

    if (sortOrder) {
      params.set('sortOrder', sortOrder)
    } else {
      params.delete('sortOrder')
    }

    params.set('page', '1')

    router.replace(`${pathname}?${params.toString()}`)
  })

  useEffect(() => {
    if (isMounted.current) {
      handleUpdate()
    }
  }, [debouncedSearch, sortOrder])

  useEffect(() => {
    isMounted.current = true
  }, [])

  return (
    <div className="mb-6 flex items-center justify-between gap-4 px-3">
      <Input
        placeholder="Search products..."
        wrapperClassName="w-64"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        placeholder="Sort: A-Z"
        wrapperClassName="w-26 shrink-0"
        value={sortOrder}
        name="sortOrder"
        onChange={(e) => setSortOrder(e.target.value)}
        options={[
          { label: 'Sort: A-Z', value: 'asc' },
          { label: 'Sort: Z-A', value: 'desc' },
        ]}
      />
    </div>
  )
}
