import React from 'react'
import { cn } from '@/utils/cn'
import { inputVariants } from './input.variants'

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  label?: string
  error?: string
  hideNativeControl?: boolean
  wrapperClassName?: string
  ref?: React.Ref<HTMLInputElement>
}

export const Input = ({
  className,
  wrapperClassName,
  label,
  error,
  hideNativeControl,
  id,
  ref,
  ...props
}: InputProps) => {
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
        <input
          id={generatedId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            inputVariants({ isError: !!error, hideNativeControl }),
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

Input.displayName = 'Input'
