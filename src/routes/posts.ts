import express from 'express';
import * as postsController from '../controllers/posts';

export const router = express.Router();

router.get('/', postsController.getAll)
router.get('/:postId', postsController.getOne);
router.post('/', postsController.addNewPost);