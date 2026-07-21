import { ValidationError } from 'joi';
import { AppError } from './apiError';

export const handleJoiError = (err: ValidationError): AppError => {
  const errors = err.details.reduce((acc: Record<string, string>, current) => {
    const field = current.path.join('.');
    acc[field] = current.message;
    return acc;
  }, {});

  const appError = new AppError('Validation failed', 400);
  appError.errors = errors;
  return appError;
};
