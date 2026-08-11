'use server'
import { serverApiClient } from './apiClient.server'

type SignedUploadResponse = {
  uploadUrl: string
  imageKey: string
}

export const fileUploader = async (
  file: File,
  pathPrefix: 'receipts' | 'categories',
  isPublic = false
): Promise<{ imageKey: string }> => {
  console.log(file.type, file.size)
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

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })

  if (!uploadRes.ok) {
    throw new Error('Failed to upload to R2')
  }

  return { imageKey }
}
