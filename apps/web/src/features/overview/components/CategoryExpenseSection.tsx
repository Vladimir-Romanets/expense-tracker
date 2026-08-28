'use client'
import { useMemo } from 'react'
import { CategoryExpenseChart } from './charts/CategoryExpenseChart'
import { StatisticError } from './StatisticError'
import { getCategoryExpense } from '../actions/getCategoryExpense'
import { useStatisticQuery } from '../hooks/useStatisticQuery'
import type { CategoryExpenseEntry } from '../types'

const toCategoryExpenseStatistic = (entry: CategoryExpenseEntry) =>
  entry.map((el) => ({
    name: el.categoryName || 'Unknown',
    totalSpent: Number(el.totalSpent) || 0,
  }))

type Props = {
  data: CategoryExpenseEntry
}

export const CategoryExpenseSection = (props: Props) => {
  const { data, error } = useStatisticQuery(props.data, getCategoryExpense)

  const formattedData = useMemo(() => toCategoryExpenseStatistic(data), [data])

  return (
    <>
      <CategoryExpenseChart data={formattedData} />
      <StatisticError error={error} />
    </>
  )
}
