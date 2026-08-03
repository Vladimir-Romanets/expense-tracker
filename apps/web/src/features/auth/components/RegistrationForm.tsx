'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import Button from '@/ui/Button/Button'
import Typography from '@/ui/Typography/Typography'
import { RHFInput } from './RHFInput'
import { RHFPasswordInput } from './RHFPasswordInput'
import {
  registrationSchema,
  type RegistrationSchemaProps,
} from '../schemas/auth'
import { registrationAction } from '../actions/register'
import { useUserStore } from '@/stores/user'

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
}

const RegistrationForm = () => {
  const router = useRouter()
  const setUser = useUserStore((s) => s.setUser)
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<RegistrationSchemaProps>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  })

  const onSubmit = handleSubmit(async (data: RegistrationSchemaProps) => {
    const result = await registrationAction(data)

    if (result?.success && result?.user) {
      setUser(result.user)
      router.push('/overview')
      return
    }

    if (!result?.success) {
      const fieldErrors = Object.entries(result?.errors || {})

      fieldErrors.forEach(([field, message]) => {
        setError(field as keyof RegistrationSchemaProps, {
          type: 'server',
          message: message,
        })
      })

      if (!fieldErrors.length && result?.formError) {
        setError('root', {
          type: 'server',
          message: result?.formError,
        })
      }
      return
    }
  })

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
