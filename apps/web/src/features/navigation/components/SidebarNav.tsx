'use client'

import { usePathname } from 'next/navigation'
import { SidebarNavItem } from './SidebarNavItem'
import { SIDEBAR_MENU_ITEMS } from '@/constants/menuItems'
import { isNavItemActive } from '@/utils/getActiveNavItem'

type Props = {
  className?: string
}

export const SidebarNav = ({ className }: Props) => {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Sidebar navigation"
      className={className}
    >
      <ul
        className="flex flex-col gap-3"
        role="list"
      >
        {SIDEBAR_MENU_ITEMS.map((item) => {
          const isActive = isNavItemActive(pathname, item.href)

          return (
            <li key={item.id}>
              <SidebarNavItem
                item={item}
                isActive={isActive}
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SidebarNav
