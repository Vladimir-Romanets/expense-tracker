import Link from 'next/link'

import { buttonVariants, ButtonProps } from '../Button/Button'
import { PropsWithChildren } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  href: string
  className?: string
} & Pick<ButtonProps, 'variant' | 'shape' | 'size' | 'fullWidth'> &
  PropsWithChildren

const LinkAsButton = ({
  href,
  children,
  variant,
  className,
  shape,
  size,
  fullWidth,
}: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, shape, size, fullWidth }),
        className
      )}
    >
      {children}
    </Link>
  )
}

export default LinkAsButton
