import { Metadata } from 'next'
import { Dashboard } from '@/widgets/dashboard'

export const metadata: Metadata = {
  title: 'Overview | Expense Tracker',
  description: 'View statistics',
}

const ProtectedDashboardPage = () => {
  return <Dashboard />
}

export default ProtectedDashboardPage
