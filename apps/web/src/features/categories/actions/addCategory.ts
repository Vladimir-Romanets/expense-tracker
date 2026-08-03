'use server'

import { revalidatePath } from 'next/cache'
import { serverApiClient } from '@/lib/apiClient.server'
import { prettierError } from '@/lib/apiClient'
import type { CategoryEntity } from '../types'

export const addCategory = async (data: Omit<CategoryEntity, 'id'>) => {
  try {
    const newCategory = await serverApiClient<CategoryEntity>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    revalidatePath('/categories')
    return { success: true, data: newCategory }
  } catch (error) {
    return prettierError(error)
  }
}
