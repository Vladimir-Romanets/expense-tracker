import Link from 'next/link'
import { Typography } from '@/shared/ui'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden bg-[linear-gradient(to_bottom_right,rgba(5,30,20,0.72),rgba(10,63,50,0.4)),url('/auth.webp')] bg-cover bg-center p-8 md:flex md:items-center ">
        <Typography
          variant="blockquote"
          className="text-center text-white md:text-2xl"
        >
          &ldquo;Bringing financial clarity, strengthening growth and driving
          your financial future forward.&rdquo;
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-105">
          <Typography
            variant="h1"
            weight="bold"
            className="mb-10 text-center text-2xl text-brand-900 md:text-3xl"
          >
            Expense Tracker
          </Typography>
          {children}
        </div>
      </div>

      <Link
        href="/"
        target="_self"
        className="fixed top-8 left-8 z-20 text-sm font-semibold text-primary transition-all hover:scale-125 focus-visible:scale-125 md:text-white"
      >
        ← Home
      </Link>
    </div>
  )
}
