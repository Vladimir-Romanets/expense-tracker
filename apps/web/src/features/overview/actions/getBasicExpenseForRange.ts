'use server'

import { serverApiClient } from '@/lib/apiClient.server'
import { BasicExpenseStatisticEntry } from '../types'
import { DateRangeFilterValues } from '../schemas'

export const getBasicExpenseForRange = async (
  params: DateRangeFilterValues
): Promise<BasicExpenseStatisticEntry> =>
  serverApiClient<BasicExpenseStatisticEntry>('/statistics/basic', {
    params,
  })
