'use client'
import { createContext } from 'react'
import type { DropdownOptions } from '@/shared/types/dropdown'

export const CategoryOptionsContext = createContext<
  DropdownOptions | undefined
>(undefined)

type Props = {
  options: DropdownOptions
} & React.PropsWithChildren

export const CategoryOptionsProvider = ({ options, children }: Props) => (
  <CategoryOptionsContext value={options}>{children}</CategoryOptionsContext>
)
