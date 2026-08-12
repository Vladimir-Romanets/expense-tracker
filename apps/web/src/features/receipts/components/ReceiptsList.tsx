import { Pagination } from '@/ui'
import { ConfirmationModal } from './modals/ConfirmationModal'
import { ReceiptsTable } from './tables/ReceiptsTable'
import { ReceiptsListProvider } from '../context/ReceiptsListProvider'
import type { PaginatedResponse, SearchParams } from '@/types/pagination'
import type { ReceiptEntity } from '../types'

type Props = {
  searchParams: SearchParams
} & PaginatedResponse<ReceiptEntity>

export const ReceiptsList = ({ data, meta, searchParams }: Props) => {
  return (
    <>
      <ReceiptsListProvider>
        <ReceiptsTable receipts={data} />
        <ConfirmationModal />
      </ReceiptsListProvider>
      <Pagination
        meta={meta}
        searchParams={searchParams}
        className="mt-10 justify-center"
      />
    </>
  )
}
