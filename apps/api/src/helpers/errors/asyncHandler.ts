import { Request, Response, NextFunction, RequestHandler } from 'express'

export const asyncHandler =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Req extends Request<any, any, any, any>, Res extends Response<any>>(
      fn: (req: Req, res: Res, next: NextFunction) => Promise<unknown>,
    ): RequestHandler =>
    (req, res, next) => {
      fn(req as unknown as Req, res as unknown as Res, next).catch(next)
    }
