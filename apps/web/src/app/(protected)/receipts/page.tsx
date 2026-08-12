import type { Metadata } from 'next'
import { Typography } from '@/ui'
import { getReceipts } from '@/features/receipts/actions/getReceipts'
import { ReceiptsList } from '@/features/receipts'
import type { SearchParams } from '@/types/pagination'

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
