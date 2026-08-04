'use client'

import { usePathname } from 'next/navigation'
import { SIDEBAR_MENU_ITEMS } from '@/constants/menuItems'
import { Typography } from '@/ui'
import { getActiveNavItem } from '@/utils/getActiveNavItem'

export const PageTitle = () => {
  const pathname = usePathname()

  const currentItem = getActiveNavItem(SIDEBAR_MENU_ITEMS, pathname)

  if (!currentItem?.label) return null

  return (
    <Typography
      as="h1"
      variant="h3"
      weight="bold"
      className="text-dark mb-6"
    >
      {currentItem.label}
    </Typography>
  )
}
