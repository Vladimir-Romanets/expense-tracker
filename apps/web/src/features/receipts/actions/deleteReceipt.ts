'use server'

import { revalidatePath } from 'next/cache'
import { serverApiClient } from '@/shared/api/apiClient.server'

export const deleteReceipt = async (id: number) => {
  try {
    await serverApiClient(`/receipts/${id}`, {
      method: 'DELETE',
    })
    revalidatePath('/receipts')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: 'Receipt could not be removed. Please try again.',
    }
  }
}
