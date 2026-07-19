import { Request, Response } from "express";
import { usersService } from "@services";

const create = async (req: Request, res: Response) => {
  // TODO: Add try/catch as a middleware
  const response = await usersService.create(req.body);

  res.status(201).json(response);
};

export default {
  create,
};
