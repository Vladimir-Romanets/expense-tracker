'use server'

import { serverApiClient } from '@/lib/apiClient.server'
import type { BasicExpenseStatisticEntry } from '../types'
import type { DateRangeFilterValues } from '../schemas'

export const getBasicExpense = async (
  params: DateRangeFilterValues
): Promise<BasicExpenseStatisticEntry> =>
  serverApiClient<BasicExpenseStatisticEntry>('/statistics/basic', {
    params,
  })
