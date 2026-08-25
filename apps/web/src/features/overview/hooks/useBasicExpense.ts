'use client'
import { useCallback, useMemo, useRef, useState, useTransition } from 'react'
import { prettierError } from '@/lib/apiClient'
import { getBasicExpenseForRange } from '../actions/getBasicExpenseForRange'
import { BasicExpenseStatisticEntry } from '../types'
import { DateRangeFilterValues } from '../schemas'
import { collapseDataByDate } from '../utils/collapseDataByDate'

export const useBasicExpense = (initData: BasicExpenseStatisticEntry) => {
  const latestRequestId = useRef(0)
  const [data, setData] = useState(initData)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, startTransition] = useTransition()

  const onFilterChange = useCallback((payload: DateRangeFilterValues) => {
    const requestId = ++latestRequestId.current

    startTransition(async () => {
      setError(null)
      try {
        const data = await getBasicExpenseForRange(payload)
        if (requestId === latestRequestId.current) setData(data)
      } catch (e) {
        if (requestId === latestRequestId.current)
          setError(prettierError(e).formError)
      }
    })
  }, [])

  const formattedData = useMemo(() => collapseDataByDate(data), [data])

  return {
    onFilterChange,
    isLoading,
    data: formattedData,
    error,
  }
}
