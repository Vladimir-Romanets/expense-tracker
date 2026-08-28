export type BasicExpenseStatisticEntry = {
  id: number
  totalAmount: string
  purchaseDate: string
}[]

export type BasicExpenseStatistic = {
  totalAmount: number
  purchaseDate: string
}[]

export type CategoryExpenseEntry = {
  categoryId: number | null
  categoryName: string | null
  totalSpent: string
}[]

export type CategoryExpenseStatistic = {
  name: string
  totalSpent: number
}[]
