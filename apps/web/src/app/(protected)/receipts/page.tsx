import Typography from '@/ui/Typography/Typography'

export default function ReceiptsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography
          variant="h1"
          weight="bold"
          className="text-dark text-2xl"
        >
          Receipts
        </Typography>
      </div>

      <div className="rounded-2xl border border-surface-border bg-surface-card p-8 shadow-xs">
        <Typography
          variant="p"
          className="text-slate-600"
        >
          Receipts content placeholder
        </Typography>
      </div>
    </div>
  )
}
