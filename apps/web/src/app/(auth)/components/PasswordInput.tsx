'use client'

import { useState } from 'react'
import { cn } from '@/utils/cn'
import { Input, type InputProps } from './Input'

export default function PasswordInput({ className, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <Input
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <button
        type="button"
        className="absolute top-[40%] right-4 flex -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent p-1 text-gray-400 transition-colors duration-150 hover:text-emerald-500"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        onClick={() => setShowPassword((v) => !v)}
      >
        {showPassword ? (
          /* eye-off icon */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line
              x1="1"
              y1="1"
              x2="23"
              y2="23"
            />
          </svg>
        ) : (
          /* eye icon */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle
              cx="12"
              cy="12"
              r="3"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
