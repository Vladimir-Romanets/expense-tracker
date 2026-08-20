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

type ReceiptItem = {
  id: number
  name: string
  quantity: string
  unitPrice: string
  totalPrice: string
}

export type ReceiptDetails = {
  storeId: number
  items: ReceiptItem[]
  receiptUrl: string | null
} & Pick<ReceiptEntity, 'id' | 'purchaseDate' | 'totalAmount' | 'imageKey'>

export type ParsedReceipt = {
  storeId: number | undefined
  purchaseDate: string | undefined
  totalAmount: number
  currency: string | null
  receiptUrl?: string | null
  imageKey?: string | null
  items: {
    id?: number
    name: string | undefined
    quantity: number
    unitPrice?: number
    totalPrice: number
  }[]
}
