import { Typography } from '@/ui'

export default function ProtectedDashboardPage() {
  return (
    <div className="space-y-6">
      <Typography
        variant="h1"
        weight="bold"
        className="text-dark text-2xl"
      >
        Dashboard
      </Typography>

      {/* Main Content Area Card Slot */}
      <div className="rounded-2xl border border-surface-border bg-surface-card p-8 shadow-xs">
        <Typography variant="p">Protected area content placeholder</Typography>
      </div>
    </div>
  )
}
