'use server'

import { revalidatePath } from 'next/cache'
import { serverApiClient } from '@/shared/api/apiClient.server'
import { prettierError } from '@/shared/api/apiClient'
import { getPresignedUrl } from '@/shared/lib/fileUploader/getPresignedUrl'
import { fileUploader } from '@/shared/lib/fileUploader/fileUploader'
import { ReceiptEntity } from '../types'
import type { ReceiptFormValues } from '../schemas'

type Payload = {
  id: number
  initialImageKey?: string | null
} & ReceiptFormValues

export const updateReceipt = async (payload: Payload) => {
  try {
    const { receiptFile, id, initialImageKey, ...data } = payload

    let finalImageKey = initialImageKey
    let imgUploadAssets:
      Awaited<ReturnType<typeof getPresignedUrl>> | undefined = undefined
    let shouldUpload = false

    if (receiptFile instanceof File) {
      imgUploadAssets = await getPresignedUrl(receiptFile, 'receipts', false)

      if (imgUploadAssets.imageKey !== initialImageKey) {
        finalImageKey = imgUploadAssets.imageKey
        shouldUpload = true
      }
    }

    const receiptResult = await serverApiClient<ReceiptEntity>(
      `/receipts/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ ...data, imageKey: finalImageKey }),
      }
    )

    if (receiptResult && shouldUpload && imgUploadAssets) {
      await fileUploader(receiptFile as File, imgUploadAssets.uploadUrl)
    }

    revalidatePath('/receipts')
    return { success: true }
  } catch (error) {
    return prettierError(error)
  }
}
