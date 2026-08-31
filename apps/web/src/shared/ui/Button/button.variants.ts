import { cva, type VariantProps } from 'class-variance-authority'

export const variants = cva('btn', {
  variants: {
    variant: {
      primary:
        'bg-brand-800 text-white shadow-sm shadow-brand-900/10 hover:bg-brand-900 active:bg-brand-900',
      secondary:
        'border border-brand-100 bg-brand-50 text-brand-900 hover:bg-brand-100',
      outline:
        'text-foreground border border-surface-border bg-surface-card hover:border-brand-500/30 hover:bg-brand-50/50 hover:text-brand-900',
      ghost: 'text-foreground/70 hover:bg-brand-50 hover:text-brand-900',
      social:
        'text-foreground border border-surface-border bg-surface-card shadow-xs hover:border-surface-border/80 hover:bg-surface-bg',
      destructive:
        'bg-rose-600 text-white shadow-xs hover:bg-rose-700 active:bg-rose-800',
    },
    size: {
      sm: 'h-8 gap-1.5 px-3 text-xs',
      md: 'h-10 gap-2 px-4 text-sm',
      lg: 'h-12 gap-2.5 px-6 text-base',
      xl: 'h-14 gap-3 px-8 text-lg',
      icon: 'size-9 p-0',
    },
    shape: {
      rounded: 'rounded-xl', // regular forms
      pill: 'rounded-full', // Landing Hero CTA
      square: 'rounded-lg', // compaq style for grids/tables
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
  },
})

export type ButtonVariantsProps = VariantProps<typeof variants>
