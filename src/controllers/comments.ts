import { Request, Response } from 'express';
import * as commentsServices from '../services/comments';
import { getCommentOwner } from '../services/comments';

export const createComment = async (req: Request, res: Response) => {
  const {
    message,
    postId,
    parentId,
    userId,
  } = req.body;

  if (!message || !postId || !userId) {
    throw new Error('Missing required fields');
  }

  const createdComment
    = await commentsServices.createComment(message, postId, parentId, userId);

  res.send(createdComment);
};

export const updateComment = async (req: Request, res: Response) => {
  const {
    message,
  } = req.body;

  if (!message) {
    res.sendStatus(422);
  }

  // @ts-ignore
  const { userId } = await getCommentOwner(req.params.commentId);

  if (userId !== req.body.userId) {
    res.sendStatus(403);
  }

  const updatedComment
    = await commentsServices.updateComment(message, req.params.commentId);

  res.send(updatedComment);
};
