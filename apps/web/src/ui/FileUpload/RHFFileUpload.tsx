'use client'

import React, { useCallback, useState, useMemo } from 'react'
import { useController, UseControllerProps, FieldValues } from 'react-hook-form'
import { Icon, Button } from '@/ui'
import { cn } from '@/utils/cn'

interface RHFFileUploadProps<
  T extends FieldValues,
> extends UseControllerProps<T> {
  label?: string
  accept?: string
  className?: string
}

export function RHFFileUpload<T extends FieldValues>({
  name,
  control,
  label = 'Upload or drag and-drop scan/photo',
  accept = '*',
  className,
  ...props
}: RHFFileUploadProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    ...props,
  })

  const [isDragActive, setIsDragActive] = useState(false)

  const previewUrl = useMemo(() => {
    if (
      (value as any) instanceof File &&
      (value as File).type.startsWith('image/')
    ) {
      return URL.createObjectURL(value as File)
    }
    return null
  }, [value])

  const handleDrag = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)
      const file = e.dataTransfer.files?.[0]

      if (file) onChange(file)
    },
    [onChange]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const file = e.target.files?.[0]

      if (file) onChange(file)
    },
    [onChange]
  )

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onChange(undefined)
    },
    [onChange]
  )

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors',
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : {
                'border-red-500 bg-red-50': error,
                'border-gray-300 bg-gray-50 hover:bg-gray-100': !error,
              },
          className
        )}
      >
        {value ? (
          <div className="relative flex size-full flex-col items-center justify-center">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-full max-w-full rounded-lg object-contain"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Icon
                  name="receipt"
                  className="mb-4 text-gray-400"
                  size={48}
                />
                <span className="text-sm font-medium text-gray-700">
                  {(value as File).name}
                </span>
              </div>
            )}
            <Button
              type="button"
              onClick={handleRemove}
              variant="destructive"
              size="icon"
              shape="pill"
              className="absolute top-2 right-2"
            >
              <Icon
                name="trash"
                size={20}
              />
            </Button>
          </div>
        ) : (
          <>
            <Icon
              name="upload"
              className={cn(
                'mb-4',
                isDragActive ? 'text-blue-500' : 'text-gray-400'
              )}
              size={40}
            />
            <span
              className={cn(
                'text-sm',
                isDragActive ? 'text-blue-600' : 'text-gray-500'
              )}
            >
              {label}
            </span>
            <input
              id={name}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept={accept}
            />
          </>
        )}
      </label>
      {error && (
        <span className="mt-2 text-sm text-red-500">{error.message}</span>
      )}
    </div>
  )
}
