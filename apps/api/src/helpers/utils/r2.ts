import { S3Client } from '@aws-sdk/client-s3'

let _client: S3Client | null = null

export const getR2Client = (): S3Client => {
  if (_client) return _client

  if (
    !process.env.R2_ACCOUNT_ID ||
    !process.env.R2_ACCESS_KEY_ID ||
    !process.env.R2_SECRET_ACCESS_KEY ||
    !process.env.R2_BUCKET_NAME
  ) {
    throw new Error('Missing R2 credentials in env')
  }

  _client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  })

  return _client
}

export const getR2BucketName = (): string => {
  if (!process.env.R2_BUCKET_NAME) throw new Error('R2_BUCKET_NAME is not set')

  return process.env.R2_BUCKET_NAME
}
