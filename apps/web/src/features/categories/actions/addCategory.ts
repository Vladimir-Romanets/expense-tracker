'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { serverApiClient } from '@/lib/apiClient.server'
import { prettierError } from '@/lib/apiClient'
import { getPresignedUrl } from '@/lib/fileUploader/getPresignedUrl'
import { fileUploader } from '@/lib/fileUploader/fileUploader'
import type { CategoryEntity } from '../types'
import { AddCategoryFormValues } from '../schemas'

export const addCategory = async (payload: AddCategoryFormValues) => {
  try {
    const imageFile = payload.image

    const imgUploadAssets = imageFile
      ? await getPresignedUrl(imageFile, 'categories', true)
      : null

    const newCategory = await serverApiClient<CategoryEntity>('/categories', {
      method: 'POST',
      body: JSON.stringify({
        name: payload.name,
        description: payload.description,
        imageKey: imgUploadAssets?.imageKey,
      }),
    })

    if (imageFile && imgUploadAssets && newCategory) {
      await fileUploader(imageFile, imgUploadAssets.uploadUrl)
    }

    updateTag('categories')
    revalidatePath('/categories')
    return { success: true, data: newCategory }
  } catch (error) {
    return prettierError(error)
  }
}
