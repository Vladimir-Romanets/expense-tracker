'use server'

import { revalidatePath } from 'next/cache'
import { serverApiClient } from '@/lib/apiClient.server'
import { prettierError } from '@/lib/apiClient'
import type { CreateReceiptFormValues } from '../schemas'
import { fileUploader } from '@/lib/fileUploader'

export async function createReceiptAction({
  receiptFile,
  ...data
}: CreateReceiptFormValues) {
  try {
    const { imageKey } = receiptFile
      ? await fileUploader(receiptFile)
      : { imageKey: null }

    await serverApiClient('/receipts', {
      method: 'POST',
      body: JSON.stringify({ ...data, imageKey }),
    })
    revalidatePath('/receipts')

    return { success: true }
  } catch (error) {
    return prettierError(error)
  }
}
