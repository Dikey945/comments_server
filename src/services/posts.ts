// import { Post } from "../models/Post";
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAll = async () => {
  return await prisma.post.findMany({select: {
    id: true,
    title: true,
    body: true,
    }})
}

export const getPostById = async (postId: string) => {
  return prisma.post.findUnique({
    where: {
       id: postId
    },
    select: {
      id: true,
      body: true,
      title: true,
      comments: {
        orderBy: {
          createdAt: 'desc'
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
            }
          }
        }
      }
    }
  })
}
//
// export const addPost = async (
//   title: string,
//   body: string,
//   userId: number
//   ) => {
//   const newPost = {
//     title,
//     body,
//     userId,
//   }
//
//   return Post.create(newPost)
// }
