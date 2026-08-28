export const StatisticError = ({ error }: { error?: string | null }) => {
  /* TODO: Create Error Bar and replace this handler with it */

  return error ? <p>{error}</p> : null
}
