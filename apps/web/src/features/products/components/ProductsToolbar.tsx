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
  const [sort, setSort] = useState(searchParams.get('sort') || '')

  const debouncedSearch = useDebounce(search, 600)

  const handleUpdate = useEffectEvent(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }

    if (sort) {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }

    params.set('page', '1')

    router.replace(`${pathname}?${params.toString()}`)
  })

  useEffect(() => {
    if (isMounted.current) {
      handleUpdate()
    }
  }, [debouncedSearch, sort])

  useEffect(() => {
    isMounted.current = true
  }, [])

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <Input
        placeholder="Search products..."
        className="w-64"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        placeholder="Sort: A-Z"
        wrapperClassName="w-48"
        value={sort}
        name="sort"
        onChange={(e) => setSort(e.target.value)}
        options={[
          { label: 'Sort: A-Z', value: 'asc' },
          { label: 'Sort: Z-A', value: 'desc' },
        ]}
      />
    </div>
  )
}
