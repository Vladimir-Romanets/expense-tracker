'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { serverApiClient } from '@/shared/api/apiClient.server'
import { prettierError } from '@/shared/api/apiClient'
import type { CategoryEntity } from '../types'

export const editCategory = async (
  id: number,
  data: Partial<Omit<CategoryEntity, 'id'>>
) => {
  try {
    const updatedCategory = await serverApiClient<CategoryEntity>(
      `/categories/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    )

    updateTag('categories')
    revalidatePath('/categories')
    return { success: true, data: updatedCategory }
  } catch (error) {
    return prettierError(error)
  }
}
