'use client'
import { Button, Icon } from '@/ui'
import { useReceiptsContext } from '../../context/ReceiptsListProvider'

export const ButtonReceiptDelete = ({ id }: { id: number }) => {
  const { setReceiptId } = useReceiptsContext()

  const handleClick = () => setReceiptId(id)

  return (
    <Button
      variant="social"
      size="icon"
      aria-label="Delete receipt"
      onClick={handleClick}
    >
      <Icon
        name="trash"
        className="size-5"
      />
    </Button>
  )
}
