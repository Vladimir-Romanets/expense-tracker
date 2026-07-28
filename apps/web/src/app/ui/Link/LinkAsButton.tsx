import Link from 'next/link'

import { buttonVariants, ButtonProps } from '../Button/Button'
import { PropsWithChildren } from 'react'
import { cn } from '@/app/utils/cn'

type Props = {
  href: string
  className?: string
} & Pick<ButtonProps, 'variant' | 'shape' | 'size'> &
  PropsWithChildren

const LinkAsButton = ({
  href,
  children,
  variant,
  className,
  shape,
  size,
}: Props) => {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, shape, size }), className)}
    >
      {children}
    </Link>
  )
}

export default LinkAsButton
