'use client'

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import { type InputProps } from './Input'
import { PasswordInput } from './PasswordInput'

interface RHFPasswordInputProps<T extends FieldValues> extends Omit<
  InputProps,
  'name'
> {
  name: Path<T>
  control: Control<T>
}

export const RHFPasswordInput = <T extends FieldValues>({
  name,
  control,
  ...rest
}: RHFPasswordInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <PasswordInput
          {...rest}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}
