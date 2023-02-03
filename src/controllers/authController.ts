import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getUserByEmail, normalizeUser, registerService }
  from '../services/userService';
import { jwtService } from '../services/jwtService';
import { ApiError } from '../exeptions/ApiError';

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
  try {
    const { activationToken } = req.params;

    if (!activationToken) {
      res.sendStatus(401);

      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        activationToken,
      },
    });

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

    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
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
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      throw ApiError.BadRequest('User with this email not found');
    }

    if (!user) {
      res.sendStatus(401);

      return;
    }

    if (user.password !== password) {
      res.sendStatus(401);

      return;
    }

    const userData = normalizeUser(user);
    const accessToken = jwtService.generateAccessToken(userData);

    res.send({
      user: userData,
      accessToken,
    });
  } catch (e) {
    res.sendStatus(500);
  }
};
