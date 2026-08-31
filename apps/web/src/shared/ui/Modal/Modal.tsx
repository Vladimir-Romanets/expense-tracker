'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Icon, Button, Typography } from '../'
import { cn } from '@/shared/lib/cn'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        dialog.close()
        document.body.style.overflow = prev
      }
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose()
    }
  }

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className={cn(
        'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
        'm-auto rounded-xl bg-surface-card p-0 shadow-2xl',
        'w-full max-w-lg outline-none',
        className
      )}
    >
      <div className="flex max-h-[85vh] flex-col">
        <div
          className={cn(
            'flex items-center p-4',
            title
              ? 'justify-between border-b border-surface-border'
              : 'justify-end'
          )}
        >
          {title && (
            <Typography
              variant="h4"
              className="text-foreground"
              id={titleId}
            >
              {title}
            </Typography>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="close" />
          </Button>
        </div>

        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </dialog>
  )
}
