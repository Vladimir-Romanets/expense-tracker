import type { NavigationItem } from '@/features/navigation/types'

export const SIDEBAR_MENU_ITEMS: NavigationItem[] = [
  { id: 'overview', label: 'Overview', href: '/overview' },
  { id: 'receipt', label: 'Receipts', href: '/receipts' },
  { id: 'cart', label: 'Products', href: '/products' },
  { id: 'categories-grid', label: 'Categories', href: '/categories' },
  { id: 'profile', label: 'Profile', href: '/profile' },
]
