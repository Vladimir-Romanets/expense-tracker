import { Response } from 'express'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
import { r2Client, R2_BUCKET } from '@helpers/utils/r2'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { AuthRequest } from '@middleware/authenticate'
import { PresignedUploadDto } from '@validators/uploads'

export const uploadFile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { contentType, fileSize } = req.body as PresignedUploadDto
  const { userId } = req
  const ext = contentType.split('/')[1]
  const imageKey = `receipts/${userId}/${randomUUID()}.${ext}`

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: imageKey,
    ContentType: contentType,
    ContentLength: fileSize,
  })

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 })
  res.status(200).json({ uploadUrl, imageKey })
})
