import type { Response } from 'express'
import type { AuthRequest } from '@middleware/authenticate'
import { statisticsService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import type { PeriodFilterPropsQuery } from '@validators/statistics'
import type { ValidatedRequest } from '../types/validator'

export const getBasicExpenseForPeriod = asyncHandler(
  async (req: ValidatedRequest<PeriodFilterPropsQuery> & AuthRequest, res: Response) => {
    const response = await statisticsService.getBasicExpenseForPeriod(
      req.validatedQuery,
      req.userId as number,
    )

    res.status(200).json(response)
  },
)

export const getExpenseByCategories = asyncHandler(
  async (req: ValidatedRequest<PeriodFilterPropsQuery> & AuthRequest, res: Response) => {
    const response = await statisticsService.getExpenseByCategories(
      req.validatedQuery,
      req.userId as number,
    )

    res.status(200).json(response)
  },
)
