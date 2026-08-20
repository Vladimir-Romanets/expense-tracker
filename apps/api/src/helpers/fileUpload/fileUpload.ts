import path from 'node:path'
import multer from 'multer'
import { AppError } from '@helpers/errors/apiError'

const storage = multer.memoryStorage()

const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif']

export const fileUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const isImageMimetype = file.mimetype.startsWith('image/')
    const hasAllowedExtension = ALLOWED_IMAGE_EXTENSIONS.includes(
      path.extname(file.originalname).toLowerCase(),
    )

    // Some browsers report `application/octet-stream` for .webp/.heic instead of a proper
    // image/* mimetype, so fall back to checking the file extension in that case.
    if (
      !isImageMimetype &&
      !(file.mimetype === 'application/octet-stream' && hasAllowedExtension)
    ) {
      cb(new AppError('Only image uploads are allowed', 400))
      return
    }
    cb(null, true)
  },
})
