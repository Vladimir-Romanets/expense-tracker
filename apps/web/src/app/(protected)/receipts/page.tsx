import type { Metadata } from 'next'
import { Typography } from '@/ui'
import { getReceipts } from '@/features/receipts/actions/getReceipts'
import { ReceiptsList } from '@/features/receipts/components'

export const metadata: Metadata = {
  title: 'Receipts',
  description: 'Read, create, update or remove receipts',
}

export default async function ReceiptsPage() {
  const { data: receipts } = await getReceipts()

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xs">
      {receipts?.length ? (
        <ReceiptsList receipts={receipts} />
      ) : (
        <Typography variant="p">No receipts found.</Typography>
      )}
    </div>
  )
}
