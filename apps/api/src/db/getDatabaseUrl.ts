export function getDatabaseUrl(): string {
  const dbUser = process.env.DB_USERNAME || 'postgres'
  const dbPassword = encodeURIComponent(process.env.DB_PASSWORD || '')
  const dbHost = process.env.DB_HOST || 'localhost'
  const dbPort = process.env.DB_PORT || '5432'
  const dbName = process.env.DB_NAME || 'postgres'

  return (
    process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
  )
}
