'use client'

import { RHFInput } from '../ui/RHFInput'
import { RHFPasswordInput } from '../ui/RHFPasswordInput'
import { useRegistrationForm } from '../../hooks/useRegistrationForm'
import { Button, Typography } from '@/ui'

const RegistrationForm = () => {
  const { form, onSubmit } = useRegistrationForm()
  const { control, formState: { isSubmitting, errors } } = form

  return (
    <form
      className="mb-6 flex flex-col gap-4"
      onSubmit={onSubmit}
      noValidate
    >
      <RHFInput
        control={control}
        name="firstName"
        id="firstName"
        placeholder="John"
        label="First Name"
        autoComplete="given-name"
      />
      <RHFInput
        control={control}
        name="lastName"
        id="lastName"
        placeholder="Doe"
        label="Last Name"
        autoComplete="family-name"
      />
      <RHFInput
        control={control}
        name="email"
        id="email"
        type="email"
        placeholder="example@email.com"
        label="Email *"
        autoComplete="email"
      />
      <RHFPasswordInput
        control={control}
        name="password"
        id="password"
        placeholder="********"
        label="Password *"
        autoComplete="new-password"
      />
      <RHFPasswordInput
        control={control}
        name="repeatPassword"
        id="repeatPassword"
        placeholder="********"
        label="Repeat Password *"
      />
      {errors.root && (
        <Typography
          as="p"
          weight="medium"
          className="animate-in fade-in-50 text-center text-red-500"
        >
          {errors.root.message}
        </Typography>
      )}
      <Button
        id="registration-submit"
        type="submit"
        fullWidth
        size="lg"
        shape="pill"
        isLoading={isSubmitting}
        className="bg-linear-to-r from-emerald-500 to-emerald-600 font-semibold transition-all hover:from-emerald-600 hover:to-emerald-500"
      >
        Create Account
      </Button>
    </form>
  )
}

export default RegistrationForm
