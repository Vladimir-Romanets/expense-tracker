import { S3Client } from '@aws-sdk/client-s3'
import { config } from '@config'

let _client: S3Client | null = null

export const getR2Client = (): S3Client => {
  if (_client) return _client

  _client = new S3Client({
    region: 'auto',
    endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2.accessKeyId,
      secretAccessKey: config.r2.secretAccessKey,
    },
  })

  return _client
}

export const getR2BucketName = (): string => config.r2.bucketName

export const getR2PublicBucketName = (): string => config.r2.publicBucketName

export const getR2PublicUrl = (): string => config.r2.publicAssetsUrl
