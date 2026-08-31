import { Pagination } from '@/shared/ui'
import {
  ConfirmationModal,
  ReceiptsListProvider,
  type ReceiptEntity,
} from '@/features/receipts'
import { ReceiptsTable } from './ReceiptsTable'
import type { PaginatedResponse, SearchParams } from '@/shared/types/pagination'

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
