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

export type ReceiptDetails = {
  storeId: number
  items: ReceiptItem[]
  receiptUrl: string | null
} & Pick<ReceiptEntity, 'id' | 'purchaseDate' | 'totalAmount' | 'imageKey'>

type ReceiptItem = {
  id: number
  name: string
  quantity: string
  unitPrice: string
  totalPrice: string
}
