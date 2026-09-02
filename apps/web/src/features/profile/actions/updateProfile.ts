'use server'

import type { UpdateProfileFormValues } from '../schemas'

// TODO: replace this stub once the backend exposes a profile-update endpoint
// (e.g. PATCH /users/me), following the getPresignedUrl + serverApiClient
// pattern used in features/categories/actions/addCategory.ts.
export const updateProfile = async (_payload: UpdateProfileFormValues) => {
  return {
    success: false as const,
    errors: {},
    formError:
      'Profile editing is not available yet — this endpoint has not been implemented on the backend.',
  }
}
