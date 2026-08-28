import { format, startOfMonth } from 'date-fns'

import { BasicExpenseSection } from './BasicExpenseSection'
import { CategoryExpenseSection } from './CategoryExpenseSection'
import { Filter } from './forms/Filter'
import { FilterProvider } from '../context/FilterContext'
import { getBasicExpense } from '../actions/getBasicExpense'
import { getCategoryExpense } from '../actions/getCategoryExpense'

export const Dashboard = async () => {
  const today = new Date()
  const initValue = {
    startDate: format(startOfMonth(today), 'yyyy-MM-dd'),
    endDate: format(today, 'yyyy-MM-dd'),
  }
  const [basicExpense, categoryExpense] = await Promise.all([
    getBasicExpense(initValue),
    getCategoryExpense(initValue),
  ])

  return (
    <FilterProvider initialFilter={initValue}>
      <Filter />
      <BasicExpenseSection data={basicExpense} />
      <CategoryExpenseSection data={categoryExpense} />
    </FilterProvider>
  )
}
