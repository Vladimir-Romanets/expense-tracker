import Link from 'next/link'
import Typography from '@/ui/Typography/Typography'
import RegistrationForm from '../components/RegistrationForm'

const RegistrationPage = () => {
  return (
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
}

export default RegistrationPage
