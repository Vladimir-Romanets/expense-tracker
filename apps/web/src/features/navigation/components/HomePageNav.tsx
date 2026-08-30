import { Icon, LinkAsButton } from '@/ui'
import { checkAuthenticated } from '@/lib/auth.server'

export const HomePageNavPlaceholder = () => (
  <span className="flex h-10 w-20 animate-pulse rounded-xl border border-surface-border px-1.5 py-1">
    <i className="grow rounded-xl bg-gray-200 "></i>
  </span>
)

export const HomePageNav = async () => {
  const isAuthenticated = await checkAuthenticated()

  return isAuthenticated ? (
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
    <>
      <LinkAsButton
        href="/login"
        variant="outline"
      >
        Login
      </LinkAsButton>
      <LinkAsButton
        href="/register"
        variant="primary"
      >
        Register
      </LinkAsButton>
    </>
  )
}
