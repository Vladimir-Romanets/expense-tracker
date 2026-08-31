'use client'
import { useEffect, useRef, useState, useTransition } from 'react'
import { prettierError } from '@/shared/api/apiClient'
import { useFilterContext } from '../context/FilterContext'
import type { DateRangeFilterValues } from '../schemas'

/** @function fetcher must be a stable reference (module-level or wrapped in `useCallback`) */
export const useStatisticQuery = <TData>(
  initData: TData,
  fetcher: (filter: DateRangeFilterValues) => Promise<TData>
) => {
  const { filter } = useFilterContext()
  const latestRequestId = useRef(0)
  const isFirstRender = useRef(true)
  const [data, setData] = useState(initData)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, startTransition] = useTransition()

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const requestId = ++latestRequestId.current

    startTransition(async () => {
      setError(null)
      try {
        const data = await fetcher(filter)
        if (requestId === latestRequestId.current) setData(data)
      } catch (e) {
        if (requestId === latestRequestId.current)
          setError(prettierError(e).formError)
      }
    })
  }, [filter, fetcher])

  return { data, isLoading, error }
}
