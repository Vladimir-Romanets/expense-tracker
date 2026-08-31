import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {
  registrationSchema,
  type RegistrationSchemaProps,
} from '../schemas/auth'
import { registrationAction } from '../actions/register'
import { useUserStore } from '@/stores/user'
import { setFormErrors } from '@/shared/lib/setFormErrors'

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
}

export const useRegistrationForm = () => {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

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
      setFormErrors(form.setError, result)
    }
  })

  return { form, onSubmit }
}
