import multer from 'multer'
import { AppError } from './apiError'

export const handleMulterError = (err: multer.MulterError): AppError => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return new AppError('File is too large. Maximum size is 5MB.', 400)
  }

  return new AppError(err.message, 400)
}
