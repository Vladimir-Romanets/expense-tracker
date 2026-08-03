const API_BASE_URL = process.env.API_URL!

export type FetchOptions = RequestInit & {
  params?: Record<string, string | number>
  token?: string
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

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, token, headers, method = 'GET', ...customConfig } = options

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
  if (token) finalHeaders.set('Authorization', `Bearer ${token}`)

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

  if (response.status === 204) {
    return {} as T
  }

  return response.json() as Promise<T>
}
