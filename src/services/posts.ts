import { Post } from "../models/Post";

export const getAll = async () => {
  return Post.findAll();
}

export const getPostById = async (postId: number) => {
  return Post.findByPk(postId);
}

export const addPost = async (
  title: string,
  body: string,
  userId: number
  ) => {
  const newPost = {
    title,
    body,
    userId,
  }

  return Post.create(newPost)
}
