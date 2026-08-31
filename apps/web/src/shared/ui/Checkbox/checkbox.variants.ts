import { cva, type VariantProps } from 'class-variance-authority'

export const checkboxVariants = cva(
  'peer size-5 shrink-0 cursor-pointer appearance-none rounded-md border bg-surface-card transition-all duration-200 outline-none checked:border-brand-600 checked:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      isError: {
        true: 'border-red-500 focus-visible:border-red-600 focus-visible:ring-3 focus-visible:ring-red-500/20',
        false:
          'border-gray-300 focus-visible:border-green-600 focus-visible:ring-3 focus-visible:ring-green-600/20',
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
)

export type CheckboxVariantsProps = VariantProps<typeof checkboxVariants>
