'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Typography, Button, LinkAsButton } from '@/ui'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // TODO: connect Sentry to log errors
    console.error('Unhandled app error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-bg p-4 text-center">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-surface-border bg-surface-card p-8 shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rose-50">
          <Image
            src="/icons/error.svg"
            alt="Error icon"
            width={32}
            height={32}
          />
        </div>

        <div className="space-y-2">
          <Typography
            variant="price"
            className="text-5xl text-rose-600 md:text-6xl"
          >
            500
          </Typography>
          <Typography
            variant="h3"
            weight="bold"
          >
            Server Error
          </Typography>
          <Typography variant="muted">
            Something went wrong on our end. We are calculating the fixes and
            will restore balance shortly.
          </Typography>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            type="button"
            variant="primary"
            size="lg"
            shape="rounded"
            fullWidth
            onClick={reset}
          >
            Try Again
          </Button>

          <LinkAsButton
            href="/"
            variant="secondary"
            size="lg"
            shape="rounded"
            fullWidth
          >
            Go to Homepage
          </LinkAsButton>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
