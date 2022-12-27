import { Request, Response} from "express";
import * as postsServices from '../services/posts';

export const getAll = async (req: Request, res: Response) => {
  const posts = await postsServices.getAll();

  res.send(posts)
}

export const getOne = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const foundPost = await postsServices.getPostById(+postId);

  if(!foundPost) {
    res.sendStatus(404);
    return;
  }

  res.send(foundPost);
}

export const addNewPost = async (req: Request, res: Response) => {
  const { title, body, userId } = req.body;

  if(!title || !body || !userId) {
    res.sendStatus(422);
    return;
  }

  const newPost = await postsServices.addPost(title, body, userId);

  res.statusCode  = 201;
  res.json(newPost)
}

