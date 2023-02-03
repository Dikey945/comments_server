import express from 'express';
import * as commentsController from '../controllers/comments';
import { catchError } from '../utils/catchError';

export const router = express.Router();

router.delete('/:commentId', catchError(commentsController.deleteComment));
router.post('/', catchError(commentsController.createComment));
router.put('/:commentId', catchError(commentsController.updateComment));
