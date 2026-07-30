import Link from 'next/link'
import Typography from '@/ui/Typography/Typography'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
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
}
