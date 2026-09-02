'use client'

import { Button, RHFFileUpload, RHFInput } from '@/shared/ui'
import { useProfileForm } from '../../hooks/useProfileForm'

export const ProfileForm = () => {
  const { form, onSubmit, hasHydrated } = useProfileForm()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = form
  const isFieldsDisabled = !hasHydrated || isSubmitting

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-6 max-md:flex-col md:items-start"
      noValidate
    >
      <fieldset
        disabled={isFieldsDisabled}
        aria-busy={isSubmitting}
        className="contents"
      >
        <legend className="sr-only">Profile details</legend>

        {/* RHFFileUpload's drag-and-drop handlers are plain JS and don't
            observe the native fieldset cascade, so it still needs its own
            disabled prop; the RHFInput fields below inherit it natively. */}
        <RHFFileUpload
          control={control}
          name="avatar"
          label="Upload Photo"
          accept="image/png, image/jpeg, image/webp"
          disabled={isFieldsDisabled}
          className="mx-auto size-32 shrink-0 overflow-hidden rounded-full p-0 md:mx-0"
        />
        <div className="flex flex-1 flex-col gap-6">
          <RHFInput
            control={control}
            name="firstName"
            label="First name"
          />
          <RHFInput
            control={control}
            name="lastName"
            label="Last name"
          />
          <RHFInput
            control={control}
            name="email"
            type="email"
            label="Email"
          />
          {errors.root && (
            <p className="text-end text-sm text-red-500">
              {errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={!isDirty}
          >
            Save changes
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
