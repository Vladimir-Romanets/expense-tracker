export interface StoreEntity {
  id: number
  name: string
}

export interface ReceiptEntity {
  id: number
  storeId: number
  store?: StoreEntity
  purchaseDate: string
  totalAmount: string
  imageKey?: string | null
  createdAt: string
}
