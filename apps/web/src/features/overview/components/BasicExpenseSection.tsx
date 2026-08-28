'use client'
import { useMemo } from 'react'
import { BasicExpenseChart } from './charts/BasicExpenseChart'
import { StatisticError } from './StatisticError'
import { getBasicExpense } from '../actions/getBasicExpense'
import { collapseDataByDate } from '../utils/collapseDataByDate'
import { useStatisticQuery } from '../hooks/useStatisticQuery'
import type { BasicExpenseStatisticEntry } from '../types'

type Props = {
  data: BasicExpenseStatisticEntry
}

export const BasicExpenseSection = (props: Props) => {
  const { data, error } = useStatisticQuery(props.data, getBasicExpense)

  const formattedData = useMemo(() => collapseDataByDate(data), [data])

  return (
    <>
      <BasicExpenseChart data={formattedData} />
      <StatisticError error={error} />
    </>
  )
}
