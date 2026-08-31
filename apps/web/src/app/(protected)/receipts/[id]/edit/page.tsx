import type { Metadata } from 'next'
import { getStores } from '@/features/markets'
import { ReceiptForm, updateReceipt, getReceiptById } from '@/features/receipts'

export const metadata: Metadata = {
  title: 'Edit Receipt | Expense Tracker',
}
type Props = {
  params: Promise<{ id: string }>
}

const EditReceiptPage = async ({ params }: Props) => {
  const currentParams = await params
  const id = Number(currentParams.id)

  const [receipt, stores] = await Promise.all([
    getReceiptById(id),
    getStores({ page: 0, limit: 100 }), // TODO: replace with server-side search when store count grows
  ])

  const storesOptions =
    stores?.data.map((el) => ({ value: el.id, label: el.name })) || []

  return (
    <ReceiptForm
      stores={storesOptions}
      initValues={receipt}
      submitLabel="Save Changes"
      onSubmitAction={async (payload) => {
        'use server'
        return updateReceipt({
          ...payload,
          id,
          initialImageKey: receipt.imageKey,
        })
      }}
    />
  )
}

export default EditReceiptPage
