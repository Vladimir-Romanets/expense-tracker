/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'

type DefaultParams = Record<string, string>

export type ValidatedRequest<T extends { params?: any; body?: any; query?: any }> = Request<
  T['params'] extends undefined ? DefaultParams : T['params'],
  unknown,
  T['body'] extends undefined ? unknown : T['body'],
  unknown
> & {
  validatedQuery: T['query'] extends undefined ? unknown : T['query']
}
