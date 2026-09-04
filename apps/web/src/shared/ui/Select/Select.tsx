'use client'

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
  onClear?: () => void
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
  onClear,
  disabled,
  ref,
  ...props
}: SelectProps) => {
  const generatedId = id || name
  const errorId = generatedId ? `${generatedId}-error` : undefined
  const hasValue = props.value !== undefined
  const showClearButton = !!onClear && hasValue && !disabled

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClear?.()
  }

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
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            inputVariants({ isError: !!error }),
            { 'text-gray-500': !hasValue },
            'appearance-none pe-8',
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
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 px-2 text-gray-500">
          {showClearButton ? (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear selection"
              className="cursor-pointer rounded-full text-gray-500 hover:text-gray-700 focus-visible:ring-3 focus-visible:ring-green-600/20 focus-visible:outline-none"
            >
              <Icon name="close" />
            </button>
          ) : (
            <div className="pointer-events-none flex items-center">
              <Icon name="chevron-down" />
            </div>
          )}
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
