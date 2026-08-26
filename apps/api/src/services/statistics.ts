import { statisticsModel } from '@models'
import type { PeriodFilterProps } from '@validators/statistics'

export const getBasicExpenseForPeriod = async (filter: PeriodFilterProps, userId: number) => {
  const result = await statisticsModel.getBasicExpenseForPeriod(filter, userId)

  return result
}

export const getExpenseByCategories = async (filter: PeriodFilterProps, userId: number) => {
  const result = await statisticsModel.getExpenseByCategories(filter, userId)

  return result
}
