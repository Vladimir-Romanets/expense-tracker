import { Button, LinkAsButton } from '@/ui'

export type PageItemProps = {
  page: number
  children: React.ReactNode
  isDisabled?: boolean
  isActive?: boolean
  createPageUrl?: (page: number) => string
  onPageChange?: (page: number) => void
  'aria-label'?: string
}

export const PageItem = ({
  page,
  children,
  isDisabled,
  isActive,
  createPageUrl,
  onPageChange,
  ...rest
}: PageItemProps) => {
  const variant = isActive ? 'primary' : 'outline'

  if (createPageUrl && !isDisabled) {
    return (
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

  return (
    <Button
      variant={variant}
      size="icon"
      shape="square"
      disabled={isDisabled}
      onClick={() => !isDisabled && onPageChange?.(page)}
      aria-current={isActive ? 'page' : undefined}
      aria-label={rest['aria-label']}
    >
      {children}
    </Button>
  )
}
