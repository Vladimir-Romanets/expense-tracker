'use server'
import { prettierError } from '@/shared/api/apiClient'
import { serverApiClient } from '@/shared/api/apiClient.server'
import { revalidatePath } from 'next/cache'

type ResponseType = {
  updatedProducts: { id: number; categoryId: number | null }[]
  notFoundProducts: number[]
}

export const updateProductCategories = async (
  productIds: number[],
  categoryId: number
): Promise<ResponseType | ReturnType<typeof prettierError>> => {
  try {
    const body = JSON.stringify({ productIds, categoryId: categoryId || null })

    const response = await serverApiClient<ResponseType>('/products/category', {
      method: 'PATCH',
      body,
    })

    if (response.updatedProducts.length) revalidatePath('/products')

    return response
  } catch (error) {
    return prettierError(error)
  }
}
