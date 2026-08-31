'use client'

import { startTransition, useState } from 'react'
import { useReceiptsContext } from '../../context/ReceiptsListProvider'
import { Button, Icon, Modal, Typography } from '@/shared/ui'
import { deleteReceipt } from '../../actions/deleteReceipt'

export const ConfirmationModal = () => {
  const [errMsg, setErrMsg] = useState('')
  const { isLoading, receiptId, setReceiptId, setIsLoading } =
    useReceiptsContext()

  const handleClose = () => {
    if (isLoading) return
    setReceiptId(null)
  }

  const handleConfirm = () => {
    if (!receiptId) return

    setIsLoading(true)

    startTransition(async () => {
      const { success, message } = await deleteReceipt(receiptId)
      if (success) setReceiptId(null)
      else setErrMsg(message || '')
      setIsLoading(false)
    })
  }

  return receiptId ? (
    <Modal
      isOpen
      title="Confirm delete"
      onClose={handleClose}
      className={isLoading ? 'pointer-events-none relative' : ''}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex bg-neutral-50/80">
          <Icon
            name="loading"
            size={40}
            className="m-auto animate-spin text-brand-800"
          />
        </div>
      ) : null}
      <div className="mx-auto mb-6 flex size-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
        <Icon
          name="alert"
          title="Receipt deleting alert"
          size={24}
        />
      </div>
      <Typography
        weight="semibold"
        className="mb-8 text-center"
      >
        This action cannot be undone!
      </Typography>
      {errMsg && (
        <Typography className="mb-4 text-center text-sm text-rose-600">
          {errMsg}
        </Typography>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleConfirm}
        >
          Proceed
        </Button>
      </div>
    </Modal>
  ) : null
}
