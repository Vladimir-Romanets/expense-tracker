import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        details: error.details.map((d) => d.message),
      });
      return;
    }
    req.body = value;
    next();
  };
};
