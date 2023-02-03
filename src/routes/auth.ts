import express from 'express';
import * as authController from '../controllers/authController';
import { catchError } from '../utils/catchError';

export const authRouter = express.Router();

authRouter.post('/login', catchError(authController.login));
authRouter.post('/', catchError(authController.registration));
authRouter.get(
  '/activate/:activationToken',
  catchError(authController.activate),
);
authRouter.delete(
  '/activate/:userId',
  catchError(authController.deleteAccount),
);
authRouter.get('/refresh', catchError(authController.refresh));
