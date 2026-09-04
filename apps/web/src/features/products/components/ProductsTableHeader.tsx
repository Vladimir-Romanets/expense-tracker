'use client'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Icon, Table } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'

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
  const isMounted = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [sort, setSort] = useState<DefaultProps>({
    id: searchParams.get('sortBy') || defaultValue.id,
    value:
      (searchParams.get('sortOrder') as 'asc' | 'desc') || defaultValue.value,
  })

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

  const handleClick = (id: string) => {
    setSort((state) => ({
      id,
      value: state.id === id && state.value === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleUpdate = useEffectEvent((sortOption: DefaultProps) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('sortOrder', sortOption.value)
    params.set('sortBy', sortOption.id)

    router.replace(`${pathname}?${params.toString()}`)
  })

  useEffect(() => {
    if (isMounted.current) {
      handleUpdate(sort)
    }
  }, [sort])

  useEffect(() => {
    isMounted.current = true
  }, [])

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
