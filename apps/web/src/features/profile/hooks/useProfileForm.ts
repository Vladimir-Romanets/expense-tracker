'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '@/stores/user'
import { setFormErrors } from '@/shared/lib/setFormErrors'
import { updateProfileSchema, type UpdateProfileFormValues } from '../schemas'
import { updateProfile } from '../actions/updateProfile'

export const useProfileForm = () => {
  const user = useUserStore((state) => state.user)
  const hasHydrated = useUserStore((state) => state.hasHydrated)

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { firstName: '', lastName: '', email: '' },
  })

  useEffect(() => {
    if (hasHydrated && user && !form.formState.isDirty) {
      form.reset({
        avatar: user.avatarKey ?? undefined,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
    }
  }, [hasHydrated, user, form])

  const onSubmit = async (values: UpdateProfileFormValues) => {
    const result = await updateProfile(values)

    if (!result.success) {
      setFormErrors(form.setError, result)
    }
  }

  return { form, onSubmit, hasHydrated }
}
