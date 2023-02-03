import express from 'express';
import * as postsController from '../controllers/posts';
import { authMiddleware } from '../middlewares/authMiddleware';
import { catchError } from '../utils/catchError';

export const router = express.Router();

router.get('/', catchError(authMiddleware), catchError(postsController.getAll));
router.get('/:postId', catchError(postsController.getOne));
// router.post('/', postsController.addNewPost);
