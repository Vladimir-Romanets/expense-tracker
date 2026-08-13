import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getStores } from '@/features/markets/action/getStores'
import { getReceiptById } from '@/features/receipts/actions/getReceiptById'
import { ReceiptForm } from '@/features/receipts'
import { updateReceiptAction } from '@/features/receipts/actions/updateReceipt'
import type { ReceiptFormValues } from '@/features/receipts/schemas'

export const metadata: Metadata = {
  title: 'Edit Receipt | Expense Tracker',
}
type Props = {
  params: Promise<{ id: string }>
}

const EditReceiptPage = async ({ params }: Props) => {
  const currentParams = await params
  const id = Number(currentParams.id)

  const [receipt, stores] =
    id > 0
      ? await Promise.all([
          getReceiptById(id),
          getStores({ page: 0, limit: 100 }), // TODO: replace with server-side search when store count grows
        ])
      : [null, null]

  if (!receipt) {
    notFound()
  }
  const storesOptions =
    stores?.data.map((el) => ({ value: el.id, label: el.name })) || []

  const initValues: ReceiptFormValues = {
    storeId: Number(receipt.storeId),
    purchaseDate: new Date(receipt.purchaseDate).toISOString().slice(0, 16),
    totalAmount: Number(receipt.totalAmount),
    items: receipt.items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity ? Number(item.quantity) : undefined,
      unitPrice: item.unitPrice ? Number(item.unitPrice) : undefined,
      totalPrice: Number(item.totalPrice),
    })),
    receiptFile: receipt.receiptUrl || null,
  }

  return (
    <ReceiptForm
      stores={storesOptions}
      initValues={initValues}
      submitLabel="Save Changes"
      onSubmitAction={async (payload) => {
        'use server'
        return updateReceiptAction({
          ...payload,
          id,
          initialImageKey: receipt.imageKey,
        })
      }}
    />
  )
}

export default EditReceiptPage
