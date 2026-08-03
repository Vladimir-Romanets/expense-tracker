import { cn } from '@/utils/cn'
import type { NavigationItem } from '../types'
import { LinkAsButton, Typography, Icon } from '@/ui'

interface SidebarNavItemProps {
  item: NavigationItem
  isActive: boolean
}

export const SidebarNavItem = ({ item, isActive }: SidebarNavItemProps) => {
  return (
    <LinkAsButton
      href={item.href}
      variant={isActive ? 'primary' : 'ghost'}
      fullWidth
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group min-h-11 justify-start gap-3 px-4 py-3 text-sm font-medium transition-all duration-150',
        isActive
          ? 'bg-brand-800 text-white shadow-xs'
          : 'text-slate-300 hover:bg-white/10 hover:text-white'
      )}
    >
      <Icon
        name={item.id}
        title={item.label}
      />
      <Typography
        as="span"
        className="truncate font-medium text-inherit"
      >
        {item.label}
      </Typography>
    </LinkAsButton>
  )
}
