'use client'

import { useRouter } from 'next/navigation'
import Button from '@/ui/Button/Button'
import { Icon } from '@/ui/Icon/Icon'
import { useUserStore } from '@/stores/user'
import { logoutAction } from '@/features/auth/actions/logout'

export const HeaderLogoutButton = () => {
  const clearUser = useUserStore((state) => state.clearUser)
  const router = useRouter()

  const handleLogout = async () => {
    clearUser()
    await logoutAction()
    router.push('/login')
  }

  return (
    <Button
      onClick={handleLogout}
      variant="social"
      shape="pill"
      size="icon"
      className="size-10 shrink-0"
      aria-label="Logout"
    >
      <Icon
        name="logout"
        size={20}
      />
    </Button>
  )
}
