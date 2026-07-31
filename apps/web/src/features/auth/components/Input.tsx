import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input = ({
  className,
  error,
  type = 'text',
  label,
  ...props
}: InputProps) => {
  const errorId = props.id ? `${props.id}-error` : undefined

  return (
    <div className={cn('relative pb-4', className)}>
      {label ? (
        <label
          htmlFor={props.id}
          className="absolute -top-1.5 left-4 inline-block bg-white px-1 text-xs leading-3"
        >
          {label}
        </label>
      ) : null}
      <input
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'w-full rounded-[50px] border-2 bg-white px-4 py-3.5 text-[0.95rem] text-gray-700 transition-all duration-200 outline-none placeholder:text-gray-400',
          error
            ? 'border-red-500 text-red-900 focus:border-red-600 focus:ring-[3px] focus:ring-red-500/20'
            : 'focus:border-brand-600 border-brand-500 focus:ring-[3px] focus:ring-brand-500/15'
        )}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          className="animate-in fade-in-50 slide-in-from-top-1 absolute inset-e-4 -bottom-0.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  )
}
