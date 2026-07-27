/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'

type DefaultParams = Record<string, string>

export type ValidatedRequest<T extends { params?: any; body?: any; query?: any }> = Request<
  DefaultParams,
  unknown,
  T['body'] extends undefined ? unknown : T['body'],
  T['query'] extends undefined ? Record<string, string | string[] | undefined> : T['query']
> & {
  params: T['params'] extends undefined ? DefaultParams : T['params']
}
