import { Metadata } from 'next'
import { CreateReceiptForm } from '@/features/receipts'
import { getStores } from '@/features/markets/action/getStores'

export const metadata: Metadata = {
  title: 'Create Receipt | Expense Tracker',
}

const CreateReceiptPage = async () => {
  // TODO: replace with server-side search when store count grows
  const { data } = await getStores({ page: 0, limit: 100 })

  const stores = data.map((el) => ({ value: el.id, label: el.name }))

  return <CreateReceiptForm stores={stores} />
}

export default CreateReceiptPage
