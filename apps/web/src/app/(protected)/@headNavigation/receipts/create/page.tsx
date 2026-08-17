import Link from 'next/link'

const HeadNavigationReceiptsCreate = () => {
  return (
    <Link
      href="/receipts"
      className="text-sm font-semibold text-primary transition-all hover:text-sky-700 focus-visible:text-sky-700"
    >
      ← Back to receipts
    </Link>
  )
}

export default HeadNavigationReceiptsCreate
