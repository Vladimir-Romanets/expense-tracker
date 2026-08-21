import { Type, type GenerateContentParameters } from '@google/genai'

type ReceiptItem = {
  name: string
  quantity?: number
  totalPrice: number
}

export type ParsedReceipt = {
  storeName: string
  purchaseDate?: string
  totalAmount: number
  currency?: string
  items: ReceiptItem[]
}

const systemInstruction = `
You are an expert at parsing sales receipts.
If a discount item is encountered in the receipt (where the price/amount is negative or a discount/promo is explicitly stated):
1. Find the main item (product) this discount belongs to, based on the name or context (usually the discount appears right after the item).
2. Deduct the discount amount from the totalPrice field of the main item.
3. Do not create a separate item in the items array for the discount. The final items array must contain only actual products with their final recalculated cost.
4. Item names must be in lowercase.
5. If an item name contains units of measurement without specific values, e.g., "MELOUN VODNI kg", remove the units of measurement: "meloun vodni".
6. If an item name contains units of measurement with values, combine them without a space in between (e.g., "1.5kg" or "500ml").
`
const receiptRecognitionSchema = {
  type: Type.OBJECT,
  properties: {
    storeName: { type: Type.STRING, description: 'Store name' },
    purchaseDate: { type: Type.STRING, description: 'Date in YYYY-MM-DD format' },
    totalAmount: { type: Type.NUMBER, description: 'Total amount' },
    currency: { type: Type.STRING, description: 'Currency (CZK, EUR, USD, UAH)' },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          quantity: { type: Type.NUMBER },
          totalPrice: { type: Type.NUMBER },
        },
        required: ['name', 'totalPrice'],
      },
    },
  },
  required: ['storeName', 'totalAmount', 'items'],
}

export const receiptAiConfig: GenerateContentParameters['config'] = {
  responseMimeType: 'application/json',
  responseSchema: receiptRecognitionSchema,
  temperature: 0.1,
  systemInstruction,
}
