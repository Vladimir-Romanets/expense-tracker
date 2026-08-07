'use server'
import { serverApiClient } from './apiClient.server'

type SignedUploadResponse = {
  uploadUrl: string
  imageKey: string
}

export const fileUploader = async (
  file: File
): Promise<{ imageKey: string }> => {
  console.log(file)
  const { uploadUrl, imageKey } = await serverApiClient<SignedUploadResponse>(
    '/uploads/presign-upload',
    {
      method: 'POST',
      body: JSON.stringify({
        contentType: file.type,
        fileSize: file.size,
      }),
    }
  )
  console.log('URL for upload:\n', uploadUrl, '\n', imageKey)
  if (!uploadUrl) {
    throw new Error('Failed to get upload URL')
  }

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })
  console.log('uploadRes', uploadRes)
  if (!uploadRes.ok) {
    throw new Error('Failed to upload to R2')
  }

  return { imageKey }
}
