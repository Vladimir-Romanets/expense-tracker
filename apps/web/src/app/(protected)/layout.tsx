import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@/ui'
import {
  HeaderLogoutButton,
  SidebarToggle,
  SidebarNav,
} from '@/features/navigation'
import { PageTitle } from '@/features/pageTitle'

const ProtectedLayout = ({
  children,
  headNavigation,
}: Readonly<{
  children: ReactNode
  headNavigation: ReactNode
}>) => {
  const year = new Date().getFullYear()

  return (
    <div className="flex h-screen overflow-hidden bg-main-bg">
      <SidebarToggle />

      <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 -translate-x-full flex-col bg-sidebar-bg p-6 text-white shadow-xl transition-transform duration-300 ease-in-out peer-checked:translate-x-0 lg:static lg:z-auto lg:translate-x-0">
        <Link
          href="/"
          className="flex h-12 w-max items-center justify-start gap-2 pb-4"
          aria-label="Expense Tracker — Home"
        >
          <Image
            src="/logo.webp"
            width={32}
            height={24}
            alt="Expense Tracker"
          />
          <b className="text-sm leading-4 max-md:hidden">Expense Tracker</b>
        </Link>

        <SidebarNav className="flex flex-1 flex-col justify-start py-6" />

        <Typography
          as="p"
          className="pt-4 md:text-sm"
        >
          {`© ${year} Expense Tracker. All rights reserved.`}
        </Typography>
      </aside>

      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header Area */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-8 shadow-xs">
          {/* Left Action Area Slot */}
          <div className="flex items-center gap-4">{headNavigation}</div>

          <div className="flex items-center gap-4">
            <HeaderLogoutButton />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-main-bg p-6 lg:p-8">
          <PageTitle />
          <div className="rounded-2xl border border-surface-border bg-surface-card p-6 shadow-xs">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProtectedLayout
