const API_BASE_URL = process.env.API_URL

if (!API_BASE_URL) {
  throw new Error('API_URL environment variable is not set')
}

export type FetchOptions = RequestInit & {
  params?: Record<string, string | number>
}

class ApiError extends Error {
  status: number
  errors?: Record<string, string>

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string>
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

export const prettierError = (error: unknown) => {
  if (error instanceof ApiError && error.errors) {
    const formattedFieldErrors: Record<string, string> = {}

    Object.entries(error.errors).forEach(([key, message]) => {
      const cleanKey = key.replace(/^body\./, '')
      formattedFieldErrors[cleanKey] = message
    })

    return {
      success: false,
      errors: formattedFieldErrors,
      formError: error.message,
    }
  }
  return {
    success: false,
    errors: undefined,
    formError: error instanceof Error ? error.message : 'Unknown error',
  }
}

function getBaseUrl(): string {
  const baseUrl = process.env.API_URL

  if (!baseUrl) {
    throw new ApiError('API_URL is not set', 500)
  }

  return baseUrl
}

export async function apiClientWithHeaders(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const baseUrl = getBaseUrl()
  const { params, headers, method = 'GET', ...customConfig } = options

  let url = `${baseUrl}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) url += `?${queryString}`
  }

  const finalHeaders = new Headers(headers)
  if (customConfig.body && !finalHeaders.has('Content-Type')) {
    finalHeaders.set('Content-Type', 'application/json')
  }

  let response: Response
  try {
    response = await fetch(url, {
      headers: finalHeaders,
      method,
      ...customConfig,
    })
  } catch (networkError) {
    throw new ApiError(
      networkError instanceof Error ? networkError.message : 'Network error',
      0
    )
  }

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`
    let fieldErrors: Record<string, string> | undefined

    try {
      const rawText = await response.text()
      if (rawText) {
        try {
          const errorData = JSON.parse(rawText)
          errorMessage = errorData.message || errorData.error || errorMessage
          fieldErrors = errorData.errors
        } catch {
          errorMessage = rawText
        }
      }
    } catch (e) {
      console.warn('Failed to read error response body:', e)
    }
    throw new ApiError(errorMessage, response.status, fieldErrors)
  }

  return response
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const response = await apiClientWithHeaders(endpoint, options)

  if (response.status === 204) {
    return {} as T
  }

  return response.json() as Promise<T>
}
