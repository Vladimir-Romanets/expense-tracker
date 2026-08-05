'use client'

const ReceiptsError = ({ error }: { error: Error }) => {
  return <p>Failed to load receipts: {error.message}</p>
}

export default ReceiptsError
