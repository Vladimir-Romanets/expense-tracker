import { CreateReceiptForm } from '@/features/receipts'
import { getStores } from '@/features/markets/action/getStores'

export default async function CreateReceiptPage() {
  // TODO: replace with server-side search when store count grows
  const { data } = await getStores({ page: 0, limit: 100 })

  const stores = data.map((el) => ({ value: el.id, label: el.name }))

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-8 shadow-xs">
      <CreateReceiptForm stores={stores} />
    </div>
  )
}
