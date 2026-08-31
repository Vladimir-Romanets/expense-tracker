import { Button, LinkAsButton } from '@/shared/ui'

export type PageItemProps = {
  children: React.ReactNode
  isDisabled?: boolean
  isActive?: boolean
  href: string
  'aria-label'?: string
}

export const PageItem = ({
  children,
  isDisabled,
  isActive,
  href,
  ...rest
}: PageItemProps) => {
  const variant = isActive ? 'primary' : 'outline'

  return isDisabled ? (
    <Button
      variant={variant}
      size="icon"
      shape="square"
      disabled
      aria-current={isActive ? 'page' : undefined}
      aria-label={rest['aria-label']}
    >
      {children}
    </Button>
  ) : (
    <LinkAsButton
      href={href}
      variant={variant}
      size="icon"
      shape="square"
      aria-current={isActive ? 'page' : undefined}
      aria-label={rest['aria-label']}
    >
      {children}
    </LinkAsButton>
  )
}
