import React from 'react'
import { cn } from '@/shared/lib/cn'
import { typographyVariants, type TypographyProps } from './typography.variants'

const elementMap: Record<
  NonNullable<TypographyProps['variant']>,
  React.ElementType
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  lead: 'p',
  large: 'p',
  small: 'small',
  muted: 'p',
  code: 'code',
  price: 'span',
}

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'style'>,
    Omit<TypographyProps, 'style'> {
  as?: React.ElementType
  fontStyle?: TypographyProps['style']
  style?: React.CSSProperties
}

const Typography: React.FC<TextProps> = ({
  className,
  variant = 'p',
  weight,
  fontStyle,
  as,
  style,
  children,
  ...props
}) => {
  const Component = as || (variant ? elementMap[variant] : 'p')

  return (
    <Component
      style={style}
      className={cn(
        typographyVariants({
          variant,
          weight,
          style: fontStyle,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Typography
