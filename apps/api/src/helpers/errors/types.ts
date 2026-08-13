import type { DatabaseError } from 'pg'

export interface DrizzleQueryError extends Error {
  cause?: DatabaseError
}
