import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
import { getR2Client, getR2BucketName } from '@helpers/utils/r2'

type Props = {
  contentType: string
  fileSize: number
  userId: number
}

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
}

export const uploadFile = async ({ contentType, fileSize, userId }: Props) => {
  const ext = MIME_TO_EXT[contentType] ?? contentType.split('/')[1]
  const imageKey = `receipts/${userId}/${randomUUID()}.${ext}`

  const command = new PutObjectCommand({
    Bucket: getR2BucketName(),
    Key: imageKey,
    ContentType: contentType,
    ContentLength: fileSize,
  })

  const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 300 })

  return { uploadUrl, imageKey }
}

export const getImgLink = async (imageKey: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: getR2BucketName(),
    Key: imageKey,
  })

  return await getSignedUrl(getR2Client(), command, { expiresIn: 900 })
}
