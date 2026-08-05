const API_BASE_URL = process.env.API_URL

if (!API_BASE_URL) {
  throw new Error('API_URL environment variable is not set')
}

export type FetchOptions = RequestInit & {
  params?: Record<string, string | number>
}

export class ApiError extends Error {
  errors?: Record<string, string>

  constructor(message: string, errors?: Record<string, string>) {
    super(message)
    this.name = 'ApiError'
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

export async function apiClientWithHeaders(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { params, headers, method = 'GET', ...customConfig } = options

  let url = `${API_BASE_URL}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value))
    })
    url += `?${searchParams.toString()}`
  }

  const finalHeaders = new Headers(headers)
  if (customConfig.body) {
    finalHeaders.set('Content-Type', 'application/json')
  }

  const response = await fetch(url, {
    headers: finalHeaders,
    method,
    ...customConfig,
  })

  if (!response.ok) {
    let error = {
      message: '',
      errors: {},
    }

    try {
      const errorData = await response.json()
      error = {
        ...errorData,
      }
    } catch {
      const errorText = await response.text()
      if (errorText) error.message = errorText
    }
    throw new ApiError(
      error.message || `API Error: ${response.status} ${response.statusText}`,
      error.errors
    )
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
