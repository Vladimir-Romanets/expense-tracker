import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
  'w-full rounded-md border bg-surface-card px-3 py-2 text-sm transition-all duration-200 outline-none',
  {
    variants: {
      isError: {
        true: 'border-red-500 text-red-900 focus:border-red-600 focus:ring-3 focus:ring-red-500/20',
        false:
          'border-border focus:border-green-600 focus:ring-3 focus:ring-green-600/20',
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
)

export type InputVariantsProps = VariantProps<typeof inputVariants>
