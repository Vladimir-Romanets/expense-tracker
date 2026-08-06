'use server'

import { revalidatePath } from 'next/cache'
import { serverApiClient } from '@/lib/apiClient.server'
import { prettierError } from '@/lib/apiClient'
import type { CreateReceiptDto } from '../schemas'

export async function createReceiptAction(data: CreateReceiptDto) {
  try {
    await serverApiClient('/receipts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    revalidatePath('/receipts')
    return { success: true }
  } catch (error) {
    return prettierError(error)
  }
}
