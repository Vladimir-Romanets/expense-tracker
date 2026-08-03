import Link from 'next/link'
import { RegistrationForm } from '@/features/auth'
import { Typography } from '@/ui'

const RegistrationPage = () => (
  <>
    <RegistrationForm />
    <Typography
      as="p"
      className="text-center"
    >
      Already have an account?
      <Link
        href="/login"
        className="ms-1 inline-block text-sky-600 underline"
      >
        Login
      </Link>
    </Typography>
  </>
)

export default RegistrationPage
