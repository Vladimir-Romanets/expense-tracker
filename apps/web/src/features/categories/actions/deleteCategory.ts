'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { serverApiClient } from '@/shared/api/apiClient.server'
import { prettierError } from '@/shared/api/apiClient'

export const deleteCategory = async (id: number) => {
  try {
    await serverApiClient(`/categories/${id}`, {
      method: 'DELETE',
    })

    updateTag('categories')
    revalidatePath('/categories')
    return { success: true }
  } catch (error) {
    return prettierError(error)
  }
}
