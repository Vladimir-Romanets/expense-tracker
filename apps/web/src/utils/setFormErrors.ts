import { UseFormSetError, FieldValues, Path } from 'react-hook-form'

type Props = {
  errors?: Record<string, string>
  formError?: string
}
export function setFormErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  { errors, formError }: Props
) {
  if (errors !== undefined)
    for (const key in errors) {
      const message = errors[key]
      setError(key as Path<T>, { type: 'server', message })
    }
  if (formError) setError('root', { message: formError })
}
