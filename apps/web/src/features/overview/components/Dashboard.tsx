import { format, startOfMonth } from 'date-fns'

import { BasicExpenseSection } from './BasicExpenseSection'
import { getBasicExpenseForRange } from '../actions/getBasicExpenseForRange'

export const Dashboard = async () => {
  const today = new Date()
  const initValue = {
    startDate: format(startOfMonth(today), 'yyyy-MM-dd'),
    endDate: format(today, 'yyyy-MM-dd'),
  }
  const data = await getBasicExpenseForRange(initValue)

  return (
    <BasicExpenseSection
      data={data}
      initialFilterValues={initValue}
    />
  )
}
