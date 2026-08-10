import { Button, LinkAsButton } from '@/ui'

export type PageItemProps = {
  page: number
  children: React.ReactNode
  isDisabled?: boolean
  isActive?: boolean
  createPageUrl: (page: number) => string
  'aria-label'?: string
}

export const PageItem = ({
  page,
  children,
  isDisabled,
  isActive,
  createPageUrl,
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
      href={createPageUrl(page)}
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
