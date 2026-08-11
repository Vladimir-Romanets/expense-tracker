import React from 'react'
import { cn } from '@/utils/cn'
import { inputVariants } from '../Input/input.variants'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  wrapperClassName?: string
  ref?: React.Ref<HTMLTextAreaElement>
  resizeEnable?: boolean
}

export const Textarea = ({
  className,
  wrapperClassName,
  label,
  error,
  id,
  ref,
  resizeEnable = false,
  ...props
}: TextareaProps) => {
  const generatedId = id || props.name
  const errorId = generatedId ? `${generatedId}-error` : undefined

  return (
    <div className={cn('flex w-full flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label
          htmlFor={generatedId}
          className="text-foreground text-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          id={generatedId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            inputVariants({ isError: !!error }),
            'min-h-25',
            resizeEnable ? 'resize-y' : 'resize-none',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span
          id={errorId}
          className="text-xs text-red-500"
        >
          {error}
        </span>
      )}
    </div>
  )
}

Textarea.displayName = 'Textarea'
