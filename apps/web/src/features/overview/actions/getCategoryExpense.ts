'use server'

import { serverApiClient } from '@/lib/apiClient.server'
import type { CategoryExpenseEntry } from '../types'
import type { DateRangeFilterValues } from '../schemas'

export const getCategoryExpense = async (
  params: DateRangeFilterValues
): Promise<CategoryExpenseEntry> =>
  serverApiClient<CategoryExpenseEntry>('/statistics/categories', {
    params,
  })
