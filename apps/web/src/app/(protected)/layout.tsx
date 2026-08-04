import type { ReactNode } from 'react'
import SidebarNav from '@/features/navigation/components/SidebarNav'
import { HeaderLogoutButton } from '@/features/navigation/components/HeaderLogoutButton'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@/ui'
import { PageTitle } from '@/features/pageTitle'

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const year = new Date().getFullYear()

  return (
    <div className="flex h-screen overflow-hidden bg-main-bg">
      <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar-bg p-6 text-white shadow-xl">
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
          <div className="flex items-center gap-4">
            {/* Header left slot */}
          </div>

          <div className="flex items-center gap-4">
            <HeaderLogoutButton />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-main-bg p-6 lg:p-8">
          <PageTitle />
          {children}
        </main>
      </div>
    </div>
  )
}

export default ProtectedLayout
