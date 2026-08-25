import { statisticsModel } from '@models'
import type { BasicExpenseForPeriodProps } from '@validators/statistics'

export const getBasicExpenseForPeriod = async (
  filter: BasicExpenseForPeriodProps,
  userId: number,
) => {
  const result = await statisticsModel.getBasicExpenseForPeriod(filter, userId)

  return result
}
