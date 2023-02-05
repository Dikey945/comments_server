import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {
  getUserByEmail, NormalizedUser, normalizeUser, registerService,
}
  from '../services/userService';
import { jwtService } from '../services/jwtService';
import { ApiError } from '../exeptions/ApiError';
import { getByToken, saveToken } from '../services/tokenService';

const prisma = new PrismaClient();

// I decide to make validations functions for registration
// to prevent improper data from being sent to the server
// validation of email
function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }

  return null;
}

// server validation of password
const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }

  return null;
};

// server validation of username
const validateUsername = (value: string) => {
  if (!value) {
    return 'Username is required';
  }

  if (value.length < 3) {
    return 'At least 3 characters';
  }

  return null;
};

// registration controller
const sendAuthentications = async (res: Response, user: any) => {
  const userData = normalizeUser(user);
  const accessToken = jwtService.generateAccessToken(userData);
  const refreshToken = jwtService.generateRefreshToken(userData);

  await saveToken(user.id, refreshToken);
  // To remove client js code from processing refresh token we will use cookie

  res.cookie('refreshToken', refreshToken, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    // with this option client js code will not be able to access this cookie
    httpOnly: true,
  });

  res.send({
    data: {
      user: userData,
      accessToken,
    },
  });
};

export const registration
  = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, name } = req.body;
    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
      name: validateUsername(name),
    };

    if (errors.email || errors.password || errors.name) {
      throw ApiError.BadRequest('Validation error', errors);
    }

    await registerService(name, email, password);

    res.send({ message: 'ok' });
    next();
  };

export const activate = async (req: Request, res: Response) => {
  const { activationToken } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      activationToken,
    },
  });

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (user && user.id) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        activationToken: null,
      },
    });
  }

  const updatedUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  await sendAuthentications(res, updatedUser);
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  await prisma.user.delete({
    where: { id: userId },
    select: { id: true },
  });

  return res.status(200).send({ message: 'User deleted successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    throw ApiError.BadRequest('User with this email not found');
  }

  if (!user) {
    res.sendStatus(401);

    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.sendStatus(401);

    return;
  }

  await sendAuthentications(res, user);
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const userData
    = jwtService.validateRefreshToken(refreshToken) as NormalizedUser;

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  const token = await getByToken(refreshToken);

  if (!token) {
    throw ApiError.Unauthorized();
  }

  const user = await getUserByEmail(userData.email);

  await sendAuthentications(res, user);
};
