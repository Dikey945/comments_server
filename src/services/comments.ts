import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COMMENT_SELECT_FIELDS = {
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
};

// eslint-disable-next-line max-len
export const createComment = async (
  message: string,
  postId: string,
  parentId: string | null,
  userId: string,
) => {
  return prisma.comment.create({
    data: {
      message,
      userId,
      postId,
      parentId,
    },
    select: COMMENT_SELECT_FIELDS,
  });
};

export const updateComment = async (message: string, id: string) => {
  return prisma.comment.update({
    where: { id },
    data: { message },
    select: { message: true },
  });
};

export const getCommentOwner = async (commentId: string) => {
  return prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });
};

export const deleteComment = async (id: string) => {
  return prisma.comment.delete({
    where: { id },
    select: { id: true },
  });
};
