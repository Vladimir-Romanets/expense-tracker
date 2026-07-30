import { z } from 'zod'

export const flattenFieldErrors = <T extends Record<string, unknown>>(
  error: z.ZodError<T>
) => {
  const tree = z.treeifyError(error)
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(tree.properties ?? {})) {
    if (value?.errors?.length) {
      result[key] = value.errors.join('. ')
    }
  }

  return result
}
