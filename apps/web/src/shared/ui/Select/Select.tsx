import React from 'react'
import { cn } from '@/shared/lib/cn'
import { inputVariants } from '../Input/input.variants'
import { Icon } from '../Icon/Icon'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  label?: string
  error?: string
  wrapperClassName?: string
  options: SelectOption[]
  placeholder?: string
  ref?: React.Ref<HTMLSelectElement>
}

export const Select = ({
  className,
  wrapperClassName,
  label,
  error,
  id,
  options,
  placeholder = 'Select an option...',
  name,
  ref,
  ...props
}: SelectProps) => {
  const generatedId = id || name
  const errorId = generatedId ? `${generatedId}-error` : undefined

  return (
    <div
      className={cn('relative flex w-full flex-col gap-1.5', wrapperClassName)}
    >
      {label && (
        <label
          htmlFor={generatedId}
          className="text-foreground text-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={generatedId}
          ref={ref}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            inputVariants({ isError: !!error }),
            { 'text-gray-500': props.value === undefined },
            'appearance-none',
            className
          )}
          {...props}
          value={props.value === undefined ? '' : props.value}
        >
          {placeholder && (
            <option
              value=""
              disabled
            >
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <Icon name="chevron-down" />
        </div>
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
