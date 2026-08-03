'use server'

import { revalidatePath } from 'next/cache'
import { serverApiClient } from '@/lib/apiClient.server'
import { prettierError } from '@/lib/apiClient'

export const deleteCategory = async (id: number) => {
  try {
    await serverApiClient(`/categories/${id}`, {
      method: 'DELETE',
    })

    revalidatePath('/categories')
    return { success: true }
  } catch (error) {
    return prettierError(error)
  }
}
