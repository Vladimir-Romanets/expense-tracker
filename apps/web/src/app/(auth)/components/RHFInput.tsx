'use client'

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import { Input, type InputProps } from './Input'

interface RHFInputProps<T extends FieldValues> extends Omit<
  InputProps,
  'name'
> {
  name: Path<T>
  control: Control<T>
}

export const RHFInput = <T extends FieldValues>({
  name,
  control,
  ...rest
}: RHFInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...rest}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}
