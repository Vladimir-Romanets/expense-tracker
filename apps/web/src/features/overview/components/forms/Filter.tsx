'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFInput, Typography } from '@/ui'
import { dateRangeSchema, type DateRangeFilterValues } from '../../schemas'
import { useFilterContext } from '../../context/FilterContext'

export const Filter = () => {
  const { filter, setFilter } = useFilterContext()

  const { control, handleSubmit, watch } = useForm<DateRangeFilterValues>({
    resolver: zodResolver(dateRangeSchema),
    defaultValues: filter,
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library -- RHF's watch() subscription is intentionally unmemoized here
    const subscription = watch((_, { type }) => {
      if (type === 'change') {
        handleSubmit(setFilter)()
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, handleSubmit, setFilter])

  return (
    <div className="mb-10 flex gap-3 max-md:flex-col md:items-start">
      <Typography
        as="span"
        weight="semibold"
        className="md:mt-8"
      >
        Select date range
      </Typography>
      <div className="grid grow grid-cols-1 gap-4 sm:grid-cols-2">
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
          max={filter.endDate}
        />
      </div>
    </div>
  )
}
