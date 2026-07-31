import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

import { buttonVariants, ButtonProps } from '../Button/Button'
import { cn } from '@/utils/cn'

export type LinkAsButtonProps = ComponentPropsWithoutRef<typeof Link> &
  Pick<ButtonProps, 'variant' | 'shape' | 'size' | 'fullWidth'>

const LinkAsButton = ({
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

export default LinkAsButton
