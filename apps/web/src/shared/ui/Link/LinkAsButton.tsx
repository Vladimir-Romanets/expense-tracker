import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'

import { buttonVariants, ButtonProps } from '../Button'
import { cn } from '@/shared/lib/cn'

type LinkAsButtonProps = ComponentPropsWithoutRef<typeof Link> &
  Pick<ButtonProps, 'variant' | 'shape' | 'size' | 'fullWidth'>

export const LinkAsButton = ({
  href,
  children,
  variant,
  className,
  shape,
  size,
  fullWidth,
  ...props
}: LinkAsButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, shape, size, fullWidth }),
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
