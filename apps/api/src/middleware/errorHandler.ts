import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { AppError } from "@helpers/apiError";

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  errors?: Record<string, string>;
  isJoi?: boolean;
  [key: string]: any;
}

const handleJoiError = (err: ValidationError): AppError => {
  const errors = err.details.reduce((acc: Record<string, string>, current) => {
    const field = current.path.join(".");
    acc[field] = current.message;
    return acc;
  }, {});

  const appError = new AppError("Validation failed", 400);
  appError.errors = errors;
  return appError;
};

const sendErrorDev = (
  err: any,
  validationErr: CustomError | null,
  res: Response,
): void => {
  const statusCode = validationErr?.statusCode || err.statusCode || 500;

  console.error("[DEV] Original error:", err);

  res.status(statusCode).json({
    status: validationErr?.status || err.status,
    message: validationErr?.message || err.message,
    stack: err.stack,
    errors: validationErr?.errors,
  });
};

const sendErrorProd = (err: CustomError, res: Response): void | Response => {
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  console.error("CRITICAL UNKNOWN ERROR 💥:", err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error. Please try again later.",
  });
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const validationErr =
    err.isJoi || err.name === "ValidationError"
      ? handleJoiError(err as ValidationError)
      : null;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, validationErr, res);
  } else {
    const error: CustomError = validationErr || err;

    // TODO: add db error handler in the future
    // if (error.name === 'CastError') error = handleDbCastError(error);

    sendErrorProd(error, res);
  }
};
