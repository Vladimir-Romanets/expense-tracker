export type ActionResult =
  | { success: true }
  | { success: false; formError?: string; errors?: Record<string, string> }
