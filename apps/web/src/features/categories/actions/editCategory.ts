'use server'

import { revalidatePath } from 'next/cache'
import { serverApiClient } from '@/lib/apiClient.server'
import { prettierError } from '@/lib/apiClient'
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

    revalidatePath('/categories')
    return { success: true, data: updatedCategory }
  } catch (error) {
    return prettierError(error)
  }
}
