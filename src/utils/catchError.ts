import { NextFunction, Response, Request } from 'express';

// This is custom middleware that wraps all controller actions and
// catches any errors that are thrown. This allows us to avoid
// try/catch blocks in our controller actions and prevent server crashes.
export const catchError
  = (
    action: (req: Request, res:Response, next: NextFunction) => Promise<any>,
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await action(req, res, next);
      } catch (e) {
        next(e);
      }
    };
  };
