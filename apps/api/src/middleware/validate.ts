import { Request, Response, NextFunction } from 'express'
import { ZodObject, ZodRawShape } from 'zod'

export const validate = (schema: ZodObject<ZodRawShape>) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      if ('body' in parsed) req.body = parsed.body
      if ('query' in parsed) Object.assign(req.query, parsed.query)
      if ('params' in parsed) req.params = parsed.params as Request['params']

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
