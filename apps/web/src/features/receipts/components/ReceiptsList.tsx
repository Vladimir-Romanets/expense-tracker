import { ConfirmationModal } from './ConfirmationModal'
import { ReceiptsListProvider } from './ReceiptsListProvider'
import { ReceiptsTable, type Props } from './ReceiptsTable'

export const ReceiptsList = (props: Props) => {
  return (
    <ReceiptsListProvider>
      <ReceiptsTable {...props} />
      <ConfirmationModal />
    </ReceiptsListProvider>
  )
}
