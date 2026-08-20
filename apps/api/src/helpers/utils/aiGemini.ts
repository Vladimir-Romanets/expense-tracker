export const getAiKey = (): string => {
  if (!process.env.AI_API_KEY) throw new Error('AI_API_KEY is not set')

  return process.env.AI_API_KEY
}
