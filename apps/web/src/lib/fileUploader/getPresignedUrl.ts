'use server'

import { serverApiClient } from '../apiClient.server'

export type SignedUploadResponse = {
  uploadUrl: string
  imageKey: string
}

export const getPresignedUrl = async (
  file: File,
  pathPrefix: 'receipts' | 'categories',
  isPublic = false
): Promise<{ imageKey: string; uploadUrl: string }> => {
  const { uploadUrl, imageKey } = await serverApiClient<SignedUploadResponse>(
    isPublic ? '/uploads/presigned-url-public' : '/uploads/presigned-url',
    {
      method: 'POST',
      body: JSON.stringify({
        contentType: file.type,
        fileSize: file.size,
        pathPrefix,
      }),
    }
  )

  if (!uploadUrl) {
    throw new Error('Failed to get upload URL')
  }

  return { uploadUrl, imageKey }
}
