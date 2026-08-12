import { Metadata } from 'next'
import { headers } from 'next/headers'

import { Typography, LinkAsButton, Icon } from '@/ui'
import GoBackButton from '@/features/navigation/components/GoBackButton'

export const metadata: Metadata = {
  title: 'Receipt Not Found | Expense Tracker',
}

const ReceiptNotFound = async () => {
  const headersList = await headers()

  const referer = headersList.get('referer')
  const currentHost = headersList.get('host')

  return (
    <div className="mx-auto flex max-w-3xs flex-col items-center justify-center gap-6 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
        <Icon
          name="alert"
          title="Receipt not found icon"
          size={32}
        />
      </div>

      <Typography variant="muted">
        The Receipt you are looking for does not exist or has been moved.
      </Typography>

      <LinkAsButton
        href="/receipts"
        variant="primary"
        size="lg"
        shape="rounded"
        fullWidth
      >
        Go to Receipts list
      </LinkAsButton>
    </div>
  )
}

export default ReceiptNotFound
