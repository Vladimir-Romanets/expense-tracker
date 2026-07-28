import { Metadata } from 'next'
import { headers } from 'next/headers'
import Image from 'next/image'

import Typography from '@/ui/Typography/Typography'
import LinkAsButton from '@/ui/Link/LinkAsButton'
import GoBackButton from '@/features/goBack/GoBackButton'

export const metadata: Metadata = {
  title: 'Page Not Found — Expense Tracker',
  description: 'The page you are looking for does not exist or has been moved.',
}

const NotFoundPage = async () => {
  const headersList = await headers()

  const referer = headersList.get('referer')
  const currentHost = headersList.get('host')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-bg p-4 text-center">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-surface-border bg-surface-card p-8 shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-50">
          <Image
            src="/icons/alert.svg"
            alt="Page not found icon"
            width={32}
            height={32}
          />
        </div>

        <div className="space-y-2">
          <Typography
            variant="price"
            className="text-5xl text-emerald-600 md:text-6xl"
          >
            404
          </Typography>
          <Typography
            variant="h3"
            weight="bold"
          >
            Page Not Found
          </Typography>
          <Typography variant="muted">
            The page you are looking for does not exist or has been moved.
          </Typography>
        </div>

        <div className="space-y-3 pt-2">
          <LinkAsButton
            href="/"
            variant="primary"
            size="lg"
            shape="rounded"
            fullWidth
          >
            Go to Homepage
          </LinkAsButton>
          <GoBackButton
            referer={referer}
            currentHost={currentHost}
          />
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
