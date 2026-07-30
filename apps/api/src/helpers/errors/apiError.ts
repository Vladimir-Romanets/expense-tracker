export class AppError extends Error {
  public readonly statusCode: number
  public readonly status: 'fail' | 'error'
  public readonly isOperational: boolean
  public readonly errors?: Record<string, string>

  constructor(message: string, statusCode: number, errors?: Record<string, string>) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true
    this.errors = errors
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}
