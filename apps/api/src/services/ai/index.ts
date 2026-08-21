import { AppError } from '@helpers/errors/apiError'
import { callGeminiWithRetry } from './geminiClient'
import { receiptAiConfig, type ParsedReceipt } from './receiptPrompt'

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
    config: receiptAiConfig,
  })

  if (!response.text) throw new AppError('Receipt recognition fail', 502)
  try {
    return JSON.parse(response.text)
  } catch {
    throw new AppError('Receipt recognition returned invalid data', 502)
  }
}
