'use client'

import Link from 'next/link'

import { PasswordInput } from '../ui/PasswordInput'
import { Input } from '../ui/Input'
import { useLoginForm } from '../../hooks/useLoginForm'
import { cn } from '@/shared/lib/cn'
import { Button, Typography } from '@/shared/ui'

const LoginForm = () => {
  const { state, formAction, isPending, isFormInvalid } = useLoginForm()

  return (
    <form
      className={cn(
        'mb-6 flex flex-col gap-4',
        !isPending && isFormInvalid && 'animate-shake'
      )}
      action={formAction}
    >
      <Input
        id="email"
        name="email"
        required
        placeholder="example@email.com"
        label="Email *"
        autoComplete="email"
        defaultValue={state.values.email}
        error={state.errors?.email}
      />
      <PasswordInput
        id="password"
        name="password"
        placeholder="********"
        label="Password *"
        autoComplete="new-password"
        required
        defaultValue={state.values.password}
        error={state.errors?.password}
      />
      {isFormInvalid && (
        <Typography
          as="p"
          weight="medium"
          className="animate-in fade-in-50 text-center text-red-500"
        >
          {state.formError}
        </Typography>
      )}
      <div className="mx-1 mt-3 mb-0 flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-emerald-500 no-underline transition-colors duration-150 hover:text-emerald-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <Button
        id="login-submit"
        type="submit"
        fullWidth
        size="lg"
        shape="pill"
        isLoading={isPending}
        className="bg-linear-to-r from-emerald-500 to-emerald-600 font-semibold transition-all hover:from-emerald-600 hover:to-emerald-500"
      >
        Log In
      </Button>
    </form>
  )
}

export default LoginForm
