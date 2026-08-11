'use client'

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { Textarea, type TextareaProps } from './Textarea'

export interface RHFTextareaProps<T extends FieldValues> extends Omit<
  TextareaProps,
  'name'
> {
  name: Path<T>
  control: Control<T>
}

export const RHFTextarea = <T extends FieldValues>({
  name,
  control,
  ...rest
}: RHFTextareaProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Textarea
          {...rest}
          {...field}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}

RHFTextarea.displayName = 'RHFTextarea'
