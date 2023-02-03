import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../exeptions/ApiError';

export const errorMiddleware
  = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err instanceof ApiError) {
      const { status, message, errors } = err;

      res.status(status).send({
        message,
        errors,
      });
    }

    res.status(500).send({
      message: 'Unexpected error',
    });

    next();
  };
