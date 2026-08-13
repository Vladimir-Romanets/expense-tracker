import { Icon, LinkAsButton, Table } from '@/ui'
import { receiptsFormatter } from '../../utils/receiptListFormatter'
import { ButtonReceiptDelete } from '../ui/ButtonReceiptDelete'
import type { ReceiptEntity } from '../../types'

interface Props {
  receipts: ReceiptEntity[]
}

export const ReceiptsTable = ({ receipts }: Props) => {
  const list = receiptsFormatter(receipts)

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>
            <div className="flex items-center gap-1">
              Date
              <Icon
                name="arrow-down"
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
              {receipt.imageKey && (
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
                <LinkAsButton
                  href={`/receipts/${receipt.id}/edit`}
                  variant="social"
                  size="icon"
                  aria-label="Edit receipt"
                  className="hover:text-brand-600"
                >
                  <Icon
                    name="edit"
                    className="size-5"
                  />
                </LinkAsButton>
                <ButtonReceiptDelete id={receipt.id} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
