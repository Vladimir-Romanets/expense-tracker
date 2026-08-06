import { z } from 'zod'

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'] as const
const MAX_SIZE_BYTES = 10 * 1024 * 1024

const _presignedUploadBodySchema = z.object({
  contentType: z.enum(ALLOWED_MIME),
  fileSize: z.number().int().positive().max(MAX_SIZE_BYTES),
})

export const presignedUploadSchema = z.object({ body: _presignedUploadBodySchema })
export type PresignedUploadDto = z.infer<typeof _presignedUploadBodySchema>
