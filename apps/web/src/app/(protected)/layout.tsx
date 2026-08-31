import type { ReactNode } from 'react'
import { AppShell } from '@/widgets/appShell'

const ProtectedLayout = ({
  children,
  headNavigation,
}: Readonly<{
  children: ReactNode
  headNavigation: ReactNode
}>) => <AppShell headNavigation={headNavigation}>{children}</AppShell>

export default ProtectedLayout
