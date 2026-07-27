import { Request, Response, NextFunction, RequestHandler } from 'express'

type DefaultParams = Record<string, string | undefined>

export const asyncHandler =
  <P = DefaultParams, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response<ResBody>,
      next: NextFunction,
    ) => Promise<unknown>,
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
  (req, res, next) => {
    fn(req, res, next).catch(next)
  }
