import { prisma } from '../prisma/client.js';

export const getPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      comments: true,
      likes: true,
    },
  });
};

export const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      likes: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });
};

export const createPost = async (data) => {
  return await prisma.post.create({
    data,
  });
};

export const updatePost = async (id, data) => {
  return await prisma.post.update({
    where: {
      id,
    },
    data,
  });
};

export const deletePost = async (id) => {
  const likes = await prisma.like.deleteMany({
    where: {
      postId: id,
    },
  });

  const comments = await prisma.comment.deleteMany({
    where: {
      postId: id,
    },
  });

  const post = await prisma.post.delete({
    where: {
      id,
    },
  });

  return { post, comments, likes };
};

export const isAuthorExists = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};
