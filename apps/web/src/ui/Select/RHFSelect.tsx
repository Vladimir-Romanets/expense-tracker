'use client'

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { Select, type SelectProps } from './Select'

export interface RHFSelectProps<T extends FieldValues> extends Omit<
  SelectProps,
  'name'
> {
  name: Path<T>
  control: Control<T>
}

export const RHFSelect = <T extends FieldValues>({
  name,
  control,
  ...rest
}: RHFSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          {...rest}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}

RHFSelect.displayName = 'RHFSelect'
