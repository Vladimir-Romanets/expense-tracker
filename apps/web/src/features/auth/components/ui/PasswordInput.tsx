'use client'

import { useState } from 'react'
import { cn } from '@/shared/lib/cn'
import { Input, type InputProps } from './Input'
import { Icon } from '@/shared/ui'

export const PasswordInput = ({ className, ...props }: InputProps) => {
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
        <Icon
          name={showPassword ? 'eyeClose' : 'eye'}
          size={20}
        />
      </button>
    </div>
  )
}
