import type { ReactNode } from 'react'
// import SidebarNav from '@/features/navigation/components/SidebarNav'
import Typography from '@/ui/Typography/Typography'

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const year = new Date().getFullYear()

  return (
    <div className="flex h-screen overflow-hidden bg-main-bg">
      <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar-bg p-6 text-white shadow-xl">
        <div className="flex h-12 items-center justify-start pb-4">
          Expense tracker
        </div>

        {/* Menu Navigation Area Slot */}
        <div className="flex flex-1 flex-col justify-start py-6">
          {/* <SidebarNav /> */}
        </div>

        <Typography
          as="p"
          className="pt-4 md:text-sm"
        >
          {`© ${year} Expense Tracker. All rights reserved.`}
        </Typography>
      </aside>

      {/* Main Content Column */}
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header Area */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-8 shadow-xs">
          {/* Left Action Area Slot */}
          <div className="flex items-center gap-4">
            {/* Header left slot */}
          </div>

          {/* Right User Controls & Notifications Area Slot */}
          <div className="flex items-center gap-4">
            {/* Header right slot */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-main-bg p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default ProtectedLayout
