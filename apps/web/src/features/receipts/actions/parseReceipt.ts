'use server'
import { serverApiClient } from '@/lib/apiClient.server'
import type { ReceiptDetails } from '../types'
import { receiptDetailsFormatter } from '../utils/receiptDetailsFormatter'

export const parseReceipt = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('receiptScreenshot', file)

    const rawReceipt = await serverApiClient<ReceiptDetails>(
      '/receipts/parse',
      {
        method: 'POST',
        body: formData,
      }
    )

    const receipt = receiptDetailsFormatter(rawReceipt)

    return {
      success: true,
      data: {
        ...receipt,
        receiptFile: file,
      },
    }
  } catch (err: any) {
    console.warn(`API error: ${err.status} | ${err.message}`)
    return {
      success: false,
      message: 'File can not be parsed',
    }
  }
}
