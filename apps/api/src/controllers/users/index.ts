import { Request, Response } from 'express';
import { usersService } from '@services';
import { asyncHandler } from '@helpers/asyncHandler';

const create = asyncHandler(async (req: Request, res: Response) => {
  const response = await usersService.create(req.body);
  res.status(201).json(response);
});

export default {
  create,
};
