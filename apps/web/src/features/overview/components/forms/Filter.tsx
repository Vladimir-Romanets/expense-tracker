'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFInput, Typography } from '@/ui'
import { dateRangeSchema, type DateRangeFilterValues } from '../../schemas'

interface FilterProps {
  initValues: DateRangeFilterValues
  isLoading: boolean
  action: (values: DateRangeFilterValues) => void
}

export const Filter = ({ initValues, isLoading, action }: FilterProps) => {
  const { control, handleSubmit, watch } = useForm<DateRangeFilterValues>({
    resolver: zodResolver(dateRangeSchema),
    defaultValues: initValues,
  })

  useEffect(() => {
    const subscription = watch((_, { type }) => {
      if (type === 'change') {
        handleSubmit(action)()
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, handleSubmit, action])

  return (
    <div className="mb-10 flex gap-3 max-md:flex-col md:items-start">
      <Typography
        as="span"
        weight="semibold"
        className="md:mt-8"
      >
        Select date range
      </Typography>
      <fieldset
        className="grid grow grid-cols-1 gap-4 sm:grid-cols-2"
        disabled={isLoading}
      >
        <RHFInput
          control={control}
          name="startDate"
          label="Start date"
          type="date"
          required
        />
        <RHFInput
          control={control}
          name="endDate"
          label="End date"
          type="date"
          required
        />
      </fieldset>
    </div>
  )
}
