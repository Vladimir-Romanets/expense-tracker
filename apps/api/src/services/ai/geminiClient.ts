import { GoogleGenAI, type GenerateContentParameters } from '@google/genai'
import { AppError } from '@helpers/errors/apiError'
import { getAiKey } from '@helpers/utils/aiGemini'

const ai = new GoogleGenAI({ apiKey: getAiKey() })
const MODELS_FALLBACK_ORDER = ['gemini-3.6-flash', 'gemini-1.5-flash', 'gemini-1.5-pro']

type CallGeminiParams = {
  contents: GenerateContentParameters['contents']
  config: GenerateContentParameters['config']
  maxRetries?: number
}

export const callGeminiWithRetry = async (params: CallGeminiParams) => {
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
