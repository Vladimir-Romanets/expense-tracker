'use server'

import { revalidatePath } from 'next/cache'
import { serverApiClient } from '@/lib/apiClient.server'
import { prettierError } from '@/lib/apiClient'
import type { ReceiptFormValues } from '../schemas'
import { getPresignedUrl } from '@/lib/fileUploader/getPresignedUrl'
import { fileUploader } from '@/lib/fileUploader/fileUploader'
import { ReceiptEntity } from '../types'

export async function createReceiptAction({
  receiptFile,
  ...data
}: ReceiptFormValues) {
  try {
    const imgUploadAssets =
      receiptFile && receiptFile instanceof File
        ? await getPresignedUrl(receiptFile, 'receipts', false)
        : null

    const receiptResult = await serverApiClient<ReceiptEntity>('/receipts', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        imageKey: imgUploadAssets?.imageKey,
      }),
    })

    if (receiptFile && receiptResult && imgUploadAssets) {
      await fileUploader(receiptFile as File, imgUploadAssets.uploadUrl)
    }

    revalidatePath('/receipts')

    return { success: true }
  } catch (error) {
    return prettierError(error)
  }
}
