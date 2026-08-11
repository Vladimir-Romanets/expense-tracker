import { Response } from 'express'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import { AuthRequest } from '@middleware/authenticate'
import { PresignedUploadDto } from '@validators/uploads'
import { uploadsService } from '@services'

export const uploadFile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { contentType, fileSize, entry } = req.body as PresignedUploadDto
  const userId = req.userId as number

  const response = await uploadsService.uploadFile({ contentType, fileSize, entry, userId })
  res.json(response)
})
