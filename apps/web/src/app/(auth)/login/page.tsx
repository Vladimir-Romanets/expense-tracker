import Link from 'next/link'
import { LoginForm } from '@/features/auth'
import { Typography } from '@/shared/ui'

const LoginPage = () => (
  <>
    <LoginForm />
    <Typography
      as="p"
      className="text-center"
    >
      Don&apos;t have an account?
      <Link
        href="/register"
        className="ms-1 inline-block text-sky-600 underline"
      >
        Sign Up
      </Link>
    </Typography>
  </>
)

export default LoginPage
