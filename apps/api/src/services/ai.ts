import { GenerateContentParameters, GoogleGenAI, Type } from '@google/genai'
import { AppError } from '@helpers/errors/apiError'
import { getImgFile } from './uploads'

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY })
const MODELS_FALLBACK_ORDER = ['gemini-3.6-flash', 'gemini-1.5-flash', 'gemini-1.5-pro']
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

const aiConfig: GenerateContentParameters['config'] = {
  responseMimeType: 'application/json',
  responseSchema: receiptRecognitionSchema,
  temperature: 0.1,
  systemInstruction,
}

type CallGeminiParams = {
  contents: GenerateContentParameters['contents']
  config: GenerateContentParameters['config']
  maxRetries?: number
}

const callGeminiWithRetry = async (params: CallGeminiParams) => {
  const { contents, config, maxRetries = 2 } = params

  for (const model of MODELS_FALLBACK_ORDER) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config,
        })
        return response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const is503 = error?.status === 503 || error?.message?.includes('503')
        const isLastAttempt = attempt === maxRetries

        if (is503 && !isLastAttempt) {
          const delay = Math.pow(2, attempt) * 1000
          await new Promise((res) => setTimeout(res, delay))
          continue
        }

        if (is503 && isLastAttempt) {
          console.warn(`[Gemini API] Model ${model} is overloaded (503). Switching to the next...`)
          break
        }

        throw error
      }
    }
  }

  throw new AppError('All Gemini models are temporarily unavailable. Please try again later.', 503)
}

export const parseReceiptFromR2 = async (imageKey: string) => {
  const receiptFile = await getImgFile(imageKey)

  if (!receiptFile.Body) {
    throw new AppError('Receipt file was not found', 404)
  }

  const byteArray = await receiptFile.Body.transformToByteArray()
  const inlineData = {
    data: Buffer.from(byteArray).toString('base64'),
    mimeType: receiptFile.ContentType || 'image/jpeg',
  }
  const contents = [
    {
      inlineData,
    },
    'Recognize the receipt in the image and extract the data structure from it.',
  ]

  const response = await callGeminiWithRetry({
    contents,
    config: aiConfig,
  })

  if (!response.text) throw new AppError('Receipt recognition fail', 502)
  try {
    return JSON.parse(response.text)
  } catch {
    throw new AppError('Receipt recognition returned invalid data', 502)
  }
}
