import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../services/jwtService';
import { ApiError } from '../exeptions/ApiError';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw ApiError.Unauthorized();
  }

  const [, accessToken] = authHeader.split(' ');

  if (!accessToken) {
    throw ApiError.Unauthorized();
  }

  const userData = jwtService.validateAccessToken(accessToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  next();
}
