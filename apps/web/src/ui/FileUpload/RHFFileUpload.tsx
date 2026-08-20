'use client'

import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { useController, UseControllerProps, FieldValues } from 'react-hook-form'
import { Icon, Button } from '@/ui'
import { cn } from '@/utils/cn'

const stopEvent = (e: React.MouseEvent | React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault()
  e.stopPropagation()
}

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
  disabled = false,
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
    const file = value as unknown

    if (file instanceof File && file.type.startsWith('image/')) {
      return URL.createObjectURL(file)
    }

    return typeof file === 'string' ? file : undefined
  }, [value])

  const handleDrag = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      stopEvent(e)
      if (disabled) return

      if (e.type === 'dragenter' || e.type === 'dragover') {
        setIsDragActive(true)
      } else if (e.type === 'dragleave') {
        setIsDragActive(false)
      }
    },
    [disabled]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      stopEvent(e)
      setIsDragActive(false)
      if (disabled) return

      const file = e.dataTransfer.files?.[0]

      if (accept !== '*' && file) {
        const accepted = accept.split(',').map((s) => s.trim())
        const isAllowed = accepted.some((a) =>
          a.endsWith('/*')
            ? file.type.startsWith(a.slice(0, -1))
            : file.type === a
        )
        if (!isAllowed) return
      }

      if (file) onChange(file)
    },
    [onChange, accept, disabled]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    const file = e.target.files?.[0]
    if (file) onChange(file)
  }

  const handleRemove = (e: React.MouseEvent) => {
    stopEvent(e)
    if (disabled) return
    onChange(undefined)
  }

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        aria-disabled={disabled}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors',
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : {
                'border-red-500 bg-red-50': error,
                'border-gray-300 bg-gray-50 hover:bg-gray-100': !error,
              },
          disabled && 'cursor-not-allowed opacity-60 hover:bg-gray-50',
          className
        )}
      >
        {value ? (
          <div className="relative flex size-full flex-col items-center justify-center">
            {previewUrl ? (
              // next/image doesn't support blob: URLs — plain <img> is intentional here
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={label}
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
                  {(value as unknown) instanceof File
                    ? value.name
                    : 'Existing file'}
                </span>
              </div>
            )}
            <Button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
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
          </>
        )}
        <input
          id={name}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={accept}
          disabled={disabled || !!value}
        />
      </label>
      {error && (
        <span className="mt-1 text-sm text-red-500">{error.message}</span>
      )}
    </div>
  )
}
