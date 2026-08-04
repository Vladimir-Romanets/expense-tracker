'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/ui'

type Props = {
  referer: string | null
  currentHost: string | null
}
const GoBackButton = ({ referer, currentHost }: Props) => {
  const router = useRouter()

  const handleGoBack = async () => {
    if (referer && currentHost) {
      try {
        const refererUrl = new URL(referer)

        if (refererUrl.host === currentHost) {
          return router.push(refererUrl.pathname + refererUrl.search)
        }
      } catch (error) {
        console.error('Failed to parse referer URL:', error)
      }
    }
    router.push('/')
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      shape="rounded"
      fullWidth
      onClick={handleGoBack}
    >
      Go Back
    </Button>
  )
}

export default GoBackButton
