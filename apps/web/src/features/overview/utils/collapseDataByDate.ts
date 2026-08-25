import type {
  BasicExpenseStatistic,
  BasicExpenseStatisticEntry,
} from '../types'

// API returns data ordered by purchaseDate (asc).
// If API stops sorting collection, this logic should be improved
export const collapseDataByDate = (
  data: BasicExpenseStatisticEntry
): BasicExpenseStatistic => {
  const result = data.reduce((prev, curr, idx) => {
    const currentCoast = Number(curr.totalAmount)
    const currentTotalAmount = Number.isNaN(currentCoast) ? 0 : currentCoast
    const lastEl = prev[prev.length - 1]

    if (idx === 0 || lastEl.purchaseDate !== curr.purchaseDate) {
      prev.push({
        purchaseDate: curr.purchaseDate,
        totalAmount: currentTotalAmount,
      })

      return prev
    }

    lastEl.totalAmount += currentTotalAmount

    return prev
  }, [] as BasicExpenseStatistic)

  return result
}
