import type { Metadata } from 'next'
import { Typography } from '@/shared/ui'
import { getReceipts } from '@/features/receipts'
import { ReceiptsList } from '@/widgets/receiptsList'
import type { SearchParams } from '@/shared/types/pagination'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Receipts',
  description: 'Read, create, update or remove receipts',
}

export default async function ReceiptsPage({ searchParams }: Props) {
  const currentParams = await searchParams
  const page = Number(currentParams.page) || 1
  const limit = Number(currentParams.limit) || undefined

  const response = await getReceipts({ page, limit })

  return (
    <>
      {response?.data?.length ? (
        <ReceiptsList
          {...response}
          searchParams={currentParams}
        />
      ) : (
        <Typography variant="p">No receipts found.</Typography>
      )}
    </>
  )
}
