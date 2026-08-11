import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
import { getR2Client, getR2BucketName } from '@helpers/utils/r2'

/**
 * IMPORTANT: `entry` is used directly as an R2 path prefix.
 * All callers MUST enforce a strict allowlist (e.g. Zod enum) before
 * passing this value to avoid path injection.
 */
type Props = {
  contentType: string
  fileSize: number
  userId: number
  entry: 'receipts' | 'categories'
}

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
}

export const uploadFile = async ({ contentType, fileSize, userId, entry }: Props) => {
  const ext = MIME_TO_EXT[contentType] ?? contentType.split('/')[1]
  const imageKey = `${entry}/${userId}/${randomUUID()}.${ext}`

  const command = new PutObjectCommand({
    Bucket: getR2BucketName(),
    Key: imageKey,
    ContentType: contentType,
    ContentLength: fileSize,
  })

  const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 300 })

  return { uploadUrl, imageKey }
}

export const deleteFile = async (imageKey: string) => {
  const r2Client = getR2Client()

  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: getR2BucketName(),
      Key: imageKey,
    }),
  )
}

export const getImgLink = async (imageKey: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: getR2BucketName(),
    Key: imageKey,
  })

  return await getSignedUrl(getR2Client(), command, { expiresIn: 900 })
}
