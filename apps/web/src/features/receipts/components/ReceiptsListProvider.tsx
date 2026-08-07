'use client'

import { createContext, useContext, useState, ReactNode, useMemo } from 'react'

type ConfirmContextType = {
  receiptId: number | null
  isLoading: boolean
  setReceiptId: (id: number | null) => void
  setIsLoading: (status: boolean) => void
}

const ReceiptsListContext = createContext<ConfirmContextType>({
  isLoading: false,
  receiptId: null,
  setReceiptId: () => undefined,
  setIsLoading: () => undefined,
})

export const ReceiptsListProvider = ({ children }: { children: ReactNode }) => {
  const [receiptId, setReceiptId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const store = useMemo(
    () => ({
      isLoading,
      receiptId,
      setReceiptId,
      setIsLoading,
    }),
    [isLoading, receiptId]
  )

  return <ReceiptsListContext value={store}>{children}</ReceiptsListContext>
}

export const useReceiptsContext = () => useContext(ReceiptsListContext)
