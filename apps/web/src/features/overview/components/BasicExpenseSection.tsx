'use client'
import { BasicExpenseChart } from './charts/BasicExpenseChart'
import { Filter } from './forms/Filter'
import { BasicExpenseStatisticEntry } from '../types'
import { DateRangeFilterValues } from '../schemas'
import { useBasicExpense } from '../hooks/useBasicExpense'

type Props = {
  data: BasicExpenseStatisticEntry
  initialFilterValues: DateRangeFilterValues
}

export const BasicExpenseSection = (props: Props) => {
  const { data, error, isLoading, onFilterChange } = useBasicExpense(props.data)

  return (
    <>
      <Filter
        initValues={props.initialFilterValues}
        action={onFilterChange}
        isLoading={isLoading}
      />
      <BasicExpenseChart data={data} />
      {/* TODO: Create Error Bar and replace this handler with it */}
      {error ? <p>{error}</p> : null}
    </>
  )
}
