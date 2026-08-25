import type { Response } from 'express'
import type { AuthRequest } from '@middleware/authenticate'
import { statisticsService } from '@services'
import { asyncHandler } from '@helpers/errors/asyncHandler'
import type { BasicExpenseForPeriodQuery } from '@validators/statistics'
import type { ValidatedRequest } from '../types/validator'

export const getBasicExpenseForPeriod = asyncHandler(
  async (req: ValidatedRequest<BasicExpenseForPeriodQuery> & AuthRequest, res: Response) => {
    const response = await statisticsService.getBasicExpenseForPeriod(
      req.validatedQuery,
      req.userId as number,
    )

    res.status(200).json(response)
  },
)
