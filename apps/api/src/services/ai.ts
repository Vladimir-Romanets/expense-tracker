import { GoogleGenAI, Type, type GenerateContentParameters } from '@google/genai'
import { AppError } from '@helpers/errors/apiError'
import { getAiKey } from '@helpers/utils/aiGemini'

type ReceiptItem = {
  name: string
  quantity?: number
  totalPrice: number
}

type ParsedReceipt = {
  storeName: string
  purchaseDate?: string
  totalAmount: number
  currency?: string
  items: ReceiptItem[]
}

const ai = new GoogleGenAI({ apiKey: getAiKey() })
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
        const statusCode = error?.status || error?.error?.code
        const errorMessage = error?.message || ''

        const is503 = statusCode === 503 || errorMessage.includes('503')
        const is429 =
          statusCode === 429 ||
          errorMessage.includes('429') ||
          errorMessage.includes('RESOURCE_EXHAUSTED')
        const is404 =
          statusCode === 404 || errorMessage.includes('404') || errorMessage.includes('NOT_FOUND')

        // If the model is not found (404), switch to the next model immediately
        if (is404) {
          console.warn(
            `[Gemini API] Model ${model} was not found (404). Switching to the next model...`,
          )
          break
        }

        // Handle rate limits / quota issues (429)
        if (is429) {
          // If daily quota is exceeded for this model, switch to the next model immediately
          if (errorMessage.includes('GenerateRequestsPerDay')) {
            console.warn(
              `[Gemini API] Daily quota exceeded for ${model}. Switching to the next model...`,
            )
            break
          }

          // If short-term rate limit is hit, wait 2.5s before retrying
          if (attempt < maxRetries) {
            console.warn(`[Gemini API] Rate limit (429) hit for ${model}. Waiting 2.5 seconds...`)
            await new Promise((res) => setTimeout(res, 2500))
            continue
          }
          break
        }

        // Handle service unavailability (503) with exponential backoff
        if (is503 && attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000
          console.warn(
            `[Gemini API] Model ${model} is temporarily unavailable (503). Retrying in ${delay}ms...`,
          )
          await new Promise((res) => setTimeout(res, delay))
          continue
        }

        if (is503 && attempt === maxRetries) {
          console.warn(
            `[Gemini API] Model ${model} high demand retries exhausted. Switching to the next model...`,
          )
          break
        }

        // Re-throw any other errors
        throw error
      }
    }
  }

  throw new AppError('All Gemini models are temporarily unavailable. Please try again later.', 503)
}

export const parseReceiptFromFile = async (file: Express.Multer.File): Promise<ParsedReceipt> => {
  const mimeType = file.mimetype.startsWith('image/') ? file.mimetype : 'image/jpeg'
  const inlineData = {
    data: file.buffer.toString('base64'),
    mimeType,
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
