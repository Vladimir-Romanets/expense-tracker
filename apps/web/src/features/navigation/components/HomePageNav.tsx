'use client'
import type { PropsWithChildren } from 'react'
import { useUserStore } from '@/stores/user'
import { Icon, LinkAsButton } from '@/ui'
import { useShallow } from 'zustand/shallow'

export const HomePageNav = ({ children }: PropsWithChildren) => {
  const user = useUserStore((state) => state.user)
  const hasHydrated = useUserStore((state) => state.hasHydrated)

  if (!hasHydrated)
    return (
      <span className="flex h-10 w-20 animate-pulse rounded-xl border border-surface-border px-1.5 py-1">
        <i className="grow rounded-xl bg-gray-200 "></i>
      </span>
    )

  return user ? (
    <LinkAsButton
      variant="social"
      shape="pill"
      size="icon"
      className="shrink-0"
      aria-label="Enter"
      href="/overview"
    >
      <Icon
        name="enter"
        size={20}
      />
    </LinkAsButton>
  ) : (
    <div className="flex gap-2">{children}</div>
  )
}
