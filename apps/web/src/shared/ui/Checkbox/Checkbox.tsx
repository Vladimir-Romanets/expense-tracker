import React from 'react'
import { cn } from '@/shared/lib/cn'
import { checkboxVariants } from './checkbox.variants'
import { Icon } from '../Icon/Icon'

type CheckboxProps = {
  label?: string
  error?: string
  wrapperClassName?: string
  ref?: React.Ref<HTMLInputElement>
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>

export const Checkbox = ({
  className,
  wrapperClassName,
  label,
  error,
  id,
  ref,
  ...props
}: CheckboxProps) => {
  const generatedId = id || props.name
  const errorId = generatedId ? `${generatedId}-error` : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      <div className="flex items-center gap-2">
        <div className="relative inline-flex size-5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            id={generatedId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(checkboxVariants({ isError: !!error }), className)}
            {...props}
          />
          <Icon
            name="check"
            className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100"
            size={16}
          />
        </div>
        {label && (
          <label
            htmlFor={generatedId}
            className="text-foreground cursor-pointer text-sm font-medium select-none"
          >
            {label}
          </label>
        )}
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

Checkbox.displayName = 'Checkbox'
