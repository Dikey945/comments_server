import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveToken = async (userId: string, refreshToken: string) => {
  const token = await prisma.token.findUnique({
    where: { userId },
  });

  if (token) {
    await prisma.token.update({
      where: { id: token.id },
      data: { refreshtToken: refreshToken },
    });

    return;
  }

  await prisma.token.create({
    data: {
      userId,
      refreshtToken: refreshToken,
    },
  });
};

export const getByToken = async (refreshToken: string) => {
  return prisma.token.findUnique({
    where: { refreshtToken: refreshToken },
  });
};
