import { Button, Icon, Table } from '@/ui'
import type { ReceiptEntity } from '../types'
import { receiptsFormatter } from '../utils/receiptListFormatter'

interface ReceiptsListProps {
  receipts: ReceiptEntity[]
}

export const ReceiptsList = ({ receipts }: ReceiptsListProps) => {
  const list = receiptsFormatter(receipts)

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>
            <div className="flex items-center gap-1">
              Date
              <Icon
                name="arrowDown"
                aria-hidden="true"
                size={16}
              />
            </div>
          </Table.Head>
          <Table.Head>Store Name</Table.Head>
          <Table.Head>Total Amount</Table.Head>
          <Table.Head>Receipt Scan</Table.Head>
          <Table.Head>Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list.map((receipt) => (
          <Table.Row key={receipt.id}>
            <Table.Cell>{receipt.purchaseDate}</Table.Cell>
            <Table.Cell>
              {receipt.store?.name || `Store #${receipt.storeId}`}
            </Table.Cell>
            <Table.Cell className="font-medium text-brand-600">
              ${receipt.totalAmount}
            </Table.Cell>
            <Table.Cell>
              {receipt.photoUrl && (
                <span className="flex size-10 items-center justify-center rounded border border-slate-300 bg-slate-50">
                  <Icon
                    name="receipt"
                    size={20}
                    className="text-slate-500"
                  />
                </span>
              )}
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-3 text-slate-500">
                <Button
                  variant="social"
                  size="icon"
                  aria-label="View receipt"
                >
                  <Icon
                    name="eye"
                    className="size-5"
                  />
                </Button>
                <Button
                  variant="social"
                  size="icon"
                  aria-label="Edit receipt"
                >
                  <Icon
                    name="edit"
                    className="size-5"
                  />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
