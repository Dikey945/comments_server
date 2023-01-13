import express from 'express';
import * as commentsController from '../controllers/comments';

export const router = express.Router();

router.post('/', commentsController.createComment);
router.put('/:commentId', commentsController.updateComment);
