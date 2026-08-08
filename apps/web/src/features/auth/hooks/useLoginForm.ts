import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction, type LoginActionState } from '../actions/login'
import { useUserStore } from '@/stores/user'

const initialState: LoginActionState = {
  values: {},
}

export const useLoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
    '/dashboard'
  )
  const router = useRouter()
  const setUser = useUserStore((s) => s.setUser)

  useEffect(() => {
    if (state.success && state.user) {
      setUser(state.user)
      router.push('/overview')
    }
  }, [state, router, setUser])

  const isFormInvalid = Boolean(state.formError)

  return { state, formAction, isPending, isFormInvalid }
}
