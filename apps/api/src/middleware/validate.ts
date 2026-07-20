import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return next(error);
    }
    req.body = value;
    next();
  };
};
