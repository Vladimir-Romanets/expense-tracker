import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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

export const useRegistrationForm = () => {
  const router = useRouter()
  const setUser = useUserStore((s) => s.setUser)
  
  const form = useForm<RegistrationSchemaProps>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  })

  const onSubmit = form.handleSubmit(async (data: RegistrationSchemaProps) => {
    const result = await registrationAction(data)

    if (result?.success && result?.user) {
      setUser(result.user)
      router.push('/overview')
      return
    }

    if (!result?.success) {
      const fieldErrors = Object.entries(result?.errors || {})

      fieldErrors.forEach(([field, message]) => {
        form.setError(field as keyof RegistrationSchemaProps, {
          type: 'server',
          message: message as string,
        })
      })

      if (!fieldErrors.length && result?.formError) {
        form.setError('root', {
          type: 'server',
          message: result?.formError,
        })
      }
      return
    }
  })

  return { form, onSubmit }
}
