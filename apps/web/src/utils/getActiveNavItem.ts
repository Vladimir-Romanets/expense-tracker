import { NavigationItem } from '@/features/navigation'

export const isNavItemActive = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`)

export const getActiveNavItem = (
  items: NavigationItem[],
  pathname: string
): NavigationItem | undefined =>
  items.find((item) => isNavItemActive(pathname, item.href))
