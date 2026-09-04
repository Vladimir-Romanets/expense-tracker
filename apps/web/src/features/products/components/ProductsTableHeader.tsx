'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icon, Table } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'
import { useSyncSearchParams } from '@/shared/hooks/useSyncSearchParams'

type DefaultProps = {
  id: string
  value: 'asc' | 'desc'
}
type Props = {
  options: {
    id: string
    label: string
    enabled?: boolean
  }[]
  defaultValue: DefaultProps
}

export const ProductsTableHeader = ({ options, defaultValue }: Props) => {
  const searchParams = useSearchParams()
  const [sort, setSort] = useState<DefaultProps>({
    id: searchParams.get('sortBy') || defaultValue.id,
    value:
      (searchParams.get('sortOrder') as 'asc' | 'desc') || defaultValue.value,
  })

  const handleClick = (id: string) => {
    setSort((state) => ({
      id,
      value: state.id === id && state.value === 'asc' ? 'desc' : 'asc',
    }))
  }

  useSyncSearchParams(
    (params) => {
      params.set('sortOrder', sort.value)
      params.set('sortBy', sort.id)
    },
    [sort]
  )

  const sortIcon = (
    <Icon
      className={cn(
        'ms-1.5 inline-block',
        sort.value === 'desc' && 'rotate-180'
      )}
      name="arrow-down"
      size={16}
    />
  )

  return (
    <Table.Row>
      {options.map((el) => (
        <Table.Head
          key={el.id}
          className={cn('text-nowrap', el.enabled && 'cursor-pointer')}
          onClick={el.enabled ? () => handleClick(el.id) : undefined}
        >
          {el.label}
          {sort.id === el.id ? sortIcon : null}
        </Table.Head>
      ))}
    </Table.Row>
  )
}
