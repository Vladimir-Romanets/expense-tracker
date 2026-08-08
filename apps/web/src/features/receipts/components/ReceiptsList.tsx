import { ConfirmationModal } from './modals/ConfirmationModal'
import { ReceiptsListProvider } from '../context/ReceiptsListProvider'
import { ReceiptsTable, type Props } from './tables/ReceiptsTable'

export const ReceiptsList = (props: Props) => {
  return (
    <ReceiptsListProvider>
      <ReceiptsTable {...props} />
      <ConfirmationModal />
    </ReceiptsListProvider>
  )
}
