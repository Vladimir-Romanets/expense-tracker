import { cva, type VariantProps } from 'class-variance-authority'

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-3xl font-extrabold md:text-5xl',
      h2: 'text-2xl font-semibold md:text-4xl',
      h3: 'text-xl font-semibold md:text-3xl',
      h4: 'text-lg font-semibold md:text-2xl',
      p: 'text-sm font-normal md:text-base',
      blockquote: 'text-sm italic md:text-base',
      lead: 'text-lg font-normal md:text-xl',
      large: 'text-base font-semibold md:text-lg',
      small: 'text-xs font-medium md:text-sm',
      muted: 'text-xs md:text-sm',
      code: 'font-mono text-xs font-semibold md:text-sm',
      price: 'font-mono text-base font-bold md:text-xl',
    },
    style: {
      normal: 'not-italic',
      italic: 'italic',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  defaultVariants: {
    variant: 'p',
    style: 'normal',
  },
})

export type TypographyProps = VariantProps<typeof typographyVariants>
