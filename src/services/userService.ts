import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { emailService } from './emailService';
import { ApiError } from '../exeptions/ApiError';

const prisma = new PrismaClient();

export interface NormalizedUser {
  id: string;
  name: string;
  email: string;
}
export const normalizeUser = ({ id, name, email }: NormalizedUser) => {
  return { id, name, email };
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const registerService = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('User with this email already exists', {
      email: 'User with this email already exists',
    });
  }

  const activationToken = uuidv4();

  // To make our app more secured we can use bcrypt to hash the password
  // in this case hacker will not be able to get the password from the database
  // and even if he will get the hashed password he will not be able to decrypt it
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hash,
      name,
      activationToken,
    },
  });

  await emailService.sendActivationLink(email, activationToken);
};
