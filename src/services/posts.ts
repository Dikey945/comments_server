import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async () => {
  return prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
    },
  });
};

export const getPostById = async (postId: string) => {
  return prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      body: true,
      title: true,
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          message: true,
          parentId: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: { select: { likes: true } },
        },
      },
    },
  });
};
