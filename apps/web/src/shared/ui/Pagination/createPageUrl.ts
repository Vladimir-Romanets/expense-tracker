import type { SearchParams } from '@/shared/types/pagination'

export const createPageUrl = (searchParams: SearchParams, page: number) => {
  const params = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)))
    } else if (value !== undefined) {
      params.set(key, String(value))
    }
  })

  params.set('page', page.toString())

  return `?${params.toString()}`
}
